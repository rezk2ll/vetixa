<script lang="ts">
	import {
		addVisitStoreItemFormStore,
		currentVisit,
		removeVisitStoreItemFormStore
	} from '$store/visit';
	import { inventoryItems } from '$store/inventory';
	import Modal from '$components/Modal.svelte';
	import SelectActForm from '$components/forms/SelectActForm.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import ConfirmationDialog from '$components/ConfirmationDialog.svelte';
	import EmptyTable from '$components/dispaly/EmptyTable.svelte';

	let open = false;
	let showConfirmation = false;
	let addFormRef: HTMLFormElement;
	let removeFormRef: HTMLFormElement;

	const { form: addForm, enhance } = superForm($addVisitStoreItemFormStore, {
		id: 'add-visit-store-item',
		taintedMessage: null,
		dataType: 'json',
		resetForm: true
	});

	const { form: removeForm, enhance: removeEnhance } = superForm($removeVisitStoreItemFormStore, {
		taintedMessage: null,
		id: 'remove-visit-store-item',
		dataType: 'json',
		resetForm: true
	});

	$: ({ store_items, id } = $currentVisit);

	const handler = () => {
		$addForm.id = id;
		addFormRef.requestSubmit();
	};

	const removeHandler = () => {
		$removeForm.id = id;
		removeFormRef.requestSubmit();
		showConfirmation = false;
	};

	const promptItemRemoval = (itemId: string) => {
		showConfirmation = true;
		$removeForm.item = itemId;
	};
</script>

<form class="hidden" use:enhance action="?/addVisitStoreItem" method="POST" bind:this={addFormRef}>
	<input type="hidden" name="items" bind:value={$addForm.items} />
	<input type="hidden" name="id" bind:value={$addForm.id} />
</form>

<form
	class="hidden"
	use:removeEnhance
	method="POST"
	action="?/removeVisitStoreItem"
	bind:this={removeFormRef}
>
	<input type="hidden" name="id" bind:value={$removeForm.id} />
	<input type="hidden" name="item" bind:value={$removeForm.item} />
</form>

<ConfirmationDialog bind:show={showConfirmation} handler={removeHandler}>
	<div>
		<div class="mt-2 text-center">
			<p class="mt-2 text-sm text-gray-500 dark:text-gray-400 px-2">
				Êtes-vous sûr de vouloir supprimer cet article ?
				<br />
				Cette action ne peut pas être annulée.
			</p>
		</div>
	</div>
</ConfirmationDialog>

<section class="container px-4 mx-auto">
	<div class="sm:flex sm:items-center sm:justify-between">
		<div />
		<div class="flex items-center mt-4 gap-x-3">
			<Modal bind:open size="medium">
				<SelectActForm
					bind:open
					title="Sélectionner un ou plusieurs actes médicaux"
					items={$inventoryItems}
					{handler}
					bind:value={$addForm.items}
				>
					<slot />
				</SelectActForm>
			</Modal>
			<button
				type="button"
				on:click={() => (open = true)}
				class="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
			>
				<svg
					data-slot="icon"
					class="h-6 w-6"
					fill="none"
					stroke-width="1.5"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
					/>
				</svg>

				<span>Ajouter</span>
			</button>
		</div>
	</div>

	<div class="flex flex-col mt-6">
		<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead class="bg-gray-50 dark:bg-gray-800">
							<tr>
								<th
									scope="col"
									class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
								>
									<div class="flex items-center gap-x-3">
										<span>Code</span>
									</div>
								</th>

								<th
									scope="col"
									class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
								>
									Nom
								</th>
								<th
									scope="col"
									class="px-12 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
								>
									Description
								</th>

								<th
									scope="col"
									class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
								>
									Prix
								</th>

								<th scope="col" class="relative py-3.5 px-4">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
							{#if store_items.length}
								{#each store_items as item}
									<tr>
										<td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
											<div class="inline-flex items-center gap-x-3">
												<div class="flex items-center gap-x-2">
													<div
														class="flex items-center justify-center w-8 h-8 text-sky-600 bg-blue-50/80 rounded-full dark:bg-gray-800"
													>
														<svg
															xmlns="http://www.w3.org/2000/svg"
															viewBox="0 0 448 512"
															class="w-4 h-4"
															fill="currentColor"
															><path
																d="M288 0H160 128C110.3 0 96 14.3 96 32s14.3 32 32 32V196.8c0 11.8-3.3 23.5-9.5 33.5L10.3 406.2C3.6 417.2 0 429.7 0 442.6C0 480.9 31.1 512 69.4 512H378.6c38.3 0 69.4-31.1 69.4-69.4c0-12.8-3.6-25.4-10.3-36.4L329.5 230.4c-6.2-10.1-9.5-21.7-9.5-33.5V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H288zM192 196.8V64h64V196.8c0 23.7 6.6 46.9 19 67.1L309.5 320h-171L173 263.9c12.4-20.2 19-43.4 19-67.1z"
															/></svg
														>
													</div>

													<div>
														<h2 class="font-normal text-gray-800 dark:text-white">
															{item.code}
														</h2>
													</div>
												</div>
											</div>
										</td>
										<td class="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
											{item.name}
										</td>
										<td class="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
											{@html item.description}
										</td>
										<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
											>{item.price} DT</td
										>
										<td
											class="px-4 py-4 text-sm whitespace-nowrap flex items-center justify-center"
										>
											<button
												type="button"
												on:click={() => promptItemRemoval(item.id)}
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
										</td>
									</tr>
								{/each}
							{:else}
								<EmptyTable />
							{/if}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</section>
