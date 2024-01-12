<script lang="ts">
	import type { PageData } from './$types';
	import ClientList from '$lib/components/lists/ClientList.svelte';
	import {
		addClientFormStore,
		clients,
		removeClientFormStore,
		updateClientFormStore
	} from '$lib/store/clients';

	export let data: PageData;

	$: clients.set(data.clients);
	$: addClientFormStore.set(data.addForm);
	$: updateClientFormStore.set(data.updateForm);
	$: removeClientFormStore.set(data.deleteForm);
</script>

<div
	class="antialiased w-full flex items-center xl:px-14 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<ClientList />
</div>
