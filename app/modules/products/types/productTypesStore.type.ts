import type { IAttribute } from "~/modules/attribute-groups/types/attributes.type";
import type {
  IProductType,
  IProductTypeId,
  IProductTypeResponseMeta,
} from "./productType.type";

export interface IProductTypesStore {
  page: number;
  perPage: number;
  productTypes: IProductType[] | null;
  productType: IProductTypeId | null;
  meta: IProductTypeResponseMeta | null;
  productAttributes: { title: string; attributes: IAttribute[] }[];
  variantsAttributes: { title: string; attributes: IAttribute[] }[];
}
