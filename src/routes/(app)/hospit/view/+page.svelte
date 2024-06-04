<script lang="ts">
	import CageCard from '$components/display/cages/CageCard.svelte';
	import CagesList from '$components/lists/CagesList.svelte';
	import { cagesInfo } from '$store/hospit';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ cageList } = data);
	$: cagesInfo.set(cageList);
</script>

<div
	class="antialiased w-full flex items-center xl:px-14 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<CagesList />
</div>
