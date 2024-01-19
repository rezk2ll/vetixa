<script lang="ts">
	import StockStats from '$lib/components/charts/stock/StockStats.svelte';
	import StockSalesRank from '$lib/components/charts/stock/StockSalesRank.svelte';
	import StockStatusChart from '$lib/components/charts/stock/StockStatusChart.svelte';
	import StoreList from '$lib/components/lists/StoreList.svelte';
	import type { PageData } from './$types';
	import {
		addInventoryFormStore,
		inventoryItems,
		removeInventoryFormStore,
		sellInventoryFormStore,
		updateInventoryFormStore
	} from '$lib/store/inventory';

	export let data: PageData;

	$: ({
		items,
		totalSales,
		monthlyRevenu,
		monthlySales,
		dailyRevenu,
		dailySales,
		bestSellers,
		totalSoldItems
	} = data);

	$: inventoryItems.set(
		items.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: 'base' }))
	);

	$: stats = [
		$inventoryItems.filter((item) => item.quantity === 0).length,
		$inventoryItems.filter((item) => item.quantity > item.alert).length,
		$inventoryItems.filter((item) => item.quantity <= item.alert && item.quantity > 0).length
	];

	$: addInventoryFormStore.set(data.addForm);
	$: updateInventoryFormStore.set(data.updateForm);
	$: sellInventoryFormStore.set(data.sellForm);
	$: removeInventoryFormStore.set(data.deleteForm);
</script>

<div class="flex flex-row xl:pl-14 w-full">
	<div class="flex-grow flex flex-col">
		<StockStats
			total={$inventoryItems.length}
			unavailable={stats[0]}
			{...{ totalSales, monthlyRevenu, monthlySales, dailyRevenu, dailySales }}
		/>
		<StoreList />
	</div>
	<div class="flex-shrink w-4/12 flex flex-col px-10 gap-0">
		<StockStatusChart bind:data={stats} />
		<StockSalesRank data={bestSellers} total={totalSoldItems} />
	</div>
</div>
