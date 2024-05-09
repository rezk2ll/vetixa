<script lang="ts">
	import PrintPdf, { Page } from 'svelte-printpdf';
	import type { BillInformation } from '$types';
	import PrimaryButton from '$components/buttons/PrimaryButton.svelte';
	import { formatDateShort, formatDateSimple } from '$lib/utils/date';

	export let bill: BillInformation | undefined;

	let print: boolean = false;

	$: total = bill ? bill.items.reduce((acc, curr) => acc + curr.price, 0) : 0;
	$: disabled = bill === undefined;
</script>

<div class="w-full p-1 pt-10 lg:p-5 bg-white shadow-2xl border-gray-200 xl:rounded px-2">
	<div class="flex flex-col px-5 gap-6">
		<h2 class="text-xl font-semibold text-gray-800">Facture</h2>
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

<div class="screen:hidden print:block">
	<PrintPdf bind:print>
		<Page>
			<!-- Invoice -->
			<div class="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto my-4 sm:my-10">
				<div class="sm:w-11/12 lg:w-3/4 mx-auto">
					<!-- Card -->
					<div class="flex flex-col p-4 sm:p-10 bg-white shadow-md rounded-xl">
						<!-- Grid -->
						<div class="flex justify-between">
							<div>

                <img src="/logo.svg" />
								<h1 class="mt-2 text-lg md:text-xl font-semibold text-blue-600">Dr Seif</h1>
							</div>
							<!-- Col -->

							<div class="text-end">
								<h2 class="text-2xl md:text-3xl font-semibold text-gray-800">Invoice #</h2>
								<span class="mt-1 block text-gray-500">3682303</span>

								<address class="mt-4 not-italic text-gray-800">
									45 Roker Terrace<br />
								</address>
							</div>
							<!-- Col -->
						</div>
						<!-- End Grid -->

						<!-- Grid -->
						<div class="mt-8 grid sm:grid-cols-2 gap-3">
							<div>
								<h3 class="text-lg font-semibold text-gray-800">Bill to:</h3>
								<h3 class="text-lg font-semibold text-gray-800">Sara Williams</h3>
								<address class="mt-2 not-italic text-gray-500">
									280 Suzanne Throughway,<br />
									Breannabury, OR 45801,<br />
									United States<br />
								</address>
							</div>
							<!-- Col -->

							<div class="sm:text-end space-y-2">
								<!-- Grid -->
								<div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
									<dl class="grid sm:grid-cols-5 gap-x-3">
										<dt class="col-span-3 font-semibold text-gray-800">Date:</dt>
										<dd class="col-span-2 text-gray-500">{ formatDateSimple(new Date())}</dd>
									</dl>
								</div>
							</div>
						</div>
						<div class="mt-6">
							<div class="border border-gray-200 p-4 rounded-lg space-y-4">
								<div class="hidden sm:grid sm:grid-cols-5">
									<div class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
										Article
									</div>
									<div class="text-start text-xs font-medium text-gray-500 uppercase">Qté</div>
									<div class="text-end text-xs font-medium text-gray-500 uppercase">Totale</div>
								</div>

								<div class="hidden sm:block border-b border-gray-200" />

								<div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
									<div class="col-span-full sm:col-span-2">
										<h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
										<p class="font-medium text-gray-800">Design UX and UI</p>
									</div>
									<div>
										<h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
										<p class="text-gray-800">1</p>
									</div>
									<div>
										<h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
										<p class="text-gray-800">5</p>
									</div>
									<div>
										<h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
										<p class="sm:text-end text-gray-800">$500</p>
									</div>
								</div>

								<div class="sm:hidden border-b border-gray-200" />

								<div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
									<div class="col-span-full sm:col-span-2">
										<h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
										<p class="font-medium text-gray-800">Web project</p>
									</div>
									<div>
										<h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
										<p class="text-gray-800">1</p>
									</div>
									<div>
										<h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
										<p class="text-gray-800">24</p>
									</div>
									<div>
										<h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
										<p class="sm:text-end text-gray-800">$1250</p>
									</div>
								</div>

								<div class="sm:hidden border-b border-gray-200" />

								<div class="grid grid-cols-3 sm:grid-cols-5 gap-2">
									<div class="col-span-full sm:col-span-2">
										<h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Item</h5>
										<p class="font-medium text-gray-800">SEO</p>
									</div>
									<div>
										<h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Qty</h5>
										<p class="text-gray-800">1</p>
										k
									</div>
									<div>
										<h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Rate</h5>
										<p class="text-gray-800">6</p>
									</div>
									<div>
										<h5 class="sm:hidden text-xs font-medium text-gray-500 uppercase">Amount</h5>
										<p class="sm:text-end text-gray-800">$2000</p>
									</div>
								</div>
							</div>
						</div>
						<!-- End Table -->

						<!-- Flex -->
						<div class="mt-8 flex sm:justify-end">
							<div class="w-full max-w-2xl sm:text-end space-y-2">
								<!-- Grid -->
								<div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
									<dl class="grid sm:grid-cols-5 gap-x-3">
										<dt class="col-span-3 font-semibold text-gray-800">Subtotal:</dt>
										<dd class="col-span-2 text-gray-500">$2750.00</dd>
									</dl>

									<dl class="grid sm:grid-cols-5 gap-x-3">
										<dt class="col-span-3 font-semibold text-gray-800">Total:</dt>
										<dd class="col-span-2 text-gray-500">$2750.00</dd>
									</dl>

									<dl class="grid sm:grid-cols-5 gap-x-3">
										<dt class="col-span-3 font-semibold text-gray-800">Tax:</dt>
										<dd class="col-span-2 text-gray-500">$39.00</dd>
									</dl>

									<dl class="grid sm:grid-cols-5 gap-x-3">
										<dt class="col-span-3 font-semibold text-gray-800">Amount paid:</dt>
										<dd class="col-span-2 text-gray-500">$2789.00</dd>
									</dl>

									<dl class="grid sm:grid-cols-5 gap-x-3">
										<dt class="col-span-3 font-semibold text-gray-800">Due balance:</dt>
										<dd class="col-span-2 text-gray-500">$0.00</dd>
									</dl>
								</div>
								<!-- End Grid -->
							</div>
						</div>
						<!-- End Flex -->
					</div>
				</div>
			</div>
			<!-- End Invoice -->
		</Page>
	</PrintPdf>
</div>

<style>
	.heading {
		color: text-blue;
	}
</style>
