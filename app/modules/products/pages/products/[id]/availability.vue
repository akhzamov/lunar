<script lang="ts" setup>
	import type { Breadcrumb } from "~/types/breadcrumb.typ";
	import { useProductsStore } from "~/modules/products/stores/products";

	definePageMeta({
		middleware: "auth",
		layout: "products",
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
