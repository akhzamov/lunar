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
			default: "text",
		},
		iconPosition: {
			type: String,
			required: true,
			default: "left",
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
			v-if="props.iconPosition == 'left'"
			:class="[
				{ 'border-c-primary-500 text-c-primary-500': inputActive },
				{
					'border-c-gray-t-300 dark:border-c-gray-t-600 text-c-gray-t-500 dark:text-c-gray-t-400':
						!inputActive,
				},
			]"
			class="w-8 h-full flex items-center justify-center mr-2"
		>
			<slot name="icon-l" />
		</div>
		<input
			@input="onInput"
			:type="props.type"
			class="outline-none border-none bg-transparent flex-grow h-full"
			@focusin="inputActive = true"
			@focusout="inputActive = false"
		/>
		<div
			v-if="props.iconPosition == 'right'"
			:class="[
				{ 'border-c-primary-500 text-c-primary-500': inputActive },
				{
					'border-c-gray-t-300 dark:border-c-gray-t-600 text-c-gray-t-500 dark:text-c-gray-t-400':
						!inputActive,
				},
			]"
			class="w-8 h-full flex items-center justify-center ml-2"
		>
			<slot name="icon-r" />
		</div>
	</div>
</template>

<style scoped></style>
