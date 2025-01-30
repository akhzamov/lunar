import { defineStore } from "pinia";
import type { IAlertStore } from "~/types/Stores/alertStore.type";

export const useAlertStore = defineStore("alert", {
	state: (): IAlertStore => ({
		dangerAlert: {
			active: false,
			text: "",
		},
		infoAlert: {
			active: false,
			text: "",
		},
		successAlert: {
			active: false,
			text: "",
		},
		warningAlert: {
			active: false,
			text: "",
		},
	}),
	actions: {},
});
