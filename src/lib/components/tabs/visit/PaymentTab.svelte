<script lang="ts">
	import NumberField from '$components/inputs/NumberField.svelte';
	import { currentVisit, payVisitFormStore } from '$lib/store/visit';
	import { paymentMethods } from '$lib/utils/payment';
	import Select from 'svelte-select';
	import { superForm } from 'sveltekit-superforms/client';
	import TextAreaField from '$components/inputs/TextAreaField.svelte';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import PaymentStatus from '$components/display/PaymentStatus.svelte';
	import type { BillsResponse } from '$types';
	import currency from 'currency.js';

	export let bill: BillsResponse;

	const { form, enhance, submitting } = superForm($payVisitFormStore, {
		taintedMessage: null,
		resetForm: false,
		dataType: 'json',
		onUpdated: () => {
			$form.id = $currentVisit.id;
			$form.amount = 0;
			$form.method = 'cash';
			$form.incash = 0;
			$form.outcash = 0;
		}
	});

	const handleMethodChange = (e: CustomEvent) => {
		if (e.detail.value !== 'cash') {
			$form.incash = 0;
			$form.outcash = 0;
		}
	};

	$: $form.id = $currentVisit.id;
	$: disabled =
		$form.amount <= 0 ||
		($form.method === 'cash' &&
			currency($form.incash).subtract($form.outcash).value !== $form.amount) ||
		$form.method === undefined ||
		rest === 0;
	$: invalidCash =
		$form.amount > 0 && currency($form.incash).subtract($form.outcash).value !== $form.amount;
	$: disabledSelect = $form.amount === undefined || $form.amount <= 0;
	$: rest = currency(bill.total).subtract(bill.total_paid).value;
</script>

<div class="flex flex-col items-center justify-start w-full">
	<div class="w-full p-1 lg:pt-10 lg:p-8 bg-white lg:shadow-2xl border-gray-200 xl:rounded px-2">
		<div class="flex flex-col w-full space-y-2">
			<div class="flex flex-col w-full">
				<div class="flex flex-row space-x-5 items-center justify-start">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 576 512"
						class="w-6 h-6"
						fill="currentColor"
						><path
							d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"
						/></svg
					>
					<h2 class="text-xl font-semibold text-gray-800">Paiement</h2>
				</div>
				<span class="text-slate-800 font-normal">Saisissez les détails du paiement.</span>
				<div class="py-2 flex flex-col gap-1">
					<PaymentStatus {bill} />
					<div class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
						<button
							type="button"
							disabled
							class="min-w-20 px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
							>TOTAL</button
						>
						<span class="font-bold text-gray-800 dark:text-gray-200">{bill.total} DT</span>
					</div>
					<div class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
						<button
							type="button"
							disabled
							class="min-w-20 px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
							>RESTE</button
						>
						<span class="font-bold text-gray-800 dark:text-gray-200">{rest} DT</span>
					</div>
				</div>
			</div>
			<form
				use:enhance
				action="?/addPayment"
				class="mt-2 flex flex-col space-y-4 w-full"
				method="POST"
			>
				<input type="hidden" name="id" value={$currentVisit.id} />
				<NumberField label="Montant" placeholder="" bind:value={$form.amount} name="amount" />
				<div class="w-full">
					<Select
						items={paymentMethods}
						disabled={disabledSelect}
						listOffset={10}
						value={$form.method}
						placeholder="veuillez sélectionner"
						bind:justValue={$form.method}
						on:change={handleMethodChange}
						class="rounded-[4px] ring-1 focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent ring-gray-300 focus:ring-blue-500"
					/>
					{#if $form.method === 'cash'}
						<div class="flex flex-row space-x-2">
							<NumberField
								bind:value={$form.incash}
								name="incash"
								label="Entré"
								placeholder=""
								disabled={disabledSelect}
								isInValid={invalidCash}
							/>
							<NumberField
								bind:value={$form.outcash}
								name="outcash"
								label="Sortie"
								placeholder=""
								disabled={disabledSelect}
								isInValid={invalidCash}
							/>
						</div>
					{/if}
				</div>
				<TextAreaField
					bind:value={$form.description}
					label="Informations supplémentaires"
					name="description"
					isInValid={false}
					placeholder=""
				/>

				<SubmitButton full {disabled} loading={$submitting}>Payer</SubmitButton>
			</form>
		</div>
	</div>
</div>
