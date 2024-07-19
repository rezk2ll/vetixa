<script lang="ts">
	import { defaults, superForm } from 'sveltekit-superforms/client';
	import NumberField from '$components/inputs/NumberField.svelte';
	import TextAreaField from '$components/inputs/TextAreaField.svelte';
	import TextField from '$components/inputs/TextField.svelte';
	import type { InventoryItemResponse } from '$types';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import currency from 'currency.js';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { updateInventoryItemSchema } from '$lib/schemas';
	import { updatedInventoryItem, updateInventoryFormStore } from '$lib/store/inventory';
	import { toast } from 'svelte-sonner';
	import InventoryCube from '$components/icons/InventoryCube.svelte';

	export let open = false;
	export let item: InventoryItemResponse;

	const { form, message, submitting, enhance, allErrors } = superForm($updateInventoryFormStore, {
		dataType: 'json',
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Mis à jour avec succés', { important: true, position: 'bottom-center' });
				open = false;
			}
		}
	});

	let htPrice = 0;

	updatedInventoryItem.subscribe((value) => {
		$form.alert = value.alert;
		$form.code = value.code;
		$form.cost = value.cost;
		$form.id = value.id;
		$form.name = value.name;
		$form.price = value.price;
		$form.quantity = value.quantity;
		$form.tva = value.tva;
		$form.description = value.description;
		$form.gain = value.gain;
	});

	$: htcost = currency($form.cost).divide(currency($form.tva).divide(100).add(1)).value;

	const handleCostChange = (e: Event) => {
		const value = +(e.target as HTMLInputElement).value;

		$form.cost = currency(value).multiply(1 + $form.tva / 100).value;
	};

	const handleHTCChange = (e: Event): void => {
		const value = +(e.target as HTMLInputElement).value;

		$form.gain = currency(value).divide($form.cost).subtract(1).multiply(100).value;
	};

	$: $form.price = currency($form.cost).multiply(1 + $form.gain / 100).value;
	$: $allErrors.map((error) => {
		toast.error(error.messages.join('. '));
	});
</script>

<div>
	<div class="flex items-center justify-center">
		<InventoryCube />
	</div>

	<div class="mt-2 text-center">
		<h3
			class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
			id="modal-title"
		>
			mettre à jour {item.name}
		</h3>
		<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
			Veuillez remplir le formulaire ci-dessous avec des détails précis
		</p>
		{#if $message && $message.length}
			<p class="mt-2 text-sm text-red-500 dark:text-red-400">
				{$message}
			</p>
		{/if}
	</div>
</div>
<form use:enhance action="?/update" class="mt-4 w-full" method="POST">
	<div class="flex flex-row space-x-5">
		<TextField name="code" label="Code" bind:value={$form.code} isInValid={false} />
		<TextField name="name" label="Nom" bind:value={$form.name} isInValid={false} />
	</div>
	<div class="flex flex-row space-x-5 w-full">
		<NumberField
			label="Quantité"
			placeholder="1"
			bind:value={$form.quantity}
			isNumber={true}
			name="quantity"
			isInValid={false}
		/>
		<NumberField
			label="Alerte"
			placeholder=""
			bind:value={$form.alert}
			name="alert"
			isNumber={true}
			isInValid={false}
		/>
	</div>
	<div class="flex flex-row space-x-5">
		<NumberField
			label="Prix d'achat HT en DT"
			placeholder="1"
			value={htcost}
			name="total"
			onChange={handleCostChange}
			isInValid={false}
		/>
		<NumberField label="TVA %" placeholder="" bind:value={$form.tva} name="tva" isInValid={false} />
		<NumberField
			label="Prix d'achat TTC en DT"
			placeholder="1"
			bind:value={$form.cost}
			name="cost"
			isInValid={false}
		/>
	</div>
	<div class="flex flex-row space-x-5 pb-6">
		<NumberField
			label="Marge de gain %"
			placeholder=""
			bind:value={$form.gain}
			name="gain"
			isInValid={false}
		/>
		<NumberField
			label="prix de vente unitaire TTC"
			placeholder="1"
			onChange={handleHTCChange}
			value={$form.price}
			name="price"
			isInValid={false}
		/>
	</div>

	<TextAreaField
		name="description"
		bind:value={$form.description}
		label="Description"
		placeholder="description"
	/>

	<div class="mt-4 sm:flex sm:items-center sm:-mx-2">
		<button
			type="button"
			on:click={() => (open = false)}
			class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
		>
			Annuler
		</button>

		<SubmitButton loading={$submitting} />
	</div>
</form>
