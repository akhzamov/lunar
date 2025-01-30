<script lang="ts" setup>
import type { IBreadcrumb } from "~/types/Others/breadcrumb.type";
import { useAttributeGroupsStore } from "../../stores/attributeGroups";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Attribute Groups | Lunar",
});

const attrGsStore = useAttributeGroupsStore();
const breadcrumbs = reactive<IBreadcrumb[]>([
  { id: 1, name: "Настройки", path: "" },
  { id: 2, name: "Группа Атрибутов", path: "/attribute-groups" },
]);
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="flex flex-col">
    <!-- Attribute Groups Top Title -->
    <AttributeGroupsTopTitle />
    <!-- Attribute Groups Table -->
    <AttributeGroupsGroupTable />
  </div>
</template>

<style scoped></style>
