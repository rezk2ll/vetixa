<script lang="ts">
	import Modal from '$components/Modal.svelte';
	import { enhance } from '$app/forms';
	import ConfirmationDialog from '$components/ConfirmationDialog.svelte';
	import AddVisitForm from '$components/forms/visit/AddVisitForm.svelte';
	import type { VisitStatusFilter as StatusFilter, Visit } from '$types';
	import { formatDateString } from '$utils/date';
	import { visitItems } from '$store/visit';
	import PaymentStatus from '$components/display/PaymentStatus.svelte';
	import currency from 'currency.js';

	export let isNew: boolean = false;

	let openAddModal = isNew;
	let deleteFormRef: HTMLFormElement;
	let selectedItem: Visit | null;
	let showConfirmation = false;
	let statusFilter: StatusFilter = 'all';
	let search: string;
	let page = 0;

	$: totalPages = Math.max(Math.ceil($visitItems.length / 10), 1);

	$: handler = () => {
		deleteFormRef.requestSubmit();

		selectedItem = null;
		showConfirmation = false;
	};

	const remove = (item: Visit) => {
		selectedItem = item;
		showConfirmation = true;
	};

	$: items = $visitItems.filter((item) => {
		if (search && search.length) {
			const searchString = search.toLocaleLowerCase();

			if (
				!item.motif.toLowerCase().includes(searchString) &&
				!item.animal.name.toLowerCase().includes(searchString)
			) {
				return false;
			}
		}

		if (statusFilter === 'completed') {
			return item.bill && item.bill.paid && item.bill.total === item.bill.total_paid;
		}

		if (statusFilter === 'partial') {
			return item.bill && item.bill.total_paid > 0 && item.bill.total_paid < item.bill.total;
		}

		if (statusFilter === 'pending') {
			return item.bill && item.bill.total_paid === 0 && item.control === false
		}

    if (statusFilter === 'control') {
      return item.control;
    }

		return true;
	});

	$: pageItems = items.slice(page * 10, page * 10 + 10);

	$: paidCount = $visitItems.filter(({ bill }) => bill && bill.paid).length;
	$: partialCount = $visitItems.filter(
		({ bill, control }) =>
			bill && bill.total_paid > 0 && bill.total_paid < bill.total && control === false
	).length;
	$: pendingCount = $visitItems.filter(
		({ bill, control }) => bill && bill.total_paid === 0 && control === false
	).length;
	$: controlCount = $visitItems.filter(({ control }) => control).length;
</script>

<form use:enhance action="?/deleteVisit" method="POST" class="hidden" bind:this={deleteFormRef}>
	{#if selectedItem}
		<input type="hidden" name="id" bind:value={selectedItem.id} />
	{/if}
</form>

<div class="flex flex-col items-center justify-start w-full">
	<ConfirmationDialog bind:show={showConfirmation} {handler}>
		<div>
			{#if selectedItem?.date}
				<div class="mt-2 text-center">
					<h3 class="text-lg font-medium leading-6 text-gray-800 dark:text-white" id="modal-title">
						Supprimer la visite de {formatDateString(selectedItem.created)}
					</h3>
					<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
						Êtes-vous sûr de vouloir supprimer cette visite ? Toutes vos données seront
						définitivement supprimé. Cette action ne peut pas être annulée.
					</p>
				</div>
			{/if}
		</div>
	</ConfirmationDialog>
	<Modal bind:open={openAddModal} size="medium">
		<AddVisitForm bind:open={openAddModal} />
	</Modal>
	<div
		class="w-full xl:w-11/12 p-2 lg:pt-5 lg:p-5 bg-white shadow-2xl border-gray-200 h-screen xl:h-fit xl:rounded"
	>
		<div class="flex flex-col lg:flex-row gap-2 items-center gap-x-3 w-full">
			<div class="w-full flex items-center justify-center gap-x-3 xl:px-1 xl:justify-start">
				<h2 class="text-lg font-medium text-gray-800 dark:text-white">Visites</h2>

				<span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full"
					>{$visitItems.length}</span
				>
			</div>
			<button
				on:click={() => (openAddModal = true)}
				class="flex items-center justify-center w-full lg:w-auto px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-emerald-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-emerald-600"
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
						d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span>Nouvelle visite</span>
			</button>
		</div>
		<div
			class="flex py-2 lg:px-0 flex-col lg:flex-row items-start lg:items-center space-y-10 lg:space-y-0 justify-between w-full"
		>
			<div
				class="flex flex-row overflow-hidden bg-white border divide-x rounded-lg w-full lg:w-auto"
			>
				<button
					on:click={() => {
						statusFilter = 'all';
						page = 0;
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
						statusFilter = 'completed';
						page = 0;
					}}
					class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
					'completed'
						? 'bg-gray-100'
						: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
				>
					payés
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
					class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
					'partial'
						? 'bg-gray-100'
						: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
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
					class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
					'pending'
						? 'bg-gray-100'
						: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
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
					class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
					'control'
						? 'bg-gray-100'
						: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
				>
					contrôle
					<span
						class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
					>
						{controlCount}
					</span>
				</button>
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
										<span>Date</span>
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
											class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
											>{visit.motif}</td
										>
										<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
											>{visit.bill.total} Dt</td
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
										<td class="px-4 py-4 text-sm whitespace-nowrap">
											<PaymentStatus bill={visit.bill} control={visit.control} />
										</td>
										<td class="px-4 py-4 text-sm whitespace-nowrap">
											<div class="flex items-end justify-end gap-x-6 w-full">
												<button
													on:click={() => remove(visit)}
													class="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
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
															d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
														/>
													</svg>
												</button>

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
