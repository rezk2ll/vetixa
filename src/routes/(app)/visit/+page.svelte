<script lang="ts">
	import ActivityList from '$components/lists/ActivityList.svelte';
	import { activityPage } from '$store/activity';
	import type { PageData } from './$types';

	export let data: PageData;

	$: activityPage.set(data);
</script>

<div
	class="antialiased w-full flex items-center xl:px-14 pt-10 justify-center"
	data-sveltekit-preload-data="hover"
>
	<ActivityList />
</div>
