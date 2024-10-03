<script lang="ts" setup>
	import { useProductsStore } from "../../stores/products";

	const productsStore = useProductsStore();
	const brands = reactive([
		{
			id: 1,
			name: "STO",
		},
		{
			id: 2,
			name: "Nooke",
		},
		{
			id: 3,
			name: "Darrel Soft",
		},
		{
			id: 4,
			name: "Huige",
		},
		{
			id: 5,
			name: "RADUCT",
		},
		{
			id: 6,
			name: "LUIS",
		},
	]);
	const recordsFilter = reactive([
		{
			id: 1,
			name: "С удаленными записями",
		},
		{
			id: 2,
			name: "Только удаленные записи",
		},
	]);
	const selectedBrand = ref(0);
	const selectedRecordFilter = ref(0);
</script>

<template>
	<div class="w-[320px] h-max b-border b-bg rounded-lg p-4">
		<div class="flex items-center justify-between">
			<p class="text-16-semi">Фильтры</p>
			<p
				class="text-14-semi text-c-error-400 cursor-pointer hover:underline"
			>
				<span>Очистить</span>
			</p>
		</div>
		<div class="mt-8 relative">
			<UiSelect
				class="sticky z-10"
				:data="brands"
				label="Бренд"
				default-select-text="Все"
				:show-menu="productsStore.activeProductsFilter"
				:showPositionTop="false"
				v-model="selectedBrand"
				@click.stop
			/>
			<UiSelect
				class="sticky z-5 mt-8"
				:data="recordsFilter"
				label="Удаленные записи"
				default-select-text="Все записи"
				:show-menu="productsStore.activeProductsFilter"
				:showPositionTop="false"
				v-model="selectedRecordFilter"
				@click.stop
			/>
		</div>
	</div>
</template>

<style scoped></style>
