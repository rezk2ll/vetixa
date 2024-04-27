<script lang="ts">
	import CollapsibleSection from '$components/CollapsibleSection.svelte';
	import Details from '$components/Details.svelte';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import TextAreaField from '$components/inputs/TextAreaField.svelte';
	import { currentVisit, updateVisitFormStore } from '$lib/store/visit';
	import { formatDateString } from '$utils/date';
	import { superForm } from 'sveltekit-superforms/client';

	const { enhance, form, submitting } = superForm($updateVisitFormStore, {
		taintedMessage: null,
		resetForm: false
	});

	$: ({ animal } = $currentVisit);

	$: animalDetails = [
		{ name: 'Nom', value: animal.name },
		{ name: 'Espèce', value: animal.type },
		{ name: 'Sexe', value: animal.sex },
		{ name: 'Age', value: animal.birthday, isAge: true },
		{ name: 'Poids', value: animal.weight, prefix: 'Kg' },
		{ name: 'Couleur', value: animal.color },
		{ name: 'Race', value: animal.breed }
	];

	$: clientDetails = [
		{ name: 'Prénom', value: animal.client.firstname },
		{ name: 'Nom', value: animal.client.lastname },
		{ name: 'Téléphone', value: animal.client.tel ?? '-' },
		{ name: 'Email', value: animal.client.email ?? '-' },
		{ name: 'Adresse', value: animal.client.address ?? '-' }
	];

	$: $form.motif = $currentVisit.motif;
</script>

<div class="flex flex-col gap-2">
	<form use:enhance action="?/updateVisit" class="mt-4 flex flex-col w-full" method="POST">
		<input type="hidden" value={$currentVisit.id} name="id" />
		<TextAreaField
			label="Motif de la visite"
			name="motif"
			bind:value={$form.motif}
			placeholder="motif"
		/>

		<div class="flex items-center justify-between px-3 py-2 border-t bg-gray-100">
			<SubmitButton small loading={$submitting} />
			<div class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
				Dernière mise à jour: {formatDateString($currentVisit.updated)}
			</div>
		</div>
	</form>

	<div class="flex flex-row space-x-5 w-full">
		<div class="flex flex-col space-y-5 w-full border-r border-gray-100">
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
