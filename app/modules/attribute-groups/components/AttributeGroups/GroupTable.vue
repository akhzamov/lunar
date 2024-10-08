<script lang="ts" setup>
	import { useProductsStore } from "~/modules/products/stores/products";
	import { useAttributeGroupsStore } from "~/modules/attribute-groups/stores/attributeGroups";
	import { attributeGroupsList } from "~/modules/attribute-groups/components/AttributeGroups/attributeGroups.data";

	const productsStore = useProductsStore();
	const attrGsStore = useAttributeGroupsStore();
	const checkAll = ref(false);
	const oneChecked = ref(false);
	const checkedLength = ref(0);
	const attributeGroupsSelectedLength = reactive<number[]>([]);
	const deleteButton = ref(false);
	const allCheckedButton = ref(false);
	const totalPages = computed(() => {
		let totalPages;
		totalPages = attrGsStore.attributeGroups
			? attrGsStore.attributeGroups?.length / 10
			: 0;
		return totalPages;
	});
	const currentPage = ref(1);
	const perPageList = reactive([
		{ id: 1, name: "10" },
		{ id: 2, name: "15" },
		{ id: 3, name: "20" },
	]);
	const perPage = ref(1);

	const handleDeselect = () => {
		checkAll.value = false;
		deleteButton.value = false;
		attrGsStore.attributeGroups?.forEach((product) => {
			product.checked = false;
		});
	};

	const handleAllSelect = () => {
		checkAll.value = true;
		attrGsStore.attributeGroups?.forEach((product) => {
			product.checked = true;
		});
	};

	const handleCheckAllClicked = () => {
		checkAll.value = !checkAll.value;
		if (checkAll.value) {
			handleDeselect();
		} else {
			handleAllSelect();
		}
	};


	watchEffect(() => {
		attributeGroupsSelectedLength.splice(0, attributeGroupsSelectedLength.length);
		oneChecked.value = false;
		checkedLength.value = 0;
		attrGsStore.attributeGroups?.forEach((item) => {
			if (item.checked) {
				oneChecked.value = true;
				checkedLength.value += 1;
				attributeGroupsSelectedLength.push(item.id);
			}
		});
	});

	watch(checkedLength, () => {
		if (checkedLength.value != attrGsStore.attributeGroups?.length) {
			allCheckedButton.value = false;
			checkAll.value = false;
			console.log("w");
		} else {
			allCheckedButton.value = true;
			checkAll.value = true;
			console.log("f");
		}
	});

	onMounted(() => {
		attrGsStore.attributeGroups = attributeGroupsList;
		attrGsStore.attributeGroups.forEach((item) => {
			item.checked = false;
		});
	});
</script>

