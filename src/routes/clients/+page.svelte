<script lang="ts">
	import type { PageData } from './$types';
	import ClientList from '$lib/components/lists/ClientList.svelte';

	export let data: PageData;

	$: ({ clients } = data);
</script>


<ClientList data={clients} />
