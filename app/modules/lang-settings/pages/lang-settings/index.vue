<script lang="ts" setup>
import { useLangSettingsStore } from "~/stores/langSettings";
import type { IBreadcrumb } from "~/types/Others/breadcrumb.type";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Translates | Lunar",
});

const router = useRouter();

const langStStore = useLangSettingsStore();
const breadcrumbs = reactive<IBreadcrumb[]>([
  { id: 1, name: "Настройки", path: "" },
  { id: 2, name: "Языки", path: "/lang-settings" },
]);
const handleOpenAttrGsPage = () => {
  router.push("/lang-settings/create");
};
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="flex flex-col">
    <div class="flex items-center justify-between">
    <h2 class="text-30-semi">Языки</h2>
    <UiButton
      text="Добавить язык"
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
    <LangSettingsLangsTable v-if="langStStore.languages" />
    <div class="loader-block mt-6" v-else>
      <div class="loader"></div>
    </div>
  </div>
</template>

<style scoped></style>
