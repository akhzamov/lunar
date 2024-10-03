<script lang="ts" setup>
	import type { Breadcrumb } from "~/types/breadcrumb.typ";
	import { useProductsStore } from "~/modules/products/stores/products";

	definePageMeta({
		middleware: "auth",
	});
	useSeoMeta({
		title: "Products | Lunar",
	});

	const route = useRoute();
	const productsStore = useProductsStore();
	const breadcrumbs = reactive<Breadcrumb[]>([
		{ id: 1, name: "Каталог", path: "" },
		{ id: 2, name: "Товары", path: "/products" },
		{
			id: 3,
			name: "Доступность",
			path: `/products/${route.params.id}/availability`,
		},
	]);

	onMounted(() => {
		console.log(route.hash);
	});
</script>

<template>
	<UiBreadcrumbs :breadcrumbs="breadcrumbs" />
	<div class="flex flex-col">
		<ProductsIDTopTitle />
		<UiAlertAlerts />
	</div>
	<div class="flex">
		<div class="b-bg b-border rounded-xl p-6 flex-grow z-[15]">
			<h2>Доступность</h2>
			<div class="w-full h-[600px]"></div>
		</div>
		<div class="relative">
			<CommonProductRoutes />
		</div>
	</div>
</template>

<style scoped></style>
