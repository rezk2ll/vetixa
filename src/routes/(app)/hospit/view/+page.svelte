<script lang="ts">
	import CagesList from '$components/lists/CagesList.svelte';
	import {
		cagesInfo,
		hospitChangeColorFormStore,
		hospitUpdateCompletedStateFormStore
	} from '$store/hospit';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ cageList, changeHospitColorForm, updateHospitCompeltedStateForm } = data);
	$: cagesInfo.set(cageList);
	$: hospitChangeColorFormStore.set(changeHospitColorForm);
	$: hospitUpdateCompletedStateFormStore.set(updateHospitCompeltedStateForm);
</script>

<div
	class="antialiased w-full flex items-center xl:px-10 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<CagesList />
</div>
