<script lang="ts" setup>
	import type { ISelectData } from "~/modules/products/types/selectData.type";

	const props = defineProps({
		data: {
			type: Array as PropType<ISelectData[]>,
			required: true,
		},
		label: {
			type: String,
			required: true,
		},
		defaultSelectText: {
			type: String,
			required: true,
		},
		showMenu: {
			type: Boolean,
			default: false,
			required: true,
		},
		showPositionTop: {
			type: Boolean,
			required: true,
		},
		modelValue: {
			type: Number,
			default: 0,
			required: true,
		},
	});

	const emit = defineEmits(["update:modelValue"]);
	const selectedItemId = ref(props.modelValue);
	const selectedItem = ref(props.defaultSelectText);
	const openSelectMenu = ref(false);

	const selectItem = (id: number) => {
		selectedItemId.value = id;
		props.data.forEach((item) => {
			if (item.id == id) {
				selectedItem.value = item.name;
			} else if (!id) {
				selectedItem.value = props.defaultSelectText;
			}
		});
		emit("update:modelValue", selectedItemId.value);
		openSelectMenu.value = false;
	};

	const checkDefaultText = () => {
		if (props.defaultSelectText.length <= 0) {
			props.data.forEach((item, index) => {
				if (index == 0) {
					selectedItem.value = item.name;
				}
			});
		} else {
			selectedItem.value = props.defaultSelectText;
		}
	};

	onMounted(() => {
		checkDefaultText();
	});
</script>

<template>
	<div class="flex flex-col">
		<label v-if="label.length > 0">{{ label }}</label>
		<div
			class="relative inline-block h-[44px]"
			:class="[{ 'mt-3': label.length > 0 }]"
		>
			<div class="h-full">
				<button
					@click="openSelectMenu = !openSelectMenu"
					type="button"
					id="menu-button"
					aria-expanded="true"
					aria-haspopup="true"
					class="w-full h-full b-bg flex items-center justify-between gap-2 rounded-lg px-[14px] py-2 outline-none"
					:class="[
						{ 'b-border': !openSelectMenu },
						{ 'border-[1px] border-c-primary-500': openSelectMenu },
					]"
				>
					<span>{{ selectedItem }}</span>
					<IconChevronDown
						:class="[{ 'rotate-[180deg]': openSelectMenu }]"
					/>
				</button>
			</div>
			<div
				v-if="openSelectMenu && showMenu"
				:class="[
					{ 'bottom-[100%] translate-y-[-5px]': showPositionTop },
				]"
				class="absolute right-0 z-[20] mt-2 w-full b-bg border-[1px] border-c-primary-500 flex items-center justify-between rounded-lg p-1"
				role="menu"
			>
				<div class="w-full flex flex-col items-start justify-center">
					<div
						v-if="defaultSelectText.length > 0"
						@click="selectItem(0)"
						class="w-full inline-block rounded-md cursor-pointer px-4 py-2 text-sm hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700"
					>
						{{ defaultSelectText }}
					</div>
					<div
						v-for="item in data"
						:key="item.id"
						@click="selectItem(item.id)"
						class="w-full inline-block rounded-md cursor-pointer px-4 py-2 text-sm hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700"
						role="menuitem"
					>
						{{ item.name }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped></style>
