<script lang="ts">
	import InventorySaleList from '$components/lists/InventorySaleList.svelte';
	import ActStatsTab from '$lib/components/display/stats/ActStatsTab.svelte';
	import { inventorySalesPageInfo } from '$store/inventory';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ page, stats } = data);
	$: inventorySalesPageInfo.set(page);
</script>

<div class="flex flex-col xl:flex-row lg:pl-14 w-full">
	<InventorySaleList />
	<div class="w-full lg:w-5/12 flex flex-col lg:px-10 lg:gap-3 lg:pt-10">
		<ActStatsTab {stats} />
	</div>
</div>
