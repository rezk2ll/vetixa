<script lang="ts">
	import ClientAnimalsList from '$components/lists/ClientAnimalsList.svelte';
	import CollapsibleSection from '$lib/components/CollapsibleSection.svelte';
	import Details from '$lib/components/Details.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import UpdateClientForm from '$lib/components/forms/clients/UpdateClientForm.svelte';
	import {
		addAnimalFormStore,
		animals,
		deleteAnimalFormStore,
		updateAnimalFormStore
	} from '$lib/store/animals';
	import { updateClientFormStore } from '$lib/store/clients';

	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ client, isNew } = data);

	let openUpdateModal = false;

	$: clientDetails = [
		{ name: 'Prénom', value: client.firstname },
		{ name: 'Nom', value: client.lastname },
		{ name: 'Téléphone', value: client.tel ?? '-' },
		{ name: 'Email', value: client.email ?? '-' },
		{ name: 'Adresse', value: client.address ?? '-' }
	];

	$: addAnimalFormStore.set(data.addForm);
	$: updateAnimalFormStore.set(data.updateForm);
	$: deleteAnimalFormStore.set(data.removeForm);
	$: animals.set(client.animals);
	$: updateClientFormStore.set(data.form);
</script>

<Modal bind:open={openUpdateModal} size="medium">
	{#if client}
		<UpdateClientForm bind:open={openUpdateModal} bind:item={client} />
	{/if}
</Modal>

<div class="antialiased xl:pl-14">
	<div class="flex flex-col xl:flex-row xl:px-14 xl:py-10 py-5 w-full">
		<CollapsibleSection
			title={client.name}
			color="primary"
			size="small"
			editable={true}
			bind:edit={openUpdateModal}
		>
			<Details details={clientDetails} />
		</CollapsibleSection>

		<ClientAnimalsList {isNew} />
	</div>
</div>
