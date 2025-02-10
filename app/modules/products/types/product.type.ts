export interface IProduct {
  id: number;
  status: "published" | "draft";
  sku: string[];
  stock: number;
  brand: string;
  product_type: string;
  attribute_data: {
    name: Record<string, string>;
    description: Record<string, string>;
  };
  checked: boolean;
}

export interface IProductsResponseLinks {
  first: string | null;
  last: string | null;
  next: string | null;
  prev: string | null;
}

export interface IProductsResponseMeta {
  current_page: number;
  from: number;
  last_page: number;
  links: { active: boolean; label: string; url: string | null }[];
  path: string;
  per_page: number;
  to: number;
  total: number;
}

export interface IProductsResponse {
  data: IProduct[];
  links: IProductsResponseLinks;
  meta: IProductsResponseMeta;
}

export interface ITag {
  name: string;
}
