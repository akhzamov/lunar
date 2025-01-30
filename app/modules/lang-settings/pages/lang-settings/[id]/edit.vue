<script lang="ts" setup>
import { deleteLanguageById } from "~/modules/lang-settings/components/langSettings/langSettings.data";
import { useAlertStore } from "~/stores/alert";
import { useLangSettingsStore } from "~/stores/langSettings";
import type { IBreadcrumb } from "~/types/Others/breadcrumb.type";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Create Lang | Lunar",
});

const langStStore = useLangSettingsStore();
const alertStore = useAlertStore();
const router = useRouter();
const route = useRoute();
const breadcrumbs = reactive<IBreadcrumb[]>([
  { id: 1, name: "Настройки", path: "" },
  { id: 2, name: "Языки", path: "/lang-settings" },
  { id: 2, name: "Добавление", path: "/lang-settings/create" },
]);

const deleteLang = async () => {
  const res = await deleteLanguageById(Number(route.params.id));
  if (res?.data) {
    setTimeout(() => {
      alertStore.successAlert = {
        active: false,
        text: "",
      };
    }, 2500);
    alertStore.successAlert = {
      active: true,
      text: "Язык успешно удален",
    };
    router.push("/lang-settings");
  }
};
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="flex flex-col">
    <div class="flex items-center justify-between">
      <h2 class="text-30-semi">Изменение Языка</h2>
      <UiButton
        text="Удалить язык"
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
    <LangSettingsCreateAndEdit type="edit" />
  </div>
</template>

<style scoped></style>
