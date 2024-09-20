<script lang="ts" setup>
	const router = useRouter();
	const colorMode = useColorMode();
	const userMenu = ref(false);
	const authCookie = useCookie("auth");
	const userMenuRef = ref<HTMLElement | null>(null);
	const toggleButtonRef = ref<HTMLElement | null>(null);

	const handleClickOutside = (event: MouseEvent) => {
		if (
			userMenu.value &&
			userMenuRef.value &&
			!userMenuRef.value.contains(event.target as Node) &&
			toggleButtonRef.value &&
			!toggleButtonRef.value.contains(event.target as Node)
		) {
			userMenu.value = false;
		}
	};

	const logOut = () => {
		router.push("/sign-in");
		authCookie.value = null;
	};

	onMounted(() => {
		document.addEventListener("click", handleClickOutside);
	});

	onBeforeUnmount(() => {
		document.removeEventListener("click", handleClickOutside);
	});
</script>

<template>
	<header
		class="sticky top-0 right-0 z-20 w-full h-[64px] b-bg border-b border-c-gray-t-200 dark:border-c-gray-t-600"
	>
		<div
			class="w-full h-full px-6 flex items-center justify-end gap-2"
		>
			<UiInputIcon
				class="w-[320px]"
				iconPosition="left"
			>
				<template v-slot:icon-l>
					<IconSearchLg />
				</template>
			</UiInputIcon>
			<div
				@click="userMenu = !userMenu"
				ref="toggleButtonRef"
				class="w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-c-gray-t-200 dark:bg-c-gray-t-600 cursor-pointer"
			>
				<IconUser01
					class="text-c-gray-t-500 dark:text-c-gray-t-200 w-[30px] h-[30px]"
				/>
			</div>
		</div>
		<Transition name="menu">
			<div
				v-if="userMenu"
				ref="userMenuRef"
				class="w-[224px] h-max b-bg b-border px-2 py-4 rounded-lg absolute top-[110%] right-[24px]"
			>
				<div class="w-full h-[34px] flex items-center gap-2">
					<div
						class="w-[30px] h-[30px] flex items-center justify-center rounded-[50%] bg-c-gray-t-200 dark:bg-c-gray-t-600 cursor-pointer"
					>
						<IconUser01
							class="text-c-gray-t-600 dark:text-c-gray-t-200 w-[20px] h-[20px]"
						/>
					</div>
					<p
						class="text-14-reg text-c-gray-t-600 dark:text-c-gray-t-200"
					>
						AbdulMalik Akhzamov
					</p>
				</div>
				<div class="grid grid-cols-3 gap-[4px] mt-3">
					<div
						@click="colorMode.preference = 'light'"
						:class="{
							'dark:bg-c-gray-t-700 bg-c-gray-t-100':
								colorMode.preference == 'light',
						}"
						class="cursor-pointer w-full h-9 flex items-center justify-center rounded-md hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700"
					>
						<IconSun01
							class="w-[24px] h-[24px] dark:text-white text-c-gray-t-400"
							:class="{
								'text-c-primary-500': colorMode.preference == 'light',
							}"
						/>
					</div>
					<div
						@click="colorMode.preference = 'dark'"
						:class="{
							'dark:bg-c-gray-t-700 bg-c-gray-t-100':
								colorMode.preference == 'dark',
						}"
						class="cursor-pointer w-full h-9 flex items-center justify-center rounded-md hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700"
					>
						<IconMoon01
							class="w-[24px] h-[24px] dark:text-white text-c-gray-t-400"
						/>
					</div>
					<div
						@click="colorMode.preference = 'system'"
						:class="{
							'dark:bg-c-gray-t-700 bg-c-gray-t-100':
								colorMode.preference == 'system',
						}"
						class="cursor-pointer w-full h-9 flex items-center justify-center rounded-md hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700"
					>
						<IconComputerDesktop01
							class="w-[24px] h-[24px] dark:text-white text-c-gray-t-400"
						/>
					</div>
				</div>
				<div class="w-full h-[34px] flex items-center mt-6">
					<UiButton
						class="w-full"
						text="Выйти"
						hover-bg-color="bg-c-gray-t-100 dark:bg-c-gray-t-700"
						p="p-[10px]"
						@click="logOut"
					></UiButton>
				</div>
			</div>
		</Transition>
	</header>
</template>

<style scoped></style>
