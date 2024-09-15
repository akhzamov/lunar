<script lang="ts" setup>
	import { ref, watch } from "vue";
	import { useProductsStore } from "../../stores/products";

	const productsStore = useProductsStore();
</script>

<template>
	<div
		class="w-max px-[9px] py-2 flex items-center gap-2 rounded-xl b-bg b-border mt-8"
	>
		<div
			class="px-[14px] py-2 rounded-lg cursor-pointer"
			:class="{
				'bg-c-primary-25 dark:bg-c-gray-t-600 text-c-primary-800 dark:text-c-gray-t-25':
					productsStore.activeFilterTab == 1,
			}"
			@click="productsStore.activeFilterTab = 1"
		>
			Все
		</div>
		<div
			class="px-[14px] py-2 rounded-lg cursor-pointer"
			:class="{
				'bg-c-primary-25 dark:bg-c-gray-t-600 text-c-primary-800 dark:text-c-gray-t-25':
					productsStore.activeFilterTab == 2,
			}"
			@click="productsStore.activeFilterTab = 2"
		>
			Опубликовано
		</div>
		<div
			class="px-[14px] py-2 rounded-lg cursor-pointer flex items-center gap-2"
			:class="{
				'bg-c-primary-25 dark:bg-c-gray-t-600 text-c-primary-800 dark:text-c-gray-t-25':
					productsStore.activeFilterTab == 3,
			}"
			@click="productsStore.activeFilterTab = 3"
		>
			Черновик

			<span
				class="text-12-med px-2 py-[2px] bg-c-gray-t-1000 dark:bg-c-gray-t-500 rounded-2xl"
			>
				12
			</span>
		</div>
	</div>
</template>

<style scoped></style>
