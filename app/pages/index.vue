<script lang="ts" setup>
	import type { Breadcrumb } from "~/types/breadcrumb.typ";

	definePageMeta({
		middleware: "auth",
	});
	useSeoMeta({
		title: "Home | Lunar",
	});

	const breadcrumbs = reactive<Breadcrumb[]>([
		{ id: 1, name: "Home", path: "/" },
	]);
</script>

<template>
	<UiBreadcrumbs :breadcrumbs="breadcrumbs" />
	<div>Home</div>
</template>

<style scoped></style>
