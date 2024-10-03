<script lang="ts" setup>
	import type { ITag } from "~/modules/products/types/product.type";

	defineComponent({
		name: "UiInput",
	});
	const props = defineProps({
		modelValue: {
			type: Array as PropType<ITag[]>,
			default: () => [],
		},
		type: {
			type: String,
			default: "text",
		},
	});
	const inputActive = ref(false);
	const inputValue = ref("");
	const isTyping = ref(false);
	const emit = defineEmits(["update:modelValue"]);
	const tags = ref<ITag[]>([...props.modelValue]);
	const suggestions = ref<ITag[]>([
		{ name: "New" },
		{ name: "Old" },
		{ name: "Sale" },
		{ name: "Limited" },
		{ name: "Top" },
	]);
	const filteredSuggestions = computed(() => {
		return suggestions.value.filter(
			(suggestion) =>
				suggestion.name
					.toLowerCase()
					.includes(inputValue.value.toLowerCase()) &&
				!tags.value.some((tag) => tag.name === suggestion.name)
		);
	});
	const addTag = (event: Event) => {
		const target = event.target as HTMLInputElement;
		const newTagName = target.value.trim();
		const newTag: ITag = {
			name: newTagName,
		};

		if (
			newTagName &&
			!tags.value.some((tag) => tag.name === newTagName)
		) {
			tags.value.push(newTag);
			emit("update:modelValue", [...tags.value]);
		}

		target.value = "";
		inputValue.value = "";
	};
	const deleteTag = (index: number) => {
		if (index >= 0 && index < tags.value.length) {
			tags.value.splice(index, 1);
			emit("update:modelValue", [...tags.value]);
		}
	};

	const selectSuggestion = (suggestion: ITag) => {
		tags.value.push(suggestion);
		emit("update:modelValue", [...tags.value]);
		inputValue.value = "";
	};

	const handleFocusOut = () => {
		setTimeout(() => {
			inputActive.value = false;
			isTyping.value = false;
		}, 200);
	};

	const hideSuggestions = () => {
		isTyping.value = inputValue.value.length > 0; // Устанавливаем флаг при вводе текста
	};
</script>

<template>
	<div
		class="relative b-bg rounded-lg px-[8px] flex flex-col items-center"
		:class="[
			{ 'border-[1px] border-c-primary-500': inputActive },
			{ 'b-border-300': !inputActive },
		]"
	>
		<input
			v-model="inputValue"
			:type="props.type"
			@keydown.enter="addTag"
			@input="hideSuggestions"
			@focusin="inputActive = true"
			@focusout="handleFocusOut"
			class="outline-none flex-grow w-full bg-transparent h-[44px]"
		/>
		<div
			class="w-full h-[1px] bg-c-primary-500"
			v-if="modelValue.length > 0"
		></div>
		<div
			class="w-full flex items-center justify-start gap-2 flex-wrap mt-2 mb-2"
			v-if="modelValue.length > 0"
		>
			<template
				v-for="(tag, i) in props.modelValue"
				:key="i"
			>
				<div
					class="px-1 py-[0.5px] bg-c-primary-50 dark:bg-c-primary-500-8 border border-c-primary-500 rounded-md flex items-center gap-1"
				>
					<span class="text-14-reg">
						{{ tag.name }}
					</span>
					<IconXClose
						class="w-[14px] h-[14px] cursor-pointer"
						@click="deleteTag(i)"
					/>
				</div>
			</template>
		</div>
		<ul
			v-if="inputActive && filteredSuggestions.length > 0"
			class="absolute top-full left-0 z-[20] w-max b-border b-bg p-3 rounded-md flex flex-col items-start gap-2"
		>
			<li
				v-for="(suggestion, index) in filteredSuggestions"
				:key="index"
				class="cursor-pointer hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700 w-full p-1 rounded-md"
				@click="selectSuggestion(suggestion)"
			>
				{{ suggestion.name }}
			</li>
		</ul>
	</div>
</template>

<style scoped></style>
