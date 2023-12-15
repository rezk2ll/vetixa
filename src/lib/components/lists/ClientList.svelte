<script lang="ts">
	import AddClientForm from '$lib/components/forms/AddClientForm.svelte';
	import Avatar from '$lib/components/Avatar.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import { enhance } from '$app/forms';
	import ConfirmationDialog from '../ConfirmationDialog.svelte';
	import type { ClientsResponse } from '../../../pocketbase-types';

	let openAddClientModal = false;
	let deleteFormRef: HTMLFormElement;
	let selectedItem: ClientsResponse | null;
	let showConfirmation = false;

	$: handler = () => {
		deleteFormRef.requestSubmit();

		selectedItem = null;
		showConfirmation = false;
	};

	const remove = (item: ClientsResponse) => {
		selectedItem = item;
		showConfirmation = true;
	};

	export let data: ({
		animals: { sex: string; name: string }[];
	} & ClientsResponse)[];
</script>

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
				Êtes-vous sûr de vouloir supprimer ce client ? Toutes vos données seront définitivement
				supprimé. Cette action ne peut pas être annulée.
			</p>
		</div>
	</div>
</ConfirmationDialog>
<Modal bind:open={openAddClientModal}>
	<AddClientForm bind:open={openAddClientModal} />
</Modal>
<div class="antialiased" data-sveltekit-preload-data="hover">
	<div class="flex flex-col items-center justify-start lg:pt-20 xl:pt-10 xl:pl-14">
		<div
			class="w-full xl:w-11/12 px-1 pt-10 lg:p-10 bg-white shadow-2xl border-gray-200 h-screen xl:h-fit xl:rounded-2xl"
		>
			<div class="flex items-center gap-x-3 w-full">
				<div class="w-full grow flex items-center justify-center gap-x-3 xl:px-1 xl:justify-start">
					<h2 class="text-lg font-medium text-gray-800 dark:text-white">Clients</h2>

					<span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">{data.length}</span
					>
				</div>
				<button
					class="flex-shrink hover:bg-gray-300 p-2 rounded-full flex space-x-5 flex-row"
					on:click={() => (openAddClientModal = true)}
				>
					Ajouter
					<svg
						class="w-6"
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
						/>
					</svg>
				</button>
			</div>

			<div class="flex flex-col mt-6">
				<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div class="overflow-hidden dark:border-gray-700 md:rounded-lg">
							<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
								<thead class="bg-gray-50 dark:bg-gray-800">
									<tr>
										<th
											scope="col"
											class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											<div class="flex items-center gap-x-3">
												<span>Nom</span>
											</div>
										</th>

										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Email</th
										>
										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Numéro de téléphone</th
										>
										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
											>Adresse</th
										>
										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Animaux
										</th>

										<th scope="col" class="relative py-3.5 px-4">
											<span class="sr-only">Modifier</span>
										</th>
									</tr>
								</thead>
								<tbody
									class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
								>
									{#each data as client}
										<tr>
											<td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
												<div class="inline-flex items-center gap-x-3">
													<a href="/clients/{client.id}" class="flex items-center gap-x-2">
														<Avatar name={client.name} />
														<div>
															<h2 class="font-medium text-gray-800 dark:text-white hover:underline">
																{client.name}
															</h2>
														</div>
													</a>
												</div>
											</td>
											<td
												class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
												>{client.email ?? '-'}</td
											>
											<td
												class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
												>{client.tel ?? '-'}</td
											>
											<td
												class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
												>{client.address ?? '-'}</td
											>
											<td class="px-4 py-4 text-sm whitespace-nowrap">
												<div class="flex items-center gap-x-2">
													{#each client.animals as animal}
														<p
															class="px-3 py-1 text-xs {animal.sex === 'male'
																? 'text-blue-500 bg-blue-100/60'
																: 'text-pink-500 bg-pink-100/60'} rounded-full dark:bg-gray-800"
														>
															{animal.name}
														</p>
													{/each}
												</div>
											</td>
											<td class="px-4 py-4 text-sm whitespace-nowrap">
												<div class="flex items-end justify-end gap-x-6 w-full">
													<button
														on:click={() => remove(client)}
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
														href="/clients/{client.id}"
														title="Modifier le client"
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

			<div class="flex items-center justify-between mt-6">
				<a
					href="#"
					class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
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
				</a>

				<div class="items-center hidden lg:flex gap-x-3">
					<a
						href="#"
						class="px-2 py-1 text-sm text-blue-500 rounded-md dark:bg-gray-800 bg-blue-100/60">1</a
					>
				</div>

				<a
					href="#"
					class="flex items-center px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
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
				</a>
			</div>
		</div>
	</div>
</div>
