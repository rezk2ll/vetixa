<script lang="ts">
	import QueueList from '$lib/components/lists/QueueList.svelte';
	import { queue, updateQueueFormStore } from '$lib/store/queue';
	import type { PageData } from './$types';

	export let data: PageData;

	$: updateQueueFormStore.set(data.form);
	$: queue.set(data.queue);
</script>

<div class="xl:px-14">
	<QueueList />
</div>
