<script lang="ts">
	import type { FundPaymentMethodsStats } from '$types';
	import currency from 'currency.js';

	export let stats: FundPaymentMethodsStats;

	$: items = Object.entries(stats)
		.map(([method, { count, total }]) => ({
			method,
			count,
			total
		}))
		.sort((a, b) => b.count - a.count);

	$: total = items.reduce((acc, curr) => currency(acc).add(curr.total).value, 0);
</script>

<div class="flex flex-col items-center justify-start w-full xl:pb-8">
	<div class="w-full px-1 pt-10 lg:py-5 bg-white shadow-2xl border-gray-200 h-fit xl:rounded">
		<div class="rounded-t mb-0 px-4 py-3 border-0">
			<div class="flex flex-wrap items-center">
				<div class="relative w-full max-w-full flex-grow flex-1">
					<h3 class="font-semibold text-base text-blueGray-700">Méthodes de paiement</h3>
				</div>
			</div>
		</div>
		<div class="block w-full overflow-x-auto">
			<table class="items-center w-full bg-transparent border-collapse table-fixed">
				<thead class="thead-light"
					><tr
						><th
							class="px-6 max-w-md bg-blueGray-50 text-blueGray-600 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
							>Méthode</th
						>
						<th
							class="px-6 w-32 bg-blueGray-50 text-blueGray-600 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
							>Operations
						</th>
						<th
							class="px-6 w-32 bg-blueGray-50 text-blueGray-600 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
							>Total
						</th>
						<th
							class="px-6 w-32 bg-blueGray-50 text-blueGray-600 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
							>% $
						</th>
					</tr></thead
				>
				<tbody class="text-blueGray-700">
					{#each items as item}
						<tr
							><th
								class="max-w-lg border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4 text-left uppercase"
								>{item.method}</th
							>
							<td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4 text-center"
								>{item.count}</td
							>
							<td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4"
								>{item.total} DT</td
							>
							<td
								class="border-t-0 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
								><div class="flex items-center">
									<span class="mr-2">{((item.total / total) * 100).toFixed(2)} %</span>
									<div class="relative w-full">
										<div class="overflow-hidden h-2 text-xs flex rounded bg-emerald-200">
											<div
												style="width: {((item.total / total) * 100).toFixed(2)}%;"
												class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-emerald-500"
											/>
										</div>
									</div>
								</div></td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>
