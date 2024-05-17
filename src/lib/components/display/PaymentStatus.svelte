<script lang="ts">
	import type { BillsResponse } from '$types';

	export let bill: BillsResponse;
	export let type: 'large' | 'small' = 'large';

	$: ({ paid, total, total_paid } = bill);
	$: partiallyPaid = total_paid > 0 && total_paid < total;
	$: pendingPayment = total_paid === 0 && total > 0;
	$: done = paid && total > 0;
	$: processing = bill.total == 0;
</script>

<div class="flex items-center gap-x-4 {type === 'large' ? 'w-full' : 'w-1/2'}">
	<span
		class="flex font-semibold items-center justify-center text-white w-full p-1 {done
			? 'bg-emerald-500/80'
			: pendingPayment
			? 'bg-red-500/80'
			: processing
			? 'bg-gray-500/80'
			: partiallyPaid
			? 'bg-orange-500/80'
			: ''} rounded shrink-0"
	>
		{#if done}
			<div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2">
				<svg class="w-6 h-6" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M10 3L4.5 8.5L2 6"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>

				<h2 class="font-normal">Payé</h2>
			</div>
		{:else if partiallyPaid}
			<div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					class="w-4 h-4"
					fill="currentColor"
					><path
						d="M75 75L41 41C25.9 25.9 0 36.6 0 57.9V168c0 13.3 10.7 24 24 24H134.1c21.4 0 32.1-25.9 17-41l-30.8-30.8C155 85.5 203 64 256 64c106 0 192 86 192 192s-86 192-192 192c-40.8 0-78.6-12.7-109.7-34.4c-14.5-10.1-34.4-6.6-44.6 7.9s-6.6 34.4 7.9 44.6C151.2 495 201.7 512 256 512c141.4 0 256-114.6 256-256S397.4 0 256 0C185.3 0 121.3 28.7 75 75zm181 53c-13.3 0-24 10.7-24 24V256c0 6.4 2.5 12.5 7 17l72 72c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9l-65-65V152c0-13.3-10.7-24-24-24z"
					/></svg
				>

				<h2 class="font-normal">Arriaré</h2>
			</div>
		{:else if processing}
			<div class="inline-flex items-center px-5 py-1 rounded-full gap-x-2">
				<svg
					class="w-4 h-4"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					><style>
						.spinner_Wezc {
							transform-origin: center;
							animation: spinner_Oiah 0.75s step-end infinite;
						}
						@keyframes spinner_Oiah {
							8.3% {
								transform: rotate(30deg);
							}
							16.6% {
								transform: rotate(60deg);
							}
							25% {
								transform: rotate(90deg);
							}
							33.3% {
								transform: rotate(120deg);
							}
							41.6% {
								transform: rotate(150deg);
							}
							50% {
								transform: rotate(180deg);
							}
							58.3% {
								transform: rotate(210deg);
							}
							66.6% {
								transform: rotate(240deg);
							}
							75% {
								transform: rotate(270deg);
							}
							83.3% {
								transform: rotate(300deg);
							}
							91.6% {
								transform: rotate(330deg);
							}
							100% {
								transform: rotate(360deg);
							}
						}
					</style><g class="spinner_Wezc"
						><circle cx="12" cy="2.5" r="1.5" opacity=".14" /><circle
							cx="16.75"
							cy="3.77"
							r="1.5"
							opacity=".29"
						/><circle cx="20.23" cy="7.25" r="1.5" opacity=".43" /><circle
							cx="21.50"
							cy="12.00"
							r="1.5"
							opacity=".57"
						/><circle cx="20.23" cy="16.75" r="1.5" opacity=".71" /><circle
							cx="16.75"
							cy="20.23"
							r="1.5"
							opacity=".86"
						/><circle cx="12" cy="21.5" r="1.5" /></g
					></svg
				>

				<h2 class="font-normal">En attente</h2>
			</div>
		{:else}
			<div class="inline-flex items-center px-3 py-1 rounded-full gap-x-2">
				<svg class="w-4 h-4" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M9 3L3 9M3 3L9 9"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>

				<h2 class="font-normal">Impayé</h2>
			</div>
		{/if}
	</span>
</div>
