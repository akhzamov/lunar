<script lang="ts" setup>
	const props = defineProps({
		modelValue: {
			type: String,
			default: "",
		},
	});
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
		class="b-bg px-[14px] py-2 outline-none"
	/>
</template>

<style scoped></style>
