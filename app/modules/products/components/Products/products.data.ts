import type { IProduct } from "~/modules/products/types/product.type";
import { useProductsStore } from "../../stores/products";

export async function getProducts() {
  const { $productsRep } = useNuxtApp();
  const productsStore = useProductsStore();
  try {
    const res = await $productsRep.getProducts({
      page: productsStore.page,
      per_page: productsStore.perPage,
    });
    res.data.forEach((item) => {
      item.checked = false;
    });
    productsStore.productsList = res.data;
    productsStore.productsListMeta = res.meta;
  } catch (error) {
    console.error("Не удалось получить /admin/products/paginate: ", error);
    console.log(error);
  }
}
