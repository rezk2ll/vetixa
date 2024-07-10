<script lang="ts">
	import { enhance } from '$app/forms';
	import ConfirmationDialog from '$components/ConfirmationDialog.svelte';
	import type { AnimalVisit } from '$types';
	import {
		formatDateString,
		formatDateStringShort,
		formatDateStringShortDay,
		formatDateStringToTime
	} from '$utils/date';
	import { vaccinationVisitList as visitItems } from '$store/visit';
	import PaymentStatus from '$components/display/PaymentStatus.svelte';
	import currency from 'currency.js';

	let search: string;
	let page = 0;

	$: totalPages = Math.max(Math.ceil($visitItems.length / 10), 1);

	$: items = $visitItems.filter((item) => {
		if (search && search.length) {
			const searchString = search.toLocaleLowerCase();

			return item.motif.toLowerCase().includes(searchString);
		}

		return true;
	});

	$: pageItems = items.slice(page * 10, page * 10 + 10);
</script>

<div class="flex flex-col items-center justify-start w-full">
	<div
		class="w-full xl:w-11/12 p-2 lg:pt-5 lg:p-5 bg-white shadow-2xl border-gray-200 h-screen xl:h-fit xl:rounded"
	>
		<div class="flex flex-col lg:flex-row gap-2 items-center gap-x-3 w-full">
			<div class="w-full flex items-center justify-center gap-x-3 xl:px-1 xl:justify-start">
				<h2 class="text-lg font-medium text-gray-800 dark:text-white">
					Consultations vaccinales
				</h2>

				<span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full"
					>{$visitItems.length}</span
				>
			</div>
			<div class="flex items-center mt-0 h-6 w-full lg:w-auto">
				<span class="absolute">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-5 h-5 mx-3 text-gray-400 dark:text-gray-600"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
						/>
					</svg>
				</span>

				<input
					bind:value={search}
					type="text"
					placeholder="Rechercher"
					class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-60 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
				/>
			</div>
		</div>
		<div class="flex flex-col mt-6 px-2 lg:px-0">
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
										>Surplus</th
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
								{#each pageItems as visit}
									<tr>
										<td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
											<div class="inline-flex items-center gap-x-3">
												<a href="/visit/{visit.id}" class="flex items-center gap-x-2">
													<h2
														class="capitalize font-medium text-gray-800 dark:text-white hover:underline"
													>
														{formatDateStringShort(visit.created)}
													</h2>
												</a>
											</div>
										</td>
										<td
											class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
											>{formatDateStringToTime(visit.created)}</td
										>
										<td
											class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
											>{visit.motif}</td
										>
										<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
											>{visit.bill.total} Dt</td
										>
										<td
											class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap text-left"
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
										<td class="px-4 py-4 text-sm whitespace-nowrap">
											<PaymentStatus bill={visit.bill} control={visit.control} />
										</td>
										<td class="px-4 py-4 text-sm whitespace-nowrap">
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

		<div class="mt-6 pb-5 lg:pb-0 sm:flex sm:items-center sm:justify-between px-2 lg:px-0">
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
					disabled={page >= totalPages - 1}
					on:click={() => (page += 1)}
					class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {page >=
					totalPages - 1
						? 'bg-slate-200'
						: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {page >= totalPages - 1
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
