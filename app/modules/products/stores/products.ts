import { defineStore } from "pinia";
import type { IProductStore } from "~/modules/products/types/productStore.type";
import type { IProduct } from "~/modules/products/types/product.type";

export const useProductsStore = defineStore("products", {
  state: (): IProductStore => ({
    page: 1,
    perPage: 10,
    activeFilterTab: 1,
    productsList: null,
    filteredProductsList: null,
    productsListMeta: null,
    activeProductsFilter: false,
    activeTableFilter: false,
    brandTableShow: true,
    skuTableShow: true,
    productTypeTableShow: true,
    productsModal: false,
  }),

  actions: {
    filterList(): void {
      switch (this.activeFilterTab) {
        case 1:
          this.filteredProductsList = this.productsList; // Все товары
          break;
        case 2:
          this.filteredProductsList =
            this.productsList?.filter(
              (product) => product.status === "published"
            ) ?? []; // Опубликованные товары
          break;
        case 3:
          this.filteredProductsList =
            this.productsList?.filter(
              (product) => product.status === "draft"
            ) ?? []; // Черновики
          break;
        default:
          this.filteredProductsList = this.productsList; // По умолчанию все товары
      }
    },
  },

  getters: {},
});
