<script lang="ts" setup>
import { useProductsStore } from "../../stores/products";

const productsStore = useProductsStore();
const brands = reactive([
  {
    id: 1,
    name: "STO",
  },
  {
    id: 2,
    name: "Nooke",
  },
  {
    id: 3,
    name: "Darrel Soft",
  },
  {
    id: 4,
    name: "Huige",
  },
  {
    id: 5,
    name: "RADUCT",
  },
  {
    id: 6,
    name: "LUIS",
  },
]);
const recordsFilter = reactive([
  {
    id: 1,
    name: "С удаленными записями",
  },
  {
    id: 2,
    name: "Только удаленные записи",
  },
]);
const selectedBrand = ref<number | null>(null);
const selectedRecordFilter = ref<number | null>(null);
const brandsMenu = ref(false);
const recordsFilterMenu = ref(false);
</script>

<template>
  <div class="w-[320px] h-max b-border b-bg rounded-lg p-4">
    <div class="flex items-center justify-between">
      <p class="text-16-semi">Фильтры</p>
      <p class="text-14-semi text-c-error-400 cursor-pointer hover:underline">
        <span>Очистить</span>
      </p>
    </div>
    <div class="w-full h-full relative flex flex-col gap-3 mt-8">
      <div class="h-max flex flex-col gap-[6px]">
        <p>Бренды</p>
        <UiSelect
          :array="brands"
          :show-menu="brandsMenu"
          default-select-text=""
          v-model:model-value="selectedBrand"
          :icon="false"
          value-key="id"
          label-key="name"
          @update:model-value="selectedBrand = $event"
          @update:show-menu="brandsMenu = $event"
          :text-center="false"
          :disable="false"
          menu-open-position="bottom"
          class="w-full h-[44px] z-[30]"
          @click.stop
        />
      </div>
      <div class="h-max flex flex-col gap-[6px]">
        <p>Бренды</p>
        <UiSelect
          :array="recordsFilter"
          :show-menu="recordsFilterMenu"
          default-select-text=""
          v-model:model-value="selectedRecordFilter"
          :icon="false"
          value-key="id"
          label-key="name"
          @update:model-value="selectedBrand = $event"
          @update:show-menu="recordsFilterMenu = $event"
          :text-center="false"
          :disable="false"
          menu-open-position="bottom"
          class="w-full h-[44px]"
          @click.stop
        />
      </div>
    </div>
  </div>
</template>

<style scoped></style>
