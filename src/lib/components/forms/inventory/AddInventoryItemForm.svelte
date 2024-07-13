<script lang="ts">
	import TextAreaField from '$components/inputs/TextAreaField.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import NumberField from '$components/inputs/NumberField.svelte';
	import TextField from '$components/inputs/TextField.svelte';
	import { addInventoryFormStore } from '$store/inventory';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import currency from 'currency.js';
	import { toast } from 'svelte-sonner';
	import InventoryCube from '$components/icons/InventoryCube.svelte';

	export let open = false;

	const { form, message, enhance, submitting, allErrors } = superForm($addInventoryFormStore, {
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Article ajouté avec succès', { important: true, position: 'bottom-center' });
				open = false;
			}
		},
		taintedMessage: null,
		dataType: 'json'
	});

	$form.quantity = 1;

	$: totalCost = currency($form.cost).multiply($form.quantity).value;

	$: handleCostChange = (e: Event) => {
		const value = +(e.target as HTMLInputElement).value;

		if ($form.quantity) {
			$form.cost = currency(value).divide($form.quantity).value;
		}
	};

	const handleHTCChange = (e: Event): void => {
		const value = +(e.target as HTMLInputElement).value;
		const divider = currency($form.tva).divide(100).add(1);

		htPrice = currency(value).divide(divider).value;
	};

	let htPrice = 0;
	$: $form.price = currency(htPrice).multiply(1 + $form.tva / 100).value;
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
			Nouvel article
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

<form use:enhance action="?/add" class="mt-4 w-full" method="POST">
	<div class="flex flex-row space-x-5">
		<TextField name="code" label="Code" bind:value={$form.code} isInValid={false} />
		<TextField name="name" label="Nom" bind:value={$form.name} isInValid={false} />
	</div>
	<div class="flex flex-row space-x-5 w-full">
		<NumberField
			label="Quantité"
			placeholder="1"
			bind:value={$form.quantity}
			name="quantity"
			isInValid={false}
		/>
		<NumberField
			label="Alerte"
			placeholder=""
			bind:value={$form.alert}
			name="alert"
			isInValid={false}
		/>
	</div>
	<div class="flex flex-row space-x-5">
		<NumberField
			label="Prix d'achat total en DT"
			placeholder="1"
			value={totalCost}
			name="total"
			isInValid={false}
			isNumber
			onChange={handleCostChange}
		/>
		<NumberField
			label="Prix d'achat unitaire en DT"
			placeholder="1"
			bind:value={$form.cost}
			name="cost"
			isNumber
			isInValid={false}
		/>
	</div>
	<div class="flex flex-row space-x-5 pb-6">
		<NumberField label="TVA %" placeholder="" bind:value={$form.tva} name="tva" isInValid={false} />
		<NumberField
			label="prix de vente unitaire HT en DT"
			placeholder="1"
			bind:value={htPrice}
			name="price_ht"
			isInValid={false}
		/>
		<NumberField
			label="prix de vente unitaire TTC en DT"
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
