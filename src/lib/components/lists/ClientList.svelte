<script lang="ts">
	import Modal from '$components/Modal.svelte';
	import type { IClient } from '$types';
	import ConfirmationDialog from '../ConfirmationDialog.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { clientsPageInfo, currentClient, removeClientFormStore } from '$lib/store/clients';
	import Avatar from '$components/Avatar.svelte';
	import AddClientForm from '../forms/clients/AddClientForm.svelte';
	import UpdateClientForm from '../forms/clients/UpdateClientForm.svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import SearchIcon from '$components/icons/SearchIcon.svelte';
	import PlusIcon from '$components/icons/PlusIcon.svelte';
	import BackArrow from '$components/icons/BackArrow.svelte';
	import ForwardArrow from '$components/icons/ForwardArrow.svelte';
	import EditIcon from '$components/icons/EditIcon.svelte';
	import TrashIcon from '$components/icons/TrashIcon.svelte';
	import { toast } from 'svelte-sonner';

	export let open: boolean = false;

	let openAddModal = open;
	let openUpdateModal = false;
	let search: string = $clientsPageInfo.query;
	let showConfirmation = false;
	let selectedItem: IClient | null;
	let deleteFormRef: HTMLFormElement;
	let selectedUpdateItem: IClient | null;

	$: currentUrl = browser ? document.location.href : '';

	$: nextPage = () => {
		if ($clientsPageInfo.page >= $clientsPageInfo.totalPages) return;

		const nextUrl = new URL(currentUrl);

		nextUrl.searchParams.set('page', `${$clientsPageInfo.page + 1}`);

		goto(nextUrl);
	};

	$: previousPage = () => {
		if ($clientsPageInfo.page <= 1) return;

		const prevUrl = new URL(currentUrl);

		prevUrl.searchParams.set('page', `${$clientsPageInfo.page - 1}`);
		goto(prevUrl);
	};

	$: dispatchSearch = () => {
		const searchUrl = new URL(currentUrl);

		searchUrl.searchParams.set('query', search);
		searchUrl.searchParams.delete('page');
		goto(searchUrl);
	};

	const deleteHandler = () => {
		deleteFormRef.requestSubmit();

		selectedItem = null;
		showConfirmation = false;
	};

	const remove = (item: IClient) => {
		$deleteForm.id = item.id;
		selectedItem = item;
		showConfirmation = true;
	};

	const update = (item: IClient) => {
		currentClient.set(item);
		selectedUpdateItem = item;
		openUpdateModal = true;
	};

	const {
		enhance,
		form: deleteForm,
		allErrors
	} = superForm($removeClientFormStore, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Client supprimé avec succès', {
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

<div class="flex flex-col items-start justify-start lg:pl-14 w-full">
	<Modal bind:open={openAddModal} size="medium">
		<AddClientForm bind:open={openAddModal} />
	</Modal>
	<Modal bind:open={openUpdateModal} size="medium">
		{#if selectedUpdateItem}
			<UpdateClientForm bind:open={openUpdateModal} />
		{/if}
	</Modal>

	<form use:enhance action="?/removeClient" method="POST" class="hidden" bind:this={deleteFormRef}>
		{#if selectedItem}
			<input type="hidden" name="id" bind:value={$deleteForm.id} />
		{/if}
	</form>

	<ConfirmationDialog bind:show={showConfirmation} handler={deleteHandler}>
		<div>
			<div class="mt-2 text-center">
				<h3 class="text-lg font-medium leading-6 text-gray-800" id="modal-title">
					Supprimer {selectedItem?.name}
				</h3>
				<p class="mt-2 text-sm text-gray-500">
					Êtes-vous sûr de vouloir supprimer cet animal ? Toutes vos données seront définitivement
					supprimé. Cette action ne peut pas être annulée.
				</p>
			</div>
		</div>
	</ConfirmationDialog>
	<div class="w-full px-3 lg:px-5 lg:p-5 lg:py-3 bg-white md:shadow-2xl border-gray-200 xl:rounded">
		<div class="flex flex-col space-y-4 w-full">
			<div
				class="flex flex-col lg:flex-row items-start lg:items-center justify-between w-full lg:pr-5"
			>
				<div
					class="flex items-center justify-center lg:justify-start lg:items-start flex-col w-full"
				>
					<div class="flex items-center gap-x-3">
						<h2 class="text-lg font-medium text-gray-800">Clients</h2>
						<span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full"
							>{$clientsPageInfo.totalItems}</span
						>
					</div>

					<p class="mt-1 text-sm text-gray-500">La liste des clients</p>
				</div>
				<div class="flex items-center mt-4 gap-x-2 w-full md:w-auto">
					<button
						on:click={() => (openAddModal = true)}
						class="flex items-center justify-center w-full px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-emerald-500 rounded-lg shrink-0 sm:w-auto gap-x-2 hover:bg-emerald-600"
					>
						<PlusIcon />

						<span>Nouveau client</span>
					</button>
				</div>
			</div>
			<div
				class="flex flex-col lg:flex-row items-start gap-4 lg:gap-0 lg:items-center justify-between"
			>
				<form on:submit|preventDefault={dispatchSearch} class="w-full">
					<div class="flex items-center mt-0 h-6 relative w-full">
						<button class="absolute focus:outline-none">
							<SearchIcon />
						</button>

						<input
							bind:value={search}
							type="text"
							placeholder="Chercher par nom, email, téléphone..."
							class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-4/12 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
						/>
					</div>
				</form>
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
											class="py-2.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500"
										>
											<div class="flex items-center gap-x-3">
												<span>Nom</span>
											</div>
										</th>

										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500"
											>Email</th
										>
										<th
											scope="col"
											class="px-4 w-auto py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500"
											>Téléphone</th
										>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500"
											>Adresse</th
										>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500"
											>Note</th
										>
										<th
											scope="col"
											class="px-4 py-2.5 text-sm font-normal text-left rtl:text-right text-gray-500"
										>
											Animaux
										</th>

										<th scope="col" class="relative py-2.5 px-4">
											<span class="sr-only">Modifier</span>
										</th>
									</tr>
								</thead>
								<tbody class="bg-white divide-y divide-gray-200">
									{#each $clientsPageInfo.items as item}
										<tr>
											<td class="px-4 py-2.5 text-sm font-medium text-gray-700 whitespace-nowrap">
												<div class="inline-flex items-center gap-x-3">
													<a href="/clients/{item.id}" class="flex items-center gap-x-2">
														<Avatar name={item.name} />
														<div>
															<h2 class="font-medium text-gray-800 hover:underline">
																{item.name}
															</h2>
														</div>
													</a>
												</div>
											</td>
											<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap"
												>{item.email ?? '-'}</td
											>
											<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap"
												>{item.tel ?? '-'}</td
											>
											<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap"
												>{item.address ?? '-'}</td
											>
											<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap"
												>{item.note ?? '-'}</td
											>
											<td class="px-4 py-2.5 text-sm whitespace-nowrap">
												<div class="flex items-center gap-x-2">
													{#each item.animals.slice(0, 8) as animal}
														<p
															class="px-3 py-1 text-xs {animal.sex === 'male'
																? 'text-blue-500 bg-blue-100/60'
																: 'text-pink-500 bg-pink-100/60'} rounded-full"
														>
															{animal.name}
														</p>
													{/each}
												</div>
											</td>
											<td class="px-4 py-2.5 text-sm whitespace-nowrap">
												<div class="flex items-end justify-end gap-x-6 w-full">
													<button
														on:click={() => remove(item)}
														class="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
													>
														<TrashIcon />
													</button>

													<button
														on:click={() => update(item)}
														title="Modifier le client"
														class="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none"
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

			<div class="mt-6 sm:flex sm:items-center sm:justify-between px-5 pb-10 lg:pb-0">
				<div class="text-sm text-gray-500">
					Page <span class="font-medium text-gray-700"
						>{$clientsPageInfo.page} sur {$clientsPageInfo.totalPages}</span
					>
				</div>

				<div class="flex items-center mt-4 gap-x-4 sm:mt-0">
					<button
						on:click={() => previousPage()}
						disabled={$clientsPageInfo.page <= 1}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {$clientsPageInfo.page <=
						1
							? 'bg-slate-200'
							: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {$clientsPageInfo.page <= 1
							? 'hover:bg-slate-200'
							: 'hover:bg-gray-100'}"
					>
						<BackArrow />

						<span> précédent </span>
					</button>

					<button
						disabled={$clientsPageInfo.page >= $clientsPageInfo.totalPages}
						on:click={() => nextPage()}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {$clientsPageInfo.page >=
						$clientsPageInfo.totalPages
							? 'bg-slate-200'
							: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {$clientsPageInfo.page >=
						$clientsPageInfo.totalPages
							? 'hover:bg-slate-200'
							: 'hover:bg-gray-100'}"
					>
						<span> Suivant </span>

						<ForwardArrow />
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
