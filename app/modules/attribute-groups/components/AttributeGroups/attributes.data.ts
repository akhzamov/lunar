import { useMainStore } from "~/stores/main";
import { useAttributesStore } from "../../stores/attributes";
import type { ICreateAttributeBody } from "../../types/attributes.type";

export async function getAttributes(attrGroupId: string) {
  const { $attributeRep } = useNuxtApp();
  const attrStore = useAttributesStore();
  try {
    const res = await $attributeRep.getAttributes({
      attributeGroupId: attrGroupId,
      page: attrStore.page,
      per_page: attrStore.perPage,
    });
    res.data.forEach((item) => {
      item.checked = false;
    });
    attrStore.attributes = res.data;
    attrStore.attributeMeta = res.meta;
    return res.data;
  } catch (error) {
    console.error("Не удалось получить /admin/attribute-groups: ", error);
  }
}

export async function getAttributeById(id: number) {
  const { $attributeRep } = useNuxtApp();
  const mainStore = useMainStore();
  mainStore.loader = true;
  try {
    const res = await $attributeRep.getAttributeById(id);
    mainStore.loader = false;
    return res;
  } catch (error) {
    console.error("Не удалось получить /admin/attribute-groups: ", error);
  }
}

export async function deleteAttributeById(id: number) {
  const { $attributeGroupRep } = useNuxtApp();
  const mainStore = useMainStore();
  mainStore.loader = true;
  try {
    const res = await $attributeGroupRep.deleteAttributeById(id);
    mainStore.loader = false;
    return res;
  } catch (error) {
    console.error("Не удалось удалить /admin/attribute-groups: ", error);
  }
}

export async function createAttribute(body: ICreateAttributeBody) {
  const { $attributeRep } = useNuxtApp();
  try {
    const res = await $attributeRep.createAttribute(body);
    return res;
  } catch (error) {
    console.error("Не удалось создать /admin/attributes: ", error);
  }
}

export async function updateAttributeById(
  id: string,
  body: ICreateAttributeBody
) {
  const { $attributeRep } = useNuxtApp();
  const mainStore = useMainStore();
  mainStore.loader = true;
  try {
    const res = await $attributeRep.updateAttributeById(id, body);
    mainStore.loader = false;
    return res;
  } catch (error) {
    console.error("Не удалось удалить /admin/attribute-groups: ", error);
  }
}
