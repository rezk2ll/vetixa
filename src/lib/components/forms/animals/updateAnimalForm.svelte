<script lang="ts">
	import DateField from '$components/inputs/DateField.svelte';
	import NumberField from '$components/inputs/NumberField.svelte';
	import SelectField from '$components/inputs/SelectField.svelte';
	import TextField from '$components/inputs/TextField.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { currentAnimal, updateAnimalFormStore } from '$store/animals';
	import { format } from 'date-fns';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import { animalTypeList } from '$utils/animal';
	import { toast } from 'svelte-sonner';
	import EditIcon from '$components/icons/EditIcon.svelte';

	export let open = false;

	const { enhance, form, submitting, allErrors } = superForm($updateAnimalFormStore, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				open = false;
			}
		},
		resetForm: false,
		dataType: 'json',
		taintedMessage: null
	});

	let birthday = format(new Date($currentAnimal.birthday), 'yyyy-MM-dd');
	let deathdate = format(
		$currentAnimal.deathdate ? new Date($currentAnimal.deathdate) : new Date(),
		'yyyy-MM-dd'
	);
	let deceased = $currentAnimal.deceased;

	$: $form.id = $currentAnimal.id;
	$: $form.birthday = new Date(birthday);
	$: $form.name = $currentAnimal.name;
	$: $form.sex = $currentAnimal.sex;
	$: $form.type = $currentAnimal.type;
	$: $form.weight = $currentAnimal.weight;
	$: $form.color = $currentAnimal.color;
	$: $form.breed = $currentAnimal.breed;
	$: $form.deceased = deceased;
	$: $form.identifier = $currentAnimal.identifier;
	$: $form.deathdate = $form.deceased ? new Date(deathdate) : undefined;

	$: $allErrors.map((error) => {
		toast.error(error.messages.join('. '));
	});
</script>

<div>
	<div class="flex items-center justify-center">
		<EditIcon />
	</div>
	<div class="mt-2 text-center">
		<h3
			class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
			id="modal-title"
		>
			mettre à jour {$currentAnimal.name}
		</h3>
		<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
			Veuillez remplir le formulaire ci-dessous avec des détails précis
		</p>
	</div>
</div>
<form use:enhance action="?/updateAnimal" class="mt-4" method="POST">
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
	<div class="mt-4 w-full">
		<input
			type="checkbox"
			id="deceased"
			bind:value={deceased}
			bind:checked={deceased}
			class="hidden peer"
		/>
		<label
			for="deceased"
			class="inline-flex items-center justify-between p-5 w-full text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-red-600 hover:text-gray-600 peer-checked:text-gray-600 hover:bg-gray-50"
		>
			<div class="w-full">
				{#if $form.deceased}
					<div class="w-full text-red-500 text-left">L'animal est décédé</div>
					<DateField
						label="Date de décès"
						placeholder=""
						bind:value={deathdate}
						name="deathdate"
						isInValid={false}
					/>
				{:else}
					<div class="w-full text-green-500 text-left">L'animal est vivant</div>
				{/if}
			</div>
		</label>
	</div>

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
