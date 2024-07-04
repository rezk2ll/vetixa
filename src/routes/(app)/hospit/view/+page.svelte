<script lang="ts">
	import CagesList from '$components/lists/CagesList.svelte';
	import { cagesInfo, hospitChangeColorFormStore } from '$store/hospit';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ cageList, changeHospitColorForm } = data);
	$: cagesInfo.set(cageList);
  $: hospitChangeColorFormStore.set(changeHospitColorForm);
</script>

<div
	class="antialiased w-full flex items-center xl:px-14 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<CagesList />
</div>
