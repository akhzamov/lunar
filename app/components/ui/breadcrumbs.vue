<script lang="ts" setup>
	import type { Breadcrumb } from "~/types/breadcrumb.typ";

	const props = defineProps({
		breadcrumbs: {
			type: Array as PropType<Breadcrumb[]>,
			required: true,
		},
	});
</script>

<template>
	<ul class="h-[28px] flex items-center justify-start gap-1 mb-4">
		<li class="flex items-center">
			<NuxtLink to="/">
				<IconHomeLine
					class="text-c-gray-t-500 dark:text-c-gray-t-50"
				/>
			</NuxtLink>
			<IconChevronRight class="text-c-gray-t-300 ml-2" />
		</li>
		<template
			v-for="(crumb, index) in props.breadcrumbs"
			:key="crumb.id"
		>
			<li
				v-if="breadcrumbs.length > 0 && crumb.path != '/'"
				class="flex items-center"
			>
				<NuxtLink
					:to="crumb.path"
					v-if="crumb.path.length > 0"
					class="px-2 py-1 rounded-md text-c-gray-t-600 dark:text-c-gray-t-200"
				>
					{{ crumb.name }}
				</NuxtLink>
				<span
					v-if="crumb.path.length <= 0"
					class="px-2 py-1 rounded-md text-c-gray-t-600 dark:text-c-gray-t-200"
				>
					{{ crumb.name }}
				</span>
				<IconChevronRight
					v-if="index !== breadcrumbs.length - 1"
					class="text-c-gray-t-300 ml-2"
				/>
			</li>
		</template>
	</ul>
</template>

<style scoped>
	.router-link-active {
		@apply bg-c-gray-t-100 dark:bg-c-gray-t-800;
	}
</style>
