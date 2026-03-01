<script lang="ts">
	import { run } from 'svelte/legacy';

	import ActivityList from '$components/lists/ActivityList.svelte';
	import { activityPage } from '$store/activity';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	run(() => {
		activityPage.set(data);
	});
</script>

<div
	class="antialiased w-full flex items-center xl:px-14 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<ActivityList />
</div>
