<script lang="ts" setup>
	import IconBarChartSquare02 from "~/components/icon/BarChartSquare02.vue";
	import IconLayersThree02 from "~/components/icon/LayersThree02.vue";
	import IconCheckDone01 from "~/components/icon/CheckDone01.vue";
	import IconSettings01 from "~/components/icon/Settings01.vue";
	import IconTag03 from "~/components/icon/Tag03.vue";
	import { useMainStore } from "~/stores/main";

	const mainStore = useMainStore();
	const colorMode = useColorMode();
	const route = useRoute();
	const sidebarWidthClass = ref("w-[280px]");
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
					title: "Товары",
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
	const handleShowFullSidebar = () => {};

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
				sidebarWidthClass.value = "w-[65px]";
			}
			if (!asideFullWidth.value) {
				activeMenuChild.value = true;
				sidebarWidthClass.value = "w-[65px]";
			} else {
				activeMenuChild.value = false;
				activeDashboardLinkMenu.value = false;
				sidebarWidthClass.value = "w-[280px]";
			}
		},
		{ immediate: true }
	);
</script>

<template>
	<div
		class="sticky top-0 left-0 z-[300] h-screen flex flex-col b-bg border-r border-c-gray-t-200 dark:border-c-gray-t-600"
		@mouseleave="handleMouseleaveInSidebar()"
	>
		<div
			class="w-max h-max flex flex-col items-start justify-start transition duration-300"
		>
			<div
				class="mt-5 ml-4 w-8 h-8 b-border-300 bg-c-gray-t-50 dark:bg-c-gray-t-700 rounded-md flex items-center justify-center"
			>
				<img
					src="/logo.svg"
					class="w-6 h-6"
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
					class="transition-all duration-300"
					:class="{ 'rotate-[180deg]': !mainStore.asideFullWidth }"
				/>
			</div>
			<ul
				class="w-full flex flex-col items-center justify-start gap-1 mt-10"
			>
				<li
					class="w-full flex items-start justify-start cursor-pointer"
				>
					<div
						class="w-1 h-[40px] rounded-tr-lg rounded-br-lg"
						:class="{
							'bg-c-primary-500': activeDashboardLinkMenu,
							'bg-transparent': !activeDashboardLinkMenu,
						}"
					></div>
					<div
						class="relative link-active-block flex-grow h-full flex flex-col items-start ml-2 mr-2 px-2 rounded-md"
					>
						<nuxtLink
							to="/dashboard"
							class="h-[40px] flex items-center justify-start gap-3"
							@mouseenter="handleMouseenterOnDashboardLink()"
						>
							<IconBarChartSquare02
								class="link-active-icon w-[25px]"
								:class="{
									'text-c-primary-500': activeDashboardLinkMenu,
								}"
							/>
							<TransitionGroup name="link-text">
								<div
									v-if="mainStore.asideFullWidth"
									class="flex items-center gap-10"
								>
									<span
										class="link-active-text text-16-med min-w-[100px] w-max"
									>
										Дашборд
									</span>
									<IconArrowOnSquare class="link-active-text" />
								</div>
							</TransitionGroup>
						</nuxtLink>
						<Transition name="sidebar-link-menu-hover">
							<div
								v-if="
									activeDashboardLinkMenu && !mainStore.asideFullWidth
								"
								@click.stop
								class="sidebar-link-menu-hover b-bg"
							>
								<div
									class="w-2 h-[40px] rounded-tr-lg rounded-br-lg absolute top-0 left-0 translate-x-[-2px] b-bg"
								></div>
								<nuxtLink
									to="/dashboard"
									class="w-full h-[40px] flex items-center justify-start mt-2 mb-2"
								>
									<IconBarChartSquare02
										class="link-active-icon w-[25px]"
									/>
									<span class="link-active-text ml-3 text-16-med">
										Дашборд
									</span>
								</nuxtLink>
							</div>
						</Transition>
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
						@mouseenter="handleMouseenterOnItem(item.id)"
					>
						<div
							class="h-[40px] flex items-center justify-between gap-3"
						>
							<component
								:is="item.icon"
								class="link-active-icon w-[25px]"
								:class="{ 'text-c-primary-500': item.isActive }"
							/>
							<Transition name="link-text">
								<div
									v-if="mainStore.asideFullWidth"
									class="flex items-center gap-10"
								>
									<span
										class="link-active-text text-16-med min-w-[100px] w-max"
										:class="[{ 'text-c-primary-500': item.isActive }]"
									>
										{{ item.title }}
									</span>
									<IconChevronUp
										:class="[
											{
												'text-c-primary-500 rotate-[180deg]':
													item.isActive,
											},
										]"
									/>
								</div>
							</Transition>
						</div>
						<Transition name="sidebar-link-menu-full">
							<div
								v-if="item.isActive && mainStore.asideFullWidth"
								@click.stop
								class="flex flex-col items-start justify-center mr-2 px-2 gap transition duration-300"
							>
								<template
									v-for="child in item.child"
									:key="child.id"
								>
									<div
										class="w-full"
										v-if="
											activeMenuChild && !mainStore.asideFullWidth
										"
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
										v-if="
											activeMenuChild && !mainStore.asideFullWidth
										"
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
						</Transition>
						<Transition name="sidebar-link-menu-hover">
							<div
								v-if="item.isActive && !mainStore.asideFullWidth"
								@click.stop
								class="sidebar-link-menu-hover b-bg"
							>
								<div
									class="w-2 h-[40px] rounded-tr-lg rounded-br-lg absolute top-0 left-0 translate-x-[-2px] b-bg"
								></div>
								<template
									v-for="child in item.child"
									:key="child.id"
								>
									<div class="w-full mt-2">
										<span
											class="w-full text-left text-16-med text-c-primary-500"
										>
											{{ item.title }}
										</span>
										<div
											class="w-full h-[1px] bg-c-gray-t-200 dark:bg-c-gray-t-600 mt-2 mb-4"
										></div>
									</div>
									<nuxtLink
										:to="child.path"
										class="w-full h-[40px] flex items-center justify-start mb-2"
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
									<div class="w-full mt-2">
										<span
											class="w-full text-left text-16-med text-c-primary-500"
										>
											{{ item.title }}
										</span>
										<div
											class="w-full h-[1px] bg-c-gray-t-200 dark:bg-c-gray-t-600 mt-2 mb-4"
										></div>
									</div>
									<div
										class="w-full h-[40px] flex items-center justify-start mb-2"
									>
										<IconFolderClosed class="link-active-icon" />
										<span class="link-active-text ml-3 text-16-med">
											Пусто
										</span>
									</div>
								</template>
							</div>
						</Transition>
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

	.sidebar-link-menu-hover {
		@apply flex flex-col items-start justify-center mr-2 px-2 transition duration-300 absolute top-0 left-0 translate-x-[50px];
	}
	.sidebar-link-menu-hover {
		@apply border-y-[1px] border-r-[1px] border-c-gray-t-300 dark:border-c-gray-t-600 rounded-tr-md rounded-br-md;
	}

	.link-text-enter-active,
	.link-text-leave-active {
		transition: all 0.3s ease-in-out;
		opacity: 1;
		transform: translateX(0);
	}

	.link-text-enter-from,
	.link-text-leave-to {
		transition: all 0.3s ease-in-out;
		opacity: 0;
		transform: translateX(-42px);
	}

	.sidebar-link-menu-full-enter-active,
	.sidebar-link-menu-full-leave-active {
		transition: all 0.3s ease-in-out;
		opacity: 1;
		transform: translateY(0);
	}

	.sidebar-link-menu-full-enter-from,
	.sidebar-link-menu-full-leave-to {
		transition: all 0.3s ease-in-out;
		opacity: 0;
		transform: translateY(-20px);
	}

	.sidebar-link-menu-hover-enter-active,
	.sidebar-link-menu-hover-leave-active {
		transition: all 0.3s ease-in-out;
		opacity: 1;
		left: 0;
	}

	.sidebar-link-menu-hover-enter-from,
	.sidebar-link-menu-hover-leave-to {
		transition: all 0.3s ease-in-out;
		opacity: 0;
		left: -100%;
	}
</style>
