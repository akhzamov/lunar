<script lang="ts" setup>
useSeoMeta({
  title: "Lunar"
})
const head = useLocaleHead({
  addDirAttribute: true,
  addSeoAttributes: true,
})
const htmlAttrs = computed(() => head.value.htmlAttrs!)
useSetI18nParams()
</script>

<template>
  <Html :lang="htmlAttrs.lang" :dir="htmlAttrs.dir">

    <h1 class="text-72-semi text-c-success-500">Hello</h1>
  </Html>
</template>

<style scoped></style>