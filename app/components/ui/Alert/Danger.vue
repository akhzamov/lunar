<script lang="ts" setup>
	defineProps({
		text: {
			type: String,
			required: true,
		},
	});
</script>

<template>
	<div
		class="w-full h-[40px] border border-c-error-500 bg-c-error-50 dark:bg-c-error-500-8 text-c-error-500 rounded-lg flex items-center justify-start gap-3 px-3"
	>
		<IconXSquare />
		<p class="text-16-med">{{ text }}</p>
	</div>
</template>

<style scoped></style>
