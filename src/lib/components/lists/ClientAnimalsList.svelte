<script lang="ts">
	import Modal from '$components/Modal.svelte';
	import { animals, currentAnimal, deleteAnimalFormStore } from '$lib/store/animals';
	import type { AnimalStatusFilter as StatusFilter } from '$types';
	import ConfirmationDialog from '$components/ConfirmationDialog.svelte';
	import type { AnimalsResponse } from '$types';
	import { superForm } from 'sveltekit-superforms/client';
	import AddAnimalForm from '$components/forms/animals/AddAnimalForm.svelte';
	import UpdateAnimalForm from '$components/forms/animals/updateAnimalForm.svelte';
	import SearchIcon from '$components/icons/SearchIcon.svelte';
	import PlusIcon from '$components/icons/PlusIcon.svelte';
	import BackArrow from '$components/icons/BackArrow.svelte';
	import ForwardArrow from '../icons/ForwardArrow.svelte';
	import { toast } from 'svelte-sonner';
	import AnimalTableRow from './AnimalTableRow.svelte';

	export let canAdd: boolean = true;
	export let isNew: boolean = false;

	let openAddAnimalModal = isNew;
	let openUpdateAnimalModal = false;
	let statusFilter: StatusFilter = 'all';
	let search: string;
	let page = 0;
	let showConfirmation = false;
	let selectedItem: AnimalsResponse | null;
	let deleteFormRef: HTMLFormElement;
	let selectedUpdateItem: AnimalsResponse | null;

	const totalPages = Math.ceil($animals.length / 10);

	$: items = $animals.filter((item) => {
		if (search && search.length) {
			if (!item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
				return false;
			}
		}

		if (statusFilter === 'chat') {
			return item.type === 'chat';
		}

		if (statusFilter === 'chien') {
			return item.type === 'chien';
		}

		if (statusFilter === 'male') {
			return item.sex === 'male';
		}

		if (statusFilter === 'female') {
			return item.sex === 'female';
		}

		return true;
	});

	$: pageItems = items.slice(page * 10, page * 10 + 10);

	$: catCount = $animals.filter((item) => item.type === 'chat').length;
	$: dogCount = $animals.filter((item) => item.type === 'chien').length;
	$: maleCount = $animals.filter((item) => item.sex === 'male').length;
	$: femaleCOunt = $animals.filter((item) => item.sex === 'female').length;

	$: handler = () => {
		deleteFormRef.requestSubmit();

		selectedItem = null;
		showConfirmation = false;
	};

	const remove = (item: AnimalsResponse) => {
		$deleteForm.id = item.id;
		selectedItem = item;
		showConfirmation = true;
	};

	$: update = (item: AnimalsResponse) => {
		currentAnimal.set(item);
		selectedUpdateItem = item;
		openUpdateAnimalModal = true;
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

	<ConfirmationDialog bind:show={showConfirmation} {handler}>
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
	<div class="w-full px-2 lg:px-5 pt-10 lg:p-5 bg-white lg:shadow-2xl border-gray-200 xl:rounded">
		<div class="flex flex-col space-y-4 w-full">
			<div class="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full">
				<div class="flex flex-col items-center justify-center lg:items-start w-full">
					<div class="flex items-center gap-x-3">
						<h2 class="text-lg font-medium text-gray-800 dark:text-white">Animaux</h2>
						<span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full"
							>{$animals.length}</span
						>
					</div>

					<p class="mt-1 text-sm text-gray-500">La liste des animeaux</p>
				</div>
				{#if canAdd}
					<div class="flex items-center mt-4 gap-x-2 w-full justify-end">
						<button
							on:click={() => (openAddAnimalModal = true)}
							class="flex items-center justify-center w-full lg:w-auto px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-emerald-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-emerald-600"
						>
							<PlusIcon />

							<span>Nouveau animal</span>
						</button>
					</div>
				{/if}
			</div>
			<div
				class="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 lg:items-center justify-between w-full"
			>
				<div
					class="flex flex-row overflow-hidden bg-white border divide-x rounded-lg rtl:flex-row-reverse"
				>
					<button
						on:click={() => {
							statusFilter = 'all';
							page = 0;
						}}
						class="px-3 lg:px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'all'
							? 'bg-gray-100'
							: ''} sm:text-sm"
					>
						Tout
					</button>
					<button
						on:click={() => {
							statusFilter = 'chat';
							page = 0;
						}}
						class="px-3 lg:px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'chat'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						Chat
						<span
							class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{catCount}
						</span>
					</button>
					<button
						on:click={() => {
							statusFilter = 'chien';
							page = 0;
						}}
						class="px-3 lg:px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'chien'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						Chien
						<span
							class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{dogCount}
						</span>
					</button>
					<button
						on:click={() => {
							statusFilter = 'male';
							page = 0;
						}}
						class="px-3 lg:px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'male'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						Male
						<span
							class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{maleCount}
						</span>
					</button>
					<button
						on:click={() => {
							statusFilter = 'female';
							page = 0;
						}}
						class="px-3 lg:px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'female'
							? 'bg-gray-100'
							: ''} sm:text-sm hover:bg-gray-100"
					>
						Female
						<span
							class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{femaleCOunt}
						</span>
					</button>
				</div>

				<div class="flex items-center mt-0 h-6 w-full lg:w-auto">
					<span class="absolute">
						<SearchIcon />
					</span>

					<input
						bind:value={search}
						type="text"
						placeholder="Rechercher"
						class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
					/>
				</div>
			</div>
			<div class="flex flex-col mt-6">
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
									{#each pageItems as animal}
										<AnimalTableRow
											{animal}
											showOwner={!canAdd}
											on:remove={(e) => remove(e.detail)}
											on:update={(e) => update(e.detail)}
										/>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6 sm:flex sm:items-center sm:justify-between">
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
							: 'hover:bg-gray-100'}   dark:text-gray-200 dark:hover:bg-gray-800"
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
