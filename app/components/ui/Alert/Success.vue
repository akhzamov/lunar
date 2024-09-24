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
		class="w-full h-[40px] border border-green-500 bg-green-50 dark:bg-green-500/10 text-green-500 rounded-lg flex items-center justify-start gap-3 px-3"
	>
		<IconCheckSquare />
		<p class="text-16-med">{{ text }}</p>
	</div>
</template>

<style scoped></style>
