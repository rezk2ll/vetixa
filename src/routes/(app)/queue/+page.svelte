<script lang="ts">
	import LastVisit from '$components/display/LastVisit.svelte';
	import QueueList from '$components/lists/QueueList.svelte';
	import { queue, updateQueueFormStore } from '$lib/store/queue';
	import { sortDates } from '$lib/utils/date';
	import type { PageData } from './$types';

	export let data: PageData;

	$: updateQueueFormStore.set(data.form);
	$: queue.set(data.queue);

	$: lastVisit =
		$queue
			.filter((item) => item.served)
			.sort((a, b) => sortDates(b.updated, a.updated))
			.pop() ?? null;
</script>

<div class="flex flex-col xl:flex-row lg:pl-14 w-full">
	<QueueList />
	<div class="w-full lg:w-5/12 flex flex-col lg:px-10 gap-3 pt-10">
		<LastVisit data={lastVisit} />
	</div>
</div>
