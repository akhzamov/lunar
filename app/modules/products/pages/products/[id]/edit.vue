<script lang="ts" setup>
import type { IBreadcrumb } from "~/types/Others/breadcrumb.type";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Products | Lunar",
});

const route = useRoute();
const breadcrumbs = reactive<IBreadcrumb[]>([
  { id: 1, name: "Каталог", path: "" },
  { id: 2, name: "Товары", path: "/products" },
  {
    id: 3,
    name: `Основная информация`,
    path: `/products/${route.params.id}/edit`,
  },
]);
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="flex flex-col">
    <ProductsIDTopTitle />
    <UiAlertAlerts />
  </div>
  <div class="flex">
    <div class="b-bg b-border rounded-xl p-6 flex-grow z-[20]">
      <ProductsIDEditMain />
    </div>
    <div class="relative">
      <CommonProductRoutes />
    </div>
  </div>
</template>

<style scoped></style>
