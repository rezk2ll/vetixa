<script lang="ts">
	import Modal from '$components/Modal.svelte';
	import AddInventoryItemForm from '../forms/inventory/AddInventoryItemForm.svelte';
	import {
		inventoryItems,
		removeInventoryFormStore,
		updatedInventoryItem
	} from '$lib/store/inventory';
	import type { storeStatusFilter as StatusFilter } from '$types';
	import SellInventoryItemForm from '$components/forms/inventory/SellInventoryItemForm.svelte';
	import ConfirmationDialog from '$components/ConfirmationDialog.svelte';
	import type { InventoryItemResponse } from '$types';
	import UpdateInventoryItemForm from '$components/forms/inventory/UpdateInventoryItemForm.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import SearchIcon from '$components/icons/SearchIcon.svelte';
	import PlusIcon from '$components/icons/PlusIcon.svelte';
	import BackArrow from '$components/icons/BackArrow.svelte';
	import ForwardArrow from '$components/icons/ForwardArrow.svelte';
	import EditIcon from '$components/icons/EditIcon.svelte';
	import TrashIcon from '$components/icons/TrashIcon.svelte';
	import BagIcon from '$components/icons/BagIcon.svelte';

	let openAddInventoryItemModal = false;
	let openSellInventoryItemModal = false;
	let openUpdateInventoryItemModal = false;
	let statusFilter: StatusFilter = 'all';
	let search: string;
	let page = 0;
	let showConfirmation = false;
	let selectedItem: InventoryItemResponse | null;
	let deleteFormRef: HTMLFormElement;
	let selectedUpdateItem: InventoryItemResponse | null;

	const totalPages = Math.ceil($inventoryItems.length / 10);

	$: items = $inventoryItems.filter((item) => {
		if (search && search.length) {
			if (!item.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())) {
				return false;
			}
		}

		if (statusFilter === 'alert') {
			return item.quantity <= item.alert && item.quantity > 0;
		}

		if (statusFilter === 'available') {
			return item.quantity > item.alert;
		}

		if (statusFilter === 'unavailable') {
			return item.quantity === 0;
		}

		return true;
	});

	$: pageItems = items.slice(page * 10, page * 10 + 10);

	$: availableCount = $inventoryItems.filter((item) => item.quantity > item.alert).length;
	$: alertCount = $inventoryItems.filter(
		(item) => item.quantity <= item.alert && item.quantity > 0
	).length;
	$: unavailableCount = $inventoryItems.filter((item) => item.quantity === 0).length;

	$: handler = () => {
		deleteFormRef.requestSubmit();

		selectedItem = null;
		showConfirmation = false;
	};

	const remove = (item: InventoryItemResponse) => {
		selectedItem = item;
		showConfirmation = true;
	};

	$: update = (item: InventoryItemResponse) => {
		selectedUpdateItem = item;

		updatedInventoryItem.set(item);
		openUpdateInventoryItemModal = true;
	};

	const { enhance } = superForm($removeInventoryFormStore, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				location.reload();
			}
		}
	});
</script>

