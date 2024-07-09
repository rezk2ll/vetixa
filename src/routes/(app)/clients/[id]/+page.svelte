<script lang="ts">
	import ClientAnimalsList from '$components/lists/ClientAnimalsList.svelte';
	import CollapsibleSection from '$components/CollapsibleSection.svelte';
	import Details from '$components/Details.svelte';
	import Modal from '$components/Modal.svelte';
	import UpdateClientForm from '$components/forms/clients/UpdateClientForm.svelte';
	import ClientBillsList from '$components/lists/ClientBillsList.svelte';
	import {
		addAnimalFormStore,
		animals,
		deleteAnimalFormStore,
		updateAnimalFormStore
	} from '$store/animals';
	import { clientBills } from '$store/bills';
	import { currentClient, updateClientFormStore } from '$store/clients';

	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ client, isNew, addForm, bills, form, removeForm, updateForm } = data);

	let openUpdateModal = false;

	$: clientDetails = [
		{ name: 'Prénom', value: client.firstname },
		{ name: 'Nom', value: client.lastname },
		{ name: 'Téléphone', value: client.tel ?? '-' },
		{ name: 'Email', value: client.email ?? '-' },
		{ name: 'Adresse', value: client.address ?? '-' },
		{ name: 'Note', value: client.note ?? '-' }
	];

	$: addAnimalFormStore.set(addForm);
	$: updateAnimalFormStore.set(updateForm);
	$: deleteAnimalFormStore.set(removeForm);
	$: animals.set(client.animals);
	$: updateClientFormStore.set(form);
	$: clientBills.set(bills);
	$: currentClient.set(client);
</script>

<Modal bind:open={openUpdateModal} size="medium">
	{#if client}
		<UpdateClientForm bind:open={openUpdateModal} />
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
		<div class="flex flex-col lg:gap-2 w-full">
			<ClientAnimalsList {isNew} />
			<ClientBillsList />
		</div>
	</div>
</div>