<template>
	<div
		class="h-max b-bg rounded-xl mt-6 select-none"
		v-if="attrGsStore.attributeGroups"
	>
		<div
			class="flex items-center justify-between rounded-tl-xl rounded-tr-xl border-[1px] border-c px-6 py-3"
		>
			<div class="relative w-max">
				<UiButton
					class="w-max"
					v-if="checkAll || attributeGroupsSelectedLength.length > 0"
					@click="deleteButton = !deleteButton"
					text="Массовое действие"
					hover-bg-color="bg-c-gray-t-100 dark:bg-c-gray-t-700"
					p="p-[10px]"
				>
					<template v-slot:icon>
						<IconDotsVertical class="text-c-gray-t-300" />
					</template>
				</UiButton>
				<UiButton
					class="w-max absolute top-[100%] left-0 translate-y-[4px]"
					v-if="attributeGroupsSelectedLength.length > 0 && deleteButton"
					@click="deleteButton = false"
					text="Удалить отмеченные"
					text-color="text-c-error-600"
					hover-bg-color="bg-c-error-500-30"
					p="p-4"
				>
					<template v-slot:icon-r>
						<IconTrash01 class="text-c-error-600" />
					</template>
				</UiButton>
			</div>
		</div>
		<div
			class="flex items-center justify-between border-x-[1px] border-b-[1px] border-c px-6 py-3"
			v-if="oneChecked"
		>
			<p class="text-14-semi text-c-primary-700">
				<span class="text-16-bold">{{ checkedLength }}</span> записей
				выделено
			</p>
			<div class="flex items-center justify-center gap-6">
				<p
					class="text-16-semi text-c-primary-700 cursor-pointer"
					v-if="!checkAll && !allCheckedButton"
					@click="handleAllSelect()"
				>
					Выделить все
				</p>
				<p
					class="text-16-semi text-c-error-700 cursor-pointer"
					@click="handleDeselect()"
				>
					Снять все выделение
				</p>
			</div>
		</div>
		<div class="flex flex-col border-x-[1px] border-b-[1px] border-c">
			<div class="-m-1.5">
				<div class="p-1.5 min-w-full inline-block align-middle">
					<div class="">
						<table
							class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700"
						>
							<thead>
								<tr>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
									>
										<div class="flex items-center gap-3">
											<UiCheckbox
												v-model="checkAll"
												@click="handleCheckAllClicked"
											/>
											Тип
										</div>
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
									>
										Имя
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
									>
										Предлог
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
									>
										Позиция
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
									></th>
								</tr>
							</thead>
							<tbody
								class="divide-y divide-gray-200 dark:divide-neutral-700"
							>
								<tr
									v-for="attr in attrGsStore.attributeGroups"
									:key="attr.id"
									class="hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700"
									:class="{
										'bg-c-gray-t-100 dark:bg-c-gray-t-700':
											(checkAll && attr.checked) ||
											(attr.checked && !checkAll),
									}"
								>
									<td
										class="px-6 py-4 whitespace-nowrap text-sm font-medium border-l"
										:class="{
											'border-c-primary-600': attr.checked,
											'border-transparent': !attr.checked,
										}"
									>
										<div class="flex items-center gap-3">
											<UiCheckbox v-model="attr.checked" />
											<span>{{ attr.type }}</span>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm">
										<span>{{ attr.name }}</span>
									</td>
									<td
										class="px-6 py-4 whitespace-nowrap text-sm"
										v-if="productsStore.brandTableShow"
									>
										{{ attr.handle }}
									</td>
									<td
										class="px-6 py-4 whitespace-nowrap text-sm"
										v-if="productsStore.productTypeTableShow"
									>
										<span>
											{{ attr.position }}
										</span>
									</td>
									<td
										class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium"
									>
										<NuxtLink
											:to="`/products/${attr.id}/edit`"
											class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-c-primary-700 hover:text-c-primary-500 hover:underline"
										>
											<IconEdit05 />
											Изменить
										</NuxtLink>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		<div
			class="flex items-center justify-between rounded-bl-xl rounded-br-xl border-x-[1px] border-b-[1px] border-c px-6 py-3"
		>
			<p class="text-14-semi">
				Показано от <span>1</span> до <span>12</span> из
				<span>124</span> результатов
			</p>
			<div class="h-full flex items-center justify-end">
				<UiSelect
					:data="perPageList"
					defaultSelectText=""
					label=""
					:showMenu="true"
					:showPositionTop="true"
					v-model="perPage"
				/>
			</div>
			<UiPagination
				v-if="totalPages > 1"
				:totalPages="totalPages"
				:currentPage="currentPage"
				v-model="currentPage"
			/>
			<div v-if="totalPages < 1"></div>
		</div>
	</div>
</template>

<style>
	.sku-list {
		max-width: 275px !important;
		width: max-content !important;
		padding: 8px 12px !important;
		text-wrap: wrap !important;
		box-shadow: 0px 12px 16px -2px #1018283f !important;
	}
	.border-c {
		@apply border-c-gray-t-200 dark:border-c-gray-t-600;
	}
	.productFilterButton {
		@apply w-[44px] h-[44px] flex items-center justify-center border-[1px] rounded-md;
		@apply hover:bg-c-primary-500-8 dark:hover:bg-c-primary-500-8;
		@apply border-c-gray-t-300 dark:border-c-gray-t-500 hover:border-c-primary-500 dark:hover:border-c-primary-500;
		@apply text-c-gray-t-700 dark:text-c-gray-t-500 hover:text-c-primary-500 dark:hover:text-c-primary-500;
	}
</style>
