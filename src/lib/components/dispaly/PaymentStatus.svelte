<script lang="ts">
	import type { BillsResponse } from '$root/pocketbase-types';

	export let bill: BillsResponse;

	$: ({ paid, total, total_paid } = bill);
	$: partiallyPaid = total_paid > 0 && total_paid < total;
	$: pendingPayment = total_paid === 0;
</script>

<div class="flex items-center gap-x-4 w-full">
	<span
		class="flex font-semibold items-center justify-center text-white w-full py-2 p-1 {paid
			? 'bg-emerald-500/80'
			: pendingPayment
			? 'bg-red-500/80'
			: partiallyPaid
			? 'bg-orange-500/80'
			: ''} rounded-lg shrink-0"
	>
		{#if paid}
			Payé
		{:else if partiallyPaid}
			Arriaré
		{:else}
			Impayé
		{/if}
	</span>
</div>
