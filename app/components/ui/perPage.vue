<script lang="ts" setup>
const props = withDefaults(
  defineProps<{
    totalPages: number;
    currentPage: number;
    perPage: number;
  }>(),
  {}
);
const perPageList = reactive([
  { id: 1, value: 10 },
  { id: 2, value: 15 },
  { id: 3, value: 20 },
]);
const emit = defineEmits(["update:currentPage", "update:perPage"]);
const selectPerPageMenu = ref(false);
const page = ref(props.currentPage);
const perPage = ref(props.perPage);

const pageChange = () => {
  emit("update:currentPage", page.value);
};

const perPageChange = () => {
  emit("update:perPage", perPage.value);
};

watch(
  () => page.value,
  () => {
    pageChange();
  }
);
watch(
  () => perPage.value,
  () => {
    perPageChange();
  }
);
</script>

<template>
  <div
    class="flex items-center justify-between rounded-bl-xl rounded-br-xl border-x-[1px] border-b-[1px] border-c px-6 py-3"
  >
    <p class="text-14-semi">
      Показано от <span>1</span> до <span>{{ perPage }}</span> из
      <span>{{ totalPages }}</span> результатов
    </p>
    <div class="h-[44px] flex items-center justify-end">
      <UiSelect
        :array="perPageList"
        :show-menu="selectPerPageMenu"
        default-select-text=""
        v-model:model-value="perPage"
        :icon="false"
        value-key="value"
        label-key="value"
        @update:model-value="perPage = $event"
        @update:show-menu="selectPerPageMenu = $event"
        :text-center="false"
        :disable="false"
        menu-open-position="top"
        class="w-[100px] h-[40px]"
      />
    </div>
    <UiPagination
      v-if="totalPages > 1"
      :totalPages="totalPages"
      :currentPage="currentPage"
      v-model="page"
    />
    <div v-if="totalPages <= 1"></div>
  </div>
</template>

<style scoped>
.border-c {
  @apply border-c-gray-t-200 dark:border-c-gray-t-600;
}
</style>
