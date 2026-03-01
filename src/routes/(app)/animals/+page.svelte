<script lang="ts">
	import AnimalList from '$components/lists/AnimalList.svelte';
	import { animalsPageInfo, deleteAnimalFormStore, updateAnimalFormStore } from '$store/animals';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { pageInfo, removeForm, updateForm } = $derived(data);
	$effect(() => {
		deleteAnimalFormStore.set(removeForm);
	});
	$effect(() => {
		updateAnimalFormStore.set(updateForm);
	});
	$effect(() => {
		animalsPageInfo.set(pageInfo);
	});
</script>

<div
	class="antialiased w-full flex items-center xl:px-14 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<AnimalList canAdd={false} />
</div>
