import { useProductTypesStore } from "../../stores/productTypes";

export async function getProductTypes() {
  const { $productTypesRep } = useNuxtApp();
  const productTypesStore = useProductTypesStore();
  try {
    const res = await $productTypesRep.getProductTypes({
      page: productTypesStore.page,
      per_page: productTypesStore.perPage,
    });
    res.data.forEach((item) => {
      item.checked = false;
    });
    productTypesStore.productTypes = res.data;
    productTypesStore.meta = res.meta;
  } catch (error) {
    console.error("Не удалось получить /admin/attribute-groups: ", error);
  }
}

export async function getProductTypeById(id: number) {
  const { $productTypesRep } = useNuxtApp();
  const productTypesStore = useProductTypesStore();
  try {
    const res = await $productTypesRep.getProductTypeById(id);
    productTypesStore.productType = res;
    console.log(res);
    return res;
  } catch (error) {
    console.error("Не удалось получить /admin/attribute-groups: ", error);
  }
}

export async function createProductType(body: {
  id: number;
  mappedAttributes: number[];
}) {
  const { $productTypesRep } = useNuxtApp();
  const productTypesStore = useProductTypesStore();
  try {
    const res = await $productTypesRep.createProductType(body);
    console.log(res);
    return res;
  } catch (error) {
    console.error("Не удалось получить /admin/attribute-groups: ", error);
  }
}
