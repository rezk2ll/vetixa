<script lang="ts">
	import AddExpenseForm from '$components/forms/funds/AddExpenseForm.svelte';
	import AddFundsForm from '$components/forms/funds/AddFundsForm.svelte';
	import { formatDateStringShort, formatDateStringToTime, getMaxSelectionDate } from '$utils/date';
	import Modal from '$components/Modal.svelte';
	import { fundsPageInfo } from '$store/funds';
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	import fr from 'date-fns/locale/fr/index';
	import type { fundsStatusFilter as StatusFilter } from '$types';
	import { format, setHours, setMinutes } from 'date-fns';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import ArrowDown from '$components/icons/ArrowDown.svelte';
	import ArrowUp from '$components/icons/ArrowUp.svelte';
	import SearchIcon from '$components/icons/SearchIcon.svelte';
	import BackArrow from '$components/icons/BackArrow.svelte';
	import ForwardArrow from '$components/icons/ForwardArrow.svelte';
	import MoneyBagIcon from '$components/icons/MoneyBagIcon.svelte';
	import MoneyOutIcon from '$components/icons/MoneyOutIcon.svelte';
	import DoubleArrow from '$components/icons/DoubleArrow.svelte';

	let locale = localeFromDateFnsLocale(fr);
	let openAddFundsForm = false;
	let openAddExpensesForm = false;
	let search: string = $fundsPageInfo.query;
	let maxDate = getMaxSelectionDate();

	let startDate: Date = $fundsPageInfo.startDate.startsWith('@')
		? setMinutes(setHours(new Date(), 0), 0)
		: new Date($fundsPageInfo.startDate);
	let endDate: Date = $fundsPageInfo.endDate.startsWith('@')
		? setMinutes(setHours(new Date(), 23), 0)
		: new Date($fundsPageInfo.endDate);

	$: currentUrl = browser ? document.location.href : '';

	$: previousPage = () => {
		if ($fundsPageInfo.page <= 1) return;

		const prevUrl = new URL(currentUrl);

		prevUrl.searchParams.set('page', `${$fundsPageInfo.page - 1}`);
		goto(prevUrl);
	};

	$: nextPage = () => {
		if ($fundsPageInfo.page >= $fundsPageInfo.totalPages) return;

		const nextUrl = new URL(currentUrl);

		nextUrl.searchParams.set('page', `${$fundsPageInfo.page + 1}`);

		goto(nextUrl);
	};

	$: changeDuration = () => {
		const start = format(startDate, 'yyyy-MM-dd HH:mm');
		const end = format(endDate, 'yyyy-MM-dd HH:mm');

		const targetUrl = new URL(currentUrl);

		targetUrl.searchParams.set('startDate', start);
		targetUrl.searchParams.set('endDate', end);
		targetUrl.searchParams.delete('page');

		goto(targetUrl.toString());
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

	$: dispatchSearch = () => {
		const searchUrl = new URL(currentUrl);

		searchUrl.searchParams.set('query', search);
		searchUrl.searchParams.delete('page');
		goto(searchUrl);
	};
</script>

<div class="flex flex-col items-center justify-start xl:pl-14 w-full xl:py-10">
	<Modal bind:open={openAddFundsForm} size="small">
		<AddFundsForm bind:open={openAddFundsForm} />
	</Modal>

	<Modal bind:open={openAddExpensesForm} size="small">
		<AddExpenseForm bind:open={openAddExpensesForm} />
	</Modal>
	<div class="w-full p-1 lg:p-5 bg-white shadow lg:shadow-2xl border-gray-200 xl:rounded">
		<div class="flex flex-col space-y-4 pt-10 lg:pt-0">
			<div
				class="flex pl-2 lg:pl-0 flex-col lg:flex-row items-start lg:items-center justify-between w-full"
			>
				<div class="flex flex-col">
					<div class="flex flex-col justify-start lg:items-start items-center gap-x-3">
						<h2 class="text-lg font-medium text-gray-700 dark:text-white">Caisse</h2>
						<div class="flex flex-wrap gap-1">
							<span class="px-3 py-1 text-xs text-slate-600 bg-slate-100 rounded"
								>{$fundsPageInfo.count.all} transactions</span
							>
							<span class="px-3 py-1 text-xs text-emerald-700 bg-emerald-200 rounded"
								>Revenu: {$fundsPageInfo.total.income} dt</span
							>
							<span class="px-3 py-1 text-xs text-red-700 bg-red-200 rounded"
								>Dépenses: {$fundsPageInfo.total.expense} dt</span
							>
							<span class="px-3 py-1 text-xs text-blue-700 bg-blue-200 rounded"
								>Recette: {$fundsPageInfo.total.balance} dt</span
							>
							<span class="px-3 py-1 text-xs text-yellow-900 bg-yellow-400 rounded"
								>Arriérés: {$fundsPageInfo.total.remaining} dt</span
							>
						</div>
					</div>

					<p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
						La liste des transactions effectuées au cours de période sélectionnée
					</p>
				</div>

				<div class="flex items-center mt-4 gap-x-3 w-full lg:w-auto pr-5 lg:pr-0">
					<button
						on:click={() => (openAddFundsForm = true)}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-emerald-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-emerald-600"
					>
						<MoneyBagIcon />

						<span>Encaissement</span>
					</button>
					<button
						on:click={() => (openAddExpensesForm = true)}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-red-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-800"
					>
						<MoneyOutIcon />

						<span>Décaissement</span>
					</button>
				</div>
			</div>
			<div
				class="flex px-2 lg:px-0 flex-col lg:flex-row items-start lg:items-center space-y-5 lg:space-y-0 justify-between w-full lg:w-auto"
			>
				<div
					class="flex flex-row overflow-hidden bg-white border divide-x rounded-lg w-full lg:w-auto"
				>
					<button
						type="button"
						on:click={() => changeTab('all')}
						class="px-5 py-2 text-xs w-full font-medium text-gray-600 transition-colors duration-200 {$fundsPageInfo.filter ===
						'all'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						Tout
					</button>
					<button
						type="button"
						on:click={() => changeTab('income')}
						class="px-5 py-2 text-xs w-full font-medium text-gray-600 transition-colors duration-200 {$fundsPageInfo.filter ===
						'income'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						Revenu
					</button>
					<button
						type="button"
						on:click={() => changeTab('expense')}
						class="px-5 py-2 text-xs w-full font-medium text-gray-600 transition-colors duration-200 {$fundsPageInfo.filter ===
						'expense'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						Dépenses
					</button>
				</div>

				<div class="flex items-center space-x-2 mt-0 h-6">
					<DateInput
						class="rounded-full"
						max={maxDate}
						bind:value={startDate}
						timePrecision="minute"
						closeOnSelection={true}
						format="yyyy-MM-dd HH:mm"
						{locale}
					/>
					<div class="text-slate-500">
						<DoubleArrow />
					</div>
					<DateInput
						bind:value={endDate}
						max={maxDate}
						min={startDate}
						format="yyyy-MM-dd HH:mm"
						closeOnSelection={true}
						timePrecision="minute"
						{locale}
					/>
					<button
						type="button"
						on:click={() => changeDuration()}
						class="text-slate-600 bg-slate-100 rounded-full hover:bg-slate-300 p-2 transition-all ease-in-out delay-100 duration-100"
						title="refresh"
					>
						<svg
							data-slot="icon"
							fill="none"
							class="w-5 h-5"
							stroke-width="2"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
							/>
						</svg>
					</button>
				</div>
				<form on:submit|preventDefault={dispatchSearch} class="w-full lg:w-auto">
					<div class="flex relative items-center mt-0 h-6">
						<button class="absolute right-0 focus:outline-none">
							<SearchIcon />
						</button>
						<input
							bind:value={search}
							type="text"
							placeholder="Rechercher"
							class="block w-full py-1.5 pr-2 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-60 placeholder-gray-400/70 pl-5 rtl:pr-11 rtl:pl-5 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
						/>
					</div>
				</form>
			</div>
			<div class="flex flex-col mt-6 px-4 lg:px-0">
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
										>
											Description
										</th>

										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Catégorie
										</th>
										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Responsable
										</th>

										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Montant</th
										>

										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Mode de paiement</th
										>
									</tr>
								</thead>
								<tbody
									class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
								>
									{#each $fundsPageInfo.items as item}
										<tr>
											<td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
												<h2 class="font-medium text-gray-800 dark:text-white capitalize">
													{formatDateStringShort(item.created)}
												</h2>
											</td>
											<td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
												<h2 class="font-medium text-gray-600 dark:text-white capitalize">
													{formatDateStringToTime(item.created)}
												</h2>
											</td>
											<td class="px-4 py-4 text-sm font-medium">
												<p
													class="text-sm font-normal text-gray-600 dark:text-gray-400 first-letter:capitalize whitespace-pre-line"
												>
													{@html item.description}
												</p>
											</td>
											<td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
												<p
													class="text-sm font-normal text-gray-600 dark:text-gray-400 first-letter:capitalize"
												>
													{item.category}
												</p>
											</td>
											<td class="px-4 py-4 text-sm whitespace-nowrap">
												<p
													class="text-sm font-normal text-gray-600 dark:text-gray-400 first-letter:capitalize"
												>
													{item.user}
												</p>
											</td>
											<td class="px-4 py-4 text-sm whitespace-nowrap">
												{#if item.amount > 0}
													<div
														class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800"
													>
														{item.amount} dt
													</div>
												{:else}
													<div
														class="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60 dark:bg-gray-800"
													>
														{item.amount} dt
													</div>
												{/if}
											</td>
											<td class="px-4 py-3 text-sm whitespace-nowrap">
												<div class="flex gap-2">
													<div
														class="text-sm pt-1 font-normal text-gray-600 dark:text-gray-400 uppercase"
													>
														{item.method}
													</div>
													{#if item.method === 'cash'}
														<div class="flex flex-row gap-1">
															<kbd
																aria-label="montant entrant"
																title="montant entrant"
																class="inline-flex items-center px-1 py-1 font-sans text-xs text-emerald-500 border rounded-md dark:text-gray-400 dark:border-gray-700"
															>
																<ArrowDown />
																{item.incash} DT
															</kbd>
															<kbd
																aria-label="montant sortant"
																title="montant sortant"
																class="inline-flex items-center px-1 py-1 font-sans text-xs text-red-500 border rounded-md dark:text-gray-400 dark:border-gray-700"
															>
																<ArrowUp />
																{item.outcash} DT
															</kbd>
														</div>
													{/if}
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

			<div class="mt-6 pb-5 lg:pb-0 sm:flex sm:items-center sm:justify-between px-4 lg:px-0">
				<div class="text-sm text-gray-500 dark:text-gray-400">
					Page <span class="font-medium text-gray-700 dark:text-gray-100"
						>{$fundsPageInfo.page} sur {$fundsPageInfo.totalPages}</span
					>
				</div>

				<div class="flex items-center mt-4 gap-x-4 sm:mt-0">
					<button
						on:click={previousPage}
						disabled={$fundsPageInfo.page <= 1}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {$fundsPageInfo.page <=
						1
							? 'bg-slate-200'
							: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {$fundsPageInfo.page <= 1
							? 'hover:bg-slate-200'
							: 'hover:bg-gray-100'}  dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
					>
						<BackArrow />

						<span> précédent </span>
					</button>

					<button
						disabled={$fundsPageInfo.page >= $fundsPageInfo.totalPages}
						on:click={nextPage}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {$fundsPageInfo.page >=
						$fundsPageInfo.totalPages
							? 'bg-slate-200'
							: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {$fundsPageInfo.page >=
						$fundsPageInfo.totalPages
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
</div>
