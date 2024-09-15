<script lang="ts" setup>
	import IconBarChartSquare02 from "~/components/icon/BarChartSquare02.vue";
	import IconLayersThree02 from "~/components/icon/LayersThree02.vue";
	import IconCheckDone01 from "~/components/icon/CheckDone01.vue";
	import IconSettings01 from "~/components/icon/Settings01.vue";
	import IconTag03 from "~/components/icon/Tag03.vue";
	import { useMainStore } from "~/stores/main";

	const sidebarRef = ref<HTMLElement | null>(null);
	const mainStore = useMainStore();
	const route = useRoute();
	const menuItems = reactive([
		{
			id: 1,
			title: "Каталог",
			icon: markRaw(IconLayersThree02),
			isActive: false,
			child: [
				{
					id: 1,
					itemID: 1,
					title: "Продукты",
					path: "/products",
					icon: markRaw(IconTag03),
				},
			],
		},
		{
			id: 3,
			title: "Продажи",
			icon: markRaw(IconCheckDone01),
			isActive: false,
			child: [],
		},
		{
			id: 4,
			title: "Настройки",
			icon: markRaw(IconSettings01),
			isActive: false,
			child: [],
		},
	]);
	const activeMenuChild = ref(false);
	const activeDashboardLinkMenu = ref(false);
	const asideFullWidth = computed(() => mainStore.asideFullWidth);
	const handleActiveItem = (id: number) => {
		if (asideFullWidth.value) {
			menuItems.forEach((item) => {
				if (item.id == id) {
					if (item.isActive) {
						item.isActive = false;
					} else {
						item.isActive = item.id == id;
					}
				}
			});
		}
	};
	const handleMouseenterOnItem = (id: number) => {
		activeDashboardLinkMenu.value = false;
		if (!asideFullWidth.value) {
			activeMenuChild.value = true;
			menuItems.forEach((item) => {
				item.isActive = false;
				if (item.id == id) {
					item.isActive = true;
				}
			});
		}
	};
	const handleMouseleaveInSidebar = () => {
		if (activeMenuChild.value && !asideFullWidth.value) {
			activeDashboardLinkMenu.value = false;
			activeMenuChild.value = false;
			menuItems.forEach((item) => {
				item.isActive = false;
			});
		}
	};
	const handleMouseenterOnDashboardLink = () => {
		if (!asideFullWidth.value) {
			menuItems.forEach((item) => {
				item.isActive = false;
			});
			activeDashboardLinkMenu.value = true;
		}
	};
	onMounted(() => {
		menuItems.forEach((item) => {
			item.child.forEach((child) => {
				if (child.path == route.path) {
					item.isActive = true;
				}
			});
		});
	});

	watch(
		[asideFullWidth, menuItems, activeMenuChild],
		() => {
			if (!asideFullWidth.value && !activeMenuChild.value) {
				menuItems.forEach((item) => {
					item.isActive = false;
				});
			}
			if (!asideFullWidth.value) {
				activeMenuChild.value = true;
			} else {
				activeMenuChild.value = false;
				activeDashboardLinkMenu.value = false;
			}
		},
		{ immediate: true }
	);
</script>

