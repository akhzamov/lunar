<script lang="ts" setup>
import type { IBreadcrumb } from "~/types/Others/breadcrumb.type";

definePageMeta({
  middleware: "auth",
});
useSeoMeta({
  title: "Home | Lunar",
});

const breadcrumbs = reactive<IBreadcrumb[]>([
  { id: 1, name: "Home", path: "/" },
]);
</script>

<template>
  <UiBreadcrumbs :breadcrumbs="breadcrumbs" />
  <div>Home</div>
</template>

<style scoped></style>
