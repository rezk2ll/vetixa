<script lang="ts">
	import { toWords } from '$lib/utils/bill';
	import { formatDateSimple } from '$lib/utils/date';
	import type { BillInformation, expandedAnimal } from '$types';
	import PrintPdf, { Page } from 'svelte-printpdf';
	import PrintBill from './bill/PrintBill.svelte';
	import PrintPrescription from './prescription/PrintPrescription.svelte';
	import currency from 'currency.js';
	import PrintReport from './report/printReport.svelte';
	import PrintIcon from '$components/icons/PrintIcon.svelte';
	import { configuration } from '$store/configuration';
	import PrintableFooter from '$lib/components/display/PrintableFooter.svelte';
	import PrintableHeader from '$lib/components/display/PrintableHeader.svelte';

	export let bill: BillInformation | undefined;
	export let doctor: string | undefined;
	export let treatment: string | undefined;
	export let report: string | undefined;
	export let actions: string | undefined;
	export let animal: expandedAnimal;
	export let acts: string[] | undefined;

	let print = false;
	let showBill = false;
	let showPrescription = false;
	let showReport = false;

	const handlePrintBill = () => {
		showPrescription = false;
		showReport = false;
		showBill = true;

		setTimeout(() => {
			print = true;
		}, 250);
	};

	const handlePrintPrescription = () => {
		showBill = false;
		showReport = false;
		showPrescription = true;

		setTimeout(() => {
			print = true;
		}, 250);
	};

	const handlePrintReport = () => {
		showBill = false;
		showPrescription = false;
		showReport = true;

		setTimeout(() => {
			print = true;
		}, 250);
	};

	$: total = bill
		? bill.items.reduce((acc, curr) => {
				const price = currency(curr.total).multiply(1 - curr.discount / 100);

				return currency(acc).add(price).value;
		  }, 0)
		: 0;
</script>

<div
	class="flex flex-col gap-2 w-full p-1 pt-10 lg:p-8 lg:pb-3 bg-white shadow border-gray-200 xl:rounded px-2"
>
	<div class="flex space-x-5 w-full">
		<PrintIcon />
		<span class="text-lg font-semibold">Imprimer</span>
	</div>
	<PrintBill {bill} handler={handlePrintBill} />
	<PrintPrescription {treatment} handler={handlePrintPrescription} />
	<PrintReport {report} handler={handlePrintReport} />
</div>

<div class="screen:hidden px-0 w-full">
	<PrintPdf bind:print>
		<Page>
			{#if showBill}
				<div class="w-full">
					<div class="flex flex-col p-2 bg-white rounded-xl h-full">
						<div class="flex justify-between">
							<PrintableHeader config={$configuration} />

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
						<!-- End Grid -->

						<!-- Grid -->
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
							<!-- Col -->

							<div class="sm:text-end space-y-2">
								<!-- Grid -->
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
									<div class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
										Article
									</div>
									<div class="text-center text-xs font-medium text-gray-500 uppercase">PU</div>
									<div class="text-center text-xs font-medium text-gray-500 uppercase">Qte</div>
									<div class="text-center text-xs font-medium text-gray-500 uppercase">Rem</div>
									<div class="text-end text-xs font-medium text-gray-500 uppercase">
										Montant TTC
									</div>
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
						<!-- End Table -->

						<!-- Flex -->
						<div class="mt-8 flex sm:justify-end">
							<div class="w-full max-w-2xl sm:text-end space-y-2">
								<!-- Grid -->
								<div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
									<dl class="grid sm:grid-cols-5 gap-x-3">
										<dt
											class="col-span-3 font-semibold text-base text-gray-800 underline uppercase"
										>
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
						<!-- End Flex -->
					</div>
					<PrintableFooter config={$configuration} />
				</div>
			{:else if showPrescription}
				<div class="sm:w-11/12 lg:w-full">
					<div class="flex flex-col p-4 bg-white rounded-xl h-full">
						<div class="flex justify-between">
							<PrintableHeader config={$configuration} />
							<h2 class="text-2xl md:text-3xl font-semibold text-gray-800 underline">Ordonnance</h2>
							<div class="text-lg text-gray-500">
								{#if doctor && doctor.length}
									Dr {doctor}
								{/if}
							</div>
						</div>

						<div class="mt-8 grid sm:grid-cols-2 gap-3">
							<div>
								<div class="flex flex-row space-x-1">
									<h3 class="text-md font-semibold text-gray-800 text-lg">
										Pour: {animal.type}
										{animal.sex}
										{animal.name}
									</h3>
								</div>
							</div>
							<!-- Col -->

							<div class="sm:text-end space-y-2">
								<!-- Grid -->
								<div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
									<dl class="grid sm:grid-cols-5 gap-x-3">
										<dt class="col-span-3 font-semibold text-gray-800 text-lg">Date:</dt>
										<dd class="col-span-2 text-gray-500 text-lg">{formatDateSimple(new Date())}</dd>
									</dl>
								</div>
							</div>
						</div>
						<div class="mt-6 text-xl">
							{@html treatment}
						</div>
					</div>
					<PrintableFooter config={$configuration} />
				</div>
			{:else if showReport}
				<div class="sm:w-11/12 lg:w-full">
					<div class="flex flex-col p-2 bg-white rounded-xl h-full">
						<div class="flex justify-between">
							<PrintableHeader config={$configuration} />

							<h2
								class="text-2xl md:text-3xl font-semibold text-gray-800 underline first-letter:capitalize text-center"
							>
								compte rendu
							</h2>
							<div class="text-lg text-gray-500">
								{#if doctor && doctor.length}
									Dr {doctor}
								{/if}
							</div>
						</div>

						<div class="mt-1 grid sm:grid-cols-2 gap-2">
							<div>
								<div class="flex flex-row space-x-1">
									<h3 class="text-md font-semibold text-gray-800 text-lg">
										{animal.type}
										{animal.sex}
										{animal.name}
									</h3>
								</div>
							</div>
							<!-- Col -->

							<div class="sm:text-end space-y-2">
								<!-- Grid -->
								<div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
									<dl class="grid sm:grid-cols-5 gap-x-3">
										<dt class="col-span-3 font-semibold text-gray-800 text-lg">Date:</dt>
										<dd class="col-span-2 text-gray-500 text-lg">{formatDateSimple(new Date())}</dd>
									</dl>
								</div>
							</div>
						</div>
						<div class="mt-2">
							<hr />
							{@html report}
							{#if actions}
								<hr />
								<div class="pt-2">
									<div class="text-center font-semibold text-lg pt-1">Conduites à tenir</div>
									{@html actions}
								</div>
							{/if}
							{#if acts && acts.length}
								<div class="pt-2">
									<hr />
									<div class="py-2 text-center font-semibold text-lg">Actes</div>
									<div class="flex felx-row gap-1">
										{#each acts as act, index}
											<div>{act} {index === acts.length - 1 ? '' : '-'}</div>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					</div>
					<PrintableFooter config={$configuration} />
				</div>
			{/if}
		</Page>
	</PrintPdf>
</div>
