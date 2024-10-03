<script lang="ts" setup>
	import type { ITag } from "~/modules/products/types/product.type";

	const selectedBrand = ref(0);
	const selectedType = ref(0);
	const tags = ref<ITag[]>([]);
	const brands = ref([
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
	const types = ref([
		{ id: 1, name: "Сток" },
		{ id: 2, name: "Новый тип продукта" },
	]);
</script>

<template>
	<div class="">
		<h3 class="text-20-semi">Основная Информация</h3>
		<div class="flex items-end gap-2 mt-3">
			<UiSelect
				:data="brands"
				label="Бренд"
				defaultSelectText=""
				:showMenu="true"
				:showPositionTop="false"
				v-model="selectedBrand"
				class="flex-grow"
			/>
			<UiButton
				text="Добавить"
				hover-bg-color="bg-c-primary-50 dark:bg-c-primary-500-8"
				class="h-[44px]"
			>
				<template v-slot:icon>
					<IconPlus />
				</template>
			</UiButton>
		</div>
		<div class="flex items-end gap-2 mt-3">
			<UiSelect
				:data="types"
				defaultSelectText=""
				label="Тип продукта"
				:showMenu="true"
				:showPositionTop="false"
				v-model="selectedType"
				class="flex-grow"
			/>
		</div>
		<div class="flex flex-col mt-3">
			<label class="mb-3">Теги</label>
			<UiInputTag
				type="text"
				v-model="tags"
				class="w-full"
			/>
		</div>
	</div>
</template>

<style scoped></style>
