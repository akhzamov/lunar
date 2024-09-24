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
		class="w-full h-[40px] border border-c-warning-500 bg-c-warning-50 dark:bg-c-warning-500-8 text-c-warning-500 rounded-lg flex items-center justify-start gap-3 px-3"
	>
		<IconAlertOctagon />
		<p class="text-16-med">{{ text }}</p>
	</div>
</template>

<style scoped></style>
