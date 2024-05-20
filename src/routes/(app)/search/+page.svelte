<script lang="ts">
	import SearchList from '$components/display/search/SearchList.svelte';
	import { searchPage } from '$lib/store/search';
	import type { PageData } from './$types';

	export let data: PageData;

	$: searchPage.set(data);
</script>

<div
	class="antialiased w-full flex items-center xl:px-14 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<SearchList />
</div>
