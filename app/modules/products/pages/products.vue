<script lang="ts" setup>
	import type { Breadcrumb } from "~/types/breadcrumb.typ";
	import { useProductsStore } from "../stores/products";

	definePageMeta({
		middleware: "auth",
	});
	useSeoMeta({
		title: "Products | Lunar",
	});

	const productsStore = useProductsStore();
	const breadcrumbs = reactive<Breadcrumb[]>([
		{ id: 1, name: "Каталог", path: "" },
		{ id: 2, name: "Товары", path: "/products" },
	]);
</script>

<template>
	<UiBreadcrumbs :breadcrumbs="breadcrumbs" />
	<div class="flex flex-col">
		<!-- Product Title and btn -->
		<ProductsTopTitle />
		<!-- Products Filter Tab -->
		<ProductsFilterTab />
		<!-- Products Item Table -->
		<ProductsItemTable />
	</div>
</template>

<style scoped></style>
