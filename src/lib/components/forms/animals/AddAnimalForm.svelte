<script lang="ts">
	import DateField from '$lib/components/inputs/DateField.svelte';
	import NumberField from '$lib/components/inputs/NumberField.svelte';
	import SelectField from '$lib/components/inputs/SelectField.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { addAnimalFormStore } from '$lib/store/animals';
	import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
	import { animalTypeList } from '$utils/animal';

	export let open = false;

	let birthday = '';

	const { enhance, form, submitting } = superForm($addAnimalFormStore, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				open = false;
			}
		}
	});

	$: $form.birthday = new Date(birthday);
</script>

<div>
	<div class="flex items-center justify-center">
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
				d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
			/>
		</svg>
	</div>

	<div class="mt-2 text-center">
		<h3
			class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
			id="modal-title"
		>
			Nouveau animal
		</h3>
		<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
			Veuillez remplir le formulaire ci-dessous avec des détails précis
		</p>
	</div>
</div>

<form use:enhance action="?/addAnimal" class="mt-4" method="POST">
	<TextField name="name" label="Nom" bind:value={$form.name} isInValid={false} />
	<SelectField
		options={animalTypeList}
		label="Espèce"
		name="type"
		bind:value={$form.type}
		isInValid={false}
	/>
	<SelectField
		name="sex"
		options={['male', 'female']}
		label="Sexe"
		bind:value={$form.sex}
		isInValid={false}
	/>
	<DateField
		label="Date de naissance"
		placeholder=""
		bind:value={birthday}
		name="birthday"
		isInValid={false}
	/>
	<NumberField
		label="Poids"
		placeholder="Poids"
		bind:value={$form.weight}
		name="weight"
		isInValid={false}
	/>

	<TextField
		name="color"
		label="Couleur"
		bind:value={$form.color}
		isInValid={false}
		required={false}
	/>
	<TextField
		name="breed"
		label="Race"
		bind:value={$form.breed}
		isInValid={false}
		required={false}
	/>

	<div class="mt-4 sm:flex sm:items-center sm:-mx-2">
		<button
			type="button"
			on:click={() => (open = false)}
			class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
		>
			Annuler
		</button>

		<SubmitButton loading={$submitting} />
	</div>
</form>
