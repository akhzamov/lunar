<script lang="ts" setup>
import { useMainStore } from "~/stores/main";

defineComponent({
  name: "UiInput",
});
const props = withDefaults(
  defineProps<{
    modelValue: Record<string, string>;
    langs: string[];
    type?: string;
  }>(),
  {
    type: "text",
  }
);

const mainStore = useMainStore();
const inputActive = ref(false);
const emit = defineEmits(["update:modelValue"]);

const onInput = (event: Event, lang: string) => {
  const target = event.target as HTMLInputElement;
  const updatedValue = { ...props.modelValue, [lang]: target.value };
  emit("update:modelValue", updatedValue);
};
</script>

<template>
  <div class="h-max flex flex-col gap-4">
    <div
      class="w-full flex items-center gap-2"
      v-for="(lang, index) in langs"
      :key="index"
    >
      <p
        class="w-[52px] h-[44px] flex items-center justify-center rounded-md bg-c-primary-50 dark:bg-c-gray-t-700 text-c-primary-700 dark:text-c-gray-t-50"
      >
        {{ lang.toUpperCase() }}
      </p>
      <input
        :value="props.modelValue[lang]"
        @input="onInput($event, lang)"
        :type="props.type"
        class="b-bg flex-grow h-[44px] rounded-lg px-[8px] outline-none"
        :class="[
          { 'border-[1px] border-c-primary-500': inputActive },
          { 'b-border-300': !inputActive },
        ]"
        @focusin="inputActive = true"
        @focusout="inputActive = false"
      />
    </div>
  </div>
</template>

<style scoped></style>
