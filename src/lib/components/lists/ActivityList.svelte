<script lang="ts">
	import type { VisitStatusFilter as StatusFilter } from '$types';
	import { formatDateStringShort, formatDateStringToTime } from '$lib/utils/date';
	import { activityPage } from '$store/activity';
	import PaymentStatus from '$components/display/PaymentStatus.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import currency from 'currency.js';
	import SearchIcon from '$components/icons/SearchIcon.svelte';
	import BackArrow from '$components/icons/BackArrow.svelte';
	import ForwardArrow from '$components/icons/ForwardArrow.svelte';
	import EditIcon from '$components/icons/EditIcon.svelte';

	let statusFilter: StatusFilter = $activityPage.filter;
	let search: string = $activityPage.query;
	let page = $activityPage.page;

	$: currentUrl = browser ? document.location.href : '';

	$: nextPage = () => {
		if ($activityPage.page >= $activityPage.totalPages) return;

		const nextUrl = new URL(currentUrl);

		nextUrl.searchParams.set('page', `${$activityPage.page + 1}`);

		goto(nextUrl);
	};

	$: previousPage = () => {
		if ($activityPage.page <= 1) return;

		const prevUrl = new URL(currentUrl);

		prevUrl.searchParams.set('page', `${$activityPage.page - 1}`);
		goto(prevUrl);
	};

	$: dispatchSearch = () => {
		const searchUrl = new URL(currentUrl);

		searchUrl.searchParams.set('query', search);
		searchUrl.searchParams.delete('page');
		goto(searchUrl);
	};

	$: changeTab = (filter: StatusFilter) => {
		const filterUrl = new URL(currentUrl);

		filterUrl.searchParams.delete('page');

		if (filter === 'all') {
			filterUrl.searchParams.delete('filter');
		} else {
			filterUrl.searchParams.set('filter', filter);
		}

		goto(filterUrl);
	};
</script>

