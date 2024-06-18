<script lang="ts">
	import Details from '$components/Details.svelte';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import NumberField from '$components/inputs/NumberField.svelte';
	import TextAreaField from '$components/inputs/TextAreaField.svelte';
	import TextField from '$components/inputs/TextField.svelte';
	import { currentVisit, updateVisitFormStore } from '$lib/store/visit';
	import type { entityDetailsList } from '$types';
	import { formatDateString } from '$utils/date';
	import { superForm } from 'sveltekit-superforms/client';

	const { enhance, form, submitting } = superForm($updateVisitFormStore, {
		taintedMessage: null,
		resetForm: false,
		dataType: 'json'
	});

	$: ({ animal } = $currentVisit);

	$: animalDetails = [
		{ name: 'Nom', value: animal.name },
		{ name: 'Espèce', value: animal.type },
		{ name: 'Sexe', value: animal.sex },
		{ name: 'Age', value: animal.birthday, isAge: true },
		{ name: 'Poids', value: animal.weight, prefix: 'Kg' },
		{ name: 'Couleur', value: animal.color },
		{ name: 'Race', value: animal.breed },
		...(animal.deceased ? [{ name: 'Décédé le', value: formatDateString(animal.deathdate) }] : [])
	] satisfies entityDetailsList;

	$: clientDetails = [
		{ name: 'Prénom', value: animal.client.firstname },
		{ name: 'Nom', value: animal.client.lastname },
		{ name: 'Téléphone', value: animal.client.tel ?? '-' },
		{ name: 'Email', value: animal.client.email ?? '-' },
		{ name: 'Adresse', value: animal.client.address ?? '-' }
	];

	$: $form.motif = $currentVisit.motif;
	$: $form.id = $currentVisit.id;
	$: $form.doctor = $currentVisit.doctor;
	$: $form.visit_price = $currentVisit.visit_price;
</script>

<div class="flex flex-col gap-2">
	<form
		use:enhance
		action="?/updateVisit"
		class="mt-4 flex flex-col w-full px-2 lg:px-0"
		method="POST"
	>
		<input type="hidden" bind:value={$currentVisit.id} name="id" />
		<div class="flex flex-col pb-1">
			<TextAreaField
				label="Motif de la visite"
				name="motif"
				bind:value={$form.motif}
				placeholder="motif"
			/>
			<div class="flex flex-col lg:flex-row lg:gap-5 h-full justify-center">
				<TextField
					name="doctor"
					label="Docteur"
					bind:value={$form.doctor}
					isInValid={false}
					required={false}
				/>

				<NumberField
					label="Prix du consultation"
					name="visit_price"
					bind:value={$form.visit_price}
					placeholder=""
					isInValid={false}
				/>
			</div>
		</div>

		<div class="flex items-center justify-between px-3 py-2 border-t bg-gray-100">
			<SubmitButton small loading={$submitting} />
			<div class="flex flex-col gap-1 lg:flex-row px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
        <div>
          Dernière mise à jour:
        </div>
        <div>
          {formatDateString($currentVisit.updated)}
        </div>
			</div>
		</div>
	</form>

	<div class="flex flex-col lg:flex-row px-2 lg:space-x-5 w-full">
		<div class="flex flex-col space-y-5 w-full">
			<div
				class="flex justify-between px-5 py-4 border-b rounded-lg border-gray-100 bg-blueGray-200 w-full"
			>
				Animal
			</div>
			<div class="px-4">
				<Details details={animalDetails} />
			</div>
		</div>
		<div class="flex flex-col space-y-5 w-full">
			<div
				class="flex justify-between px-5 py-4 border-b rounded-lg border-gray-100 bg-blueGray-200 w-full"
			>
				Client
			</div>
			<div class="px-4">
				<Details details={clientDetails} />
			</div>
		</div>
	</div>
</div>
