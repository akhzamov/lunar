import { defineStore } from "pinia";
import type { IAuthStore } from "~/modules/auth/types/authStore.type";

export const useAuthStore = defineStore("auth", {
	state: (): IAuthStore => ({}),
	actions: {},
});
