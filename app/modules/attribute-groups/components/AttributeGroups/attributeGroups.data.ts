import { useMainStore } from "~/stores/main";
import { useAttributeGroupsStore } from "../../stores/attributeGroups";

export async function getAttributeGroups() {
  const { $attributeGroupRep } = useNuxtApp();
  const attrGsStore = useAttributeGroupsStore();
  try {
    const res = await $attributeGroupRep.getAttributeGroups({
      page: attrGsStore.page,
      per_page: attrGsStore.perPage,
    });
    res.data.forEach((item) => {
      item.checked = false;
    });
    attrGsStore.attributeGroups = res.data;
    attrGsStore.attributeGroupMeta = res.meta;
  } catch (error) {
    console.error("Не удалось получить /admin/attribute-groups: ", error);
  }
}

export async function getAttributeGroupById(id: number) {
  const { $attributeGroupRep } = useNuxtApp();
  const attrGsStore = useAttributeGroupsStore();
  const mainStore = useMainStore();
  mainStore.loader = true;
  try {
    const res = await $attributeGroupRep.getAttributeGroupById(id);
    attrGsStore.attributeGroup = res.data;
    mainStore.loader = false;
  } catch (error) {
    console.error("Не удалось получить /admin/attribute-groups: ", error);
  }
}

export async function deleteAttributeGroupById(id: number) {
  const { $attributeGroupRep } = useNuxtApp();
  const mainStore = useMainStore();
  mainStore.loader = true;
  try {
    const res = await $attributeGroupRep.deleteAttributeById(id);
    getAttributeGroups();
    mainStore.loader = false;
    return res;
  } catch (error) {
    console.error("Не удалось удалить /admin/attribute-groups: ", error);
  }
}

type tCreateAttributeGroup = {
  attributableType: string;
  handle: string;
  position: number;
  name: Record<string, string>;
};
type tUpdateAttributeGroup = {
  attributableType: string;
  position: number;
  name: Record<string, string>;
};

export async function createAttributeGroup(body: tCreateAttributeGroup) {
  const { $attributeGroupRep } = useNuxtApp();
  const attrGsStore = useAttributeGroupsStore();
  try {
    const res = await $attributeGroupRep.createAttributeGroup(body);
    return res;
  } catch (error) {
    console.error("Не удалось создать /admin/attribute-group: ", error);
  }
}

export async function updateAttributeGroupById(
  id: number,
  body: tUpdateAttributeGroup
) {
  const { $attributeGroupRep } = useNuxtApp();
  const mainStore = useMainStore();
  mainStore.loader = true;
  try {
    const res = await $attributeGroupRep.updateAttributeGroupById(id, body);
    getAttributeGroups();
    mainStore.loader = false;
    return res;
  } catch (error) {
    console.error("Не удалось удалить /admin/attribute-groups: ", error);
  }
}
