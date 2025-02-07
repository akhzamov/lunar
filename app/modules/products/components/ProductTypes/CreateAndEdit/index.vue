<script lang="ts" setup>
import { useProductsStore } from "~/modules/products/stores/products";
import { useAttributeGroupsStore } from "~/modules/attribute-groups/stores/attributeGroups";
import {
  createAttributeGroup,
  getAttributeGroupById,
  getAttributeGroups,
  updateAttributeGroupById,
} from "~/modules/attribute-groups/components/AttributeGroups/attributeGroups.data";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useMainStore } from "~/stores/main";
import { useAlertStore } from "~/stores/alert";
import { getProductTypeById } from "../productTypes.data";
import { getAttributes } from "~/modules/attribute-groups/components/AttributeGroups/attributes.data";
import { useAttributesStore } from "~/modules/attribute-groups/stores/attributes";
import { useProductTypesStore } from "~/modules/products/stores/productTypes";
import { useLangSettingsStore } from "~/stores/langSettings";

const props = withDefaults(
  defineProps<{
    type: string;
  }>(),
  {}
);

const { $debounce, $toHandle } = useNuxtApp();
const attrGsStore = useAttributeGroupsStore();
const attStore = useAttributesStore();
const mainStore = useMainStore();
const alertStore = useAlertStore();
const langStore = useLangSettingsStore();
const productTypesStore = useProductTypesStore();
const router = useRouter();
const route = useRoute();
const typesMenu = ref(false);
const productTypesVariants = ref(false);
const defaultLanguage =
  langStore.languages?.find((language) => language.default === 1)?.code || "en";
const attrGroupProductId = computed(() => {
  return attrGsStore.attributeGroups
    ? attrGsStore.attributeGroups
        .find((item) => item.attributable_type == "product")
        ?.id.toString() || ""
    : "";
});
const attrGroupVariantId = computed(() => {
  return attrGsStore.attributeGroups
    ? attrGsStore.attributeGroups
        .find((item) => item.attributable_type == "product_variant")
        ?.id.toString() || ""
    : "";
});
const productTypeTitle = computed(() => {
  if (!attrGsStore.attributeGroups) {
    return "";
  }

  const attributableType = productTypesVariants.value
    ? "product_variant"
    : "product";

  const attributeGroup = attrGsStore.attributeGroups.find(
    (item) => item.attributable_type === attributableType
  );

  return attributeGroup?.name?.[defaultLanguage] || "";
});

const schema = yup.object({
  name: yup.string().required("Введите имя"),
  products: yup.array(),
  variants: yup.array(),
});
interface ISchemaForm {
  name: string;
  products: Set<number>;
  variants: Set<number>;
}
const initialValues: ISchemaForm = {
  name: "",
  products: new Set(),
  variants: new Set(),
};
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
  initialValues,
  validateOnMount: false,
});
const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: products, errorMessage: productsError } =
  useField<Set<number>>("products");
const { value: variants, errorMessage: variantsError } =
  useField<Set<number>>("variants");

const onSubmit = handleSubmit(async (values) => {
  console.log("Submitted:", values);
});

const handleAction = async ({
  successMessage,
  redirectCallback,
}: {
  successMessage: string;
  redirectCallback: () => void;
}) => {
  const res = await onSubmit();
  if (res) {
    alertStore.successAlert = {
      active: true,
      text: successMessage,
    };
    setTimeout(() => {
      alertStore.successAlert = {
        active: false,
        text: "",
      };
    }, 2500);
    redirectCallback();
  }
};
const createAttribute = () =>
  handleAction({
    successMessage: "Группа атрибутов создана успешно",
    redirectCallback: () => router.push("/attribute-groups"),
  });
const createAndReopenAttribute = () =>
  handleAction({
    successMessage: "Группа атрибутов создана успешно",
    redirectCallback: () => router.go(1),
  });
const editAttribute = () =>
  handleAction({
    successMessage: "Группа атрибутов изменена успешно",
    redirectCallback: () => router.go(1),
  });

const itemCheck = (
  id: number,
  checked: boolean,
  type: "products" | "variants"
) => {
  if (type == "products") {
    if (checked) {
      products.value.add(id);
    } else {
      products.value.delete(id);
    }
  } else {
    if (checked) {
      variants.value.add(id);
    } else {
      variants.value.delete(id);
    }
  }
};

onMounted(async () => {
  if (props.type == "edit") {
    await getProductTypeById(Number(route.params.id));
    name.value = productTypesStore.productType?.name ?? "";
  }
  await getAttributeGroups();
  if (attrGsStore.attributeGroups) {
    productTypesStore.productAttributes = [];
    productTypesStore.variantsAttributes = [];
    attrGsStore.attributeGroups.forEach(async (item) => {
      if (item.attributable_type == "product") {
        const res = await getAttributes(item.id.toString());
        productTypesStore.productType?.product_attributes.forEach((type) => {
          res?.forEach((item) => {
            if (item.id == type.id) {
              item.checked = true;
              products.value.add(item.id);
            }
          });
        });
        const attributes = {
          title: item.name[defaultLanguage] ?? "",
          attributes: res ?? [],
        };
        productTypesStore.productAttributes.push(attributes);
      } else if (item.attributable_type == "product_variant") {
        const res = await getAttributes(item.id.toString());
        productTypesStore.productType?.product_attributes.forEach((type) => {
          res?.forEach((item) => {
            if (item.id == type.id) {
              item.checked = true;
              variants.value.add(item.id);
            }
          });
        });
        const attributes = {
          title: item.name[defaultLanguage] ?? "",
          attributes: res ?? [],
        };
        productTypesStore.variantsAttributes.push(attributes);
      }
    });
  }
});
</script>

