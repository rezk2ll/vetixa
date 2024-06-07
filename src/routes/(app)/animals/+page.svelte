<script lang="ts">
	import AnimalList from '$components/lists/AnimalList.svelte';
	import {
		animalsPageInfo,
		deleteAnimalFormStore,
		updateAnimalFormStore
	} from '$store/animals';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ pageInfo, removeForm, updateForm } = data);
	$: deleteAnimalFormStore.set(removeForm);
	$: updateAnimalFormStore.set(updateForm);
	$: animalsPageInfo.set(pageInfo);
</script>

<div
	class="antialiased w-full flex items-center xl:px-14 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<AnimalList canAdd={false} />
</div>
