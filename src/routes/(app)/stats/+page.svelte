<script lang="ts">
	import InventorySaleList from '$components/lists/InventorySaleList.svelte';
	import { inventorySalesPageInfo } from '$store/inventory';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ page } = data);
	$: inventorySalesPageInfo.set(page);
</script>

<div class="flex flex-col xl:flex-row lg:px-14 w-full">
	<InventorySaleList />
</div>
