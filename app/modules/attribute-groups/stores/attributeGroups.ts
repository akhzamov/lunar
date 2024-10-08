import { defineStore } from "pinia";
import type { IAttributeGroupsStore } from "~/modules/attribute-groups/types/attributeGroupsStore.type";

export const useAttributeGroupsStore = defineStore(
	"attributeGroups",
	{
		state: (): IAttributeGroupsStore => ({
			attributeGroups: null,
		}),

		actions: {},

		getters: {},
	}
);
