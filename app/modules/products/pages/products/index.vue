<script lang="ts" setup>
	import type { Breadcrumb } from "~/types/breadcrumb.typ";
	import { useProductsStore } from "~/modules/products/stores/products";

	definePageMeta({
		middleware: "auth",
	});
	useSeoMeta({
		title: "Products | Lunar",
	});

	const apiFetcher = $fetch.create({
		headers: {
			"Content-Type": "application/json",
		},
	});

	const res = apiFetcher(
		"https://api.credo-app.uz/api/attributes?attribute_group_id=1&page=1"
	);
	const productsStore1 = useProductsStore();
	const breadcrumbs = reactive<Breadcrumb[]>([
		{ id: 1, name: "Каталог", path: "" },
		{ id: 2, name: "Товары", path: "/products" },
	]);

	onMounted(() => {
		console.log(res);
	});
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
