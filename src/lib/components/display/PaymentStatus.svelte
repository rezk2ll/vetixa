<script lang="ts">
	import CheckMark from '$components/icons/CheckMark.svelte';
	import CrossIcon from '$components/icons/CrossIcon.svelte';
	import LoadingSpinnerIcon from '$components/icons/LoadingSpinnerIcon.svelte';
	import RewindIcon from '$components/icons/RewindIcon.svelte';
	import SurplusIcon from '$components/icons/SurplusIcon.svelte';
	import type { BillsResponse } from '$types';
	import currency from 'currency.js';
	import Magnifier from '../icons/Magnifier.svelte';

	export let bill: BillsResponse;
	export let type: 'large' | 'small' = 'large';
	export let control: boolean = false;

	$: ({ paid, total, total_paid } = bill);
	$: partiallyPaid = total_paid > 0 && currency(total).subtract(total_paid).value > 0.5;
	$: pendingPayment = total_paid === 0 && total > 0;
	$: done = total > 0 && (paid || currency(total).subtract(total_paid).value <= 0.5);
	$: overpaid = total_paid > total;
	$: processing = total == 0;
	$: isControl = control && total === 0;
</script>

<div class="flex items-center gap-x-4 {type === 'large' ? 'w-full' : 'w-full md:w-3/4'}">
	<span
		class="flex font-semibold items-center justify-center text-white w-full p-1 {isControl
			? 'bg-green-600/80'
			: done
			? 'bg-emerald-500/80'
			: pendingPayment
			? 'bg-red-500/80'
			: processing
			? 'bg-gray-500/80'
			: partiallyPaid
			? 'bg-orange-500/80'
			: overpaid
			? 'bg-blue-500/80'
			: ''} rounded shrink-0"
	>
		{#if isControl}
			<div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2">
				<Magnifier />

				<h2 class="font-normal">contrôle</h2>
			</div>
		{:else if done}
			<div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2">
				<CheckMark />

				<h2 class="font-normal">Payé</h2>
			</div>
		{:else if partiallyPaid}
			<div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2">
				<RewindIcon />

				<h2 class="font-normal">Arriéré</h2>
			</div>
		{:else if processing}
			<div class="inline-flex items-center px-5 py-1 rounded-full gap-x-2">
				<LoadingSpinnerIcon />
				<h2 class="font-normal">En attente</h2>
			</div>
		{:else if overpaid}
			<div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2">
				<SurplusIcon />

				<h2 class="font-normal">Surplus</h2>
			</div>
		{:else}
			<div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2">
				<CrossIcon />

				<h2 class="font-normal">Impayé</h2>
			</div>
		{/if}
	</span>
</div>
