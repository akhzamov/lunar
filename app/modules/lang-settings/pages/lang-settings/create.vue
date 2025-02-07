<script lang="ts" setup>
import type { IBreadcrumb } from "~/types/Others/breadcrumb.type";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Create Lang | Lunar",
});

const breadcrumbs = reactive<IBreadcrumb[]>([
  { id: 1, name: "Настройки", path: "" },
  { id: 2, name: "Языки", path: "/lang-settings" },
  { id: 2, name: "Добавление", path: "/lang-settings/create" },
]);
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="flex flex-col">
    <div class="flex items-center justify-between">
      <h2 class="text-30-semi">Добавление языка</h2>
    </div>
    <LangSettingsCreateAndEdit type="create" />
  </div>
</template>

<style scoped></style>
