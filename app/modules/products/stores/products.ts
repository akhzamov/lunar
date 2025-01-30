import { defineStore } from "pinia";
import type { IProductStore } from "~/modules/products/types/productStore.type";
import type { IProduct } from "~/modules/products/types/product.type";
import { productsList } from "~/modules/products/components/Products/products.data";

export const useProductsStore = defineStore("products", {
  state: (): IProductStore => ({
    activeFilterTab: 1,
    productsList: productsList,
    filteredProductsList: productsList,
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
          this.filteredProductsList = this.productsList.filter(
            (product) => product.status === "published"
          ); // Опубликованные товары
          break;
        case 3:
          this.filteredProductsList = this.productsList.filter(
            (product) => product.status === "draft"
          ); // Черновики
          break;
        default:
          this.filteredProductsList = this.productsList; // По умолчанию все товары
      }
    },
  },

  getters: {},
});
