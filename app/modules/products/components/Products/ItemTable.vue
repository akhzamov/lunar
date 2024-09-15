<script lang="ts" setup>
	import { productsList } from "~/modules/products/components/Products/products.data";
	import { useProductsStore } from "~/modules/products/stores/products";

	const productsStore = useProductsStore();
	const checkAll = ref(false);
	const products = computed(() => productsStore.filteredProductsList);
	const productsChecked = reactive<number[]>([]);

	watchEffect(() => {
		productsChecked.splice(0, productsChecked.length);

		products.value.forEach((product) => {
			if (product.checked) {
				productsChecked.push(product.id);
			}
		});
	});

	watch(
		checkAll,
		() => {
			if (checkAll.value) {
				productsChecked.splice(0, productsChecked.length);
				productsStore.productsList.forEach((item) => {
					item.checked = true;
					if (item.checked) {
						productsChecked.push(item.id);
					}
				});
			} else {
				productsChecked.splice(0, productsChecked.length);
				productsStore.productsList.forEach((item) => {
					item.checked = false;
				});
			}
		},
		{ immediate: true }
	);
</script>

<template>
	<div class="h-max b-bg rounded-xl mt-6">
		<div
			class="flex items-center justify-between rounded-tl-xl rounded-tr-xl b-border px-6 py-1"
		>
			<div>
				<UiButton
					class="flex items-center justify-center gap-2 p-2 b-border b-bg"
					v-if="checkAll || productsChecked.length > 0"
				>
					<template v-slot:icon>
						<IconDotsVertical
							class="text-c-gray-t-300 dark:text-c-gray-t-500"
						/>
					</template>
					<template v-slot:text>
						<span class="text-16-semi">Массовое Действие</span>
					</template>
				</UiButton>
			</div>
			<dir class="flex items-center gap-3">
				<div
					class="flex items-center w-[320px] h-[44px] b-border b-bg px-[14px] rounded-md"
				>
					<IconSearchLg
						class="text-c-gray-t-300 dark:text-c-gray-t-500"
					/>
					<UiInputIcon
						class="flex-grow h-full p-1"
						placeholder="Поиск"
					/>
				</div>
				<div
					class="w-[40px] h-[40px] b-border b-bg rounded-md flex items-center justify-center cursor-pointer text-c-gray-t-300 dark:text-c-gray-t-500 hover:text-c-gray-t-50 dark:hover:text-c-gray-t-400"
				>
					<IconFilterFunnel02 />
				</div>
				<div
					class="w-[40px] h-[40px] b-border b-bg rounded-md flex items-center justify-center cursor-pointer text-c-gray-t-300 dark:text-c-gray-t-500 hover:text-c-gray-t-50 dark:hover:text-c-gray-t-400"
				>
					<IconColumns03 />
				</div>
			</dir>
		</div>
		<div class="flex flex-col b-border rounded-br-xl rounded-bl-xl">
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
											<UiCheckbox v-model="checkAll" />
											Статус
										</div>
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
									></th>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
									>
										Название
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
									>
										Бренд
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
									>
										SKU
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
									>
										На складе
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
									>
										Тип
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
									v-for="product in products"
									:key="product.id"
									class="hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700"
									:class="{
										'bg-c-gray-t-100 dark:bg-c-gray-t-700':
											(checkAll && product.checked) ||
											(product.checked && !checkAll),
									}"
								>
									<td
										class="px-6 py-4 whitespace-nowrap text-sm font-medium border-l"
										:class="{
											'border-c-primary-600': product.checked,
											'border-transparent': !product.checked,
										}"
									>
										<div class="flex items-center gap-3">
											<UiCheckbox v-model="product.checked" />
											<span
												v-if="product.status == 'published'"
												class="px-2 py-[2px] bg-c-success-25 dark:bg-c-success-100 border-2 border-c-success-300 rounded-md text-c-success-500"
											>
												Опубликован
											</span>
											<span
												v-if="product.status == 'draft'"
												class="px-2 py-[2px] bg-c-warning-25 dark:bg-c-warning-100 border-2 border-c-warning-300 rounded-md text-c-warning-500"
											>
												Черновик
											</span>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm">
										<img
											:src="product.image"
											:alt="product.name"
										/>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm">
										<span>{{ product.name }}</span>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm">
										{{ product.brand }}
									</td>
									<td
										class="relative px-6 py-4 whitespace-nowrap text-sm"
									>
										<span
											@mouseenter="product.activeSkuList = true"
											@mouseleave="product.activeSkuList = false"
											class="cursor-pointer"
										>
											{{ product.sku[0] }}
										</span>
										<div
											v-if="
												product.sku.length > 1 &&
												product.activeSkuList
											"
											class="sku-list absolute z-[30] top-[0] left-0 translate-y-[-70%] px-3 py-2 bg-c-gray-t-50 dark:bg-c-gray-t-700 rounded-md"
										>
											<template v-for="(sku, index) in product.sku">
												{{ sku
												}}<span v-if="index != product.sku.length - 1"
													>,
												</span>
											</template>
											<div
												class="absolute bottom-0 z-[-1] left-0 w-3 h-3 bg-c-gray-t-50 dark:bg-c-gray-t-700 rotate-[-45deg] translate-x-[12px] translate-y-[6px]"
											></div>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm">
										<span>{{ product.warehouse }}</span>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm">
										<span>
											{{
												product.type == "new"
													? "Новый тип продукта"
													: "Сток"
											}}
										</span>
									</td>
									<td
										class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium"
									>
										<button
											type="button"
											class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-c-primary-700 hover:text-c-primary-500"
										>
											<IconEdit05 />
											Изменить
										</button>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
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
</style>
