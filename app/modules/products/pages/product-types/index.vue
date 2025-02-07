<script lang="ts" setup>
import type { IBreadcrumb } from "~/types/Others/breadcrumb.type";
import { useProductsStore } from "~/modules/products/stores/products";
import { getAttributeGroups } from "~/modules/attribute-groups/components/AttributeGroups/attributeGroups.data";
import { getAttributes } from "~/modules/attribute-groups/components/AttributeGroups/attributes.data";
import { useAttributeGroupsStore } from "~/modules/attribute-groups/stores/attributeGroups";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Product Types | Lunar",
});
const productsStore = useProductsStore();
const attrGsStore = useAttributeGroupsStore();
const router = useRouter();
const breadcrumbs = reactive<IBreadcrumb[]>([
  { id: 1, name: "Каталог", path: "" },
  { id: 2, name: "Типы продуктов", path: "/product-types" },
]);
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="flex flex-col">
    <!-- Product Types title and btn -->
    <div class="flex items-center justify-between">
      <h2 class="text-30-semi">Типы продуктов</h2>
      <UiButton
        text="Новый тип продукта"
        text-color="text-c-gray-t-50"
        bg-color="bg-c-primary-600"
        :border-hide="true"
        hover-bg-color="bg-c-primary-700"
        px="px-4"
        py="py-[10px]"
        @click="router.push('/product-types/create')"
      >
      </UiButton>
    </div>
    <!-- Product Types table -->
    <ProductTypesTable />
  </div>
</template>

<style scoped></style>
