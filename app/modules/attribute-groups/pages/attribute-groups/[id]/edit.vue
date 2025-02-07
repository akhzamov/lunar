<script lang="ts" setup>
import { deleteAttributeGroupById } from "~/modules/attribute-groups/components/AttributeGroups/attributeGroups.data";
import { useAttributesStore } from "~/modules/attribute-groups/stores/attributes";
import { useAlertStore } from "~/stores/alert";
import type { IBreadcrumb } from "~/types/Others/breadcrumb.type";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Edit Attribute Group | Lunar",
});

const alertStore = useAlertStore();
const attrStore = useAttributesStore();
const route = useRoute();
const router = useRouter();
const breadcrumbs = reactive<IBreadcrumb[]>([
  { id: 1, name: "Настройки", path: "" },
  { id: 2, name: "Группа атрибутов", path: "/attribute-groups" },
  {
    id: 2,
    name: "Изменение",
    path: `/attribute-groups/${route.params.id}/edit`,
  },
]);
const deleteAttributeGroup = async () => {
  const res = await deleteAttributeGroupById(Number(route.params.id));
  console.log(res);
  if (res?.message) {
    setTimeout(() => {
      alertStore.successAlert = {
        active: false,
        text: "",
      };
    }, 2500);
    alertStore.successAlert = {
      active: true,
      text: "Группа атрибутов успешно удален",
    };
    router.push("/attribute-groups");
  } else if (res?.error) {
    setTimeout(() => {
      alertStore.dangerAlert = {
        active: false,
        text: "",
      };
    }, 2500);
    alertStore.dangerAlert = {
      active: true,
      text: "Группа атрибутов нельзя удалить!",
    };
    router.push("/attribute-groups");
  }
};
const handleOpenCreteAttributeModal = () => {
  attrStore.attributeCreateAndEditModalType = "new";
  attrStore.attributeCreateAndEditModal = true;
  document.body.style.overflow = "hidden";
};
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="flex flex-col">
    <!-- Attribute Groups create Top Title -->
    <div class="flex items-center justify-between">
      <h2 class="text-30-semi">Изменение групп атрибутов</h2>
      <UiButton
        text="Удалить группу атрибутов"
        text-color="text-c-gray-t-50"
        bg-color="bg-c-error-500"
        :border-hide="true"
        hover-bg-color="bg-c-error-700"
        px="px-4"
        py="py-[10px]"
        @click="deleteAttributeGroup()"
      >
      </UiButton>
    </div>
    <!-- Attribute Groups Edit -->
    <AttributeGroupsCreateAndEdit type="edit" />
    <!-- Attributes Top Title -->
    <div class="flex items-center justify-between mt-6">
      <h2 class="text-30-semi">Атрибуты</h2>
      <UiButton
        text="Создать атрибут"
        bg-color="bg-c-primary-500"
        :border-hide="true"
        hover-bg-color="bg-c-primary-700"
        px="px-4"
        py="py-[10px]"
        @click="handleOpenCreteAttributeModal()"
      >
      </UiButton>
    </div>
    <!-- Attributes Table -->
    <AttributeGroupsAttributesTable />
    <AttributeGroupsAttributesCreateAndEditModal
      v-if="attrStore.attributeCreateAndEditModal"
    />
  </div>
</template>

<style scoped></style>
