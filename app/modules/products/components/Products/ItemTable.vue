<script lang="ts" setup>
import { useProductsStore } from "~/modules/products/stores/products";

const productsStore = useProductsStore();
const checkAll = ref(false);
const deleteButton = ref(false);
const productsFilterRef = ref<HTMLElement | null>(null);
const productsFilterButtonRef = ref<HTMLElement | null>(null);
const tableFilterRef = ref<HTMLElement | null>(null);
const tableFilterButtonRef = ref<HTMLElement | null>(null);
const totalPages = ref(50);
const currentPage = ref(1);
const productsSearch = "";
const perPage = ref(1);

const handleClickOutsideProductsFilter = (event: MouseEvent) => {
  if (
    productsStore.activeProductsFilter &&
    productsFilterButtonRef.value &&
    !productsFilterButtonRef.value.contains(event.target as Node) &&
    productsFilterRef.value &&
    !productsFilterRef.value.contains(event.target as Node)
  ) {
    productsStore.activeProductsFilter = false;
  }
};

const handleClickOutsideTableFilter = (event: MouseEvent) => {
  if (
    productsStore.activeTableFilter &&
    tableFilterButtonRef.value &&
    !tableFilterButtonRef.value.contains(event.target as Node) &&
    tableFilterRef.value &&
    !tableFilterRef.value.contains(event.target as Node)
  ) {
    productsStore.activeTableFilter = false;
  }
};

const activeProductsFilter = () => {
  productsStore.activeProductsFilter = !productsStore.activeProductsFilter;
};

const activeTableFilter = () => {
  productsStore.activeTableFilter = !productsStore.activeTableFilter;
};

onMounted(() => {
  document.addEventListener("click", handleClickOutsideProductsFilter);
  document.addEventListener("click", handleClickOutsideTableFilter);
});

onBeforeUnmount(() => {
  document.removeEventListener("click", handleClickOutsideProductsFilter);
  document.removeEventListener("click", handleClickOutsideTableFilter);
});
</script>

<template>
  <div class="h-max b-bg rounded-xl mt-6 select-none">
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
          class="w-max absolute top-[100%] left-0 translate-y-[4px]"
          v-if="deleteButton"
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
      <div class="flex items-center gap-3">
        <UiInputIcon
          v-model="productsSearch"
          class="w-[320px]"
          iconPosition="left"
        >
          <template v-slot:icon-l>
            <IconSearchLg />
          </template>
        </UiInputIcon>
        <div class="relative">
          <div
            @click="activeProductsFilter"
            ref="productsFilterButtonRef"
            class="productFilterButton"
          >
            <IconFilterFunnel02 />
          </div>
          <div
            v-if="productsStore.activeProductsFilter"
            ref="productsFilterRef"
            class="absolute top-[100%] right-0 translate-y-[10px]"
          >
            <ProductsFilter />
          </div>
        </div>
        <div class="relative">
          <div
            @click="activeTableFilter"
            ref="tableFilterButtonRef"
            class="productFilterButton"
          >
            <IconColumns03 />
          </div>
          <div
            v-if="productsStore.activeTableFilter"
            ref="tableFilterRef"
            class="absolute top-[100%] right-0 translate-y-[10px]"
          >
            <ProductsTableFilter />
          </div>
        </div>
      </div>
    </div>
    <UiTopAllSelect
      :array="productsStore.filteredProductsList ?? []"
      v-model:check-all="checkAll"
      @update:array="(updatedArray: any)=>{
				productsStore.filteredProductsList = updatedArray
			}"
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
                      Статус
                    </div>
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  ></th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Название
                  </th>
                  <th
                    v-if="productsStore.brandTableShow"
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Бренд
                  </th>
                  <th
                    v-if="productsStore.skuTableShow"
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    SKU
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    На складе
                  </th>
                  <th
                    v-if="productsStore.productTypeTableShow"
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Тип продукта
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  ></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr
                  v-for="product in productsStore.filteredProductsList"
                  :key="product.id"
                  class="hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700"
                  :class="{
                    'bg-c-gray-t-100 dark:bg-c-gray-t-700':
                      (checkAll && product.checked) ||
                      (product.checked && !checkAll),
                  }"
                >
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm font-medium border-l"
                    :class="{
                      'border-c-primary-600': product.checked,
                      'border-transparent': !product.checked,
                    }"
                  >
                    <div class="flex items-center gap-3">
                      <UiCheckbox v-model="product.checked" />
                      <span
                        v-if="product.status == 'published'"
                        class="px-2 py-[2px] bg-c-success-25 dark:bg-c-success-500-8 border-[1px] border-c-success-100 rounded-md text-c-success-500"
                      >
                        Опубликован
                      </span>
                      <span
                        v-if="product.status == 'draft'"
                        class="px-2 py-[2px] bg-c-warning-25 dark:bg-c-warning-500-8 border-[1px] border-c-warning-100 rounded-md text-c-warning-500"
                      >
                        Черновик
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <img :src="product.image" :alt="product.name" />
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span>{{ product.name }}</span>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm"
                    v-if="productsStore.brandTableShow"
                  >
                    {{ product.brand }}
                  </td>
                  <td
                    v-if="productsStore.skuTableShow"
                    class="relative px-6 py-4 whitespace-nowrap text-sm"
                  >
                    <span
                      @mouseenter="product.activeSkuList = true"
                      @mouseleave="product.activeSkuList = false"
                      class="cursor-pointer"
                    >
                      {{ product.sku[0] }}
                    </span>
                    <div
                      v-if="product.sku.length > 1 && product.activeSkuList"
                      class="sku-list absolute z-[30] top-[0] left-0 translate-y-[-70%] px-3 py-2 bg-c-gray-t-50 dark:bg-c-gray-t-700 rounded-md"
                    >
                      <template v-for="(sku, index) in product.sku">
                        {{ sku
                        }}<span v-if="index != product.sku.length - 1">, </span>
                      </template>
                      <div
                        class="absolute bottom-0 z-[-1] left-0 w-3 h-3 bg-c-gray-t-50 dark:bg-c-gray-t-700 rotate-[-45deg] translate-x-[12px] translate-y-[6px]"
                      ></div>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span>{{ product.warehouse }}</span>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-sm"
                    v-if="productsStore.productTypeTableShow"
                  >
                    <span>
                      {{
                        product.type == "new" ? "Новый тип продукта" : "Сток"
                      }}
                    </span>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium"
                  >
                    <NuxtLink
                      :to="`/products/${product.id}/edit`"
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
      :total-pages="totalPages"
      v-model:current-page="currentPage"
      v-model:per-page="perPage"
    />
  </div>
</template>

<style>
.sku-list {
  max-width: 275px !important;
  width: max-content !important;
  padding: 8px 12px !important;
  text-wrap: wrap !important;
  box-shadow: 0px 12px 16px -2px #1018283f !important;
}
.border-c {
  @apply border-c-gray-t-200 dark:border-c-gray-t-600;
}
.productFilterButton {
  @apply w-[44px] h-[44px] flex items-center justify-center border-[1px] rounded-md;
  @apply hover:bg-c-primary-500-8 dark:hover:bg-c-primary-500-8;
  @apply border-c-gray-t-300 dark:border-c-gray-t-500 hover:border-c-primary-500 dark:hover:border-c-primary-500;
  @apply text-c-gray-t-700 dark:text-c-gray-t-500 hover:text-c-primary-500 dark:hover:text-c-primary-500;
}
</style>
