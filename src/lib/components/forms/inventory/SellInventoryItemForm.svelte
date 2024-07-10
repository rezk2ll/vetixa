<script lang="ts">
	import TextField from '$components/inputs/TextField.svelte';
	import { inventoryItems, sellInventoryFormStore } from '$lib/store/inventory';
	import { superForm } from 'sveltekit-superforms/client';
	import Select from 'svelte-select';
	import NumberField from '$components/inputs/NumberField.svelte';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import type { PaymentMethodType, InventoryItemInfo } from '$types';
	import currency from 'currency.js';
	import { toast } from 'svelte-sonner';
	import ShoppingIcon from '$components/icons/ShoppingIcon.svelte';

	export let open = false;

	const methods: PaymentMethodType[] = ['cash', 'tpe', 'cheque'];

	const { form, enhance, submitting, allErrors } = superForm($sellInventoryFormStore, {
		clearOnSubmit: 'errors-and-message',
		dataType: 'json',
		onResult: ({ result }) => {
			if (result.type === 'success') {
				open = false;
			}
		},
		taintedMessage: null
	});

	let selectedValue = '';

	const removeItem = (id: string) => {
		$form.items = $form.items.filter((selectedItem) => {
			return selectedItem.id !== id;
		}) as [
			{
				id: string;
				quantity: number;
			},
			...{
				id: string;
				quantity: number;
			}[]
		];
	};

	const handleQuantityChange = (e: Event, id: string) => {
		const value = (e.target as HTMLInputElement).valueAsNumber;

		const currentQuantity = itemRecords[id].quantity;
		const newQuantity = value < 1 ? 1 : currentQuantity - value >= 0 ? value : currentQuantity;

		$form.items = $form.items.map((item) => {
			if (item.id === id) {
				return {
					...item,
					quantity: newQuantity
				};
			}

			return item;
		}) as [
			{
				id: string;
				quantity: number;
			},
			...{
				id: string;
				quantity: number;
			}[]
		];
	};

	const onItemSelect = (e: CustomEvent) => {
		$form.items = [...$form.items, { id: e.detail.value, quantity: 1 }];
		selectedValue = '';
	};

	$: data = $inventoryItems
		.filter((item) => item.quantity > 0)
		.map((item) => ({
			label: item.name,
			value: item.id
		}));

	$: dataSource = data.filter((item) => {
		return $form.items.filter((formItem) => formItem.id === item.value).length === 0;
	});

	$: itemRecords = $inventoryItems.reduce((acc, curr) => {
		acc[curr.id] = {
			name: curr.name,
			quantity: curr.quantity,
			price: curr.price
		};

		return acc;
	}, {} as Record<string, InventoryItemInfo>);

	$: total = $form.items.reduce((acc, curr) => {
		const record = itemRecords[curr.id];
		const itemTotal = currency(record.price).multiply(curr.quantity).value;

		return currency(acc).add(itemTotal).value;
	}, 0);

	const handleMethodChange = (e: CustomEvent) => {
		if (e.detail.value !== 'cash') {
			$form.incash = 0;
			$form.outcash = 0;
		}
	};

	$: disabled =
		total < 1 ||
		($form.method === 'cash' && currency($form.incash).subtract($form.outcash).value !== total);
	$: invalidCash = total > 1 && currency($form.incash).subtract($form.outcash).value !== total;
	$: $allErrors.length &&
		toast.error($allErrors.map((error) => error.messages.join('. ')).join('. '));
</script>

<div>
	<div class="flex items-center justify-center">
		<ShoppingIcon />
	</div>

	<div class="mt-2 text-center">
		<h3
			class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
			id="modal-title"
		>
			Nouvelle Vente
		</h3>
		<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
			Veuillez choisir les produits à vendre
		</p>
	</div>
</div>
<div class="pt-10 h-36">
	<Select
		bind:items={dataSource}
		on:change={onItemSelect}
		showChevron
		listOffset={10}
		placeholder="veuillez sélectionner un produit"
		bind:value={selectedValue}
	/>
</div>
<hr />

<div class="relative bottom-0 flex p-3 bg-white dark:bg-gray-900 w-full">
	<div class="flex items-center justify-center grow">
		<div class="object-cover object-center w-10 h-10 rounded-full">
			<svg
				data-slot="icon"
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
					d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
				/>
			</svg>
		</div>

		<div class="mx-4">
			<h1 class="text-sm text-gray-700 dark:text-gray-200 font-semibold">Total</h1>
			<p class="text-sm text-gray-500 dark:text-gray-400 font-semibold">{total} dt</p>
		</div>
	</div>

	<div class="w-full lg:w-1/2 px-10">
		<Select
			items={methods}
			disabled={total < 1}
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
</div>
<form use:enhance action="?/sell" class="mt-4 flex flex-col" method="POST">
	<div class="flex flex-col overflow-y-auto max-h-96">
		{#each $form.items as item}
			<div class="flex flex-row gap-2">
				<TextField
					disabled
					value={itemRecords[item.id].name}
					name=""
					label="Nom"
					isInValid={false}
				/>
				<NumberField
					placeholder=""
					value={item.quantity}
					name=""
					label="Quantité"
					isInValid={false}
					onChange={(e) => handleQuantityChange(e, item.id)}
				/>
				<button
					type="button"
					class="flex items-center justify-center p-8 text-red-500"
					on:click={() => removeItem(item.id)}
				>
					<svg
						data-slot="icon"
						fill="none"
						class="w-8 h-8"
						stroke-width="1.5"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
						/>
					</svg>
				</button>
			</div>
		{/each}
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
