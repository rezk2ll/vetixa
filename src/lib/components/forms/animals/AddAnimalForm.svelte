<script lang="ts">
	import DateField from '$components/inputs/DateField.svelte';
	import NumberField from '$components/inputs/NumberField.svelte';
	import SelectField from '$components/inputs/SelectField.svelte';
	import TextField from '$components/inputs/TextField.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { addAnimalFormStore } from '$lib/store/animals';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import { animalTypeList } from '$utils/animal';
	import { toast } from 'svelte-sonner';
	import PlusIcon from '$components/icons/PlusIcon.svelte';

	export let open = false;

	let birthday = '';

	const { enhance, form, submitting, allErrors } = superForm($addAnimalFormStore, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				open = false;
			}
		}
	});

	$: $form.birthday = new Date(birthday);
	$: $allErrors.length &&
		toast.error($allErrors.map((error) => error.messages.join('. ')).join('. '));
</script>

<div>
	<div class="flex items-center justify-center">
		<PlusIcon />
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
	<TextField
		name="identifier"
		label="Identifiant unique"
		bind:value={$form.identifier}
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
