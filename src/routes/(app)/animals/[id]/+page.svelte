<script lang="ts">
	import { clinicalExams, medicalActs, surgivalActs } from '$lib/store/acts';
	import VisitList from '$lib/components/lists/VisitList.svelte';
	import CollapsibleSection from '$lib/components/CollapsibleSection.svelte';
	import Details from '$lib/components/Details.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ animal } = data);

	$: ({ visits } = animal);

	$: animalDetails = [
		{ name: 'Nom', value: animal.name },
		{ name: 'Espèce', value: animal.type },
		{ name: 'Sexe', value: animal.sex },
		{ name: 'Age', value: animal.birthday, isAge: true },
		{ name: 'Poids', value: animal.weight }
	];

	$: clinicalExams.set(data.clinicalExams);
	$: surgivalActs.set(data.surgicalActs);
	$: medicalActs.set(data.medicalActs);
</script>

<div class="antialiased xl:pl-14">
	<div class="flex flex-col xl:flex-row xl:p-20 w-full pt-5">
		<CollapsibleSection title={`${animal.name}`} color="primary" size="small">
			<Details details={animalDetails} />
		</CollapsibleSection>

		<VisitList data={visits} />
	</div>
</div>
