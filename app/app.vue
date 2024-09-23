<script lang="ts" setup>
	useSeoMeta({
		title: "Lunar",
	});
	const head = useLocaleHead({
		addDirAttribute: true,
		addSeoAttributes: true,
	});
	const htmlAttrs = computed(() => head.value.htmlAttrs!);
	useSetI18nParams();
</script>

<template>
	<Html :lang="htmlAttrs.lang">
		<NuxtLayout />
	</Html>
</template>

<style scoped></style>
