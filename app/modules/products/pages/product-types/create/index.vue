<script lang="ts" setup>
import type { IBreadcrumb } from "~/types/Others/breadcrumb.type";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Product Type | Lunar",
});

const route = useRoute();
const breadcrumbs = reactive<IBreadcrumb[]>([
  { id: 1, name: "Каталог", path: "" },
  { id: 2, name: "Типы продуктов", path: "/product-types" },
  {
    id: 3,
    name: `Создание`,
    path: `/product-types/${route.params.id}/edit`,
  },
]);
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="flex flex-col">
    <div class="flex items-center justify-between">
      <h2 class="text-30-semi">Создание типа продуктов</h2>
    </div>
    <ProductTypesCreateAndEdit type="create" />
  </div>
</template>

<style scoped></style>
