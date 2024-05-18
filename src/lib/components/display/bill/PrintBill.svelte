<script lang="ts">
	import PrintPdf, { Page } from 'svelte-printpdf';
	import type { BillInformation } from '$types';
	import PrimaryButton from '$components/buttons/PrimaryButton.svelte';
	import { formatDateSimple } from '$utils/date';
	import { ToWords } from 'to-words';

	export let bill: BillInformation | undefined;

	let print: boolean = false;

	$: total = bill ? bill.items.reduce((acc, curr) => acc + curr.total, 0) : 0;
	$: disabled = bill === undefined;

	const toWords = new ToWords({
		localeCode: 'fr-FR',
		converterOptions: {
			currency: true,
			ignoreDecimal: false,
			ignoreZeroCurrency: false,
			doNotAddOnly: false,
			currencyOptions: {
				name: 'Dinar',
				plural: 'Dinars',
				symbol: 'TND',
				fractionalUnit: {
					name: 'millime',
					plural: 'millimes',
					symbol: ''
				}
			}
		}
	});
</script>

<div class="w-full p-1 pt-10 lg:p-8 bg-white shadow-2xl border-gray-200 xl:rounded px-2">
	<div class="flex flex-col gap-6">
		<div class="flex flex-row items-center justify-start space-x-5">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 384 512"
				class="w-6 h-6"
				fill="currentColor"
				><path
					d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM64 80c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm0 64c0-8.8 7.2-16 16-16h64c8.8 0 16 7.2 16 16s-7.2 16-16 16H80c-8.8 0-16-7.2-16-16zm128 72c8.8 0 16 7.2 16 16v17.3c8.5 1.2 16.7 3.1 24.1 5.1c8.5 2.3 13.6 11 11.3 19.6s-11 13.6-19.6 11.3c-11.1-3-22-5.2-32.1-5.3c-8.4-.1-17.4 1.8-23.6 5.5c-5.7 3.4-8.1 7.3-8.1 12.8c0 3.7 1.3 6.5 7.3 10.1c6.9 4.1 16.6 7.1 29.2 10.9l.5 .1 0 0 0 0c11.3 3.4 25.3 7.6 36.3 14.6c12.1 7.6 22.4 19.7 22.7 38.2c.3 19.3-9.6 33.3-22.9 41.6c-7.7 4.8-16.4 7.6-25.1 9.1V440c0 8.8-7.2 16-16 16s-16-7.2-16-16V422.2c-11.2-2.1-21.7-5.7-30.9-8.9l0 0 0 0c-2.1-.7-4.2-1.4-6.2-2.1c-8.4-2.8-12.9-11.9-10.1-20.2s11.9-12.9 20.2-10.1c2.5 .8 4.8 1.6 7.1 2.4l0 0 0 0 0 0c13.6 4.6 24.6 8.4 36.3 8.7c9.1 .3 17.9-1.7 23.7-5.3c5.1-3.2 7.9-7.3 7.8-14c-.1-4.6-1.8-7.8-7.7-11.6c-6.8-4.3-16.5-7.4-29-11.2l-1.6-.5 0 0c-11-3.3-24.3-7.3-34.8-13.7c-12-7.2-22.6-18.9-22.7-37.3c-.1-19.4 10.8-32.8 23.8-40.5c7.5-4.4 15.8-7.2 24.1-8.7V232c0-8.8 7.2-16 16-16z"
				/></svg
			>
			<h2 class="text-xl font-semibold text-gray-800">Facture</h2>
		</div>
		<PrimaryButton full {disabled} handler={() => (print = true)}>
			<div class="flex space-x-5 items-center justify-center">
				<span class="text-base font-semibold">Imprimer</span>
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 512 512"
					class="w-4 h-4"
					fill="currentColor"
					><path
						d="M128 0C92.7 0 64 28.7 64 64v96h64V64H354.7L384 93.3V160h64V93.3c0-17-6.7-33.3-18.7-45.3L400 18.7C388 6.7 371.7 0 354.7 0H128zM384 352v32 64H128V384 368 352H384zm64 32h32c17.7 0 32-14.3 32-32V256c0-35.3-28.7-64-64-64H64c-35.3 0-64 28.7-64 64v96c0 17.7 14.3 32 32 32H64v64c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V384zM432 248a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"
					/></svg
				>
			</div>
		</PrimaryButton>
	</div>
