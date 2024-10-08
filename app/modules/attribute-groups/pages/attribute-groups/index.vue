<script lang="ts" setup>
	import type { Breadcrumb } from "~/types/breadcrumb.typ";
	import { useProductsStore } from "~/modules/products/stores/products";

	definePageMeta({
		middleware: "auth",
	});
	useSeoMeta({
		title: "Attribute Groups | Lunar",
	});

	const productsStore1 = useProductsStore();
	const breadcrumbs = reactive<Breadcrumb[]>([
		{ id: 1, name: "Настройки", path: "" },
		{ id: 2, name: "Группа Атрибутов", path: "/attribute-groups" },
	]);
</script>

<template>
	<UiBreadcrumbs :breadcrumbs="breadcrumbs" />
	<div class="flex flex-col">
		<!-- Attribute Groups Top Title -->
		<AttributeGroupsTopTitle />
		<!-- Attribute Groups Table -->
		<AttributeGroupsGroupTable />
	</div>
</template>

<style scoped></style>
