<script lang="ts">
	import CollapsibleSection from '$lib/components/CollapsibleSection.svelte';
	import Details from '$lib/components/Details.svelte';
	import AnimalList from '$lib/components/lists/AnimalList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ client } = data);

	$: clientDetails = [
		{ name: 'Nom', value: client.name },
		{ name: 'Téléphone', value: client.tel ?? '-' },
		{ name: 'Email', value: client.email ?? '-' },
		{ name: 'Adresse', value: client.address ?? '-' }
	];
</script>

<div class="antialiased xl:pl-14">
	<div class="flex flex-col xl:flex-row xl:p-20 w-full pt-5">
		<CollapsibleSection title={`Client: ${client.name}`} color="primary" size="small">
			<Details details={clientDetails} />
		</CollapsibleSection>

		<AnimalList data={client.animals} />
	</div>
</div>
