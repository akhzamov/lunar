<script lang="ts" setup>
import { deleteProductTypeById } from "~/modules/products/components/ProductTypes/productTypes.data";
import { useAlertStore } from "~/stores/alert";
import type { IBreadcrumb } from "~/types/Others/breadcrumb.type";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Product Type | Lunar",
});

const alertStore = useAlertStore();
const route = useRoute();
const router = useRouter();
const breadcrumbs = reactive<IBreadcrumb[]>([
  { id: 1, name: "Каталог", path: "" },
  { id: 2, name: "Типы продуктов", path: "/product-types" },
  {
    id: 3,
    name: `Изменение`,
    path: `/product-types/${route.params.id}/edit`,
  },
]);

const deleteProductType = async () => {
  const id = Number(route.params.id);
  const res = await deleteProductTypeById(id);
  if (res) {
    alertStore.successAlert = {
      active: true,
      text: "Тип продукта успешно удален",
    };
    setTimeout(() => {
      alertStore.successAlert = {
        active: false,
        text: "",
      };
    }, 2500);
    router.push("/product-types");
  }
};
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div class="flex flex-col">
    <div class="flex items-center justify-between">
      <h2 class="text-30-semi">Изменение типов продукта</h2>
      <UiButton
        text="Удалить тип продукта"
        text-color="text-c-gray-t-50"
        bg-color="bg-c-error-500"
        :border-hide="true"
        hover-bg-color="bg-c-error-700"
        px="px-4"
        py="py-[10px]"
        @click="deleteProductType()"
      >
      </UiButton>
    </div>
    <ProductTypesCreateAndEdit type="edit" />
  </div>
</template>

<style scoped></style>
