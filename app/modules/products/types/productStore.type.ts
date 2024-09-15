import type { IProduct } from "~/modules/products/types/product.type";

export interface IProductStore {
	activeFilterTab: number;
	productsList: IProduct[];
}
