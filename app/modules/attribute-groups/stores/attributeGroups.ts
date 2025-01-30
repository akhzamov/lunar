import { defineStore } from "pinia";
import type { IAttributeGroupsStore } from "~/modules/attribute-groups/types/attributeGroupsStore.type";

export const useAttributeGroupsStore = defineStore("attributeGroups", {
  state: (): IAttributeGroupsStore => ({
    attributeGroups: null,
    attributeGroup: null,
    attributeGroupMeta: null,
    page: 1,
    perPage: 10,
  }),

  actions: {},

  getters: {},
});
