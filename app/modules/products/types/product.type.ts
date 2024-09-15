export interface IProduct {
	id: number;
	status: string;
	image: string;
	name: string;
	brand: string;
	sku: string[];
	warehouse: number;
	type: string;
	checked: boolean;
	activeSkuList: boolean;
}
