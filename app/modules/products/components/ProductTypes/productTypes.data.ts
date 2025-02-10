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
    return res;
  } catch (error) {
    console.error("Не удалось получить /admin/attribute-groups: ", error);
  }
}

export async function createProductType(body: {
  id: number;
  name: string;
  mappedAttributes: number[];
}) {
  const { $productTypesRep } = useNuxtApp();
  const productTypesStore = useProductTypesStore();
  try {
    const res = await $productTypesRep.createProductType(body);
    return res;
  } catch (error) {
    console.error("Не удалось получить /admin/attribute-groups: ", error);
  }
}

export async function updateProductTypeById(
  id: number,
  body: {
    id: number;
    name: string;
    mappedAttributes: number[];
  }
) {
  const { $productTypesRep } = useNuxtApp();
  try {
    const res = await $productTypesRep.updateProductTypeById(id, body);
    return res;
  } catch (error) {
    console.error("Не удалось получить /admin/attribute-groups: ", error);
  }
}

export async function deleteProductTypeById(id: number) {
  const { $productTypesRep } = useNuxtApp();
  const productTypesStore = useProductTypesStore();
  try {
    const res = await $productTypesRep.deleteProductTypeById(id);
    return res;
  } catch (error) {
    console.error("Не удалось получить /admin/attribute-groups: ", error);
  }
}
