import { defineStore } from "pinia";
import type { IProductStore } from "~/modules/products/types/productStore.type";
import type { IProduct } from "~/modules/products/types/product.type";
import { productsList } from "~/modules/products/components/Products/products.data";

export const useProductsStore = defineStore("products", {
	state: (): IProductStore => ({
		activeFilterTab: 1,
		productsList: productsList,
		activeProductsFilter: false,
		activeTableFilter: false,
		brandTableShow: true,
		skuTableShow: true,
		productTypeTableShow: true,
	}),

	actions: {},

	getters: {
		filteredProductsList(state): IProduct[] {
			switch (state.activeFilterTab) {
				case 1:
					return state.productsList;
				case 2:
					return state.productsList.filter(
						(product) => product.status === "published"
					);
				case 3:
					return state.productsList.filter(
						(product) => product.status === "draft"
					);
				default:
					return state.productsList;
			}
		},
	},
});
