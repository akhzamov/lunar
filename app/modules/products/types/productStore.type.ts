import type { IProduct } from "~/modules/products/types/product.type";

export interface IProductStore {
	activeFilterTab: number;
	productsList: IProduct[];
	activeProductsFilter: boolean;
	activeTableFilter: boolean;
	brandTableShow: boolean;
	skuTableShow: boolean;
	productTypeTableShow: boolean;
}
