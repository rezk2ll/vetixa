<script lang="ts">
	import { run } from 'svelte/legacy';

	import AnimalList from '$components/lists/AnimalList.svelte';
	import { animalsPageInfo, deleteAnimalFormStore, updateAnimalFormStore } from '$store/animals';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { pageInfo, removeForm, updateForm } = $derived(data);
	run(() => {
		deleteAnimalFormStore.set(removeForm);
	});
	run(() => {
		updateAnimalFormStore.set(updateForm);
	});
	run(() => {
		animalsPageInfo.set(pageInfo);
	});
</script>

<div
	class="antialiased w-full flex items-center xl:px-14 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<AnimalList canAdd={false} />
</div>
