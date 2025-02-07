<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    array: Record<string, any>[] | any[] | Record<string, any>;
    showMenu: boolean;
    defaultSelectText: string;
    modelValue: any;
    icon: boolean;
    valueKey: string;
    labelKey: string;
    textCenter: boolean;
    disable: boolean;
    menuOpenPosition: "top" | "bottom";
  }>(),
  {
    array: () => [],
    defaultSelectText: "",
    icon: false,
    texCenter: false,
    menuOpenPosition: "bottom",
  }
);
const emit = defineEmits([
  "update:modelValue",
  "update:showMenu",
  "click:selectItem",
]);

const selectedItemId = ref(props.modelValue);
const selectedItemName = ref(props.defaultSelectText);

const isArray = (data: unknown): data is any[] => Array.isArray(data);

const getArrayFromProps = () => {
  return isArray(props.array) ? props.array : Object.values(props.array);
};

const selectItem = (id: number | string, name: string) => {
  emit("update:modelValue", id);
  emit("click:selectItem", id);
  emit("update:showMenu", false);
  selectedItemId.value = id;
  selectedItemName.value = name;
};

const setDefaultItem = () => {
  if (
    Array.isArray(props.array) &&
    props.array.length > 0 &&
    !props.modelValue
  ) {
    const firstItem = props.array[0];
    if (firstItem) {
      selectedItemId.value = firstItem[props.valueKey];
      selectedItemName.value = firstItem[props.labelKey];
      emit("update:modelValue", firstItem[props.valueKey]);
    }
  } else {
    selectedItemId.value = props.modelValue;
    const foundItem = props.array.find(
      (item: any) => item[props.valueKey] == props.modelValue
    );
    selectedItemName.value = foundItem
      ? foundItem[props.labelKey]
      : props.defaultSelectText;
  }
};

// Проверяем и устанавливаем текст по умолчанию
const checkDefaultText = () => {
  if (props.defaultSelectText && !props.modelValue) {
    selectedItemName.value = props.defaultSelectText;
  } else {
    setDefaultItem();
  }
};

watch(
  () => props.modelValue,
  () => {
    if (
      !props.modelValue &&
      selectedItemName.value !== props.defaultSelectText
    ) {
      selectedItemName.value = props.defaultSelectText;
    }
  }
);

watchEffect(() => {
  const array = getArrayFromProps();
  if (array.length > 0) {
    checkDefaultText();
  }
});
</script>

<template>
  <div class="flex flex-col">
    <div class="relative inline-block w-full h-full">
      <div class="h-full">
        <button
          @click="
            emit('update:showMenu', props.disable ? false : !props.showMenu)
          "
          type="button"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          class="w-full h-full b-bg flex items-center justify-between gap-2 rounded-lg px-[14px] outline-none"
          :class="[
            { 'b-border': !showMenu },
            { 'border-[1px] border-c-primary-500': showMenu },
          ]"
        >
          <span>{{ selectedItemName }}</span>
          <IconChevronDown :class="[{ 'rotate-[180deg]': showMenu }]" />
        </button>
      </div>
      <div
        v-if="showMenu"
        :class="[{ 'translate-y-[-5px]': showMenu }]"
        :style="`${menuOpenPosition == 'top' ? 'bottom' : 'top'}: 100%`"
        class="absolute right-0 z-[2000] mt-2 w-full b-bg border-[1px] border-c-primary-500 flex items-center justify-between rounded-lg p-1"
        role="menu"
      >
        <div class="w-full flex flex-col items-start justify-center">
          <div
            v-if="defaultSelectText.length > 0"
            class="w-full inline-block rounded-md cursor-pointer px-4 py-2 text-sm"
          >
            {{ defaultSelectText }}
          </div>
          <div
            v-for="item in getArrayFromProps()"
            :key="item[valueKey]"
            @click="selectItem(item[valueKey], item[labelKey])"
            class="w-full inline-block rounded-md cursor-pointer px-4 py-2 text-sm hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700"
            role="menuitem"
          >
            {{ item[labelKey] }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
