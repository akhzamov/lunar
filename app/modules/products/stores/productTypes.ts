import { defineStore } from "pinia";
import type { IProductTypesStore } from "../types/productTypesStore.type";

export const useProductTypesStore = defineStore("productTypes", {
  state: (): IProductTypesStore => ({
    page: 1,
    perPage: 10,
    productTypes: null,
    productType: null,
    meta: null,
    productAttributes: [],
    variantsAttributes: [],
  }),

  actions: {},

  getters: {},
});
