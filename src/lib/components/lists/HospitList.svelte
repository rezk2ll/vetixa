<script lang="ts">
	import { daysDiff, formatDateStringShort, formatFilterDate } from '$lib/utils/date';
	import type { HospitStatusFilter as StatusFilter } from '$types';
	import { hospitPageInfo } from '$store/hospit';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import AnimalIcon from '$components/display/animal/AnimalIcon.svelte';
	import AgeDisplay from '$components/display/AgeDisplay.svelte';
	import Grid from '$components/icons/Grid.svelte';
	import List from '$components/icons/List.svelte';

	let search: string = $hospitPageInfo.query;
	let page = $hospitPageInfo.page;
	let statusFilter: StatusFilter = $hospitPageInfo.filter;

	$: currentUrl = browser ? document.location.href : '';

	$: nextPage = () => {
		if ($hospitPageInfo.page === $hospitPageInfo.totalPages) return;

		const nextUrl = new URL(currentUrl);

		nextUrl.searchParams.set('page', `${$hospitPageInfo.page + 1}`);

		goto(nextUrl);
	};

	$: previousPage = () => {
		if ($hospitPageInfo.page === 1) return;

		const prevUrl = new URL(currentUrl);

		prevUrl.searchParams.set('page', `${$hospitPageInfo.page - 1}`);
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

		if (filter === 'all') {
			filterUrl.searchParams.delete('filter');
		} else {
			filterUrl.searchParams.set('filter', filter);
		}

		goto(filterUrl);
	};
</script>

<div class="flex flex-col items-start justify-start xl:pl-14 w-full">
	<div class="flex items-start justify-start">
		<div class="bg-slate-100/50 flex gap-2 h-10 w-96">
			<div
				class="w-full p-1 text-center font-bold flex flex-row gap-5 items-center justify-center text-slate-800"
			>
				<div>Liste</div>

				<List />
			</div>

			<a
				href="/hospit/view"
				class="flex flex-row gap-5 items-center justify-center w-full cursor-pointer select-none p-1 text-center bg-blue-600 font-bold text-white transition-colors duration-200 ease-in-out"
			>
				<div>Vue de l'hospit</div>

				<Grid />
			</a>
		</div>
	</div>
	<div class="w-full px-5 pt-10 lg:p-5 lg:pb-3 bg-white shadow-2xl border-gray-200">
		<div class="flex items-center gap-x-3 w-full">
			<div class="w-full grow flex items-center justify-center gap-x-3 xl:px-1 xl:justify-start">
				<h2 class="text-lg font-medium text-gray-800 dark:text-white">Hospitalisations</h2>

				<span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full"
					>{$hospitPageInfo.count.all}</span
				>
			</div>
		</div>
		<div
			class="flex px-1 py-2 pb-4 lg:px-0 flex-col lg:flex-row items-start lg:items-center space-y-10 lg:space-y-0 justify-between w-full"
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
						changeTab('pending');
					}}
					class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
					'pending'
						? 'bg-gray-100'
						: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
				>
					En cours
					<span
						class="inline-flex items-center justify-center w-auto min-w-5 px-1 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
					>
						{$hospitPageInfo.count.pending}
					</span>
				</button>

				<button
					on:click={() => {
						changeTab('complete');
					}}
					class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
					'complete'
						? 'bg-gray-100'
						: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
				>
					Terminé
					<span
						class="inline-flex items-center justify-center w-auto min-w-5 px-1 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
					>
						{$hospitPageInfo.count.completed}
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
						placeholder="Rechercher par cage, animal, client, téléphone, note"
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
										class="px-4 py-3.5 text-sm font-semibold text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Cage</th
									>
									<th
										scope="col"
										class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
									>
										Date d'admission
									</th>
									<th
										scope="col"
										class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
									>
										Date de sortie prévue
									</th>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Animal</th
									>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Age</th
									>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Espèce</th
									>
									<th
										scope="col"
										class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
									/>
									<th
										scope="col"
										class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Propriétaire</th
									>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Téléphone</th
									>

									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Note</th
									>

									<th scope="col" class="relative py-3.5 px-4">
										<span class="sr-only">Modifier</span>
									</th>
								</tr>
							</thead>
							<tbody
								class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
							>
								{#each $hospitPageInfo.items as item}
									<tr
										class={item.visit.animal.deceased
											? 'bg-red-100/80'
											: daysDiff(item.start, formatFilterDate(new Date())) === 0
											? 'bg-emerald-100/90'
											: 'bg-white'}
									>
										<td
											class="px-4 py-3 text-sm font-semibold text-gray-500 dark:text-gray-300 whitespace-nowrap text-left"
											>{item.cage.code}</td
										>
										<td
											class="px-4 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
											>{formatDateStringShort(item.start)}</td
										>
										<td
											class="px-4 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
											>{formatDateStringShort(item.end)}</td
										>
										<td
											class="px-4 text-sm truncate lg:overflow-hidden font-semibold max-w-sm {item
												.visit.animal.sex === 'male'
												? 'text-blue-500 '
												: 'text-pink-500 '} whitespace-nowrap">{item.visit.animal.name}</td
										>
										<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap">
											<AgeDisplay
												date={item.visit.animal.birthday}
												death={item.visit.animal.deathdate}
												dead={item.visit.animal.deceased}
											/>
										</td>
										<td
											class="px-4 py-2.5 text-sm {item.visit.animal.sex === 'male'
												? 'text-blue-500 '
												: 'text-pink-500 '}  whitespace-nowrap"
										>
											<AnimalIcon type={item.visit.animal.type} />
										</td>
										<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap"
											>{item.visit.animal.type}</td
										>
										<td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
											<div class="flex items-center gap-x-2">
												<p
													class="px-3 py-1 text-xs
																 'text-blue-500 bg-blue-100/60 rounded-full"
												>
													{item.visit.client.name}
												</p>
											</div>
										</td>
										<td
											class="px-4 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
											>{item.visit.client.tel}</td
										>

										<td
											class="px-4 py-3 text-sm text-gray-500 dark:text-gray-300 truncate lg:overflow-hidden max-w-sm"
											>{item.note}</td
										>

										<td class="px-4 py-3 text-sm whitespace-nowrap">
											<div class="flex items-end justify-end gap-x-6 w-full">
												<a
													href="/visit/{item.visit.id}/?tab=hospit"
													title="Modifier l'hospitalisation"
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

		<div class="mt-6 lg:pb-0 sm:flex sm:items-center sm:justify-between">
			<div class="text-sm text-gray-500 dark:text-gray-400">
				Page <span class="font-medium text-gray-700 dark:text-gray-100"
					>{$hospitPageInfo.page} sur {$hospitPageInfo.totalPages}</span
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
					disabled={page >= $hospitPageInfo.totalPages}
					on:click={nextPage}
					class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {page >=
					$hospitPageInfo.totalPages
						? 'bg-slate-200'
						: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {page >= $hospitPageInfo.totalPages
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
