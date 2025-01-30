<script lang="ts" setup>
import type { ITag } from "~/modules/products/types/product.type";

const selectedBrand = ref(0);
const brandsMenu = ref(false);
const selectedType = ref(0);
const typesMenu = ref(false);
const tags = ref<ITag[]>([]);
const brands = ref([
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
const types = ref([
  { id: 1, name: "Сток" },
  { id: 2, name: "Новый тип продукта" },
]);
</script>

<template>
  <div class="relative">
    <h3 class="text-20-semi">Основная Информация</h3>
    <div class="flex flex-col items-start gap-2 mt-3 z-[100]">
      <p>Бренд</p>
      <div class="w-full flex gap-2">
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
          class="w-full flex-grow h-[44px] z-[100]"
        />
        <UiButton
          text="Добавить"
          hover-bg-color="bg-c-primary-50 dark:bg-c-primary-500-8"
          class="h-[44px] z-[40]"
        >
          <template v-slot:icon>
            <IconPlus />
          </template>
        </UiButton>
      </div>
    </div>
    <div class="flex flex-col items-start gap-2 mt-3 z-[90]">
      <p>Тип</p>
      <UiSelect
        :array="types"
        :show-menu="typesMenu"
        default-select-text=""
        v-model:model-value="selectedType"
        :icon="false"
        value-key="id"
        label-key="name"
        @update:model-value="selectedType = $event"
        @update:show-menu="typesMenu = $event"
        :text-center="false"
        :disable="false"
        menu-open-position="bottom"
        class="w-full flex-grow h-[44px] z-[90]"
      />
    </div>
    <div class="flex flex-col mt-3">
      <label class="mb-3">Теги</label>
      <UiInputTag type="text" v-model="tags" class="w-full" />
    </div>
  </div>
</template>

<style scoped></style>
