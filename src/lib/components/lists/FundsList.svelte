<script lang="ts">
	import AddExpenseForm from '$components/forms/funds/AddExpenseForm.svelte';
	import AddFundsForm from '$components/forms/funds/AddFundsForm.svelte';
	import { formatDateStringShort, formatDateStringToTime } from '$utils/date';
	import Modal from '$components/Modal.svelte';
	import { fundsPageInfo } from '$store/funds';
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	import { fr } from 'date-fns/locale';
	import type { fundsStatusFilter as StatusFilter } from '$types';
	import { format, setHours, setMinutes } from 'date-fns';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	let locale = localeFromDateFnsLocale(fr);

	let openAddFundsForm = false;
	let openAddExpensesForm = false;
	let search: string;
	let startDate: Date = setMinutes(setHours(new Date(), 0), 0);
	let endDate: Date = setMinutes(setHours(new Date(), 23), 0);

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

<Modal bind:open={openAddFundsForm} size="small">
	<AddFundsForm bind:open={openAddFundsForm} />
</Modal>

<Modal bind:open={openAddExpensesForm} size="small">
	<AddExpenseForm bind:open={openAddExpensesForm} />
</Modal>

<div class="flex flex-col items-center justify-start xl:pl-14 w-full xl:py-10">
	<div class="w-full p-1 pt-10 lg:p-5 bg-white shadow-2xl border-gray-200 xl:rounded">
		<div class="flex flex-col space-y-4 pt-10 lg:pt-0">
			<div
				class="flex pl-2 lg:pl-0 flex-col lg:flex-row items-start lg:items-center justify-between w-full"
			>
				<div>
					<div class="flex items-center gap-x-3">
						<h2 class="text-lg font-medium text-gray-800 dark:text-white">Caisse</h2>
						<span
							class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400"
							>{$fundsPageInfo.totalItems} transactions</span
						>
						<span
							class="px-3 py-1 text-xs text-emerald-600 bg-emerald-100 rounded-full dark:bg-gray-800 dark:text-emerald-400"
							>Revenu: {$fundsPageInfo.total.income} dt</span
						>
						<span
							class="px-3 py-1 text-xs text-red-600 bg-red-100 rounded-full dark:bg-gray-800 dark:text-red-400"
							>Dépenses: {$fundsPageInfo.total.expense} dt</span
						>
						<span
							class="px-3 py-1 text-xs text-slate-600 bg-slate-200 rounded-full dark:bg-gray-800 dark:text-orange-400"
							>Recette: {$fundsPageInfo.total.balance} dt</span
						>
						<span
							class="px-3 py-1 text-xs text-orange-800 bg-orange-200 rounded-full dark:bg-gray-800 dark:text-orange-400"
							>Arriarés: {$fundsPageInfo.total.remaining} dt</span
						>
					</div>

					<p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
						La liste des transactions effectuées au cours de période sélectionnée
					</p>
				</div>

				<div class="flex items-center mt-4 gap-x-3">
					<button
						on:click={() => (openAddFundsForm = true)}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-emerald-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:bg-emerald-600"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-6 h-6"
							fill="currentColor"
							viewBox="0 0 512 512"
							><path
								d="M320 96H192L144.6 24.9C137.5 14.2 145.1 0 157.9 0H354.1c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128H320c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4l0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V424c0 11 9 20 20 20s20-9 20-20V410.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l0 0-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V216z"
							/></svg
						>

						<span>Encaissement</span>
					</button>
					<button
						on:click={() => (openAddExpensesForm = true)}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-red-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-red-600 dark:hover:bg-red-500 dark:bg-red-600"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-6 h-6"
							fill="currentColor"
							viewBox="0 0 576 512"
							><path
								d="M312 24V34.5c6.4 1.2 12.6 2.7 18.2 4.2c12.8 3.4 20.4 16.6 17 29.4s-16.6 20.4-29.4 17c-10.9-2.9-21.1-4.9-30.2-5c-7.3-.1-14.7 1.7-19.4 4.4c-2.1 1.3-3.1 2.4-3.5 3c-.3 .5-.7 1.2-.7 2.8c0 .3 0 .5 0 .6c.2 .2 .9 1.2 3.3 2.6c5.8 3.5 14.4 6.2 27.4 10.1l.9 .3c11.1 3.3 25.9 7.8 37.9 15.3c13.7 8.6 26.1 22.9 26.4 44.9c.3 22.5-11.4 38.9-26.7 48.5c-6.7 4.1-13.9 7-21.3 8.8V232c0 13.3-10.7 24-24 24s-24-10.7-24-24V220.6c-9.5-2.3-18.2-5.3-25.6-7.8c-2.1-.7-4.1-1.4-6-2c-12.6-4.2-19.4-17.8-15.2-30.4s17.8-19.4 30.4-15.2c2.6 .9 5 1.7 7.3 2.5c13.6 4.6 23.4 7.9 33.9 8.3c8 .3 15.1-1.6 19.2-4.1c1.9-1.2 2.8-2.2 3.2-2.9c.4-.6 .9-1.8 .8-4.1l0-.2c0-1 0-2.1-4-4.6c-5.7-3.6-14.3-6.4-27.1-10.3l-1.9-.6c-10.8-3.2-25-7.5-36.4-14.4c-13.5-8.1-26.5-22-26.6-44.1c-.1-22.9 12.9-38.6 27.7-47.4c6.4-3.8 13.3-6.4 20.2-8.2V24c0-13.3 10.7-24 24-24s24 10.7 24 24zM568.2 336.3c13.1 17.8 9.3 42.8-8.5 55.9L433.1 485.5c-23.4 17.2-51.6 26.5-80.7 26.5H192 32c-17.7 0-32-14.3-32-32V416c0-17.7 14.3-32 32-32H68.8l44.9-36c22.7-18.2 50.9-28 80-28H272h16 64c17.7 0 32 14.3 32 32s-14.3 32-32 32H288 272c-8.8 0-16 7.2-16 16s7.2 16 16 16H392.6l119.7-88.2c17.8-13.1 42.8-9.3 55.9 8.5zM193.6 384l0 0-.9 0c.3 0 .6 0 .9 0z"
							/></svg
						>

						<span>Décaissement</span>
					</button>
				</div>
			</div>
			<div
				class="flex px-1 lg:px-0 flex-col lg:flex-row items-start lg:items-center space-y-10 lg:space-y-0 justify-between"
			>
				<div
					class="flex flex-row overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700"
				>
					<button
						type="button"
						on:click={() => changeTab('all')}
						class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {$fundsPageInfo.filter ===
						'all'
							? 'bg-gray-100'
							: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300"
					>
						Tout
					</button>
					<button
						type="button"
						on:click={() => changeTab('income')}
						class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {$fundsPageInfo.filter ===
						'income'
							? 'bg-gray-100'
							: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
					>
						Revenu
					</button>
					<button
						type="button"
						on:click={() => changeTab('expense')}
						class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {$fundsPageInfo.filter ===
						'expense'
							? 'bg-gray-100'
							: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
					>
						Dépenses
					</button>
				</div>

				<div class="flex items-center space-x-2 mt-0 h-6">
					<DateInput
						class="rounded-full"
						bind:value={startDate}
						timePrecision="minute"
						closeOnSelection={true}
						format="yyyy-MM-dd HH:mm"
						{locale}
					/>
					<div class="text-slate-500">
						<svg
							data-slot="icon"
							fill="none"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-5 h-5"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
							/>
						</svg>
					</div>
					<DateInput
						bind:value={endDate}
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
				<form on:submit|preventDefault={dispatchSearch}>
					<div class="flex items-center mt-0 h-6">
						<button class="absolute right-0 focus:outline-none">
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
						</button>
						<input
							bind:value={search}
							type="text"
							placeholder="Rechercher"
							class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-60 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
						/>
					</div>
				</form>
			</div>
			<div class="flex flex-col mt-6">
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
											<td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
												<p
													class="text-sm font-normal text-gray-600 dark:text-gray-400 first-letter:capitalize"
												>
													{item.description}
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
											<td class="px-4 py-4 text-sm whitespace-nowrap">
												<div class="flex flex-col">
													<p class="text-sm font-normal text-gray-600 dark:text-gray-400 uppercase">
														{item.method}
													</p>
													{#if item.method === 'cash'}
														<div class="flex flex-row gap-1">
															<kbd
																class="inline-flex items-center px-1 py-1 font-sans text-xs text-gray-500 border rounded-md dark:text-gray-400 dark:border-gray-700"
															>
																entrant: {item.incash} DT
															</kbd>
															<kbd
																class="inline-flex items-center px-1 py-1 font-sans text-xs text-gray-500 border rounded-md dark:text-gray-400 dark:border-gray-700"
															>
																sortant: {item.outcash} DT
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

			<div class="mt-6 pb-5 lg:pb-0 sm:flex sm:items-center sm:justify-between">
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
</div>
