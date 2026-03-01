<script lang="ts">
	import CagesList from '$components/lists/CagesList.svelte';
	import {
		cagesInfo,
		hospitChangeColorFormStore,
		hospitUpdateCompletedStateFormStore
	} from '$store/hospit';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { cageList, changeHospitColorForm, updateHospitCompeltedStateForm } = $derived(data);
	$effect(() => {
		cagesInfo.set(cageList);
	});
	$effect(() => {
		hospitChangeColorFormStore.set(changeHospitColorForm);
	});
	$effect(() => {
		hospitUpdateCompletedStateFormStore.set(updateHospitCompeltedStateForm);
	});
</script>

<div
	class="antialiased w-full flex items-center xl:px-10 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<CagesList />
</div>
