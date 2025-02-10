export interface IProductType {
  id: number;
  name: string;
  checked: boolean;
  product_attributes_count: number;
  variant_attributes_count: number;
  products_count: number;
}

export interface IProductTypeId {
  id: number;
  name: string;
  product_attributes:
    | { id: number; handle: string; name: Record<string, string> }[]
    | [];
  variant_attributes:
    | { id: number; handle: string; name: Record<string, string> }[]
    | [];
}
export interface ICreateProductTypeId {
  id: number;
  name: string;
  product_attributes:
    | { id: number; handle: string; name: Record<string, string> }[]
    | [];
  products_count: number;
  variant_attributes:
    | { id: number; handle: string; name: Record<string, string> }[]
    | [];
}

export interface IProductTypeResponseLinks {
  first: string | null;
  last: string | null;
  next: string | null;
  prev: string | null;
}

export interface IProductTypeResponseMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: { active: boolean; label: string; url: string | null }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface IProductTypeResponse {
  data: IProductType[];
  links: IProductTypeResponseLinks;
  meta: IProductTypeResponseMeta;
}
