import { defineStore } from "pinia";
import type { ILangSettingsStore } from "~/types/Stores/langSettingsStore.type";

export const useLangSettingsStore = defineStore("langSettings", {
  state: (): ILangSettingsStore => ({
    languages: null,
    languageId: null,
    languagesMeta: null,
    page: 1,
    perPage: 10,
  }),
  actions: {},
});
