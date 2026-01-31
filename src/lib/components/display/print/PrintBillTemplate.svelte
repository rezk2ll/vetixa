<script lang="ts">
	import { toWords } from '$lib/utils/bill';
	import { formatDateSimple } from '$lib/utils/date';
	import type { BillInformation } from '$types';
	import currency from 'currency.js';
	import { configuration } from '$store/configuration';
	import PrintableFooter from '$components/display/PrintableFooter.svelte';
	import PrintableHeader from '$components/display/PrintableHeader.svelte';

	export let bill: BillInformation | undefined;
	export let doctor: string | undefined;

	$: total = bill
		? bill.items.reduce((acc, curr) => {
				const price = currency(curr.total).multiply(1 - curr.discount / 100);
				return currency(acc).add(price).value;
		  }, 0)
		: 0;
</script>

<div class="w-full">
	<div class="flex flex-col p-2 bg-white rounded-xl h-full">
		<div class="flex justify-between">
			{#if $configuration}
				<PrintableHeader config={$configuration} />
			{/if}

			<div class="text-end">
				{#if doctor && doctor.length}
					<span class="text-2xl md:text-3xl block text-gray-500">Dr {doctor}</span>
				{/if}
				<h2 class="text-2xl md:text-3xl font-semibold text-gray-800 underline">
					Note d'honoraires
				</h2>
				<span class="text-2xl md:text-3xl block text-gray-500"># {bill?.id}</span>
			</div>
		</div>

		<div class="mt-8 grid sm:grid-cols-2 gap-3">
			<div>
				<div class="flex flex-row space-x-1">
					<h3 class="text-md font-semibold text-gray-800">propriétaire :</h3>
					<h3 class="text-md text-gray-500">{bill?.client}</h3>
				</div>
				<div class="flex flex-row space-x-1">
					<h3 class="text-md font-semibold text-gray-800">Animal :</h3>
					<h3 class="text-md text-gray-500">{bill?.animal}</h3>
				</div>
			</div>

			<div class="sm:text-end space-y-2">
				<div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
					<dl class="grid sm:grid-cols-5 gap-x-3">
						<dt class="col-span-3 font-semibold text-gray-800">Date:</dt>
						<dd class="col-span-2 text-gray-500">{formatDateSimple(new Date())}</dd>
					</dl>
				</div>
			</div>
		</div>
		<div class="mt-6">
			<div class="border border-gray-200 p-4 px-1 rounded-lg space-y-4">
				<div class="hidden sm:grid sm:grid-cols-6">
					<div class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">Article</div>
					<div class="text-center text-xs font-medium text-gray-500 uppercase">PU</div>
					<div class="text-center text-xs font-medium text-gray-500 uppercase">Qte</div>
					<div class="text-center text-xs font-medium text-gray-500 uppercase">Rem</div>
					<div class="text-end text-xs font-medium text-gray-500 uppercase">Montant TTC</div>
				</div>
				{#if bill}
					<div class="hidden sm:block border-b border-gray-200" />
					{#each bill.items as item}
						<div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
							<div class="col-span-full sm:col-span-2">
								<p class="font-medium text-gray-800">{item.name}</p>
							</div>
							<div>
								<p class="text-gray-800 text-center">{item.price} DT</p>
							</div>
							<div>
								<p class="text-gray-800 text-center">{item.quantity}</p>
							</div>
							<div>
								<p class="text-gray-800 text-center">
									{item.discount > 0 ? `${item.discount}%` : ''}
								</p>
							</div>
							<div>
								<p class="sm:text-end text-gray-800">
									{currency(item.total).multiply(1 - item.discount / 100).value} DT
								</p>
							</div>
						</div>

						<div class="sm:hidden border-b border-gray-200" />
					{/each}
				{/if}
			</div>
		</div>

		<div class="mt-8 flex sm:justify-end">
			<div class="w-full max-w-2xl sm:text-end space-y-2">
				<div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
					<dl class="grid sm:grid-cols-5 gap-x-3">
						<dt class="col-span-3 font-semibold text-base text-gray-800 underline uppercase">
							Montant note d'honoraires :
						</dt>
						<dd class="col-span-2 text-gray-800">{total} DT</dd>
					</dl>
				</div>
			</div>
		</div>
		<div class="py-5">
			<span class="font-semibold text-base text-gray-800">
				Arrêtée la présente note à la somme de: {toWords
					.convert(total, {
						currency: true
					})
					.toLocaleLowerCase()}
			</span>
		</div>
	</div>
	{#if $configuration}
		<PrintableFooter config={$configuration} />
	{/if}
</div>
