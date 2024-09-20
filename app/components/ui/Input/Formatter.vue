<script lang="ts" setup>
	defineComponent({
		name: "UiInput",
	});
	const props = defineProps({
		modelValue: {
			type: String,
			default: "",
		},
		type: {
			type: String,
			default: "number",
		},
	});
	const inputActive = ref(false);
	const emit = defineEmits(["update:modelValue"]);
	const onInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		emit("update:modelValue", target.value);
	};
</script>

<template>
	<div
		class="flex items-center h-[44px] b-bg rounded-lg px-[8px] outline-none"
		:class="[
			{ 'border-[1px] border-c-primary-500': inputActive },
			{ 'b-border-300': !inputActive },
		]"
	>
		<div
			class="w-8 h-full flex items-center justify-center border-r-[1px] pr-2"
			:class="[
				{ 'border-c-primary-500 text-c-primary-500': inputActive },
				{
					'border-c-gray-t-300 dark:border-c-gray-t-600':
						!inputActive,
				},
			]"
		>
			<IconCurrencyDollar class="w-6 h-6" />
		</div>
		<input
			:value="props.modelValue"
			@input="onInput"
			:type="props.type"
			step="0.1"
			class="outline-none border-none bg-transparent flex-grow pl-3 h-full"
			@focusin="inputActive = true"
			@focusout="inputActive = false"
		/>
	</div>
</template>

<style scoped></style>
