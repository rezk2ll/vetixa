<script lang="ts">
	import type { Animal } from '@prisma/client';
	import Modal from '../Modal.svelte';
	import AddAnimalForm from '../forms/AddAnimalForm.svelte';
	import { enhance } from '$app/forms';
	import ConfirmationDialog from '../ConfirmationDialog.svelte';
	import AgeDisplay from '../dispaly/AgeDisplay.svelte';
	import Dog from '../icons/Dog.svelte';
	import Cat from '../icons/Cat.svelte';

	let openAddAnimalModal = false;

	let deleteFormRef: HTMLFormElement;
	let selectedItem: Animal | null;
	let showConfirmation = false;

	$: handler = () => {
		deleteFormRef.requestSubmit();

		selectedItem = null;
		showConfirmation = false;
	};

	const remove = (item: Animal) => {
		selectedItem = item;
		showConfirmation = true;
	};
	export let data: Animal[];
	export let canAdd: boolean = true;
</script>

<form use:enhance action="?/removeAnimal" method="POST" class="hidden" bind:this={deleteFormRef}>
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

{#if canAdd}
	<Modal bind:open={openAddAnimalModal}>
		<AddAnimalForm bind:open={openAddAnimalModal} />
	</Modal>
{/if}

<div class="flex flex-col items-center justify-start xl:pl-14 w-full">
	<div
		class="w-full xl:w-11/12 px-1 pt-10 lg:p-10 bg-white shadow-2xl border-gray-200 h-screen xl:h-fit xl:rounded-2xl"
	>
		<div class="flex items-center gap-x-3 w-full">
			<div class="w-full grow flex items-center gap-x-3 px-5 justify-center xl:justify-start">
				<h2 class="text-lg font-medium text-gray-800 dark:text-white">Animaux</h2>

				<span class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full">{data.length}</span>
			</div>
			{#if canAdd}
				<button
					class="flex-shrink flex flex-row space-x-5 hover:bg-gray-300 p-2 rounded-full"
					on:click={() => (openAddAnimalModal = true)}
				>
					<svg
						fill="none"
						stroke="currentColor"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
						class="w-6"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
						/>
					</svg>
				</button>
			{/if}
		</div>

		<div class="flex flex-col mt-6 pl-2">
			<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
					<div class="overflow-hidden dark:border-gray-700 md:rounded-lg">
						<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
							<thead class="bg-slate-50 dark:bg-gray-800">
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
										>Espèce</th
									>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Sexe</th
									>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
									>
										Poids
									</th>
									<th
										scope="col"
										class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>Age</th
									>

									<th scope="col" class="relative py-3.5 px-4">
										<span class="sr-only">Modifier</span>
									</th>
								</tr>
							</thead>
							<tbody
								class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
							>
								{#each data as animal}
									<tr class="">
										<td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
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
										<td
											class="px-4 py-4 text-sm {animal.sex === 'male'
												? 'text-blue-500 '
												: 'text-pink-500 '} dark:text-gray-300 whitespace-nowrap"
										>
											{#if animal.type === 'chien'}
												<Dog />
											{:else}
												<Cat />
											{/if}
										</td>
										<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
											>{animal.sex}</td
										>
										<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
											>{animal.weight}</td
										>
										<td
											class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
										>
											<AgeDisplay date={animal.birthday} />
										</td>

										<td class="px-4 py-4 text-sm whitespace-nowrap">
											<div class="flex items-end justify-end gap-x-6 w-full">
												<button
													on:click={() => remove(animal)}
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
													href="/animals/{animal.id}"
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
	</div>
</div>
