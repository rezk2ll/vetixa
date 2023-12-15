<script lang="ts">
	import Select from 'svelte-select';
	import type {
		SurgicalActsResponse,
		MedicalActsResponse,
		ClinicalExamsResponse
	} from '../../../pocketbase-types';

	export let title: string;
	export let items: SurgicalActsResponse[] | MedicalActsResponse[] | ClinicalExamsResponse[] = [];
	export let open = false;
	export let value: string;

	$: data = items.map((item) => ({
		value: item.id,
		label: item.name
	}));

	const handleChane = (e: any) => {
		value = JSON.stringify(e.detail.map((item: any) => item.value));
	};
</script>

<div>
	<div class="flex items-center justify-center">
		<slot />
	</div>

	<div class="mt-2 text-center">
		<h3
			class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
			id="modal-title"
		>
			{title}
		</h3>
	</div>

	<div class="mt-4 flex flex-col space-y-10 w-full">
		<div class="pt-10 h-44">
			<Select
				on:change={handleChane}
				bind:items={data}
				multiple
				showChevron
				listOffset={10}
				placeholder="veuillez en sélectionner"
			/>
		</div>

		<div class="mt-4 sm:flex sm:items-center sm:-mx-2 xl:justify-end">
			<button
				type="button"
				on:click={() => (open = false)}
				class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
			>
				Annuler
			</button>

			<button
				on:click={() => (open = false)}
				type="button"
				class="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
			>
				Confirmer
			</button>
		</div>
	</div>
</div>
