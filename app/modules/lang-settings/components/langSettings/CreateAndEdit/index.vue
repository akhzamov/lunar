<script lang="ts" setup>
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import {
  createLanguage,
  getLanguageById,
  updateLanguageById,
} from "../langSettings.data";
import { useAlertStore } from "~/stores/alert";
import { useLangSettingsStore } from "~/stores/langSettings";

const props = withDefaults(
  defineProps<{
    type: string;
  }>(),
  {}
);
const alertStore = useAlertStore();
const langStStore = useLangSettingsStore();
const router = useRouter();
const route = useRoute();
const schema = yup.object({
  name: yup.string().required("Введите название языкаы"),
  code: yup
    .string()
    .required("Введите код")
    .min(2, "Код языка состоит из двух символов")
    .max(2, "Код языка состоит из двух символов"),
  defaultLang: yup.boolean(),
});
interface ISchemaForm {
  name: string;
  code: string;
  defaultLang: boolean;
}
const initialValues: ISchemaForm = {
  name: "",
  code: "",
  defaultLang: false,
};
const { handleSubmit } = useForm<ISchemaForm>({
  validationSchema: schema,
  initialValues,
});
const { value: name, errorMessage: nameError } = useField<string>("name");
const { value: code, errorMessage: codeError } = useField<string>("code");
const { value: defaultLang } = useField<boolean>("defaultLang");

const onSubmit = handleSubmit(async (values) => {
  try {
    const body = {
      name: values.name,
      code: values.code,
      default: values.defaultLang ? 1 : 0,
    };

    return props.type == "edit"
      ? await updateLanguageById(Number(route.params.id), body)
      : await createLanguage(body);
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
const createLang = () =>
  handleAction({
    successMessage: "Язык успешно создан",
    redirectCallback: () => router.push("/lang-settings"),
  });
const createAndReopenLang = () =>
  handleAction({
    successMessage: "Язык успешно создан",
    redirectCallback: () => router.go(1),
  });
const editLanguage = () =>
  handleAction({
    successMessage: "Язык успешно изменен",
    redirectCallback: () => router.push("/lang-settings"),
  });

onMounted(async () => {
  if (props.type == "edit") {
    await getLanguageById(Number(route.params.id));
    if (langStStore.languageId) {
      name.value = langStStore.languageId.name;
      code.value = langStStore.languageId.code;
      defaultLang.value = langStStore.languageId.default == 1 ? true : false;
    }
  }
});
</script>

<template>
  <div
    class="h-max b-bg rounded-xl mt-6 select-none p-6 border border-c"
    v-if="
      props.type === 'create' ||
      (props.type === 'edit' && langStStore.languageId)
    "
  >
    <form class="relative" @submit.prevent>
      <div class="w-full h-max flex items-start justify-between gap-6">
        <div class="w-[49%] h-full flex flex-col items-start gap-2 mt-3 z-[90]">
          <p>Язык<span class="text-c-error-500">*</span></p>
          <UiInputBase
            v-model:model-value="name"
            placeholder="Русский"
            type="text"
            class="w-full h-[44px]"
          />
          <span v-if="nameError" class="text-sm text-c-error-500">
            {{ nameError }}
          </span>
        </div>
        <div class="w-[49%] h-full flex flex-col items-start gap-2 mt-3 z-[90]">
          <p>Код <span class="text-c-error-500">*</span></p>
          <UiInputBase
            v-model:model-value="code"
            placeholder="ru"
            type="text"
            class="w-full h-[44px]"
          />
          <span v-if="codeError" class="text-sm text-c-error-500">
            {{ codeError }}
          </span>
        </div>
      </div>
      <div class="w-full flex items-center justify-start mt-6">
        <div class="w-max flex items-center gap-2">
          <UiToggle v-model:model-value="defaultLang" />
          <p>Основной</p>
        </div>
      </div>
      <div class="flex items-center justify-end gap-3 mt-6">
        <UiButton
          v-if="props.type == 'create'"
          @click="createLang"
          bgColor="bg-c-primary-500"
          hoverBgColor="bg-c-primary-600"
          text="Создать"
          py="py-2"
          px="px-3"
        />
        <UiButton
          v-if="props.type == 'edit'"
          @click="editLanguage"
          bgColor="bg-c-primary-500"
          hoverBgColor="bg-c-primary-600"
          text="Изменить"
          py="py-2"
          px="px-3"
        />
        <UiButton
          v-if="props.type == 'create'"
          @click="createAndReopenLang"
          hoverBgColor="bg-c-gray-t-100 dark:bg-c-gray-t-700"
          text="Создать и открыть новое"
          py="py-2"
          px="px-3"
        />
        <UiButton
          @click="router.push('/lang-settings')"
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
