<script lang="ts">
	import type { PageData } from './$types';
	import ClientList from '$components/lists/ClientList.svelte';
	import {
		addClientFormStore,
		clientsPageInfo,
		removeClientFormStore,
		updateClientFormStore
	} from '$store/clients';

	export let data: PageData;

	$: ({ shortCut, pageInfo, addForm, updateForm, deleteForm } = data);
	$: clientsPageInfo.set(pageInfo);
	$: addClientFormStore.set(addForm);
	$: updateClientFormStore.set(updateForm);
	$: removeClientFormStore.set(deleteForm);
</script>

<div
	class="antialiased w-full flex items-center xl:px-14 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<ClientList open={shortCut} />
</div>
