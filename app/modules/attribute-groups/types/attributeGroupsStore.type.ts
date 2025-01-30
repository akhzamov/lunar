import type {
  IAttributeGroup,
  IAttributeGroupResponseMeta,
  IAttributeGroups,
} from "~/modules/attribute-groups/types/attributeGroups.type";

export interface IAttributeGroupsStore {
  attributeGroups: IAttributeGroup[] | null;
  attributeGroup: IAttributeGroup | null;
  attributeGroupMeta: IAttributeGroupResponseMeta | null;
  page: number;
  perPage: number;
}
