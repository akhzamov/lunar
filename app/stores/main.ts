import { defineStore } from "pinia";
import type { IMainStore } from "~/types/mainStore.type";

export const useMainStore = defineStore("main", {
	state: (): IMainStore => ({
		activeSidebarItem: null,
		asideFullWidth: true,
	}),
	actions: {},
});
