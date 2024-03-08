<script lang="ts">
	import { clinicalExams, medicalActs, surgivalActs } from '$lib/store/acts';
	import VisitList from '$lib/components/lists/VisitList.svelte';
	import CollapsibleSection from '$lib/components/CollapsibleSection.svelte';
	import Details from '$lib/components/Details.svelte';
	import type { PageData } from './$types';
	import Modal from '$lib/components/Modal.svelte';
	import UpdateAnimalForm from '$lib/components/forms/animals/updateAnimalForm.svelte';
	import { updateAnimalFormStore } from '$lib/store/animals';
	import {
		addVisitFormStore,
		deleteVisitFormStore,
		updateVisitFormStore,

		visitItems

	} from '$root/lib/store/visit';

	export let data: PageData;

	let openUpdateModal = false;

	$: ({ animal, isNew } = data);

	$: ({ visits } = animal);

	$: animalDetails = [
		{ name: 'Nom', value: animal.name },
		{ name: 'Propriétaire', value: animal.client },
		{ name: 'Espèce', value: animal.type },
		{ name: 'Sexe', value: animal.sex },
		{ name: 'Age', value: animal.birthday, isAge: true },
		{ name: 'Poids', value: animal.weight },
		{ name: 'Couleur', value: animal.color },
		{ name: 'Race', value: animal.breed }
	];

	$: clinicalExams.set(data.clinicalExams);
	$: surgivalActs.set(data.surgicalActs);
	$: medicalActs.set(data.medicalActs);
	$: updateAnimalFormStore.set(data.form);
	$: addVisitFormStore.set(data.addForm);
	$: updateVisitFormStore.set(data.updateForm);
	$: deleteVisitFormStore.set(data.deleteForm);
	$: visitItems.set(visits);
</script>

<Modal bind:open={openUpdateModal} size="medium">
	{#if animal}
		<UpdateAnimalForm bind:open={openUpdateModal} bind:item={animal} />
	{/if}
</Modal>
<div class="antialiased xl:pl-14">
	<div class="flex flex-col xl:flex-row xl:px-14 xl:py-10 w-full pt-5">
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
