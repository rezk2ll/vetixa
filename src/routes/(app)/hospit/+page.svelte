<script lang="ts">
	import HospitList from '$components/lists/HospitList.svelte';
	import { hospitPageInfo } from '$store/hospit';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ pageInfo } = data);
	$: hospitPageInfo.set(pageInfo);
</script>

<div
	class="antialiased w-full flex items-center xl:px-10 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<HospitList />
</div>
