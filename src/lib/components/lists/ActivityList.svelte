<script lang="ts">
	import type { VisitStatusFilter as StatusFilter } from '$types';
	import { formatDateString } from '$lib/utils/date';
	import { activityPage } from '$store/activity';
	import PaymentStatus from '$components/dispaly/PaymentStatus.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let statusFilter: StatusFilter = $activityPage.filter;
	let search: string = $activityPage.query;
	let page = $activityPage.page;

	$: currentUrl = browser ? document.location.href : '';

	$: nextPage = () => {
		if ($activityPage.page + 1 === $activityPage.totalPages) return;

		const nextUrl = new URL(currentUrl);

		nextUrl.searchParams.set('page', `${$activityPage.page + 1}`);

		goto(nextUrl);
	};

	$: previousPage = () => {
		if ($activityPage.page === 1) return;

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

<div class="flex flex-col items-center justify-start w-full">
	<div
		class="w-full xl:w-11/12 pt-10 lg:p-10 bg-white shadow-2xl border-gray-200 h-screen xl:h-fit xl:rounded px-2 mb-5"
	>
		<div class="flex items-center gap-x-3 w-full">
			<div class="w-full grow flex items-center justify-center gap-x-3 xl:px-1 xl:justify-start">
				<h2 class="text-lg font-medium text-gray-800 dark:text-white">Visites</h2>

				<span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full"
					>{$activityPage.totalItems}</span
				>
			</div>
		</div>
		<div
			class="flex px-1 py-2 lg:px-0 flex-col lg:flex-row items-start lg:items-center space-y-10 lg:space-y-0 justify-between w-full"
		>
			<div class="flex flex-row overflow-hidden bg-white border divide-x rounded-lg">
				<button
					on:click={() => {
						changeTab('all');
					}}
					class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
					'all'
						? 'bg-gray-100'
						: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300"
				>
					Tout
				</button>
				<button
					on:click={() => {
						changeTab('completed');
					}}
					class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
					'completed'
						? 'bg-gray-100'
						: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
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
						? 'bg-gray-100'
						: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
				>
					Arriarés
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
						? 'bg-gray-100'
						: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
				>
					En attente
					<span
						class="inline-flex items-center justify-center w-auto px-1 min-w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
					>
						{$activityPage.count.pending}
					</span>
				</button>
			</div>
			<form on:submit|preventDefault={dispatchSearch}>
				<div class="flex items-center mt-0 h-6 relative w-full">
					<button class="absolute right-0 focus:outline-none">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-5 h-5 mx-3 text-blue-500"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/>
						</svg>
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
		<div class="flex flex-col">
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
										<span>Date</span>
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
										>Reste</th
									>

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
															{formatDateString(visit.created)}
														</h2>
													</div>
												</a>
											</div>
										</td>
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
										<td class="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
											>{visit.bill.total} Dt</td
										>
										<td class="px-4 py-2 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
											>{visit.bill.total - visit.bill.total_paid} Dt</td
										>
										<td class="px-4 py-2 text-sm whitespace-nowrap">
											<PaymentStatus bill={visit.bill} type="small" />
										</td>
										<td class="px-4 py-2 text-sm whitespace-nowrap">
											<div class="flex items-end justify-end gap-x-6 w-full">
												<a
													href="/visit/{visit.id}"
													title="Modifier la visite"
													class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke-width="1.5"
														stroke="currentColor"
														class="w-5 h-5"
													>
														<path
															stroke-linecap="round"
															stroke-linejoin="round"
															d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
														/>
													</svg>
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

		<div class="mt-6 pb-5 lg:pb-0 sm:flex sm:items-center sm:justify-between">
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
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-5 h-5 rtl:-scale-x-100"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
						/>
					</svg>

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

					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-5 h-5 rtl:-scale-x-100"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
						/>
					</svg>
				</button>
			</div>
		</div>
	</div>
</div>
