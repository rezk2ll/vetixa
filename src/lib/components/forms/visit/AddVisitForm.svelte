<script lang="ts">
	import TextAreaField from '$components/inputs/TextAreaField.svelte';
	import { addVisitFormStore } from '$store/visit';
	import { superForm } from 'sveltekit-superforms/client';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import MagnifierGlass from '$components/icons/MagnifierGlass.svelte';
	import Vaccination from '$components/icons/Vaccination.svelte';

	export let open = false;

	const { enhance, form, submitting } = superForm($addVisitFormStore, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				open = false;
			}
		},
		taintedMessage: null
	});
</script>

<div class="flex items-center justify-center w-full">
	<svg
		fill="none"
		class="w-8 h-8 text-gray-700 dark:text-gray-300"
		stroke="currentColor"
		stroke-width="1.5"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m3.75 9v6m3-3H9m1.5-12H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
		/>
	</svg>
</div>

<div class="mt-2 text-center">
	<h3
		class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
		id="modal-title"
	>
		Nouvelle visite
	</h3>
	<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
		Veuillez remplir le formulaire ci-dessous avec des détails précis
	</p>
</div>

<form use:enhance action="?/addVisit" class="mt-4 flex flex-col space-y-4 w-full" method="POST">
	<TextAreaField
		label="Motif de la visite"
		name="motif"
		bind:value={$form.motif}
		placeholder="motif"
	/>

	<div class="flex flex-col lg:flex-row gap-2 lg:gap-5 w-full">
		<div class="flex items-center justify-end flex-col w-full pt-5 lg:pt-0">
			<input
				bind:checked={$form.control}
				type="checkbox"
				id="control"
				name="control"
				value={$form.control}
				class="hidden peer"
			/>
			<label
				for="control"
				class="inline-flex items-center justify-between w-full px-2 py-3 text-gray-500 bg-white border-2 border-gray-100 rounded-lg cursor-pointer peer-checked:border-emerald-600 hover:text-gray-600 peer-checked:text-gray-800 hover:bg-gray-50"
			>
				<div class="flex gap-2">
					<MagnifierGlass />
					<div class="w-full text-base pt-1">visite de contrôle</div>
				</div>
			</label>
		</div>
		<div class="flex items-center justify-end flex-col w-full pt-5 lg:pt-0">
			<input
				bind:checked={$form.vaccination}
				type="checkbox"
				id="vaccination"
				name="vaccination"
				value={$form.vaccination}
				class="hidden peer"
			/>
			<label
				for="vaccination"
				class="inline-flex items-center justify-between w-full px-2 py-3 text-gray-500 bg-white border-2 border-gray-100 rounded-lg cursor-pointer peer-checked:border-emerald-600 hover:text-gray-600 peer-checked:text-gray-800 hover:bg-gray-50"
			>
				<div class="flex gap-2">
					<Vaccination />
					<div class="w-full text-base pt-1">consultation vaccinale</div>
				</div>
			</label>
		</div>
	</div>

	<div class="mt-4 sm:flex sm:items-center sm:-mx-2 xl:max-w-lg xl:items-end xl:justify-end">
		<button
			type="button"
			on:click={() => (open = false)}
			class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
		>
			Annuler
		</button>

		<SubmitButton loading={$submitting} disabled={$submitting} />
	</div>
</form>
