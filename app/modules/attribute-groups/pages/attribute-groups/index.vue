<script lang="ts" setup>
import type { IBreadcrumb } from "~/types/Others/breadcrumb.type";
import { useAttributeGroupsStore } from "../../stores/attributeGroups";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Attribute Groups | Lunar",
});

const router = useRouter();
const attrGsStore = useAttributeGroupsStore();
const breadcrumbs = reactive<IBreadcrumb[]>([
  { id: 1, name: "Настройки", path: "" },
  { id: 2, name: "Группа атрибутов", path: "/attribute-groups" },
]);
const handleOpenAttrGsPage = () => {
  router.push("/attribute-groups/create");
};
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="flex flex-col">
    <!-- Attribute Groups Top Title -->
    <div class="flex items-center justify-between">
      <h2 class="text-30-semi">Группа атрибутов</h2>
      <UiButton
        text="Новая группа атрибутов"
        text-color="text-c-gray-t-50"
        bg-color="bg-c-primary-600"
        :border-hide="true"
        hover-bg-color="bg-c-primary-700"
        px="px-4"
        py="py-[10px]"
        @click="handleOpenAttrGsPage"
      >
      </UiButton>
    </div>
    <!-- Attribute Groups Table -->
    <AttributeGroupsGroupTable />
  </div>
</template>

<style scoped></style>
