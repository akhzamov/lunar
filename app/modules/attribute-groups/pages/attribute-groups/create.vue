<script lang="ts" setup>
import type { IBreadcrumb } from "~/types/Others/breadcrumb.type";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Create Attribute Group | Lunar",
});

const breadcrumbs = reactive<IBreadcrumb[]>([
  { id: 1, name: "Настройки", path: "" },
  { id: 2, name: "Группа атрибутов", path: "/attribute-groups" },
  { id: 2, name: "Создание", path: "/attribute-groups/create" },
]);
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="flex flex-col">
    <!-- Attribute Groups create Top Title -->
    <div class="flex items-center justify-between">
      <h2 class="text-30-semi">Создание группы атрибутов</h2>
    </div>
    <!-- Attribute Groups Create Table -->
    <AttributeGroupsCreateAndEdit type="create" />
  </div>
</template>

<style scoped></style>
