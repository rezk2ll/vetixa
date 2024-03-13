<script lang="ts">
	import NumberField from '$components/inputs/NumberField.svelte';
	import { payVisitFormStore } from '$lib/store/visit';
	import { paymentMethods } from '$lib/utils/payment';
	import Select from 'svelte-select';
	import { superForm } from 'sveltekit-superforms/client';
	import TextAreaField from '../../inputs/TextAreaField.svelte';
	import SubmitButton from '../../buttons/SubmitButton.svelte';
	import type { BillsResponse } from '$root/pocketbase-types';
	import PaymentStatus from '../../dispaly/PaymentStatus.svelte';

	export let bill: BillsResponse;

	const { form, enhance, submitting } = superForm($payVisitFormStore, {
		taintedMessage: null
	});

	const handleMethodChange = (e: any) => {
		if (e.detail.value !== 'cash') {
			$form.incash = 0;
			$form.outcash = 0;
		}
	};

	$: disabled =
		$form.amount < 1 || ($form.method === 'cash' && $form.incash - $form.outcash !== $form.amount);
	$: invalidCash = $form.amount > 1 && $form.incash - $form.outcash !== $form.amount;
</script>

<div class="flex flex-col items-center justify-start w-full">
	<div class="w-full p-1 pt-10 lg:p-10 bg-white shadow-2xl border-gray-200 xl:rounded">
		<div class="flex flex-col w-full space-y-2">
			<div class="flex flex-col w-full">
				<h2 class="text-xl font-semibold text-gray-800">Paiement</h2>
				<span class="text-slate-800 font-normal">Saisissez les détails du paiement.</span>
				<div class="py-2 flex flex-col gap-1">
					<PaymentStatus {bill} />
					<div class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
						<button
							type="button"
							disabled
							class="min-w-20 px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700  focus:outline-none"
							>TOTAL</button
						>
						<span class="font-bold text-gray-800 dark:text-gray-200">{bill.total} DT</span>
					</div>
					<div class="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
						<button
							type="button"
							disabled
							class="min-w-20 px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700  focus:outline-none"
							>RESTE</button
						>
						<span class="font-bold text-gray-800 dark:text-gray-200"
							>{bill.total - bill.total_paid} DT</span
						>
					</div>
				</div>
			</div>
			<form
				use:enhance
				action="?/addPayment"
				class="mt-2 flex flex-col space-y-4 w-full"
				method="POST"
			>
				<NumberField label="Montant" placeholder="" bind:value={$form.amount} name="amount" />
				<div class="w-full">
					<Select
						items={paymentMethods}
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
