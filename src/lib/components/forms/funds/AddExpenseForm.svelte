<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import TextAreaField from '$lib/components/inputs/TextAreaField.svelte';
	import NumberField from '$lib/components/inputs/NumberField.svelte';
	import { addExpenseFormStore } from '$lib/store/funds';
	import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
	import Select from 'svelte-select';
	import type { PaymentMethodType } from '$types';
	import currency from 'currency.js';
	import { toast } from 'svelte-sonner';

	export let open = false;

	const methods: PaymentMethodType[] = ['cash', 'tpe', 'cheque'];
	const { enhance, submitting, form, allErrors } = superForm($addExpenseFormStore, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				open = false;
			}
		},
		dataType: 'json',
		taintedMessage: null
	});

	const handleMethodChange = (e: CustomEvent) => {
		if (e.detail.value !== 'cash') {
			$form.incash = 0;
			$form.outcash = 0;
		}
	};

	$: disabled =
		$form.amount < 1 ||
		($form.method === 'cash' &&
			currency($form.incash).subtract($form.outcash).value !== $form.amount);
	$: invalidCash =
		$form.amount > 1 && currency($form.incash).subtract($form.outcash).value !== $form.amount;

	$: $allErrors.length &&
		toast.error($allErrors.map((error) => error.messages.join('. ')).join('. '));
</script>

<div>
	<div class="flex items-center justify-center">
		<svg
			fill="none"
			class="w-8 h-8 text-gray-700 dark:text-gray-300"
			stroke="currentColor"
			stroke-width="1.5"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
			/>
		</svg>
	</div>

	<div class="mt-2 text-center">
		<h3
			class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
			id="modal-title"
		>
			Nouvelle dépense
		</h3>
		<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
			Veuillez remplir le formulaire ci-dessous avec des détails précis
		</p>
	</div>
</div>

<form use:enhance action="?/addExpenses" class="mt-4" method="POST">
	<TextAreaField
		name="description"
		label="Description"
		bind:value={$form.description}
		placeholder=""
		isInValid={false}
	/>
	<NumberField
		label="Montant"
		placeholder="montant"
		bind:value={$form.amount}
		name="amount"
		isInValid={false}
	/>
	<div class="flex flex-col gap-2 pt-2">
		<Select
			items={methods}
			disabled={$form.amount < 1}
			listOffset={10}
			value="cash"
			bind:justValue={$form.method}
			on:change={handleMethodChange}
		/>
		{#if $form.method === 'cash'}
			<div class="flex flex-row space-x-2">
				<NumberField
					bind:value={$form.incash}
					name="incash"
					label="Entré"
					placeholder=""
					isInValid={invalidCash}
				/>
				<NumberField
					bind:value={$form.outcash}
					name="outcash"
					label="Sortie"
					placeholder=""
					isInValid={invalidCash}
				/>
			</div>
		{/if}
	</div>

	<div class="mt-4 sm:flex sm:items-center sm:-mx-2">
		<button
			type="button"
			on:click={() => (open = false)}
			class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
		>
			Annuler
		</button>

		<SubmitButton loading={$submitting} {disabled} />
	</div>
</form>
