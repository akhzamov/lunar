<script lang="ts" setup>
	import { useAlertStore } from "~/stores/alert";

	const alertStore = useAlertStore();
</script>

<template>
	<div class="my-8 flex flex-col gap-4">
		<TransitionGroup name="alerts">
			<UiAlertDanger
				v-if="alertStore.dangerAlert.active"
				:text="alertStore.dangerAlert.text"
			/>
			<UiAlertInfo
				v-if="alertStore.infoAlert.active"
				:text="alertStore.infoAlert.text"
			/>
			<UiAlertSuccess
				v-if="alertStore.successAlert.active"
				:text="alertStore.successAlert.text"
			/>
			<UiAlertWarning
				v-if="alertStore.warningAlert.active"
				:text="alertStore.warningAlert.text"
			/>
		</TransitionGroup>
	</div>
</template>

<style>
	.alerts-enter-active,
	.alerts-leave-active {
		transition: all 0.3s ease-in-out;
		transform: scale(1);
	}

	.alerts-enter-from,
	.alerts-leave-to {
		transform: scale(0);
	}
</style>