<template>
	<div
		class="sticky top-0 left-0 z-30 h-screen flex flex-col b-bg border-r border-c-gray-t-200 dark:border-c-gray-t-600 transition-all duration-200"
		:class="{
			'w-[280px]': mainStore.asideFullWidth,
			'w-[60px]': !mainStore.asideFullWidth,
		}"
		ref="sidebarRef"
		@mouseleave="handleMouseleaveInSidebar()"
	>
		<div class="w-full flex flex-col items-center justify-start">
			<div class="mt-4">
				<img
					src="/img/lunar-logo-dark.svg"
					alt=""
					class="w-[120px] hidden dark:block"
					v-if="mainStore.asideFullWidth"
				/>
				<img
					src="/img/lunar-logo.svg"
					alt=""
					class="w-[120px] block dark:hidden"
					v-if="mainStore.asideFullWidth"
				/>
				<img
					src="/lunar-icon.png"
					alt=""
					v-if="!mainStore.asideFullWidth"
				/>
			</div>
			<div
				class="b-bg w-[4px] h-[38px] flex absolute top-0 right-0 translate-x-[2px] translate-y-[13px] z-[60]"
			></div>
			<div
				class="w-[40px] h-[40px] flex items-center justify-center border-y border-r border-c-gray-200 dark:border-c-gray-t-600 rounded-tr-lg rounded-br-lg absolute top-0 right-0 translate-x-[40px] z-50 translate-y-[12px] cursor-pointer"
				@click="mainStore.asideFullWidth = !mainStore.asideFullWidth"
			>
				<Icon
					name="heroicons:chevron-left"
					class="transition-all duration-200"
					:class="{ 'rotate-[180deg]': !mainStore.asideFullWidth }"
				/>
			</div>
			<component is="UiInput" />
			<ul
				class="w-full flex flex-col items-center justify-start gap-1 mt-10"
			>
				<li
					class="w-full flex items-start justify-start cursor-pointer"
				>
					<div class="w-1 h-[40px] rounded-tr-lg rounded-br-lg"></div>
					<div
						class="relative link-active-block flex-grow h-full flex flex-col items-start ml-2 mr-2 px-2 rounded-md"
					>
						<nuxtLink
							to="/dashboard"
							class="w-full h-[40px] flex items-center justify-start"
							@mouseenter="handleMouseenterOnDashboardLink()"
						>
							<IconBarChartSquare02 class="link-active-icon" />
							<span
								v-if="mainStore.asideFullWidth"
								class="link-active-text ml-3 text-16-med"
							>
								Дашборд
							</span>
						</nuxtLink>
						<div
							class="flex flex-col items-start justify-center mr-2 px-2 gap transition duration-300"
							:class="{
								'h-max overflow-visible opacity-100':
									activeDashboardLinkMenu,
								'h-0 overflow-hidden opacity-0':
									!activeDashboardLinkMenu,
								'absolute z-40 top-[100] left-[100%] translate-x-[9px] translate-y-[-20%] px-4 py-2':
									!mainStore.asideFullWidth,
								'b-bg b-border rounded-lg': !mainStore.asideFullWidth,
							}"
						>
							<nuxtLink
								to="/dashboard"
								class="w-full h-[40px] flex items-center justify-center"
							>
								<!-- <IconBarChartSquare02 class="link-active-icon" /> -->
								<span class="link-active-text text-16-med">
									Дашборд
								</span>
							</nuxtLink>
						</div>
					</div>
				</li>
				<li
					class="w-full flex items-start justify-start cursor-pointer"
					v-for="item in menuItems"
					:key="item.id"
					@click="handleActiveItem(item.id)"
				>
					<div
						class="w-1 h-[40px] rounded-tr-lg rounded-br-lg"
						:class="{
							'bg-c-primary-500': item.isActive,
							'bg-transparent': !item.isActive,
						}"
					></div>
					<div
						class="relative link-active-block flex-grow h-full flex flex-col items-start ml-2 mr-2 px-2 rounded-md"
					>
						<div
							class="w-full h-[40px] flex items-center justify-between"
							@mouseenter="handleMouseenterOnItem(item.id)"
						>
							<div class="flex items-center justify-start">
								<component
									:is="item.icon"
									class="link-active-icon"
									:class="{ 'text-c-primary-500': item.isActive }"
								/>
								<span
									v-if="mainStore.asideFullWidth"
									class="link-active-text ml-3 text-16-med"
									:class="{ 'text-c-primary-500': item.isActive }"
								>
									{{ item.title }}
								</span>
							</div>
							<div>
								<IconChevronUp
									v-if="mainStore.asideFullWidth"
									class="ml-4"
									:class="{
										'text-c-primary-500 rotate-[180deg]':
											item.isActive,
									}"
								/>
							</div>
						</div>
						<div
							class="flex flex-col items-start justify-center mr-2 px-2 gap transition duration-300"
							:class="{
								'h-max overflow-visible opacity-100 w-full':
									item.isActive,
								'h-0 overflow-hidden opacity-0': !item.isActive,
								'absolute z-40 top-[0] left-[100%] translate-x-[9px] px-4 py-2 w-max':
									!mainStore.asideFullWidth,
								'b-bg b-border rounded-lg': !mainStore.asideFullWidth,
							}"
							@click.stop
						>
							<template
								v-for="child in item.child"
								:key="child.id"
							>
								<div
									class="w-full"
									v-if="activeMenuChild && !mainStore.asideFullWidth"
								>
									<span
										class="w-full text-left text-16-med text-c-primary-500"
									>
										{{ item.title }}
									</span>
									<div
										class="w-full h-[1px] bg-c-gray-t-200 dark:bg-c-gray-t-600 mt-1 mb-4"
									></div>
								</div>
								<nuxtLink
									:to="child.path"
									class="w-full h-[40px] flex items-center justify-start"
								>
									<component
										:is="child.icon"
										class="link-active-icon"
									/>
									<span class="link-active-text ml-3 text-16-med">
										{{ child.title }}
									</span>
								</nuxtLink>
							</template>
							<template v-if="item.child.length < 1">
								<div
									class="w-full"
									v-if="activeMenuChild && !mainStore.asideFullWidth"
								>
									<span
										class="w-full text-left text-16-med text-c-primary-500"
									>
										{{ item.title }}
									</span>
									<div
										class="w-full h-[1px] bg-c-gray-t-200 dark:bg-c-gray-t-600 mt-1 mb-4"
									></div>
								</div>
								<div
									class="w-full h-[40px] flex items-center justify-start"
								>
									<IconFolderClosed class="link-active-icon" />
									<span class="link-active-text ml-3 text-16-med">
										Пусто
									</span>
								</div>
							</template>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
	.router-link-active .link-active-line {
		@apply bg-c-primary-500;
	}
	.router-link-active .link-active-icon {
		@apply text-c-primary-500;
	}
	.router-link-active .link-active-text {
		@apply text-c-primary-500;
	}
</style>
