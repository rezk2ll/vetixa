<script lang="ts">
	import TextAreaField from '$components/inputs/TextAreaField.svelte';
	import { addVisitFormStore } from '$store/visit';
	import { superForm } from 'sveltekit-superforms/client';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import MagnifierGlass from '$components/icons/MagnifierGlass.svelte';
	import Vaccination from '$components/icons/Vaccination.svelte';
	import NewFile from '$components/icons/NewFile.svelte';
	import { toast } from 'svelte-sonner';

	export let open = false;

	const { enhance, form, submitting, allErrors } = superForm($addVisitFormStore, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				open = false;
			}
		},
		taintedMessage: null
	});

	$: $allErrors.map((error) => {
		toast.error(error.messages.join('. '));
	});
</script>

<div class="flex items-center justify-center w-full">
	<NewFile />
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
