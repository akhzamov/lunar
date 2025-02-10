import { defineStore } from "pinia";
import type { IAttributeGroupsStore } from "~/modules/attribute-groups/types/attributeGroupsStore.type";
import type { IAttributesStore } from "../types/attributesStore.type";

export const useAttributesStore = defineStore("attributes", {
  state: (): IAttributesStore => ({
    attributes: null,
    attribute: null,
    attributeMeta: null,
    attributeCreateAndEditModalType: "",
    attributeCreateAndEditModalEditId: null,
    attributeCreateAndEditModalEditGroupType: "",
    attributeCreateAndEditModal: false,
    page: 1,
    perPage: 10,
  }),

  actions: {},

  getters: {},
});
