<script lang="ts">
	import {
		addVisitMedicalActsFormStore,
		currentVisit,
		removeVisitMedicalActFormStore,
		updateVisitItemFormStore
	} from '$store/visit';
	import { medicalActs } from '$store/acts';
	import Modal from '$components/Modal.svelte';
	import SelectActForm from '$components/forms/SelectActForm.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import ConfirmationDialog from '$components/ConfirmationDialog.svelte';
	import EmptyTable from '$components/display/EmptyTable.svelte';
	import NumberField from '$components/inputs/NumberField.svelte';
	import type { ItemMetadata } from '$types';
	import TrashIcon from '$components/icons/TrashIcon.svelte';
	import UpdateIcon from '$components/icons/UpdateIcon.svelte';
	import Flask from '$components/icons/Flask.svelte';
	import PlusIcon from '$components/icons/PlusIcon.svelte';

	let open = false;
	let showConfirmation = false;
	let addActsFormRef: HTMLFormElement;
	let removeActsFormRef: HTMLFormElement;
	let updateFormRef: HTMLFormElement;
	let metadata: Record<string, Partial<ItemMetadata>> = {};

	const { form: addForm, enhance } = superForm($addVisitMedicalActsFormStore, {
		id: 'add-medical-acts',
		taintedMessage: null,
		dataType: 'json',
		resetForm: true
	});

	const { form: removeForm, enhance: removeEnhance } = superForm($removeVisitMedicalActFormStore, {
		taintedMessage: null,
		id: 'remove-medical-act',
		dataType: 'json',
		resetForm: true
	});

	const { form: updateForm, enhance: updateEnhance } = superForm($updateVisitItemFormStore, {
		taintedMessage: null,
		id: 'update-visit-item',
		dataType: 'json',
		resetForm: true
	});

	$: ({ medical_acts, id, item_metadata } = $currentVisit);

	const handler = () => {
		$addForm.id = id;
		addActsFormRef.requestSubmit();
	};

	const removeHandler = () => {
		$removeForm.id = id;
		removeActsFormRef.requestSubmit();
		showConfirmation = false;
	};

	const promptItemRemoval = (itemId: string) => {
		showConfirmation = true;
		$removeForm.item = itemId;
	};

	const updateItem = (itemId: string) => {
		$updateForm.item = itemId;
		$updateForm.id = id;
		$updateForm.discount = metadata[itemId].discount ?? 0;
		$updateForm.quantity = metadata[itemId].quantity ?? 1;
		updateFormRef.requestSubmit();
	};

	const setDiscount = (e: Event, itemId: string) => {
		const value = (e.target as HTMLInputElement).valueAsNumber;

		if (metadata[itemId]) {
			metadata[itemId].discount = value;
		} else {
			metadata[itemId] = {
				discount: value
			};
		}
	};

	const getDiscount = (itemId: string) => {
		return (item_metadata || []).find(({ item }) => item === itemId)?.discount ?? 0;
	};

	const setQuantity = (e: Event, itemId: string) => {
		const value = (e.target as HTMLInputElement).valueAsNumber;

		if (metadata[itemId]) {
			metadata[itemId].quantity = value > 1 ? value : 1;
		} else {
			metadata[itemId] = {
				quantity: value
			};
		}
	};

	const getQuantity = (itemId: string) => {
		return (item_metadata || []).find(({ item }) => item === itemId)?.quantity ?? 1;
	};
</script>

<form class="hidden" use:enhance action="?/addMedicalActs" method="POST" bind:this={addActsFormRef}>
	<input type="hidden" name="items" bind:value={$addForm.items} />
	<input type="hidden" name="id" bind:value={$addForm.id} />
</form>

<form
	class="hidden"
	use:removeEnhance
	method="POST"
	action="?/removeMedicalAct"
	bind:this={removeActsFormRef}
>
	<input type="hidden" name="id" bind:value={$removeForm.id} />
	<input type="hidden" name="item" bind:value={$removeForm.item} />
</form>

<form
	class="hidden"
	use:updateEnhance
	action="?/updateVisitItem"
	method="POST"
	bind:this={updateFormRef}
>
	<input type="hidden" name="item" bind:value={$updateForm.item} />
	<input type="hidden" name="id" bind:value={$updateForm.id} />
	<input type="hidden" name="discount" bind:value={$updateForm.discount} />
	<input type="hidden" name="quantity" bind:value={$updateForm.quantity} />
</form>

<ConfirmationDialog bind:show={showConfirmation} handler={removeHandler}>
	<div>
		<div class="mt-2 text-center">
			<p class="mt-2 text-sm text-gray-500 dark:text-gray-400 px-2">
				Êtes-vous sûr de vouloir supprimer cet acte médical?
				<br />
				Cette action ne peut pas être annulée.
			</p>
		</div>
	</div>
</ConfirmationDialog>

<Modal bind:open size="medium">
	<SelectActForm
		bind:open
		title="Sélectionner un ou plusieurs actes médicaux"
		items={$medicalActs}
		{handler}
		bind:value={$addForm.items}
	>
		<slot />
	</SelectActForm>
</Modal>

<section class="container px-4">
	<div class="flex items-center justify-between w-full">
		<div class="lg:w-full" />
		<div class="flex items-center justify-end mt-4 gap-x-3 w-full">
			<button
				type="button"
				on:click={() => (open = true)}
				class="flex items-center justify-center w-full lg:w-auto px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
			>
				<PlusIcon />

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
									class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
								>
									Prix
								</th>
								<th
									scope="col"
									class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
								>
									<span class="sr-only">quantity</span>
								</th>
								<th
									scope="col"
									class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
								>
									<span class="sr-only">Remise</span>
								</th>

								<th scope="col" class="relative py-3.5 px-4">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
							{#if medical_acts.length}
								{#each medical_acts as act}
									<tr>
										<td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
											<div class="inline-flex items-center gap-x-3">
												<div class="flex items-center gap-x-2">
													<div
														class="flex items-center justify-center w-8 h-8 text-sky-600 bg-blue-50/80 rounded-full dark:bg-gray-800"
													>
														<Flask />
													</div>

													<div>
														<h2 class="font-normal text-gray-800 dark:text-white">
															{act.code}
														</h2>
													</div>
												</div>
											</div>
										</td>
										<td class="px-12 py-4 text-sm font-normal text-gray-700 whitespace-nowrap">
											{act.name}
										</td>
										<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
											>{act.price} DT</td
										>
										<td
											class="px-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap max-w-16"
										>
											<NumberField
												label="Quantité"
												name="quantity"
												placeholder=""
												onChange={(e) => setQuantity(e, act.id)}
												value={getQuantity(act.id)}
												size="small"
											/>
										</td>
										<td
											class="px-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap max-w-16"
										>
											<NumberField
												label="Remise %"
												name="discount"
												placeholder=""
												onChange={(e) => setDiscount(e, act.id)}
												value={getDiscount(act.id)}
												size="small"
											/>
										</td>
										<td
											class="px-4 py-5 text-sm whitespace-nowrap flex items-center justify-center space-x-5"
										>
											<button
												type="button"
												on:click={() => promptItemRemoval(act.id)}
												class="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none"
											>
												<TrashIcon />
											</button>
											<button
												type="button"
												on:click={() => updateItem(act.id)}
												class="text-gray-500 transition-colors duration-200 hover:text-emerald-500 focus:outline-none flex items-center justify-center"
											>
												<UpdateIcon />
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
