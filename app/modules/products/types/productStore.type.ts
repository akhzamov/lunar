import type {
  IProduct,
  IProductsResponseMeta,
} from "~/modules/products/types/product.type";

export interface IProductStore {
  page: number;
  perPage: number;
  activeFilterTab: number;
  productsList: IProduct[] | null;
  filteredProductsList: IProduct[] | null;
  productsListMeta: IProductsResponseMeta | null;
  activeProductsFilter: boolean;
  activeTableFilter: boolean;
  brandTableShow: boolean;
  skuTableShow: boolean;
  productTypeTableShow: boolean;
  productsModal: boolean;
}
