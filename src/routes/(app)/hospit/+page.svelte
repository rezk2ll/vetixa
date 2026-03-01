<script lang="ts">
	import { run } from 'svelte/legacy';

	import HospitList from '$components/lists/HospitList.svelte';
	import { hospitPageInfo } from '$store/hospit';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { pageInfo } = $derived(data);
	run(() => {
		hospitPageInfo.set(pageInfo);
	});
</script>

<div
	class="antialiased w-full flex items-center xl:px-10 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<HospitList />
</div>
