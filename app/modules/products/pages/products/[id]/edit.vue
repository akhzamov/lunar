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
			name: `${route.query.productName || "Продукт по умолчанию"}`,
			path: `/products/${route.params.id}/edit`,
		},
	]);

	onMounted(() => {
		console.log(route.hash);
	});
</script>

<template>
	<UiBreadcrumbs :breadcrumbs="breadcrumbs" />
	<ProductsIDTopTitle />
	<div class="my-8 flex flex-col gap-4">
		<UiAlertInfo
			text="В настоящее время этот продукт находится в стадии разработки и скрыт во всех каналах и группах клиентов."
		/>
		<UiAlertSuccess
			text="В настоящее время этот продукт находится в стадии разработки и скрыт во всех каналах и группах клиентов."
		/>
		<UiAlertWarning
			text="В настоящее время этот продукт находится в стадии разработки и скрыт во всех каналах и группах клиентов."
		/>
		<UiAlertDanger
			text="В настоящее время этот продукт находится в стадии разработки и скрыт во всех каналах и группах клиентов."
		/>
	</div>
</template>

<style scoped></style>
