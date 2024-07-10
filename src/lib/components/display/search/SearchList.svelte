<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import SearchAnimalList from '$components/lists/search/SearchAnimalList.svelte';
	import SearchClientList from '$components/lists/search/SearchClientList.svelte';
	import { searchPage } from '$lib/store/search';
	import type { AnimalsResponse, ClientsResponse } from '$types';
	import EmptyTable from '$components/display/EmptyTable.svelte';
	import BackArrow from '$components/icons/BackArrow.svelte';
	import ForwardArrow from '$components/icons/ForwardArrow.svelte';

	const animals = $searchPage.items as AnimalsResponse[];
	const clients = $searchPage.items as ClientsResponse[];

	$: currentUrl = browser ? document.location.href : '';

	$: nextPage = () => {
		if ($searchPage.page === $searchPage.totalPages) return;

		const nextUrl = new URL(currentUrl);

		nextUrl.searchParams.set('page', `${$searchPage.page + 1}`);

		goto(nextUrl);
	};

	$: previousPage = () => {
		if ($searchPage.page === 1) return;

		const prevUrl = new URL(currentUrl);

		prevUrl.searchParams.set('page', `${$searchPage.page - 1}`);
		goto(prevUrl);
	};

	$: ({ page } = $searchPage);
</script>

<div class="flex flex-col items-center justify-start xl:pl-14 w-full">
	<div class="w-full px-5 pt-10 lg:p-5 bg-white lg:shadow-2xl border-gray-200 xl:rounded">
		<div class="flex items-center gap-x-3 w-full">
			<div class="w-full grow flex items-center justify-center gap-x-3 xl:px-1 xl:justify-start">
				<h2 class="text-lg font-medium text-gray-800 dark:text-white">Résultats de la recherche</h2>
				<span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full"
					>{$searchPage.totalItems}</span
				>
				<span class="px-3 py-1 text-xs text-orange-600 bg-orange-100 rounded-full"
					>{$searchPage.query}</span
				>
			</div>
		</div>

		<div class="flex flex-col mt-6">
			<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
						{#if $searchPage.target === 'client'}
							<SearchClientList items={clients} />
						{:else if $searchPage.target === 'animal'}
							<SearchAnimalList items={animals} />
						{:else}
							<div class="w-full flex items-center justify-center">
								<EmptyTable />
							</div>
						{/if}
					</div>
				</div>
			</div>
		</div>

		<div class="mt-6 pb-5 lg:pb-0 sm:flex sm:items-center sm:justify-between">
			<div class="text-sm text-gray-500 dark:text-gray-400">
				Page <span class="font-medium text-gray-700 dark:text-gray-100"
					>{$searchPage.page} sur {$searchPage.totalPages}</span
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
					disabled={page >= $searchPage.totalPages}
					on:click={nextPage}
					class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {page >=
					$searchPage.totalPages
						? 'bg-slate-200'
						: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {page >= $searchPage.totalPages
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
