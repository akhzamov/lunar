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
    name: `Изменение`,
    path: `/product-types/${route.params.id}/edit`,
  },
]);
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="flex flex-col">
    <div class="flex items-center justify-between">
      <h2 class="text-30-semi">Изменение типов продукта</h2>
      <UiButton
        text="Удалить тип продукта"
        text-color="text-c-gray-t-50"
        bg-color="bg-c-error-500"
        :border-hide="true"
        hover-bg-color="bg-c-error-700"
        px="px-4"
        py="py-[10px]"
      >
      </UiButton>
    </div>
    <ProductTypesCreateAndEdit type="edit" />
  </div>
</template>

<style scoped></style>
