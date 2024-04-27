<script lang="ts">
	import TextAreaField from '$lib/components/inputs/TextAreaField.svelte';
	import { enhance } from '$app/forms';
	import ActSelect from '../dispaly/ActSelect.svelte';
	import Flask from '../icons/Flask.svelte';
	import Nurse from '../icons/Nurse.svelte';
	import Syringe from '../icons/Syringe.svelte';
	import FileField from '$lib/components/inputs/FileField.svelte';
	import CollapsibleFormSection from '../CollapsibleFormSection.svelte';
	import { clinicalExams, medicalActs, surgicalActs } from '$lib/store/acts';

	export let open = false;
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
	<CollapsibleFormSection shadow={false} color="info" title="Motif de la visite" size="full">
		<TextAreaField label="" name="motif" value="" placeholder="motif" />
	</CollapsibleFormSection>
	<div class="grid grid-cols-1 gap-8 mt-8 xl:mt-12 xl:gap-12 md:grid-cols-2 xl:grid-cols-3">
		<ActSelect
			name="clinical_exams"
			title="Examens cliniques"
			description="l'évaluation approfondie de la santé générale de l'animal.
			Ces examens sont généralement effectués lors de visites régulières ou en réponse à des préoccupations spécifiques"
			items={$clinicalExams}
		>
			<Flask />
		</ActSelect>
		<ActSelect
			name="surgical_acts"
			title="Actes chirurgicaux"
			description="Les interventions chirurgicales ou opérations pratiquées sur l'animal."
			items={$surgicalActs}
		>
			<Nurse />
		</ActSelect>
		<ActSelect
			name="medical_acts"
			title="Actes médicaux"
			description="Les interventions médicales visant à diagnostiquer, traiter, et maintenir la santé l'animal"
			items={$medicalActs}
		>
			<Syringe />
		</ActSelect>
	</div>
	<CollapsibleFormSection shadow={false} color="info" title="Analyses" size="full" show={false}>
		<FileField name="file" description="Fichiers d'analyses" />
	</CollapsibleFormSection>
	<CollapsibleFormSection shadow={false} color="info" title="Observations" size="full" show={false}>
		<TextAreaField label="" name="observations" value="" placeholder="observations" />
	</CollapsibleFormSection>
	<CollapsibleFormSection
		shadow={false}
		color="info"
		title="Conduites à faire"
		size="full"
		show={false}
	>
		<TextAreaField label="" name="actions" value="" placeholder="conduites" />
	</CollapsibleFormSection>

	<div class="mt-4 sm:flex sm:items-center sm:-mx-2 xl:max-w-lg xl:items-end xl:justify-end">
		<button
			type="button"
			on:click={() => (open = false)}
			class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
		>
			Annuler
		</button>

		<button
			type="submit"
			class="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
		>
			Confirmer
		</button>
	</div>
</form>
