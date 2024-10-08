import type { IAttributeGroups } from "~/modules/attribute-groups/types/attributeGroups.type";

export interface IAttributeGroupsStore {
	attributeGroups: IAttributeGroups[] | null;
}
