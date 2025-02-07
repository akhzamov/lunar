import type { IAttribute, IAttributeResponseMeta } from "./attributes.type";

export interface IAttributesStore {
  attributes: IAttribute[] | null;
  attribute: IAttribute | null;
  attributeMeta: IAttributeResponseMeta | null;
  attributeCreateAndEditModalType: string;
  attributeCreateAndEditModalEditId: number | null;
  attributeCreateAndEditModal: boolean;
  page: number;
  perPage: number;
}
