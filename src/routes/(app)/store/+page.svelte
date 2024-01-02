<script lang="ts">
	import StockStats from '$lib/components/charts/StockStats.svelte';
	import StockSalesRank from '$lib/components/charts/StockSalesRank.svelte';
	import StockStatusChart from '$lib/components/charts/StockStatusChart.svelte';
	import StoreList from '$lib/components/lists/StoreList.svelte';
	import type { PageData } from './$types';
	import { inventoryItems } from '$lib/store/inventory';

	export let data: PageData;

	const {
		sellForm,
		addForm,
		updateForm,
		deleteForm,
		items,
		totalSales,
		monthlyRevenu,
		monthlySales,
		dailyRevenu,
		dailySales,
		bestSellers,
		totalSoldItems
	} = data;

	$: inventoryItems.set(
		items.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
	);

	$: stats = [
		$inventoryItems.filter((item) => item.quantity === 0).length,
		$inventoryItems.filter((item) => item.quantity > 10).length,
		$inventoryItems.filter((item) => item.quantity <= 10 && item.quantity > 0).length
	];
</script>

<div class="flex flex-row xl:pl-14 w-full">
	<div class="flex-grow flex flex-col">
		<StockStats
			total={$inventoryItems.length}
			unavailable={stats[0]}
			{...{ totalSales, monthlyRevenu, monthlySales, dailyRevenu, dailySales }}
		/>
		<StoreList {addForm} {sellForm} {updateForm} {deleteForm} />
	</div>
	<div class="flex-shrink w-4/12 flex flex-col px-10 gap-0">
		<StockStatusChart bind:data={stats} />
		<StockSalesRank data={bestSellers} total={totalSoldItems} />
	</div>
</div>
