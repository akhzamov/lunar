<script lang="ts" setup>
import { useLangSettingsStore } from "~/stores/langSettings";
import type { IBreadcrumb } from "~/types/Others/breadcrumb.type";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Translates | Lunar",
});

const langStStore = useLangSettingsStore();
const breadcrumbs = reactive<IBreadcrumb[]>([
  { id: 1, name: "Настройки", path: "" },
  { id: 2, name: "Языки", path: "/lang-settings" },
]);
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="flex flex-col">
    <LangSettingsTopTitle />
    <LangSettingsLangsTable v-if="langStStore.languages" />
    <div class="loader-block mt-6" v-else>
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped></style>
