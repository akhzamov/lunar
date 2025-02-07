<script lang="ts" setup>
import { getProductTypes } from "./productTypes.data";
import { useProductTypesStore } from "../../stores/productTypes";

const productTypesStore = useProductTypesStore();
const checkAll = ref(false);
const deleteButton = ref(false);

onMounted(async () => {
  await getProductTypes();
});
</script>

<template>
  <div
    class="h-max b-bg rounded-xl mt-6 select-none"
    v-if="productTypesStore.productTypes"
  >
    <div
      class="flex items-center justify-between rounded-tl-xl rounded-tr-xl border-[1px] border-c px-6 py-3"
    >
      <div class="relative w-max">
        <UiButton
          class="w-max"
          v-if="checkAll"
          @click="deleteButton = !deleteButton"
          text="Массовое действие"
          hover-bg-color="bg-c-gray-t-100 dark:bg-c-gray-t-700"
          p="p-[10px]"
        >
          <template v-slot:icon>
            <IconDotsVertical class="text-c-gray-t-300" />
          </template>
        </UiButton>
        <UiButton
          v-if="deleteButton"
          class="absolute top-[100%] left-0 translate-y-[4px]"
          @click="deleteButton = false"
          text="Удалить отмеченные"
          text-color="text-c-error-600"
          hover-bg-color="bg-c-error-500-30"
          p="p-4"
        >
          <template v-slot:icon-r>
            <IconTrash01 class="text-c-error-600" />
          </template>
        </UiButton>
      </div>
    </div>
    <UiTopAllSelect
      :array="productTypesStore.productTypes"
      v-model:check-all="checkAll"
      @update:array="
        (updatedArray: any) => {
          productTypesStore.productTypes = updatedArray;
        }
      "
    />
    <div class="flex flex-col border-x-[1px] border-b-[1px] border-c">
      <div class="-m-1.5">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="">
            <table
              class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700"
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    <div class="flex items-center gap-3">
                      <UiCheckbox v-model="checkAll" />
                      Имя
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Кол-во продуктов
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Атрибуты продуктов
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Атрибуты вариантов
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  ></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr
                  v-for="type in productTypesStore.productTypes"
                  :key="type.id"
                  class="hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700"
                  :class="{
                    'bg-c-gray-t-100 dark:bg-c-gray-t-700':
                      (checkAll && type.checked) || (type.checked && !checkAll),
                  }"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium border-l"
                    :class="{
                      'border-c-primary-600': type.checked,
                      'border-transparent': !type.checked,
                    }"
                  >
                    <div class="flex items-center gap-3">
                      <UiCheckbox v-model="type.checked" />
                      <span>{{ type.name }}</span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    {{ type.products_count }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    {{ type.product_attributes_count }}
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    {{ type.variant_attributes_count }}
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium"
                  >
                    <NuxtLink
                      :to="`/product-types/${type.id}/edit`"
                      class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-c-primary-700 hover:text-c-primary-500 hover:underline"
                    >
                      <IconEdit05 />
                      Изменить
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <UiPerPage
      :total-pages="productTypesStore.meta?.total ?? 0"
      v-model:current-page="productTypesStore.page"
      v-model:per-page="productTypesStore.perPage"
    />
  </div>
  <div class="loader-block mt-6" v-else>
    <div class="loader"></div>
  </div>
</template>

<style>
.border-c {
  @apply border-c-gray-t-200 dark:border-c-gray-t-600;
}
</style>
