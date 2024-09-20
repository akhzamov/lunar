<script lang="ts" setup>
	import { useProductsStore } from "../../stores/products";

	const productsStore = useProductsStore();
	const handleCloseProductsModal = () => {
		productsStore.productsModal = false;
		document.body.style.overflow = "auto";
	};
	const productTypes = reactive([
		{ id: 1, name: "Новый тип продукта" },
		{ id: 2, name: "Сток" },
	]);
	const data = reactive({
		productType: null,
	});
</script>

<template>
	<div
		@click="handleCloseProductsModal()"
		class="fixed top-0 left-0 w-full h-screen flex items-center justify-center z-[60] bg-c-gray-t-450-60"
	>
		<div
			@click.stop
			class="w-[890px] h-max b-border-300 b-bg rounded-lg p-6"
		>
			<div class="flex items-center justify-between">
				<h4 class="text-white">Создать товар</h4>
				<UiButton
					@click="handleCloseProductsModal"
					hoverBgColor="bg-c-gray-t-100 dark:bg-c-gray-t-700"
					p="p-1"
					text=""
				>
					<template v-slot:icon>
						<IconXClose />
					</template>
				</UiButton>
			</div>
			<div class="flex items-center justify-between gap-6 mt-6">
				<div class="w-full flex flex-col gap-3">
					<label>
						Название
						<span class="text-c-error-500">*</span>
					</label>
					<UiInputBase />
				</div>
				<div class="w-full flex flex-col gap-3">
					<label>
						Тип продукта
						<span class="text-c-error-500">*</span>
					</label>
					<UiSelect
						:data="productTypes"
						defaultSelectText=""
						label=""
						v-model="data.productType"
						:showMenu="true"
						:showPositionTop="false"
					/>
				</div>
			</div>
			<div class="flex items-center justify-between gap-6 mt-6">
				<div class="w-full flex flex-col gap-3">
					<label>
						SKU
						<span class="text-c-error-500">*</span>
					</label>
					<UiInputBase />
				</div>
				<div class="w-full flex flex-col gap-3">
					<label>
						Базовая цена
						<span class="text-c-error-500">*</span>
					</label>
					<UiInputFormatter />
				</div>
			</div>
			<div class="flex items-center justify-start gap-3 mt-6">
				<UiButton
					@click="handleCloseProductsModal"
					bgColor="bg-c-primary-500"
					hoverBgColor="bg-c-primary-600"
					text="Создать"
					py="py-2"
					px="px-3"
				/>
				<UiButton
					@click="handleCloseProductsModal"
					hoverBgColor="bg-c-gray-t-100 dark:bg-c-gray-t-700"
					text="Отмена"
					py="py-2"
					px="px-3"
				/>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
