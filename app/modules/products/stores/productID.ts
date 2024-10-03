import { defineStore } from "pinia";
import type { IProductIDStore } from "~/modules/products/types/productIDStore.type";

export const useProductIDStore = defineStore("productID", {
	state: (): IProductIDStore => ({}),

	actions: {},

	getters: {},
});
