<script lang="ts">
	import TextAreaField from '$lib/components/inputs/TextAreaField.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import NumberField from '$lib/components/inputs/NumberField.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import { addInventoryFormStore } from '$root/lib/store/inventory';
	import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';

	export let open = false;

	const { form, message, enhance, submitting } = superForm($addInventoryFormStore, {
		resetForm: true,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				open = false;
			}
		},
		taintedMessage: null
	});

	$form.quantity = 1;

	$: totalCost = ($form.quantity * $form.cost).toFixed(2);

	$: handleCostChange = (e: Event) => {
		const value = +(e.target as HTMLInputElement).value;

		if ($form.quantity) {
			$form.cost = +(value / $form.quantity).toFixed(2);
		}
	};

	const handleHTCChange = (e: Event): void => {
		const value = +(e.target as HTMLInputElement).value;

		htPrice = +(value / (1 + $form.tva / 100)).toFixed(2);
	};

	let htPrice = 0;
	$: $form.price = +(htPrice * (1 + $form.tva / 100)).toFixed(2);
</script>

<div>
	<div class="flex items-center justify-center">
		<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 512 512"
			><path
				d="M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l160-57.1v-188L288 246.6v188z"
			/></svg
		>
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
			label="Prix d'achat total"
			placeholder="1"
			value={totalCost}
			name="total"
			isInValid={false}
			onChange={handleCostChange}
		/>
		<NumberField
			label="Prix d'achat unitaire"
			placeholder="1"
			bind:value={$form.cost}
			name="cost"
			isInValid={false}
		/>
	</div>
	<div class="flex flex-row space-x-5">
		<NumberField label="TVA" placeholder="" bind:value={$form.tva} name="tva" isInValid={false} />
		<NumberField
			label="prix de vente unitaire HT"
			placeholder="1"
			bind:value={htPrice}
			name="price_ht"
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

	<hr class="py-4" />
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
