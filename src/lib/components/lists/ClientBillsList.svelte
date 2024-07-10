<script lang="ts">
	import type { BillStatusFilter as StatusFilter } from '$types';
	import { clientBills } from '$store/bills';
	import { formatDateStringShort, formatDateStringToTime } from '$utils/date';
	import currency from 'currency.js';
	import PaymentStatus from '$components/display/PaymentStatus.svelte';
	import BackArrow from '$components/icons/BackArrow.svelte';
	import ForwardArrow from '$components/icons/ForwardArrow.svelte';
	import EditIcon from '$components/icons/EditIcon.svelte';

	let statusFilter: StatusFilter = 'all';
	let page = 0;

	const totalPages = Math.ceil($clientBills.length / 10);

	$: items = $clientBills.filter((item) => {
		if (statusFilter === 'completed') {
			return item.paid === true;
		}

		if (statusFilter === 'partial') {
			return item.total_paid < item.total && item.total_paid > 0;
		}

		if (statusFilter === 'pending') {
			return item.total_paid === 0 && item.control === false;
		}

		if (statusFilter === 'control') {
			return item.control;
		}

		return true;
	});

	$: pageItems = items.slice(page * 10, page * 10 + 10);

	$: paidCount = $clientBills.filter((item) => item.paid === true).length;
	$: partialCount = $clientBills.filter(
		(item) => item.total_paid < item.total && item.total_paid > 0
	).length;
	$: pendingCount = $clientBills.filter(
		({ total_paid, control }) => total_paid === 0 && control === false
	).length;
	$: controlCount = $clientBills.filter(({ control }) => control).length;
</script>

<div class="flex flex-col items-center justify-start xl:pl-14 w-full">
	<div class="w-full px-2 lg:px-5 pt-10 lg:p-5 bg-white lg:shadow-2xl border-gray-200 xl:rounded">
		<div class="flex flex-col space-y-4 w-full">
			<div class="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full">
				<div class="flex flex-col items-center justify-center lg:items-start w-full">
					<div class="flex items-center gap-x-3">
						<h2 class="text-lg font-medium text-gray-800 dark:text-white">Factures</h2>
						<span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full"
							>{$clientBills.length}</span
						>
					</div>

					<p class="mt-1 text-sm text-gray-500">La liste des factures de client</p>
				</div>
			</div>
			<div
				class="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 lg:items-center justify-between w-full"
			>
				<div
					class="flex flex-row overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse"
				>
					<button
						on:click={() => {
							statusFilter = 'all';
							page = 0;
						}}
						class="px-2 lg:px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'all'
							? 'bg-gray-100'
							: ''} sm:text-sm"
					>
						Tout
					</button>
					<button
						on:click={() => {
							statusFilter = 'completed';
							page = 0;
						}}
						class="px-2 lg:px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'completed'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						Payé
						<span
							class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{paidCount}
						</span>
					</button>
					<button
						on:click={() => {
							statusFilter = 'partial';
							page = 0;
						}}
						class="px-2 lg:px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'partial'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						Arriérés
						<span
							class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{partialCount}
						</span>
					</button>
					<button
						on:click={() => {
							statusFilter = 'pending';
							page = 0;
						}}
						class="px-2 lg:px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'pending'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						En attente
						<span
							class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{pendingCount}
						</span>
					</button>
					<button
						on:click={() => {
							statusFilter = 'control';
							page = 0;
						}}
						class="px-2 lg:px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'control'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						Contrôle
						<span
							class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{controlCount}
						</span>
					</button>
				</div>
			</div>
			<div class="flex flex-col mt-6">
				<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div class=" border border-gray-200 md:rounded-lg">
							<table class="min-w-full divide-y divide-gray-200 table-fixed">
								<thead class="bg-slate-50">
									<tr>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Date</th
										>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Heure</th
										>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Total</th
										>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Reste
										</th>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Surplus
										</th>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>statut</th
										>
										<th scope="col" class="relative py-3.5 px-4">
											<span class="sr-only">Modifier</span>
										</th>
									</tr>
								</thead>
								<tbody class="bg-white divide-y divide-gray-200">
									{#each pageItems as item}
										<tr>
											<td class="px-4 py-2.5 text-sm font-medium text-gray-700 whitespace-nowrap">
												<a
													href="/visit/{item.visit}"
													class="hover:underline font-semibold capitalize text-gray-800 dark:text-white"
												>
													{formatDateStringShort(item.created)}
												</a>
											</td>

											<td
												class="px-4 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
												>{formatDateStringToTime(item.created)}</td
											>
											<td
												class="px-4 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
												>{item.total} DT</td
											>
											<td
												class="px-4 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
												>{Math.max(currency(item.total).subtract(item.total_paid).value, 0)} DT</td
											>
											<td
												class="px-4 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
											>
												{#if currency(item.total).subtract(item.total_paid).value < 0}
													{Math.abs(currency(item.total).subtract(item.total_paid).value)}
												{/if}
											</td>
											<td
												class="px-4 py-2.5 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
											>
												<PaymentStatus bill={item} type="small" control={item.control} />
											</td>

											<td class="px-4 py-2.5 text-sm whitespace-nowrap">
												<div class="flex items-end justify-end gap-x-6 w-full">
													<a
														href="/visit/{item.visit}"
														title="Modifier le client"
														class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 hover:text-yellow-500 focus:outline-none"
													>
														<EditIcon />
													</a>
												</div>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6 sm:flex sm:items-center sm:justify-between">
				<div class="text-sm text-gray-500 dark:text-gray-400">
					Page <span class="font-medium text-gray-700 dark:text-gray-100"
						>{page + 1} sur {totalPages}</span
					>
				</div>

				<div class="flex items-center mt-4 gap-x-4 sm:mt-0">
					<button
						on:click={() => (page -= 1)}
						disabled={page <= 0}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {page <=
						0
							? 'bg-slate-200'
							: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {page <= 0
							? 'hover:bg-slate-200'
							: 'hover:bg-gray-100'}   dark:text-gray-200 dark:hover:bg-gray-800"
					>
						<BackArrow />

						<span> précédent </span>
					</button>

					<button
						disabled={page >= totalPages - 1}
						on:click={() => (page += 1)}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {page >=
						totalPages - 1
							? 'bg-slate-200'
							: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {page >= totalPages - 1
							? 'hover:bg-slate-200'
							: 'hover:bg-gray-100'}  dark:text-gray-200 dark:hover:bg-gray-800"
					>
						<span> Suivant </span>

						<ForwardArrow />
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
