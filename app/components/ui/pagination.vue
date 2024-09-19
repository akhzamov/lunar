<script setup lang="ts">
	const props = defineProps({
		totalPages: {
			type: Number,
			required: true,
		},
		currentPage: {
			type: Number,
			required: true,
		},
		modelValue: {
			type: Number,
			required: true,
		},
	});

	const emit = defineEmits(["update:modelValue"]);

	const displayPages = computed(() => {
		const pagesToDisplay = [];
		const { currentPage, totalPages } = props;

		if (totalPages <= 6) {
			for (let i = 1; i <= totalPages; i++) pagesToDisplay.push(i);
		} else {
			const firstPages = [1, 2, 3];
			const lastPages = [totalPages - 2, totalPages - 1, totalPages];

			if (currentPage < 3 || currentPage > totalPages - 2) {
				pagesToDisplay.push([...firstPages, "...", ...lastPages]);
			} else if (currentPage === 3) {
				pagesToDisplay.push([...firstPages, 4, "...", ...lastPages]);
			} else if (currentPage === totalPages - 2) {
				pagesToDisplay.push([
					...firstPages,
					"...",
					totalPages - 3,
					...lastPages,
				]);
			} else {
				pagesToDisplay.push([
					1,
					"...",
					currentPage - 1,
					currentPage,
					currentPage + 1,
					"...",
					totalPages,
				]);
			}
		}

		return pagesToDisplay;
	});

	const updateCurrentPage = (page: number | string) => {
		if (typeof page === "string") {
			// emit('update:currentPage', Math.round(props.totalPages / 2));
			return;
		} else {
			emit("update:modelValue", page);
		}
	};
	const nextPage = () => {
		if (props.currentPage === props.totalPages) return;

		updateCurrentPage(props.currentPage + 1);
	};
	const prevPage = () => {
		if (props.currentPage === 1) return;

		updateCurrentPage(props.currentPage - 1);
	};
</script>

<template>
	<div
		class="w-max flex items-center justify-center b-border-300 b-bg rounded-md"
	>
		<button
			@click="prevPage"
			v-if="currentPage != 1"
			class="w-[52px] h-[40px] flex items-center justify-center border-r-[1px] b-border-pagination"
		>
			<IconChevronLeft class="h-5 w-5" />
		</button>
		<div class="flex items-center justify-center">
			<div
				v-for="page in displayPages[0]"
				@click="updateCurrentPage(page)"
				class="w-[40px] h-[40px] flex items-center justify-center b-border-pagination text-14-semi"
				:class="[
					{ 'border-r-[1px]': page != totalPages },
					{
						'bg-c-gray-t-100 dark:bg-c-gray-t-700':
							currentPage == page,
					},
				]"
			>
				{{ page }}
			</div>
		</div>
		<button
			@click="nextPage"
			v-if="currentPage != totalPages"
			class="w-[52px] h-[40px] flex items-center justify-center border-l-[1px] b-border-pagination"
		>
			<IconChevronRight class="h-5 w-5" />
		</button>
	</div>
</template>

<style>
	.b-border-pagination {
		@apply border-c-gray-t-300 dark:border-c-gray-t-600 hover:bg-c-gray-t-100 dark:hover:bg-c-gray-t-700;
	}
</style>
