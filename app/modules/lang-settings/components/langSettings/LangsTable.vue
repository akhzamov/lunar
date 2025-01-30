<script lang="ts" setup>
import { useLangSettingsStore } from "~/stores/langSettings";

const langStStore = useLangSettingsStore();
const checkAll = ref(false);
const deleteButton = ref(false);
</script>

<template>
  <div
    class="h-max b-bg rounded-xl mt-6 select-none"
    v-if="langStStore.languages"
  >
    <div
      class="flex items-center justify-between rounded-tl-xl rounded-tr-xl border-[1px] border-c px-6 py-3"
    >
      <div class="relative w-max">
        <UiButton
          class="w-max"
          v-if="checkAll"
          @click="deleteButton = !deleteButton"
          text="Массовое действие"
          hover-bg-color="bg-c-gray-t-100 dark:bg-c-gray-t-700"
          p="p-[10px]"
        >
          <template v-slot:icon>
            <IconDotsVertical class="text-c-gray-t-300" />
          </template>
        </UiButton>
        <UiButton
          v-if="deleteButton"
          class="absolute top-[100%] left-0 translate-y-[4px]"
          @click="deleteButton = false"
          text="Удалить отмеченные"
          text-color="text-c-error-600"
          hover-bg-color="bg-c-error-500-30"
          p="p-4"
        >
          <template v-slot:icon-r>
            <IconTrash01 class="text-c-error-600" />
          </template>
        </UiButton>
      </div>
    </div>
    <UiTopAllSelect
      :array="langStStore.languages"
      v-model:check-all="checkAll"
      @update:array="
        (updatedArray: any) => {
          langStStore.languages = updatedArray;
        }
      "
    />
    <div class="flex flex-col border-x-[1px] border-b-[1px] border-c">
      <div class="-m-1.5">
        <div class="p-1.5 min-w-full inline-block align-middle">
          <div class="">
            <table
              class="min-w-full divide-y divide-gray-200 dark:divide-neutral-700"
            >
              <thead>
                <tr>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    <div class="flex items-center gap-3">Язык</div>
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  >
                    Код
                  </th>
                  <th
                    scope="col"
                    class="px-6 py-3 text-start text-xs font-medium text-gray-500 uppercase dark:text-neutral-500"
                  ></th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200 dark:divide-neutral-700">
                <tr
                  v-for="lang in langStStore.languages"
                  :key="lang.id"
                  class="hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700"
                >
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <div class="flex items-center gap-2">
                      <p class="capitalize">{{ lang.name }}</p>
                      <span
                        v-if="lang.default == 1"
                        class="p-[2px] text-[8px] text-white dark:text-c-gray-100 b-bg rounded-md border border-c"
                      >
                        Основной
                      </span>
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span class="lowercase">{{ lang.code }}</span>
                  </td>
                  <td
                    class="px-6 py-4 whitespace-nowrap text-end text-sm font-medium"
                  >
                    <NuxtLink
                      :to="`/lang-settings/${lang.id}/edit`"
                      class="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-c-primary-700 hover:text-c-primary-500 hover:underline"
                    >
                      <IconEdit05 />
                      Изменить
                    </NuxtLink>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    <UiPerPage
      :total-pages="langStStore.languagesMeta?.last_page ?? 0"
      v-model:current-page="langStStore.page"
      v-model:per-page="langStStore.perPage"
    />
  </div>
</template>

<style>
.border-c {
  @apply border-c-gray-t-200 dark:border-c-gray-t-600;
}
</style>
