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
	});
	const inputActive = ref(false);
	const emit = defineEmits(["update:modelValue"]);
	const onInput = (event: Event) => {
		const target = event.target as HTMLInputElement;
		emit("update:modelValue", target.value);
	};
</script>

<template>
	<input
		:value="props.modelValue"
		@input="onInput"
		:type="props.type"
		class="b-bg h-[44px] rounded-lg px-[8px] outline-none"
		:class="[
			{ 'border-[1px] border-c-primary-500': inputActive },
			{ 'b-border-300': !inputActive },
		]"
		@focusin="inputActive = true"
		@focusout="inputActive = false"
	/>
</template>

<style scoped></style>
