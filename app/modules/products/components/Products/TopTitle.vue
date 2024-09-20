<script lang="ts" setup>
	import { useProductsStore } from "~/modules/products/stores/products";

	const productsStore = useProductsStore();
	const handleOpenProductsModal = () => {
		productsStore.productsModal = true;
		document.body.style.overflow = "hidden";
	};
</script>

<template>
	<div class="flex items-center justify-between">
		<h2 class="text-30-semi">Товары</h2>
		<UiButton
			text="Новый продукт"
			text-color="text-c-gray-t-50"
			bg-color="bg-c-primary-600"
			:border-hide="true"
			hover-bg-color="bg-c-primary-700"
			px="px-4"
			py="py-[10px]"
			@click="handleOpenProductsModal"
		>
		</UiButton>
	</div>
</template>

<style scoped></style>
