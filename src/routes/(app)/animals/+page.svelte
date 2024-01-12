<script lang="ts">
	import AnimalList from '$lib/components/lists/AnimalList.svelte';
	import { animals, deleteAnimalFormStore, updateAnimalFormStore } from '$lib/store/animals';
	import type { PageData } from './$types';

	export let data: PageData;

	$: animals.set(data.animals);
	$: deleteAnimalFormStore.set(data.removeForm);
	$: updateAnimalFormStore.set(data.updateForm);
</script>

<div
	class="antialiased w-full flex items-center xl:px-14 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<AnimalList canAdd={false} />
</div>