</div>

<div class="screen:hidden print:block px-0">
	<PrintPdf bind:print>
		<Page>
			<div class="sm:w-11/12 lg:w-full">
				<div class="flex flex-col p-4 bg-white rounded-xl h-full">
					<div class="flex justify-between">
						<div>
							<img src="/logo.svg" alt="logo" height="52" width="52" />
							<h1 class="mt-2 text-lg md:text-xl font-semibold text-blue-600">
								SEIFEDDINE ISSAOUI
							</h1>
							<dd class="col-span-2 text-gray-500">clinique verterinaire</dd>
						</div>

						<div class="text-end">
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
							<div class="hidden sm:grid sm:grid-cols-4">
								<div class="sm:col-span-1 text-xs font-medium text-gray-500 uppercase">Article</div>
								<div class="text-center text-xs font-medium text-gray-500 uppercase">PU</div>
								<div class="text-center text-xs font-medium text-gray-500 uppercase">Qte</div>
								<div class="text-end text-xs font-medium text-gray-500 uppercase">Montant TTC</div>
							</div>
							{#if bill}
								<div class="hidden sm:block border-b border-gray-200" />
								{#each bill.items as item}
									<div class="grid grid-cols-4 sm:grid-cols-4 gap-2">
										<div class="col-span-full sm:col-span-1">
											<p class="font-medium text-gray-800">{item.name}</p>
										</div>
										<div>
											<p class="text-gray-800 text-center">{item.price} DT</p>
										</div>
										<div>
											<p class="text-gray-800 text-center">{item.quantity}</p>
										</div>
										<div>
											<p class="sm:text-end text-gray-800">{item.total} DT</p>
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
					<!-- End Flex -->
				</div>
				<div
					class="w-full flex flex-col justify-center items-center fixed bottom-0 space-y-1 text-blue-800"
				>
					<div class="  flex flex-row gap-1">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 512 512"
							class="w-4 h-4"
							fill="currentColor"
							><path
								d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
							/></svg
						>
						<div>53 423 765 / 23 423 765</div>
					</div>
					<div class="flex flex-row space-x-5">
						<div class="  flex flex-row gap-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 384 512"
								class="w-5 h-5"
								fill="currentColor"
								><path
									d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"
								/></svg
							>
							<div>10, rue El Mouahidine, le Bardo 2000 Tunis, Tunisie</div>
						</div>
						<div class="  flex flex-row gap-1">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								class="w-5 h-5"
								fill="currentColor"
								><path
									d="M256 64C150 64 64 150 64 256s86 192 192 192c17.7 0 32 14.3 32 32s-14.3 32-32 32C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256v32c0 53-43 96-96 96c-29.3 0-55.6-13.2-73.2-33.9C320 371.1 289.5 384 256 384c-70.7 0-128-57.3-128-128s57.3-128 128-128c27.9 0 53.7 8.9 74.7 24.1c5.7-5 13.1-8.1 21.3-8.1c17.7 0 32 14.3 32 32v80 32c0 17.7 14.3 32 32 32s32-14.3 32-32V256c0-106-86-192-192-192zm64 192a64 64 0 1 0 -128 0 64 64 0 1 0 128 0z"
								/></svg
							>
							<div>clinique@vetissaoui.com.tn</div>
						</div>
					</div>
					<div class="flex flex-row space-x-5 items-center justify-center">
						<div class="flex flex-row space-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 512 512"
								class="w-5 h-5"
								fill="currentColor"
								><path
									d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5V334.2H141.4V256h52.8V222.3c0-87.1 39.4-127.5 125-127.5c16.2 0 44.2 3.2 55.7 6.4V172c-6-.6-16.5-1-29.6-1c-42 0-58.2 15.9-58.2 57.2V256h83.6l-14.4 78.2H287V510.1C413.8 494.8 512 386.9 512 256h0z"
								/></svg
							>
							<div>Clinique vétérinaire Dr Seifeddine Issaoui. LE BARDO</div>
						</div>
						<div class="flex flex-row space-x-2">
							<svg
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 448 512"
								class="w-5 h-5"
								fill="currentColor"
								><path
									d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"
								/></svg
							>
							<div>doctor_vet_seifeddine</div>
						</div>
					</div>
				</div>
			</div>
			<!-- End Invoice -->
		</Page>
	</PrintPdf>
</div>
