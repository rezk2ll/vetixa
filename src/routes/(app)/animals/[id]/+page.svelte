<script lang="ts">
	import VisitList from '$components/lists/VisitList.svelte';
	import CollapsibleSection from '$components/CollapsibleSection.svelte';
	import Details from '$components/Details.svelte';
	import type { PageData } from './$types';
	import Modal from '$components/Modal.svelte';
	import UpdateAnimalForm from '$components/forms/animals/updateAnimalForm.svelte';
	import { currentAnimal, updateAnimalFormStore } from '$store/animals';
	import {
		addVisitFormStore,
		updateVisitFormStore,
		vaccinationVisitList,
		visitItems
	} from '$store/visit';
	import { formatDateString, formatDateStringShort } from '$utils/date';
	import type { entityDetailsList } from '$types';
	import VaccinationList from '$components/lists/vaccinationList.svelte';

	export let data: PageData;

	let openUpdateModal = false;

	$: ({ animal, isNew, vaccinationVisits } = data);
	$: ({ visits } = animal);

	$: animalDetails = [
		{ name: 'Nom', value: animal.name },
		{ name: 'Propriétaire', value: animal.client.name },
		{ name: 'Espèce', value: animal.type },
		{ name: 'Sexe', value: animal.sex },
		{ name: 'Date de naissance', value: formatDateStringShort(animal.birthday) },
		{ name: 'Age', value: animal.birthday, isAge: true },
		{ name: 'Poids', value: animal.weight, prefix: 'Kg' },
		{ name: 'Couleur', value: animal.color },
		{ name: 'Race', value: animal.breed },
		{ name: 'Identifiant', value: animal.identifier },
		...(animal.deceased ? [{ name: 'Décédé le', value: formatDateString(animal.deathdate) }] : [])
	] satisfies entityDetailsList;

	$: updateAnimalFormStore.set(data.form);
	$: addVisitFormStore.set(data.addForm);
	$: updateVisitFormStore.set(data.updateForm);
	$: visitItems.set(visits);
	$: currentAnimal.set({ ...animal, client: animal.client.name });
	$: vaccinationVisitList.set(vaccinationVisits);
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
		<div class="flex flex-col lg:gap-2 w-full">
			<VisitList {isNew} />
			<VaccinationList />
		</div>
	</div>
</div>
