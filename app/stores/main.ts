import { defineStore } from "pinia";
import type { IMainStore } from "~/types/Stores/mainStore.type";

export const useMainStore = defineStore("main", {
  state: (): IMainStore => ({
    activeSidebarItem: null,
    asideFullWidth: true,
    staff: null,
    loader: false,
    langs: [],
  }),
  actions: {},
});
