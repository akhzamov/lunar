<script lang="ts" setup>
import * as yup from "yup";
import { useForm, useField } from "vee-validate";
import { useAttributesStore } from "~/modules/attribute-groups/stores/attributes";
import { attributeTypes } from "./create.data";
import { useLangSettingsStore } from "~/stores/langSettings";
import { useAlertStore } from "~/stores/alert";
import type { ICreateAttributeBody } from "~/modules/attribute-groups/types/attributes.type";
import {
  createAttribute,
  getAttributeById,
  getAttributes,
  updateAttributeById,
} from "../../attributes.data";

const { $debounce, $toHandle } = useNuxtApp();
const attrStore = useAttributesStore();
const langStore = useLangSettingsStore();
const alertStore = useAlertStore();
const route = useRoute();
const router = useRouter();
const typesMenu = ref(false);
let dropdownValues = reactive([
  {
    id: 1,
    name: "",
    value: "",
  },
]);
const richText = ref(false);
const min = ref<null | number>(null);
const max = ref<null | number>(null);

const schema = yup.object({
  name: yup.string().required("Введите имя атрибута"),
  description: yup.string(),
  handle: yup.string().required("Введите предлог"),
  searchable: yup.boolean(),
  filtrable: yup.boolean(),
  required: yup.boolean(),
  selectedType:
    attrStore.attributeCreateAndEditModalType == "edit"
      ? yup.string()
      : yup.string().required("Выберите тип для атрибута"),
});
interface ISchemaForm {
  name: string;
  description: string;
  handle: string;
  searchable: boolean;
  filtrable: boolean;
  required: boolean;
  selectedType: string;
}
const initialValues: ISchemaForm = {
  name: "",
  description: "",
  handle: "",
  searchable: false,
  filtrable: false,
  required: false,
  selectedType: "",
};
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
  initialValues,
  validateOnMount: false,
});
const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: description, errorMessage: descriptionError } =
  useField<string>("description");
const { value: handle, errorMessage: handleError } = useField<string>("handle");
const { value: searchable, errorMessage: searchableError } =
  useField<boolean>("searchable");
const { value: filtrable, errorMessage: filtrableError } =
  useField<boolean>("filtrable");
const { value: required, errorMessage: requiredError } =
  useField<boolean>("required");
const { value: selectedType, errorMessage: selectedTypeError } =
  useField<string>("selectedType");

