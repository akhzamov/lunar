<script lang="ts" setup>
	import { useProductsStore } from "~/modules/products/stores/products";

	const productsStore = useProductsStore();
</script>

<template>
	<div class="flex relative">
		<Transition name="modal">
			<ModalWindowsAddProduct v-if="productsStore.productsModal" />
		</Transition>
		<AsideSidebar />
		<div class="w-full">
			<HeaderNav />
			<main class="p-8">
				<NuxtPage />
			</main>
		</div>
	</div>
</template>

<style scoped></style>
