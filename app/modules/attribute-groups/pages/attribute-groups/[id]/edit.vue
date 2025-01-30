<script lang="ts" setup>
import { deleteAttributeGroupById } from "~/modules/attribute-groups/components/AttributeGroups/attributeGroups.data";
import { useAlertStore } from "~/stores/alert";
import type { IBreadcrumb } from "~/types/Others/breadcrumb.type";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Edit Attribute Group | Lunar",
});

const alertStore = useAlertStore();
const route = useRoute();
const router = useRouter();
const breadcrumbs = reactive<IBreadcrumb[]>([
  { id: 1, name: "Настройки", path: "" },
  { id: 2, name: "Группа Атрибутов", path: "/attribute-groups" },
  {
    id: 2,
    name: "Изменение",
    path: `/attribute-groups/${route.params.id}/edit`,
  },
]);
const deleteLang = async () => {
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
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="flex flex-col">
    <!-- Attribute Groups create Top Title -->
    <div class="flex items-center justify-between">
      <h2 class="text-30-semi">Изменение Групп Атрибутов</h2>
      <UiButton
        text="Удалить группа атрибутов"
        text-color="text-c-gray-t-50"
        bg-color="bg-c-error-500"
        :border-hide="true"
        hover-bg-color="bg-c-error-700"
        px="px-4"
        py="py-[10px]"
        @click="deleteLang()"
      >
      </UiButton>
    </div>
    <!-- Attribute Groups Edit Table -->
    <AttributeGroupsCreateAndEdit type="edit" />
  </div>
</template>

<style scoped></style>