const handleCloseProductsModal = () => {
  attrStore.attributeCreateAndEditModal = false;
  attrStore.attributeCreateAndEditModalEditId = null;
  attrStore.attributeCreateAndEditModalType = "";
  document.body.style.overflow = "auto";
};
const onSubmit = handleSubmit(async (values) => {
  const nameBody: Record<string, string> | undefined =
    langStore.languages?.reduce((acc, lang) => {
      acc[lang.code] = lang.default === 1 ? values.name : "";
      return acc;
    }, {} as Record<string, string>);

  const description: Record<string, string> | undefined =
    langStore.languages?.reduce((acc, lang) => {
      acc[lang.code] = lang.default === 1 ? values.description : "";
      return acc;
    }, {} as Record<string, string>);
  const body: ICreateAttributeBody = {
    handle: values.handle,
    searchable: values.searchable,
    filterable: values.filtrable,
    required: values.required,
    type: values.selectedType,
    attributeGroupId: Number(route.params.id),
    configuration: {
      type: values.selectedType,
    },
    name: nameBody ?? {},
    description: description ?? {},
  };

  if (values.selectedType == "dropdown") {
    body.configuration.values = dropdownValues;
  } else if (
    values.selectedType == "text" ||
    values.selectedType == "translated_text"
  ) {
    body.configuration.values = {
      richtext: richText.value,
    };
  } else if (values.selectedType == "number") {
    body.configuration.values = {
      min: min.value ? min.value : null,
      max: max.value ? max.value : null,
    };
  }

  try {
    let attrId = attrStore.attributeCreateAndEditModalEditId?.toString() || "";
    return attrStore.attributeCreateAndEditModalType == "edit"
      ? await updateAttributeById(attrId, body)
      : await createAttribute(body);
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
const createAttr = async () => {
  await handleAction({
    successMessage: "Атрибут создан успешно",
    redirectCallback: () =>
      router.push(`/attribute-groups/${route.params.id}/edit`),
  });
  let id = route.params.id as string;
  await getAttributes(id);
  handleCloseProductsModal();
};
const createAndReopenAttr = () => {
  handleAction({
    successMessage: "Атрибут создан успешно",
    redirectCallback: () => router.go(1),
  });
};
const editAttr = async () => {
  await handleAction({
    successMessage: "Атрибут изменен успешно",
    redirectCallback: () => router.go(1),
  });
  let id = route.params.id as string;
  await getAttributes(id);
  handleCloseProductsModal();
};

watch(
  name,
  $debounce(() => {
    if (name.value && handle.value !== attrStore.attribute?.handle) {
      setTimeout(() => {
        handle.value = $toHandle(name.value);
      }, 500);
    } else if (handle.value !== attrStore.attribute?.handle) {
      handle.value = "";
    }
  }, 500),
  { deep: true }
);

onMounted(async () => {
  if (
    attrStore.attributeCreateAndEditModalType == "edit" &&
    attrStore.attributeCreateAndEditModalEditId
  ) {
    const res = await getAttributeById(
      attrStore.attributeCreateAndEditModalEditId
    );
    if (res?.data) {
      const defaultLanguage: string | undefined = langStore.languages?.find(
        (language) => language.default === 1
      )?.code;
      name.value = res.data.name[defaultLanguage ?? "en"] ?? "";
      description.value = res.data.description[defaultLanguage ?? "en"] ?? "";
      handle.value = res.data.handle;
      searchable.value = res.data.searchable == 1 ? true : false;
      filtrable.value = res.data.filterable == 1 ? true : false;
      required.value = res.data.required == 1 ? true : false;
      selectedType.value = res.data.type;
      const values = res.data.configuration.values;
      if (res.data.type === "text" || res.data.type === "translated_text") {
        if (values && "richtext" in values) {
          richText.value = values.richtext ?? false;
        }
      }
      if (res.data.type === "number") {
        if (values && "min" in values && values && "max" in values) {
          min.value = values.min ?? null;
          max.value = values.max ?? null;
        }
      }
      if (res.data.type === "dropdown") {
        if (values && typeof values == "object") {
          dropdownValues = [
            ...(values as {
              id: number;
              name: string;
              value: string;
            }[]),
          ];
        }
      }
    }
  }
});
</script>

<template>
  <div
    @click="handleCloseProductsModal()"
    class="fixed inset-0 z-[1000] bg-c-gray-t-450-60 p-4 overflow-y-auto min-h-screen flex justify-center"
  >
    <form
      @submit.prevent
      @click.stop
      class="w-[890px] h-max b-border-300 b-bg rounded-lg p-6"
    >
      <div class="flex items-center justify-between">
        <h4 class="text-white">
          {{
            attrStore.attributeCreateAndEditModalType == "edit"
              ? "Изменить"
              : "Создать"
          }}
          атрибут
        </h4>
        <UiButton
          @click="handleCloseProductsModal"
          hoverBgColor="bg-c-gray-t-100 dark:bg-c-gray-t-700"
          p="p-1"
          text=""
        >
          <template v-slot:icon>
            <IconXClose />
          </template>
        </UiButton>
      </div>
      <div class="flex items-center justify-between gap-6 mt-6">
        <div class="w-full flex flex-col gap-3">
          <label>
            Имя
            <span class="text-c-error-500">*</span>
          </label>
          <UiInputBase v-model="name" />
          <span v-if="nameError" class="text-sm text-c-error-500">
            {{ nameError }}
          </span>
        </div>
        <div class="w-full flex flex-col gap-3">
          <label> Описание </label>
          <UiInputBase v-model="description" />
        </div>
      </div>
      <div class="flex items-center justify-between gap-6 mt-6">
        <div class="w-full flex flex-col gap-3">
          <label>
            Предлог
            <span class="text-c-error-500">*</span>
          </label>
          <UiInputBase v-model="handle" />
          <span v-if="handleError" class="text-sm text-c-error-500">
            {{ handleError }}
          </span>
        </div>
        <div class="w-full"></div>
      </div>
      <div class="w-full flex items-center justify-between gap-6 mt-6">
        <div class="w-full flex items-center justify-start gap-3">
          <UiToggle v-model:modelValue="searchable" />
          <label> Поисковой </label>
        </div>
        <div class="w-full flex items-center justify-start gap-3">
          <UiToggle v-model:modelValue="filtrable" />
          <label> Фильтруемый </label>
        </div>
        <div class="w-full flex items-center justify-start gap-3">
          <UiToggle v-model:modelValue="required" />
          <label> Обязательный </label>
        </div>
      </div>
      <div class="flex items-center justify-between gap-6 mt-6">
        <div class="relative w-full flex flex-col gap-3">
          <label>
            Тип атрибута
            <span class="text-c-error-500">*</span>
          </label>
          <UiSelect
            :array="attributeTypes"
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
            class="w-full flex-grow h-[44px] z-[2000]"
          />
          <span v-if="selectedTypeError" class="text-sm text-c-error-500">
            {{ selectedTypeError }}
          </span>
        </div>
        <div class="w-full"></div>
      </div>
      <div
        class="flex items-center justify-between gap-6 mt-6"
        v-if="selectedType == 'dropdown'"
      >
        <div class="w-full flex flex-col gap-3">
          <label> Данные dropdown </label>
          <UiLookups v-model:modelValue="dropdownValues" />
        </div>
      </div>
      <div
        class="w-full flex items-center justify-between gap-6 mt-6"
        v-if="selectedType == 'text' || selectedType == 'translated_text'"
      >
        <div class="w-full flex items-center justify-start gap-3">
          <UiToggle v-model:modelValue="richText" />
          <label> Форматируемый текст </label>
        </div>
      </div>
      <div
        class="w-full flex items-center justify-between gap-6 mt-6"
        v-if="selectedType == 'number'"
      >
        <div class="w-full flex flex-col items-start gap-3">
          <label> Мин. </label>
          <UiInputBase v-model:modelValue="min" type="number" class="w-full" />
        </div>
        <div class="w-full flex flex-col items-start gap-3">
          <label> Макс. </label>
          <UiInputBase v-model:modelValue="max" type="number" class="w-full" />
        </div>
      </div>
      <div class="w-full flex items-center justify-between">
        <div class="flex items-center justify-start gap-3 mt-6">
          <UiButton
            @click="createAttr()"
            v-if="attrStore.attributeCreateAndEditModalType == 'new'"
            bgColor="bg-c-primary-500"
            hoverBgColor="bg-c-primary-600"
            text="Создать"
            py="py-2"
            px="px-3"
          />
          <UiButton
            @click="createAndReopenAttr()"
            v-if="attrStore.attributeCreateAndEditModalType == 'new'"
            hoverBgColor="bg-c-gray-t-100 dark:bg-c-gray-t-700"
            text="Создать и открыт новое"
            py="py-2"
            px="px-3"
          />
          <UiButton
            @click="editAttr()"
            v-if="attrStore.attributeCreateAndEditModalType == 'edit'"
            bgColor="bg-c-primary-500"
            hoverBgColor="bg-c-primary-600"
            text="Изменить"
            py="py-2"
            px="px-3"
          />
          <UiButton
            @click="handleCloseProductsModal"
            hoverBgColor="bg-c-gray-t-100 dark:bg-c-gray-t-700"
            text="Отмена"
            py="py-2"
            px="px-3"
          />
        </div>
        <div
          class="flex items-center justify-start gap-3 mt-6"
          v-if="attrStore.attributeCreateAndEditModalType == 'edit'"
        >
          <UiButton
            @click="handleCloseProductsModal"
            bgColor="bg-c-error-500"
            hoverBgColor="bg-c-error-600"
            text="Удалить"
            py="py-2"
            px="px-3"
          >
            <template v-slot:icon>
              <IconTrash01 class="text-white" />
            </template>
          </UiButton>
        </div>
      </div>
    </form>
  </div>
</template>

<style scoped></style>
