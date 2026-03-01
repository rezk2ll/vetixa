<script lang="ts">
	import type { PageData } from './$types';
	import ClientList from '$components/lists/ClientList.svelte';
	import {
		addClientFormStore,
		clientsPageInfo,
		removeClientFormStore,
		updateClientFormStore
	} from '$store/clients';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { shortCut, pageInfo, addForm, updateForm, deleteForm } = $derived(data);
	$effect(() => {
		clientsPageInfo.set(pageInfo);
	});
	$effect(() => {
		addClientFormStore.set(addForm);
	});
	$effect(() => {
		updateClientFormStore.set(updateForm);
	});
	$effect(() => {
		removeClientFormStore.set(deleteForm);
	});
</script>

<div
	class="antialiased w-full flex items-center xl:px-14 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<ClientList open={shortCut} />
</div>