<div class="flex flex-col items-center justify-start xl:pl-14 w-full xl:py-4">
	<Modal bind:open={openAddInventoryItemModal} size="bigmedium">
		<AddInventoryItemForm bind:open={openAddInventoryItemModal} />
	</Modal>

	<Modal bind:open={openSellInventoryItemModal} size="bigmedium">
		<SellInventoryItemForm bind:open={openSellInventoryItemModal} />
	</Modal>

	<Modal bind:open={openUpdateInventoryItemModal} size="bigmedium">
		{#if selectedUpdateItem}
			<UpdateInventoryItemForm bind:open={openUpdateInventoryItemModal} item={selectedUpdateItem} />
		{/if}
	</Modal>

	<form use:enhance action="?/delete" method="POST" class="hidden" bind:this={deleteFormRef}>
		{#if selectedItem}
			<input type="hidden" name="id" bind:value={selectedItem.id} />
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
	<div
		class="w-full px-2 lg:px-5 pt-10 lg:p-5 bg-white shadow lg:shadow-2xl border-gray-200 xl:rounded"
	>
		<div class="flex flex-col space-y-4 w-full">
			<div class="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full">
				<div
					class="flex flex-col items-center justify-center lg:justify-start lg:items-start w-full"
				>
					<div class="flex items-center gap-x-3">
						<h2 class="text-lg font-medium text-gray-800 dark:text-white">Inventaire</h2>
						<span
							class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400"
							>{$inventoryItems.length} articles</span
						>
					</div>

					<p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
						La liste des articles est inscrite à l'inventaire
					</p>
				</div>

				<div class="flex items-center mt-4 gap-x-2 w-full lg:w-auto px-2 lg:px-0">
					<button
						on:click={() => (openAddInventoryItemModal = true)}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
					>
						<PlusIcon />

						<span>Ajouter</span>
					</button>
					<button
						on:click={() => (openSellInventoryItemModal = true)}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-emerald-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-emerald-600 dark:hover:bg-emerald-500 dark:bg-emerald-600"
					>
						<BagIcon />

						<span>Vendre</span>
					</button>
				</div>
			</div>
			<div
				class="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 lg:items-center justify-between w-full"
			>
				<div
					class="flex flex-row w-full lg:w-auto overflow-hidden bg-white border divide-x rounded-lg dark:bg-gray-900 rtl:flex-row-reverse dark:border-gray-700 dark:divide-gray-700"
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
							statusFilter = 'available';
							page = 0;
						}}
						class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'available'
							? 'bg-gray-100'
							: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
					>
						En Stock
						<span
							class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{availableCount}
						</span>
					</button>
					<button
						on:click={() => {
							statusFilter = 'alert';
							page = 0;
						}}
						class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'alert'
							? 'bg-gray-100'
							: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
					>
						En Alerte
						<span
							class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{alertCount}
						</span>
					</button>

					<button
						on:click={() => {
							statusFilter = 'unavailable';
							page = 0;
						}}
						class="px-5 py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'unavailable'
							? 'bg-gray-100'
							: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
					>
						En Rupture
						<span
							class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{unavailableCount}
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
						class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-60 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
					/>
				</div>
			</div>
			<div class="flex flex-col mt-6">
				<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div class="border border-gray-200 md:rounded-lg">
							<table class="min-w-full divide-y divide-gray-200">
								<thead class="bg-gray-50">
									<tr>
										<th
											scope="col"
											class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											<span>Nom</span>
										</th>

										<th
											scope="col"
											class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											<span>code</span>
										</th>

										<th
											scope="col"
											class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Status
										</th>

										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Quantité
										</th>

										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>TVA</th
										>

										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Prix de vente</th
										>

										<th scope="col" class="relative py-3.5 px-4">
											<span class="sr-only">Edit</span>
										</th>
									</tr>
								</thead>
								<tbody
									class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
								>
									{#each pageItems as item}
										<tr>
											<td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
												<div>
													<h2 class="font-medium text-gray-800 dark:text-white">{item.name}</h2>
													<p
														class="text-sm font-normal text-gray-600 dark:text-gray-400 first-letter:capitalize"
													>
														{@html item.description}
													</p>
												</div>
											</td>
											<td class="px-4 py-4 text-sm whitespace-nowrap">
												<p class="text-sm font-normal text-gray-600 dark:text-gray-400">
													{item.code}
												</p>
											</td>
											<td class="px-12 py-4 text-sm font-medium whitespace-nowrap">
												{#if item.quantity > item.alert}
													<div
														class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-500 gap-x-2 bg-emerald-100/60 dark:bg-gray-800"
													>
														Disponible
													</div>
												{:else if item.quantity <= item.alert && item.quantity > 0}
													<div
														class="inline px-3 py-1 text-sm font-normal rounded-full text-orange-500 gap-x-2 bg-orange-100/60 dark:bg-gray-800"
													>
														En alerte
													</div>
												{:else}
													<div
														class="inline px-3 py-1 text-sm font-normal rounded-full text-red-500 gap-x-2 bg-red-100/60 dark:bg-gray-800"
													>
														En rupture
													</div>
												{/if}
											</td>
											<td class="px-4 py-4 text-sm whitespace-nowrap"> {item.quantity} </td>
											<td class="px-4 py-4 text-sm whitespace-nowrap"> {item.tva} %</td>
											<td class="px-4 py-4 text-sm whitespace-nowrap"> {item.price} </td>

											<td class="px-4 py-4 text-sm whitespace-nowrap">
												<button
													type="button"
													on:click={() => update(item)}
													class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
												>
													<EditIcon />
												</button>
												<button
													type="button"
													on:click={() => remove(item)}
													class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
												>
													<TrashIcon />
												</button>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6 flex flex-col lg:flex-row items-center justify-between w-full pb-10">
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
