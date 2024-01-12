<script lang="ts">
	import CollapsibleSection from '$lib/components/CollapsibleSection.svelte';
	import Details from '$lib/components/Details.svelte';
	import AnimalList from '$lib/components/lists/AnimalList.svelte';
	import {
		addAnimalFormStore,
		animals,
		deleteAnimalFormStore,
		updateAnimalFormStore
	} from '$lib/store/animals';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ client } = data);

	$: clientDetails = [
		{ name: 'Nom', value: client.name },
		{ name: 'Téléphone', value: client.tel ?? '-' },
		{ name: 'Email', value: client.email ?? '-' },
		{ name: 'Adresse', value: client.address ?? '-' }
	];

	$: addAnimalFormStore.set(data.addForm);
	$: updateAnimalFormStore.set(data.updateForm);
	$: deleteAnimalFormStore.set(data.removeForm);
	$: animals.set(client.animals);
</script>

<div class="antialiased xl:pl-14">
	<div class="flex flex-col xl:flex-row xl:p-10 w-full">
		<CollapsibleSection title={`Client: ${client.name}`} color="primary" size="small">
			<Details details={clientDetails} />
		</CollapsibleSection>

		<AnimalList />
	</div>
</div>
