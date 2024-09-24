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
		<h2 class="text-30-semi">Основная информация</h2>
	</div>
</template>

<style scoped></style>
