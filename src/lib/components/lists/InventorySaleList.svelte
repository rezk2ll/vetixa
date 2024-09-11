<script lang="ts">
	import { formatDateStringShort, formatDateStringToTime } from '$utils/date';
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	import fr from 'date-fns/locale/fr/index';
	import { format, setHours, setMinutes } from 'date-fns';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import SearchIcon from '$components/icons/SearchIcon.svelte';
	import BackArrow from '$components/icons/BackArrow.svelte';
	import ForwardArrow from '$components/icons/ForwardArrow.svelte';
	import DoubleArrow from '$components/icons/DoubleArrow.svelte';
	import { inventorySalesPageInfo } from '$store/inventory';

	let locale = localeFromDateFnsLocale(fr);
	let search: string = '';
	let page = 0;

	let startDate: Date = $inventorySalesPageInfo.startDate.startsWith('@')
		? setMinutes(setHours(new Date(), 0), 0)
		: new Date($inventorySalesPageInfo.startDate);
	let endDate: Date = $inventorySalesPageInfo.endDate.startsWith('@')
		? setMinutes(setHours(new Date(), 23), 0)
		: new Date($inventorySalesPageInfo.endDate);

	$: currentUrl = browser ? document.location.href : '';

	$: items = $inventorySalesPageInfo.items.filter((item) => {
		if (search && search.length) {
			return (
				item.item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
				item.item.code.toLocaleLowerCase().includes(search.toLocaleLowerCase())
			);
		}

		return true;
	});

	$: totalPages = Math.ceil(items.length / 10);
	$: pageItems = items.slice(page * 10, page * 10 + 10);

	$: changeDuration = () => {
		const start = format(startDate, 'yyyy-MM-dd HH:mm');
		const end = format(endDate, 'yyyy-MM-dd HH:mm');

		const targetUrl = new URL(currentUrl);

		targetUrl.searchParams.set('startDate', start);
		targetUrl.searchParams.set('endDate', end);

		goto(targetUrl.toString());
	};
</script>

<div class="flex flex-col items-center justify-start xl:pl-14 w-full xl:py-10">
	<div class="w-full p-1 lg:p-5 bg-white shadow lg:shadow-2xl border-gray-200 xl:rounded">
		<div class="flex flex-col space-y-4 pt-10 lg:pt-0">
			<div
				class="flex pl-2 lg:pl-0 flex-col lg:flex-row items-start lg:items-center justify-between w-full"
			>
				<div class="flex flex-col">
					<div class="flex flex-col justify-start lg:items-start items-center gap-x-3">
						<h2 class="text-lg font-medium text-gray-700 dark:text-white">Ventes d'inventaire</h2>
					</div>

					<p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
						La liste des ventes d'inventaire pendant la durée sélectionnée
					</p>
				</div>
			</div>
			<div
				class="flex px-2 lg:px-0 flex-col lg:flex-row items-start lg:items-center space-y-5 lg:space-y-0 justify-between w-full lg:w-auto"
			>
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
						<DoubleArrow />
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
				<div class="w-full lg:w-auto">
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
				</div>
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
											class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
										>
											Date
										</th>
										<th
											scope="col"
											class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
										>
											Heure
										</th>
										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
										>
											Nom
										</th>
										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
										>
											code
										</th>

										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
										>
											Quantité
										</th>
										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
										>
											Remise %
										</th>
										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
										>
											Source
										</th>
										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500"
											>Montant</th
										>
									</tr>
								</thead>
								<tbody
									class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
								>
									{#each pageItems as item}
										<tr>
											<td class="px-4 py-3 text-sm font-medium whitespace-nowrap">
												<h2 class="font-medium text-gray-800 dark:text-white capitalize">
													{formatDateStringShort(item.created)}
												</h2>
											</td>
											<td class="px-4 py-3 text-sm font-medium whitespace-nowrap">
												<h2 class="font-medium text-gray-600 dark:text-white capitalize">
													{formatDateStringToTime(item.created)}
												</h2>
											</td>
											<td class="px-4 py-3 text-sm font-medium">
												<p
													class="text-sm font-normal text-black first-letter:capitalize whitespace-pre-line"
												>
													{item.item.name}
												</p>
												<p
													class="text-xs font-normal text-gray-600 first-letter:capitalize whitespace-pre-line"
												>
													{@html item.item.description}
												</p>
											</td>
											<td class="px-4 py-3 text-sm font-medium">
												<p
													class="text-sm font-normal text-gray-600 first-letter:capitalize whitespace-pre-line"
												>
													{item.item.code}
												</p>
											</td>
											<td class="px-4 py-3 text-sm font-medium whitespace-nowrap">
												<p class="text-sm font-normal text-gray-600 first-letter:capitalize">
													{item.quantity}
												</p>
											</td>
											<td class="px-4 py-3 text-sm font-medium whitespace-nowrap">
												<p class="text-sm font-normal text-gray-600 first-letter:capitalize">
													{item.discount ?? 0}
												</p>
											</td>
											<td class="px-4 py-3 text-sm font-medium whitespace-nowrap">
												{#if item.visit}
													<a class="text-blue-500" href="/visit/{item.visit}">Visite</a>
												{:else}
													<span class="text-sm first-letter:capitalize">vente</span>
												{/if}
											</td>

											<td class="px-4 py-3 text-sm whitespace-nowrap">
												<div
													class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-600 gap-x-2 bg-emerald-100/60"
												>
													{item.total} dt
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
				<div class="text-sm text-gray-500">
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
