<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    modelValue: { id: number; name: string; value: string }[];
  }>(),
  {}
);

const emit = defineEmits(["update:modelValue"]);
let values = reactive<{ id: number; name: string; value: string }[]>(
  props.modelValue
);
const addValue = () => {
  const lastItem = values.at(-1);
  const newId = lastItem ? lastItem.id + 1 : 1;
  values.push({
    id: newId,
    name: "",
    value: "",
  });
};
const removeValue = (id: number) => {
  const index = values.findIndex((item) => item.id === id);
  if (index !== -1) {
    values.splice(index, 1);
  }
};

watch(
  values,
  (newValues) => {
    emit("update:modelValue", newValues);
  },
  { deep: true }
);
</script>

<template>
  <div class="relative w-full h-max z-10 b-bg border b-border rounded-xl">
    <div
      class="w-full h-[44px] flex items-center border-b border-c-gray-t-200 dark:border-c-gray-t-600 pl-[40px]"
    >
      <div class="w-[45%] h-full flex items-center justify-start">
        <p>Ключ</p>
      </div>
      <div class="w-[45%] h-full flex items-center justify-start">
        <p>Значение</p>
      </div>
      <div class="w-[10%] h-full flex items-center justify-start"></div>
    </div>
    <div
      class="w-full h-[72px] flex items-center border-b pl-[40px]"
      :class="[
        values.length == index + 1
          ? 'border-transparent'
          : 'border-c-gray-t-200 dark:border-c-gray-t-600',
      ]"
      v-for="(item, index) in values"
      :key="item.id"
    >
      <div class="w-[45%] h-full pr-4 py-4">
        <UiInputBase v-model:model-value="item.name" class="w-full" />
      </div>
      <div class="w-[45%] h-full pr-4 py-4">
        <UiInputBase v-model:model-value="item.value" class="w-full" />
      </div>
      <div class="w-[10%] h-full flex items-center justify-center">
        <button
          class="w-full h-full flex items-center justify-center cursor-pointer"
          @click="removeValue(item.id)"
        >
          <IconTrash01 class="text-c-error-500" />
        </button>
      </div>
    </div>
    <div
      class="w-full h-[60px] flex items-center justify-center border-t border-c-gray-t-200 dark:border-c-gray-t-600 cursor-pointer"
      @click="addValue()"
    >
      <IconPlus />
      <p>Добавить строку</p>
    </div>
  </div>
</template>
<style scoped></style>
