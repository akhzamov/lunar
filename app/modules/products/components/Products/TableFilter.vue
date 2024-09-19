<script lang="ts" setup>
	import { useProductsStore } from "../../stores/products";

	const productsStore = useProductsStore();
</script>

<template>
	<div class="w-[320px] h-max b-border b-bg rounded-lg p-4">
		<div class="flex items-center justify-between">
			<p class="text-16-semi">Колонны</p>
		</div>
		<div class="mt-8 flex items-center justify-start gap-4">
			<UiCheckbox v-model="productsStore.brandTableShow" />
			<span>Бренд</span>
		</div>
		<div class="mt-8 flex items-center justify-start gap-4">
			<UiCheckbox v-model="productsStore.skuTableShow" />
			<span>SKU</span>
		</div>
		<div class="mt-8 flex items-center justify-start gap-4">
			<UiCheckbox v-model="productsStore.productTypeTableShow" />
			<span>Тип продукта</span>
		</div>
	</div>
</template>

<style scoped></style>
