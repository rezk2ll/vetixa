<script lang="ts">
	import AnimalList from '$lib/components/lists/AnimalList.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ animals } = data);
</script>

<div class="antialiased w-full flex items-center xl:pt-10 justify-center" data-sveltekit-preload-data="hover">
	<AnimalList data={animals} canAdd={false} />
</div>
