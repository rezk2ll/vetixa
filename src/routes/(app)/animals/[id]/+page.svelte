<script lang="ts">
	import { clinicalExams, medicalActs, surgicalActs } from '$lib/store/acts';
	import VisitList from '$components/lists/VisitList.svelte';
	import CollapsibleSection from '$components/CollapsibleSection.svelte';
	import Details from '$components/Details.svelte';
	import type { PageData } from './$types';
	import Modal from '$components/Modal.svelte';
	import UpdateAnimalForm from '$components/forms/animals/updateAnimalForm.svelte';
	import { currentAnimal, updateAnimalFormStore } from '$store/animals';
	import {
		addVisitFormStore,
		deleteVisitFormStore,
		updateVisitFormStore,
		visitItems
	} from '$store/visit';
	import { formatDateString, formatDateStringShort } from '$utils/date';
	import type { entityDetailsList } from '$types';

	export let data: PageData;

	let openUpdateModal = false;

	$: ({ animal, isNew } = data);
	$: ({ visits } = animal);

	$: animalDetails = [
		{ name: 'Nom', value: animal.name },
		{ name: 'Propriétaire', value: animal.client },
		{ name: 'Espèce', value: animal.type },
		{ name: 'Sexe', value: animal.sex },
		{ name: 'Date de naissance', value: formatDateStringShort(animal.birthday) },
		{ name: 'Age', value: animal.birthday, isAge: true },
		{ name: 'Poids', value: animal.weight, prefix: 'Kg' },
		{ name: 'Couleur', value: animal.color },
		{ name: 'Race', value: animal.breed },
		...(animal.deceased ? [{ name: 'Décédé le', value: formatDateString(animal.deathdate) }] : [])
	] satisfies entityDetailsList;

	$: clinicalExams.set(data.clinicalExams);
	$: surgicalActs.set(data.surgicalActs);
	$: medicalActs.set(data.medicalActs);
	$: updateAnimalFormStore.set(data.form);
	$: addVisitFormStore.set(data.addForm);
	$: updateVisitFormStore.set(data.updateForm);
	$: deleteVisitFormStore.set(data.deleteForm);
	$: visitItems.set(visits);
	$: currentAnimal.set(animal);
</script>

<Modal bind:open={openUpdateModal} size="medium">
	{#if animal}
		<UpdateAnimalForm bind:open={openUpdateModal} />
	{/if}
</Modal>
<div class="antialiased xl:pl-14">
	<div class="flex flex-col xl:flex-row xl:pl-14 xl:py-10 w-full pt-5">
		<CollapsibleSection
			title={`${animal.name}`}
			color="primary"
			size="small"
			editable={true}
			bind:edit={openUpdateModal}
		>
			<Details details={animalDetails} />
		</CollapsibleSection>

		<VisitList {isNew} />
	</div>
</div>
