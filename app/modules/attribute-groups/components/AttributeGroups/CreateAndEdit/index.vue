<script lang="ts" setup>
import { useProductsStore } from "~/modules/products/stores/products";
import { useAttributeGroupsStore } from "~/modules/attribute-groups/stores/attributeGroups";
import {
  createAttributeGroup,
  getAttributeGroupById,
  getAttributeGroups,
  updateAttributeGroupById,
} from "~/modules/attribute-groups/components/AttributeGroups/attributeGroups.data";
import { attributeGroupTypes } from "./create.data";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { useMainStore } from "~/stores/main";
import { useAlertStore } from "~/stores/alert";

const props = withDefaults(
  defineProps<{
    type: string;
  }>(),
  {}
);

const { $debounce, $toHandle } = useNuxtApp();
const attrGsStore = useAttributeGroupsStore();
const mainStore = useMainStore();
const alertStore = useAlertStore();
const router = useRouter();
const route = useRoute();
const typesMenu = ref(false);

const schema = yup.object({
  selectedType: yup.string().required("Выберите тип"),
  name: yup
    .object()
    .test("all-languages-filled", "Заполните все языковые поля", (value) => {
      if (!value) return false;
      const requiredLanguages = mainStore.langs;
      const hasAllKeys = requiredLanguages.every((lang) => lang in value);
      const allFilled = Object.values(value).every(
        (val) => typeof val === "string" && val.trim() !== ""
      );
      return hasAllKeys && allFilled;
    })
    .required("Заполните все языковые поля"),
  handle: yup.string().required("Введите предлог"),
  position: yup.number().required("Введите позицию"),
});
interface ISchemaForm {
  selectedType: string;
  name: Record<string, string>;
  handle: string;
  position: number;
}
const initialValues: ISchemaForm = {
  selectedType: "",
  name: mainStore.langs.reduce((acc, lang) => ({ ...acc, [lang]: "" }), {}),
  handle: "",
  position: null as unknown as number,
};
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
  initialValues,
  validateOnMount: false,
});
const { value: selectedType, errorMessage: selectedTypeError } =
  useField<string>("selectedType");
const { value: name, errorMessage: nameError } =
  useField<Record<string, string>>("name");
const { value: handle, errorMessage: handleError } = useField<string>("handle");
const { value: position, errorMessage: positionError } =
  useField<number>("position");

const updateNameStructure = () => {
  const newName: Record<string, string> = {};
  mainStore.langs.forEach((lang) => {
    newName[lang] = "";
  });
  name.value = newName;
};

const onSubmit = handleSubmit(async (values) => {
  console.log("Submitted:", values);
  try {
    const body: any = {
      attributableType: values.selectedType,
      position: values.position,
      name: values.name,
    };
    if (props.type !== "edit") {
      body.handle = values.handle;
    }
    return props.type == "edit"
      ? await updateAttributeGroupById(Number(route.params.id), body)
      : await createAttributeGroup(body);
  } catch (error) {}
});
const handleAction = async ({
  successMessage,
  redirectCallback,
}: {
  successMessage: string;
  redirectCallback: () => void;
}) => {
  const res = await onSubmit();
  if (res?.data) {
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

watch(
  name,
  $debounce(() => {
    if (name.value && handle.value !== attrGsStore.attributeGroup?.handle) {
      setTimeout(() => {
        const firstValue = Object.values(name.value)[0] || "";
        handle.value = $toHandle(firstValue);
      }, 500);
    } else if (handle.value !== attrGsStore.attributeGroup?.handle) {
      handle.value = "";
    }
  }, 500),
  { deep: true }
);

onMounted(async () => {
  if (props.type == "edit") {
    await getAttributeGroupById(Number(route.params.id));
    if (attrGsStore.attributeGroup) {
      name.value = attrGsStore.attributeGroup.name;
      selectedType.value = attrGsStore.attributeGroup.attributable_type;
      handle.value = attrGsStore.attributeGroup.handle;
      position.value = attrGsStore.attributeGroup.position;
    }
  }
});
</script>

<template>
  <div class="h-max b-bg rounded-xl mt-6 select-none p-6 border border-c">
    <form class="relative" @submit.prevent>
      <div class="flex flex-col items-start gap-2 mt-3 z-[50]">
        <p>Тип <span class="text-c-error-500">*</span></p>
        <UiSelect
          :array="attributeGroupTypes"
          :show-menu="typesMenu"
          default-select-text="Выбрать тип"
          v-model:model-value="selectedType"
          :icon="false"
          value-key="value"
          label-key="name"
          @update:model-value="selectedType = $event"
          @update:show-menu="typesMenu = $event"
          :text-center="false"
          :disable="false"
          menu-open-position="bottom"
          class="w-full flex-grow h-[44px] z-[100]"
        />
        <span v-if="selectedTypeError" class="text-sm text-c-error-500">
          {{ selectedTypeError }}
        </span>
      </div>
      <div class="flex flex-col items-start gap-2 mt-3 z-[90]">
        <p>Имя<span class="text-c-error-500">*</span></p>
        <UiInputBase
          v-if="mainStore.langs.length == 1"
          v-model:model-value="name[mainStore.langs[0]!]"
          type="text"
          class="w-full h-[44px]"
        />
        <UiInputTranslated
          v-else
          v-model:model-value="name"
          @update:model-value="name = $event"
          :langs="mainStore.langs"
          type="text"
          class="w-full h-[44px]"
        />
        <span v-if="nameError" class="text-sm text-c-error-500">
          {{ nameError }}
        </span>
      </div>
      <div
        class="flex flex-col items-start gap-2 mt-3 z-[90]"
        v-if="props.type !== 'edit'"
      >
        <p>Предлог <span class="text-c-error-500">*</span></p>
        <UiInputBase
          v-model:model-value="handle"
          type="text"
          class="w-full h-[44px]"
        />
        <span v-if="handleError" class="text-sm text-c-error-500">
          {{ handleError }}
        </span>
      </div>
      <div class="flex flex-col items-start gap-2 mt-3 z-[90]">
        <p>Позиция</p>
        <UiInputBase
          v-model:model-value="position"
          type="number"
          class="w-full h-[44px]"
        />
        <span v-if="positionError" class="text-sm text-c-error-500">
          {{ positionError }}
        </span>
      </div>
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
</template>

<style>
.border-c {
  @apply border-c-gray-t-200 dark:border-c-gray-t-600;
}
</style>