<div class="flex flex-col items-center justify-start xl:pl-14 w-full">
	<div class="w-full pt-10 pb-5 lg:p-5 bg-white md:shadow-2xl border-gray-200 xl:rounded">
		<div class="flex items-center gap-x-3 w-full">
			<div class="w-full grow flex items-center justify-center gap-x-3 xl:px-1 xl:justify-start">
				<h2 class="text-lg font-medium text-gray-800 dark:text-white">Visites</h2>

				<span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full"
					>{$activityPage.count.total}</span
				>
			</div>
		</div>
		<div
			class="flex py-5 px-2 lg:py-2 lg:px-0 flex-col lg:flex-row items-start lg:items-center space-y-5 lg:space-y-0 justify-between w-full"
		>
			<div
				class="flex flex-row overflow-hidden bg-white dark:bg-gray-800 border dark:border-gray-600 divide-x dark:divide-gray-600 rounded-lg"
			>
				<button
					on:click={() => {
						changeTab('all');
					}}
					class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
					'all'
						? 'bg-gray-100 dark:bg-blue-600 dark:text-white'
						: 'hover:bg-gray-100 dark:hover:bg-gray-700'} sm:text-sm dark:text-gray-300"
				>
					Tout
				</button>
				<button
					on:click={() => {
						changeTab('completed');
					}}
					class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
					'completed'
						? 'bg-gray-100 dark:bg-blue-600 dark:text-white'
						: 'hover:bg-gray-100 dark:hover:bg-gray-700'} sm:text-sm dark:text-gray-300"
				>
					payés
					<span
						class="inline-flex items-center justify-center w-auto min-w-5 px-1 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
					>
						{$activityPage.count.paid}
					</span>
				</button>
				<button
					on:click={() => {
						changeTab('partial');
					}}
					class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
					'partial'
						? 'bg-gray-100 dark:bg-blue-600 dark:text-white'
						: 'hover:bg-gray-100 dark:hover:bg-gray-700'} sm:text-sm dark:text-gray-300"
				>
					Arriérés
					<span
						class="inline-flex items-center justify-center w-auto px-1 min-w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
					>
						{$activityPage.count.partial}
					</span>
				</button>
				<button
					on:click={() => {
						changeTab('pending');
					}}
					class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
					'pending'
						? 'bg-gray-100 dark:bg-blue-600 dark:text-white'
						: 'hover:bg-gray-100 dark:hover:bg-gray-700'} sm:text-sm dark:text-gray-300"
				>
					En attente
					<span
						class="inline-flex items-center justify-center w-auto px-1 min-w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
					>
						{$activityPage.count.pending}
					</span>
				</button>
				<button
					on:click={() => {
						changeTab('control');
					}}
					class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
					'control'
						? 'bg-gray-100 dark:bg-blue-600 dark:text-white'
						: 'hover:bg-gray-100 dark:hover:bg-gray-700'} sm:text-sm dark:text-gray-300"
				>
					contrôle
					<span
						class="inline-flex items-center justify-center w-auto px-1 min-w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
					>
						{$activityPage.count.control}
					</span>
				</button>
			</div>
			<form on:submit|preventDefault={dispatchSearch} class="w-full md:w-auto md:pb-0">
				<div class="flex items-center mt-0 h-6 relative w-full">
					<button class="absolute right-0 focus:outline-none">
						<SearchIcon />
					</button>
					<input
						bind:value={search}
						placeholder="Rechercher par animal, client, téléphone et motif"
						type="text"
						class="block w-full py-1.5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-[500px] placeholder-gray-400/70 pl-3 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
					/>
				</div>
			</form>
		</div>
		<div class="flex flex-col px-5 md:px-0">
			<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
						<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead class="bg-gray-50 dark:bg-gray-800 table-fixed">
								<tr>
									<th
										scope="col"
										class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
									>
										Date
									</th>
									<th
										scope="col"
										class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
									>
										Heure
									</th>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Client</th
									>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Téléphone</th
									>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Animal</th
									>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Motif</th
									>

									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Total</th
									>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Payé</th
									>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Reste</th
									>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Surplus</th
									>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
									>
										Docteur
									</th>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
									>
										statut
									</th>
									<th scope="col" class="relative py-3.5 px-4">
										<span class="sr-only">Modifier</span>
									</th>
								</tr>
							</thead>
							<tbody
								class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
							>
								{#each $activityPage.items as visit}
									<tr>
										<td class="px-2 text-sm font-medium text-gray-700 whitespace-nowrap">
											<div class="inline-flex items-center gap-x-3">
												<a href="/visit/{visit.id}" class="flex items-center gap-x-2">
													<div>
														<h2
															class="capitalize font-medium text-gray-800 dark:text-white hover:underline"
														>
															{formatDateStringShort(visit.created)}
														</h2>
													</div>
												</a>
											</div>
										</td>
										<td
											class="px-4 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
											>{formatDateStringToTime(visit.created)}</td
										>
										<td
											class="px-4 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
											>{visit.client.name}</td
										>
										<td
											class="px-4 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
											>{visit.client.tel}</td
										>
										<td
											class="px-4 text-sm truncate lg:overflow-hidden max-w-sm {visit.animal.sex ===
											'male'
												? 'text-blue-500 '
												: 'text-pink-500 '} whitespace-nowrap">{visit.animal.name}</td
										>
										<td
											class="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
											>{visit.motif}</td
										>
										<td
											class="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-left"
											>{visit.bill.total} DT</td
										>
										<td
											class="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-left"
											>{visit.bill.total_paid} DT</td
										>
										<td
											class="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-left"
											>{Math.max(
												currency(visit.bill.total).subtract(visit.bill.total_paid).value,
												0
											)} DT</td
										>
										<td
											class="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-left"
										>
											{#if currency(visit.bill.total).subtract(visit.bill.total_paid).value < 0}
												{Math.abs(currency(visit.bill.total).subtract(visit.bill.total_paid).value)}
												DT
											{/if}
										</td>
										<td class="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
											>{visit.doctor ?? ''}</td
										>
										<td class="px-4 py-2 text-sm whitespace-nowrap">
											<PaymentStatus bill={visit.bill} type="small" control={visit.control} />
										</td>

										<td class="px-4 py-2 text-sm whitespace-nowrap">
											<div class="flex items-end justify-end gap-x-6 w-full">
												<a
													href="/visit/{visit.id}"
													title="Modifier la visite"
													class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
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

		<div class="mt-6 pb-5 lg:pb-0 sm:flex sm:items-center sm:justify-between px-5">
			<div class="text-sm text-gray-500 dark:text-gray-400">
				Page <span class="font-medium text-gray-700 dark:text-gray-100"
					>{$activityPage.page} sur {$activityPage.totalPages}</span
				>
			</div>

			<div class="flex items-center mt-4 gap-x-4 sm:mt-0">
				<button
					on:click={previousPage}
					disabled={page <= 1}
					class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {page <=
					1
						? 'bg-slate-200'
						: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {page <= 1
						? 'hover:bg-slate-200'
						: 'hover:bg-gray-100'}  dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
				>
					<BackArrow />

					<span> précédent </span>
				</button>

				<button
					disabled={page >= $activityPage.totalPages}
					on:click={nextPage}
					class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {page >=
					$activityPage.totalPages
						? 'bg-slate-200'
						: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {page >= $activityPage.totalPages
						? 'hover:bg-slate-200'
						: 'hover:bg-gray-100'} dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
				>
					<span> Suivant </span>

					<ForwardArrow />
				</button>
			</div>
		</div>
	</div>
</div>
