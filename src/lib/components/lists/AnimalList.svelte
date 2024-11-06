<script lang="ts">
	import Modal from '$components/Modal.svelte';
	import { animalsPageInfo, currentAnimal, deleteAnimalFormStore } from '$store/animals';
	import type { AnimalStatusFilter as StatusFilter } from '$types';
	import ConfirmationDialog from '$components/ConfirmationDialog.svelte';
	import type { AnimalsResponse } from '$types';
	import { superForm } from 'sveltekit-superforms/client';
	import AgeDisplay from '$components/display/AgeDisplay.svelte';
	import AddAnimalForm from '$components/forms/animals/AddAnimalForm.svelte';
	import UpdateAnimalForm from '$components/forms/animals/updateAnimalForm.svelte';
	import AnimalIcon from '$components/display/animal/AnimalIcon.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import SearchIcon from '$components/icons/SearchIcon.svelte';
	import PlusIcon from '$components/icons/PlusIcon.svelte';
	import BackArrow from '$components/icons/BackArrow.svelte';
	import ForwardArrow from '$components/icons/ForwardArrow.svelte';
	import EditIcon from '$components/icons/EditIcon.svelte';
	import TrashIcon from '$components/icons/TrashIcon.svelte';
	import { toast } from 'svelte-sonner';

	export let canAdd: boolean = true;
	export let isNew: boolean = false;

	let openAddAnimalModal = isNew;
	let openUpdateAnimalModal = false;
	let search: string = $animalsPageInfo.query;
	let showConfirmation = false;
	let selectedItem: AnimalsResponse | null;
	let deleteFormRef: HTMLFormElement;
	let selectedUpdateItem: AnimalsResponse | null;

	$: currentUrl = browser ? document.location.href : '';

	$: removeHandler = () => {
		deleteFormRef.requestSubmit();

		selectedItem = null;
		showConfirmation = false;
	};

	$: remove = (item: AnimalsResponse) => {
		$deleteForm.id = item.id;
		selectedItem = item;
		showConfirmation = true;
	};

	$: update = (item: AnimalsResponse) => {
		currentAnimal.set(item);
		selectedUpdateItem = item;
		openUpdateAnimalModal = true;
	};

	$: nextPage = () => {
		if ($animalsPageInfo.page >= $animalsPageInfo.totalPages) return;

		const nextUrl = new URL(currentUrl);

		nextUrl.searchParams.set('page', `${$animalsPageInfo.page + 1}`);
		goto(nextUrl);
	};

	$: previousPage = () => {
		if ($animalsPageInfo.page <= 1) return;

		const previousUrl = new URL(currentUrl);

		previousUrl.searchParams.set('page', `${$animalsPageInfo.page - 1}`);
		goto(previousUrl);
	};

	$: dispatchSearch = () => {
		const searchUrl = new URL(currentUrl);

		searchUrl.searchParams.set('query', search);
		searchUrl.searchParams.delete('page');
		goto(searchUrl);
	};

	$: changeTab = (tab: StatusFilter) => {
		const filterUrl = new URL(currentUrl);

		filterUrl.searchParams.delete('page');

		if (tab === 'all') {
			filterUrl.searchParams.delete('filter');
		} else {
			filterUrl.searchParams.set('filter', tab);
		}

		goto(filterUrl);
	};

	const {
		enhance,
		form: deleteForm,
		allErrors
	} = superForm($deleteAnimalFormStore, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Animal supprimé avec succès', {
					important: true,
					position: 'bottom-center'
				});
				showConfirmation = false;
			}
		},
		dataType: 'json'
	});

	$: $allErrors.map((error) => {
		toast.error(error.messages.join('. '));
	});
</script>

