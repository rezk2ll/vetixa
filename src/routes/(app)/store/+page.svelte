<script lang="ts">
	import StockStats from '$components/charts/stock/StockStats.svelte';
	import StockSalesRank from '$components/charts/stock/StockSalesRank.svelte';
	import StockStatusChart from '$components/charts/stock/StockStatusChart.svelte';
	import StoreList from '$components/lists/StoreList.svelte';
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

	$: ({ addForm, updateForm, sellForm, deleteForm } = data);

	$: stats = [
		$inventoryItems.filter((item) => item.quantity === 0).length,
		$inventoryItems.filter((item) => item.quantity > item.alert).length,
		$inventoryItems.filter((item) => item.quantity <= item.alert && item.quantity > 0).length
	];

	$: addInventoryFormStore.set(addForm);
	$: updateInventoryFormStore.set(updateForm);
	$: sellInventoryFormStore.set(sellForm);
	$: removeInventoryFormStore.set(deleteForm);
</script>

<div class="flex flex-col lg:flex-row xl:pl-14 w-full">
	<div class="flex-grow flex flex-col-reverse lg:flex-col w-full">
		<StockStats
			total={$inventoryItems.length}
			unavailable={stats[0]}
			{...{ totalSales, monthlyRevenu, monthlySales, dailyRevenu, dailySales }}
		/>
		<StoreList />
	</div>
	<div class="flex-shrink w-full lg:w-4/12 flex flex-col lg:px-10 gap-0 pb-5">
		<StockStatusChart bind:data={stats} />
		<StockSalesRank data={bestSellers} total={totalSoldItems} />
	</div>
</div>