<template>
  <div
    class="h-max b-bg rounded-xl mt-6 select-none p-6 border border-c"
    v-if="(productTypesStore.productType && type == 'edit') || true"
  >
    <form class="relative" @submit.prevent>
      <div class="flex flex-col items-start gap-2 mt-3 z-[90]">
        <p>Имя<span class="text-c-error-500">*</span></p>
        <UiInputBase
          v-model:model-value="name"
          type="text"
          class="w-full h-[44px]"
        />
        <span v-if="nameError" class="text-sm text-c-error-500">
          {{ nameError }}
        </span>
      </div>
    </form>
  </div>
  <div
    class="h-max b-bg rounded-xl mt-6 select-none p-6 border border-c"
    v-if="
      (attrGsStore.attributeGroups &&
        productTypesStore.productAttributes &&
        productTypesStore.variantsAttributes &&
        productTypesStore.productType &&
        type == 'edit') ||
      (attrGsStore.attributeGroups &&
        productTypesStore.productAttributes &&
        productTypesStore.variantsAttributes)
    "
  >
    <form class="relative" @submit.prevent>
      <div class="flex items-center justify-start gap-2 mt-3 z-[90]">
        <div
          @click="productTypesVariants = false"
          class="h-[44px] flex items-center justify-center px-2 rounded-xl cursor-pointer"
          :class="[
            !productTypesVariants
              ? 'bg-c-gray-100 dark:bg-c-gray-t-700 text-c-primary-500'
              : 'bg-transparent',
          ]"
        >
          Атрибуты продуктов
        </div>
        <div
          @click="productTypesVariants = true"
          class="h-[44px] flex items-center justify-center px-2 rounded-xl cursor-pointer"
          :class="[
            productTypesVariants
              ? 'bg-c-gray-100 dark:bg-c-gray-t-700 text-c-primary-500'
              : 'bg-transparent',
          ]"
        >
          Атрибуты вариантов
        </div>
      </div>
      <template v-if="!productTypesVariants">
        <div
          v-for="attribute in productTypesStore.productAttributes"
          class="w-full flex flex-col items-start justify-center border border-c rounded-xl mt-6 p-6"
        >
          <div class="flex items-center justify-start gap-2 z-[90]">
            <h2 class="text-xl">{{ attribute.title }}</h2>
          </div>
          <div
            class="w-full flex flex-col items-center justify-start gap-4 mt-8 z-[90]"
          >
            <div
              v-for="item in attribute.attributes"
              @click="
                item.checked = !item.checked;
                itemCheck(item.id, item.checked, 'products');
              "
              class="w-full h-[44px] flex items-center justify-start gap-4 px-4 rounded-lg b-bg border border-c"
            >
              <UiCheckbox
                v-model:model-value="item.checked"
                @click="itemCheck(item.id, item.checked, 'products')"
              />
              <span>{{ item.name[defaultLanguage] }}</span>
            </div>
          </div>
        </div>
      </template>
      <template v-if="productTypesVariants">
        <div
          v-for="attribute in productTypesStore.variantsAttributes"
          class="w-full flex flex-col items-start justify-center border border-c rounded-xl mt-6 p-6"
        >
          <div class="flex items-center justify-start gap-2 z-[90]">
            <h2 class="text-xl">{{ attribute.title }}</h2>
          </div>
          <div
            class="w-full flex flex-col items-center justify-start gap-4 mt-8 z-[90]"
          >
            <div
              v-for="item in attribute.attributes"
              @click="
                item.checked = !item.checked;
                itemCheck(item.id, item.checked, 'products');
              "
              class="w-full h-[44px] flex items-center justify-start gap-4 px-4 rounded-lg b-bg border border-c"
            >
              <UiCheckbox
                v-model:model-value="item.checked"
                @click="itemCheck(item.id, item.checked, 'products')"
              />
              <span>{{ item.name[defaultLanguage] }}</span>
            </div>
            <span v-if="attribute.attributes.length == 0">
              Создайте атрибуты
            </span>
          </div>
        </div>
      </template>
      <div class="flex items-center justify-end gap-3 mt-6">
        <UiButton
          v-if="props.type == 'create'"
          @click="createAttribute"
          bgColor="bg-c-primary-500"
          hoverBgColor="bg-c-primary-600"
          text="Создать"
          py="py-2"
          px="px-3"
        />
        <UiButton
          v-if="props.type == 'edit'"
          @click="editAttribute"
          bgColor="bg-c-primary-500"
          hoverBgColor="bg-c-primary-600"
          text="Изменить"
          py="py-2"
          px="px-3"
        />
        <UiButton
          v-if="props.type == 'create'"
          @click="createAndReopenAttribute"
          hoverBgColor="bg-c-gray-t-100 dark:bg-c-gray-t-700"
          text="Создать и открыть новое"
          py="py-2"
          px="px-3"
        />
        <UiButton
          @click="router.push('/attribute-groups')"
          hoverBgColor="bg-c-gray-t-100 dark:bg-c-gray-t-700"
          text="Отмена"
          py="py-2"
          px="px-3"
        />
      </div>
    </form>
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