<div class="flex flex-col items-center justify-start xl:pl-14 w-full">
	{#if canAdd}
		<Modal bind:open={openAddAnimalModal} size="medium">
			<AddAnimalForm bind:open={openAddAnimalModal} />
		</Modal>
	{/if}
	<Modal bind:open={openUpdateAnimalModal} size="medium">
		{#if selectedUpdateItem}
			<UpdateAnimalForm bind:open={openUpdateAnimalModal} />
		{/if}
	</Modal>

	<form use:enhance action="?/removeAnimal" method="POST" class="hidden" bind:this={deleteFormRef}>
		{#if selectedItem}
			<input type="hidden" name="id" bind:value={$deleteForm.id} />
		{/if}
	</form>

	<ConfirmationDialog bind:show={showConfirmation} handler={removeHandler}>
		<div>
			<div class="mt-2 text-center">
				<h3 class="text-lg font-medium leading-6 text-gray-800 dark:text-white" id="modal-title">
					Supprimer {selectedItem?.name}
				</h3>
				<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
					Êtes-vous sûr de vouloir supprimer cet article ? Toutes vos données seront définitivement
					supprimé. Cette action ne peut pas être annulée.
				</p>
			</div>
		</div>
	</ConfirmationDialog>
	<div class="w-full px-3 lg:p-5 bg-white md:shadow-2xl border-gray-200 xl:rounded">
		<div class="flex flex-col space-y-4">
			<div class="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full gr">
				<div
					class="flex flex-col w-full items-center justify-center lg:items-start lg:justify-start"
				>
					<div class="flex items-center gap-x-3">
						<h2 class="text-lg font-medium text-gray-800 dark:text-white">Animaux</h2>
						<span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full"
							>{$animalsPageInfo.count.all}</span
						>
					</div>

					<p class="mt-1 text-sm text-gray-500">La liste des animeaux</p>
				</div>
				{#if canAdd}
					<div class="flex items-center mt-4 gap-x-2">
						<button
							on:click={() => (openAddAnimalModal = true)}
							class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-emerald-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-emerald-600"
						>
							<PlusIcon />

							<span>Nouveau animal</span>
						</button>
					</div>
				{/if}
			</div>
			<div
				class="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 lg:items-center justify-between"
			>
				<div
					class="flex flex-row overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse"
				>
					<button
						on:click={() => changeTab('all')}
						class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {$animalsPageInfo.filter ===
						'all'
							? 'bg-gray-100'
							: ''} sm:text-sm"
					>
						Tout
					</button>
					<button
						on:click={() => changeTab('chat')}
						class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {$animalsPageInfo.filter ===
						'chat'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						Chat
						<span
							class="inline-flex items-center justify-center w-8 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{$animalsPageInfo.count.cats}
						</span>
					</button>
					<button
						on:click={() => changeTab('chien')}
						class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {$animalsPageInfo.filter ===
						'chien'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						Chien
						<span
							class="inline-flex items-center justify-center w-8 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{$animalsPageInfo.count.dogs}
						</span>
					</button>
					<button
						on:click={() => changeTab('male')}
						class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {$animalsPageInfo.filter ===
						'male'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						Male
						<span
							class="inline-flex items-center justify-center w-8 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{$animalsPageInfo.count.male}
						</span>
					</button>
					<button
						on:click={() => changeTab('female')}
						class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {$animalsPageInfo.filter ===
						'female'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						Female
						<span
							class="inline-flex items-center justify-center w-8 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{$animalsPageInfo.count.female}
						</span>
					</button>
				</div>
				<form on:submit|preventDefault={dispatchSearch} class="w-full lg:w-1/3">
					<div class="flex items-center mt-0 h-6">
						<button class="absolute">
							<SearchIcon />
						</button>

						<input
							bind:value={search}
							type="text"
							placeholder="Rechercher par nom, espèce, race, identifiant..."
							class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
						/>
					</div>
				</form>
			</div>
			<div class="flex flex-col mt-6 px-2 lg:px-0">
				<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div class="border border-gray-200 md:rounded-lg">
							<table class="min-w-full divide-y divide-gray-200 table-fixed">
								<thead class="bg-slate-50">
									<tr>
										<th
											scope="col"
											class="py-2.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											<div class="flex items-center gap-x-3">
												<span>Nom</span>
											</div>
										</th>
										{#if canAdd === false}
											<th
												scope="col"
												class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
												>Propriétaire</th
											>
										{/if}
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Espèce</th
										>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										/>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Sexe</th
										>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Poids
										</th>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Age</th
										>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Couleur</th
										>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Race</th
										>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Identifiant</th
										>
										<th scope="col" class="relative py-3.5 px-4">
											<span class="sr-only">Modifier</span>
										</th>
									</tr>
								</thead>
								<tbody class="bg-white divide-y divide-gray-200">
									{#each $animalsPageInfo.items as animal}
										<tr class={animal.deceased ? 'bg-red-100/80' : ''}>
											<td class="px-4 py-2.5 text-sm font-medium text-gray-700 whitespace-nowrap">
												<div class="inline-flex items-center gap-x-3">
													<div class="flex items-center gap-x-2">
														<a
															href="/animals/{animal.id}"
															class="hover:underline font-semibold capitalize text-gray-800 dark:text-white"
														>
															{animal.name}
														</a>
													</div>
												</div>
											</td>
											{#if canAdd === false}
												<td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
													<div class="flex items-center gap-x-2">
														<p
															class="px-3 py-1 text-xs
																 'text-blue-500 bg-blue-100/60 rounded-full"
														>
															{animal.client}
														</p>
													</div>
												</td>
											{/if}
											<td
												class="px-4 py-2.5 text-sm {animal.sex === 'male'
													? 'text-blue-500 '
													: 'text-pink-500 '}  whitespace-nowrap"
											>
												<AnimalIcon type={animal.type} />
											</td>
											<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap"
												>{animal.type}</td
											>
											<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap"
												>{animal.sex}</td
											>
											<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap"
												>{animal.weight}</td
											>
											<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap">
												<AgeDisplay
													date={animal.birthday}
													death={animal.deathdate}
													dead={animal.deceased}
												/>
											</td>
											<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap"
												>{animal.color}</td
											>

											<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap"
												>{animal.breed}</td
											>
											<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap"
												>{animal.identifier}</td
											>

											<td class="px-4 py-2.5 text-sm whitespace-nowrap">
												<div class="flex items-end justify-end gap-x-6 w-full">
													<button
														on:click={() => remove(animal)}
														class="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
													>
														<TrashIcon />
													</button>

													<button
														type="button"
														on:click={() => update(animal)}
														title="Modifier le client"
														class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 hover:text-yellow-500 focus:outline-none"
													>
														<EditIcon />
													</button>
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

			<div class="mt-6 sm:flex sm:items-center sm:justify-between pb-10 lg:pb-0">
				<div class="text-sm text-gray-500 dark:text-gray-400">
					Page <span class="font-medium text-gray-700 dark:text-gray-100"
						>{$animalsPageInfo.page} sur {$animalsPageInfo.totalPages}</span
					>
				</div>

				<div class="flex items-center mt-4 gap-x-4 sm:mt-0">
					<button
						on:click={() => previousPage()}
						disabled={$animalsPageInfo.page <= 1}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {$animalsPageInfo.page <=
						1
							? 'bg-slate-200'
							: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {$animalsPageInfo.page <= 1
							? 'hover:bg-slate-200'
							: 'hover:bg-gray-100'}"
					>
						<BackArrow />

						<span> précédent </span>
					</button>

					<button
						disabled={$animalsPageInfo.page >= $animalsPageInfo.totalPages}
						on:click={() => nextPage()}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {$animalsPageInfo.page >=
						$animalsPageInfo.totalPages
							? 'bg-slate-200'
							: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {$animalsPageInfo.page >=
						$animalsPageInfo.totalPages
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
