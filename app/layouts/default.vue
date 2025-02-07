<script lang="ts" setup>
import { getAttributes } from "~/modules/attribute-groups/components/AttributeGroups/attributes.data";
import { getLanguages } from "~/modules/lang-settings/components/langSettings/langSettings.data";
import { useProductsStore } from "~/modules/products/stores/products";
import { useMainStore } from "~/stores/main";

const productsStore = useProductsStore();
const mainStore = useMainStore();
getLanguages();
</script>

<template>
  <div class="flex relative">
    <div
      class="w-[500px] fixed top-0 right-0 z-[500] translate-y-[50px] translate-x-[-30px]"
    >
      <UiAlertAlerts />
    </div>
    <Transition name="modal">
      <ModalWindowsAddProduct v-if="productsStore.productsModal" />
    </Transition>
    <AsideSidebar />
    <div class="w-full">
      <HeaderNav />
      <main class="p-8" v-if="mainStore.langs">
        <NuxtPage />
      </main>
    </div>
  </div>
</template>

<style scoped></style>
