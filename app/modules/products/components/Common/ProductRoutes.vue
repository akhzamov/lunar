<script lang="ts" setup>
	import Edit05 from "~/components/icon/Edit05.vue";
	import Calendar from "~/components/icon/Calendar.vue";
	import Image03 from "~/components/icon/Image03.vue";
	import Colors from "~/components/icon/Colors.vue";

	const route = useRoute();
	const links = reactive([
		{
			id: 1,
			name: "Основная Информация",
			path: "edit",
			icon: Edit05,
		},
		{
			id: 2,
			name: "Доступность",
			path: "availability",
			icon: Calendar,
		},
		{
			id: 3,
			name: "Медиа",
			path: "media",
			icon: Image03,
		},
		{
			id: 4,
			name: "Вариантность",
			path: "variants",
			icon: Colors,
		},
	]);
</script>

<template>
	<div class="w-[260px] flex flex-col gap-2 ml-[-14px] z-[20]">
		<template
			v-for="link in links"
			:key="link.id"
		>
			<NuxtLink
				:to="`/products/${route.params.id}/${link.path}`"
				class="relative h-[40px]"
			>
				<div
					class="h-full flex items-center justify-start gap-2 b-bg border-y-[1px] border-r-[1px] border-c rounded-tr-md rounded-br-md pl-6 pr-3 z-[10] info"
				>
					<component :is="link.icon" />
					<span>{{ link.name }}</span>
				</div>
				<div
					class="w-[15px] h-[38px] b-bg absolute top-0 left-0 z-[20] translate-x-[5px] flex flex-col items-end justify-between line mt-[0.9px]"
				></div>
			</NuxtLink>
		</template>
	</div>
</template>

<style scoped>
	.line {
		opacity: 0;
	}

	.router-link-active .line {
		opacity: 1;
	}

	.router-link-active .info {
		@apply text-c-primary-500;
	}

	.border-c {
		@apply border-c-gray-t-200 dark:border-c-gray-t-600;
	}
</style>
