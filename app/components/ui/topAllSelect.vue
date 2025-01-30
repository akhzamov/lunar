<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    array: Record<string, any>[];
    checkAll: boolean;
  }>(),
  {}
);

const emit = defineEmits(["update:checkAll", "update:array"]);

const oneChecked = ref(false);
const attributeGroupsSelectedLength = reactive<number[]>([]);
const checkedLength = ref(0);

// Установить/снять все выделения
const toggleAllSelection = (isSelected: boolean) => {
  emit("update:checkAll", isSelected);
  props.array.forEach((item) => {
    item.checked = isSelected;
  });
  emit("update:array", props.array);
};

watchEffect(() => {
  // Обновляем список выделенных элементов
  attributeGroupsSelectedLength.splice(0, attributeGroupsSelectedLength.length);
  oneChecked.value = false;
  checkedLength.value = 0;

  props.array.forEach((item) => {
    if (item.checked) {
      oneChecked.value = true;
      checkedLength.value++;
      attributeGroupsSelectedLength.push(item.id);
    }
  });
  emit("update:array", props.array);
  // Проверяем, выделены ли все элементы
  if (checkedLength.value === props.array.length) {
    emit("update:checkAll", true);
  } else {
    emit("update:checkAll", false);
  }
});

watch(
  () => props.checkAll,
  () => {
    toggleAllSelection(props.checkAll);
  }
);
</script>

<template>
  <div
    class="flex items-center justify-between border-x-[1px] border-b-[1px] border-c px-6 py-3"
    v-if="oneChecked"
  >
    <p class="text-14-semi text-c-primary-700">
      <span class="text-16-bold">{{ checkedLength }}</span> записей выделено
    </p>
    <div class="flex items-center justify-center gap-6">
      <p
        class="text-16-semi text-c-primary-700 cursor-pointer"
        v-if="!checkAll"
        @click="toggleAllSelection(true)"
      >
        Выделить все
      </p>
      <p
        class="text-16-semi text-c-error-700 cursor-pointer"
        @click="toggleAllSelection(false)"
      >
        Снять все выделение
      </p>
    </div>
  </div>
</template>
