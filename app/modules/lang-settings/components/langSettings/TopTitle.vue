<script lang="ts" setup>
import { useAttributeGroupsStore } from "~/modules/attribute-groups/stores/attributeGroups";

const router = useRouter();
const handleOpenAttrGsPage = () => {
  router.push("/lang-settings/create");
};
</script>

<template>
  <div class="flex items-center justify-between">
    <h2 class="text-30-semi">Языки</h2>
    <UiButton
      text="Добавить язык"
      text-color="text-c-gray-t-50"
      bg-color="bg-c-primary-600"
      :border-hide="true"
      hover-bg-color="bg-c-primary-700"
      px="px-4"
      py="py-[10px]"
      @click="handleOpenAttrGsPage"
    >
    </UiButton>
  </div>
</template>

<style scoped></style>
