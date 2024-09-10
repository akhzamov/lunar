<script lang="ts" setup>
const colorMode = useColorMode()
const userMenu = ref(false)
const userMenuRef = ref<HTMLElement | null>(null)
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
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
    document.removeEventListener('click', handleClickOutside);
});
</script>

<template>
    <header
        class="relative w-full h-[64px] bg-white dark:bg-c-gray-t-800 border-b border-c-gray-t-400 dark:border-transparent">
        <div class="w-full h-full px-6 flex items-center justify-end gap-2">
            <UiInput class="w-[320px] h-[40px]" placeholder="Search" />
            <div @click="userMenu = !userMenu" ref="toggleButtonRef"
                class="w-[40px] h-[40px] flex items-center justify-center rounded-[50%] bg-c-gray-t-400 dark:bg-c-gray-t-500 cursor-pointer">
                <Icon name="heroicons:user-16-solid" class="text-[30px] text-white" />
            </div>
        </div>
        <Transition name="menu">
            <div v-if="userMenu" ref="userMenuRef"
                class="w-[224px] h-max bg-white dark:bg-c-gray-t-800 border border-c-gray-t-300 dark:border-transparent p-2 rounded-lg absolute top-[110%] right-[24px]">
                <div class="w-full h-[34px] flex items-center gap-2">
                    <div
                        class="w-[30px] h-[30px] flex items-center justify-center rounded-[50%] bg-c-gray-t-400 dark:bg-c-gray-t-500 cursor-pointer">
                        <Icon name="heroicons:user-16-solid" class="text-[20px] text-white" />
                    </div>
                    <p class="text-14-ext">AbdulMalik Akhzamov</p>
                </div>
                <div class="grid grid-cols-3 gap-[4px] mt-3">
                    <div @click="colorMode.preference = 'light'"
                        :class="{ 'dark:bg-c-gray-t-700 bg-c-gray-t-100': colorMode.preference == 'light' }"
                        class="cursor-pointer w-full h-9 flex items-center justify-center rounded-md hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700">
                        <Icon name="heroicons:sun" class="text-[24px] dark:text-white text-c-gray-t-400"
                            :class="{ 'text-c-primary-500': colorMode.preference == 'light' }" />
                    </div>
                    <div @click="colorMode.preference = 'dark'"
                        :class="{ 'dark:bg-c-gray-t-700 bg-c-gray-t-100': colorMode.preference == 'dark' }"
                        class="cursor-pointer w-full h-9 flex items-center justify-center rounded-md hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700">
                        <Icon name="heroicons:moon-20-solid" class="text-[24px] dark:text-white text-c-gray-t-400"
                            :class="{ 'text-c-primary-500': colorMode.preference == 'dark' }" />
                    </div>
                    <div @click="colorMode.preference = 'system'"
                        :class="{ 'dark:bg-c-gray-t-700 bg-c-gray-t-100': colorMode.preference == 'system' }"
                        class="cursor-pointer w-full h-9 flex items-center justify-center rounded-md hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700">
                        <Icon name="heroicons:computer-desktop-20-solid"
                            class="text-[24px] dark:text-white text-c-gray-t-400"
                            :class="{ 'text-c-primary-500': colorMode.preference == 'system' }" />
                    </div>
                </div>
            </div>
        </Transition>
    </header>
</template>

<style scoped></style>