<script lang="ts">
	import type { InventorySaleItem } from '$types';
	import currency from 'currency.js';

	export let items: InventorySaleItem[];

	$: medicalActsTotal = items
		.filter(({ type }) => type === 'medical_act')
		.reduce((acc, curr) => currency(acc).add(curr.total).value, 0);

	$: surgicalActsTotal = items
		.filter(({ type }) => type === 'surgical_act')
		.reduce((acc, curr) => currency(acc).add(curr.total).value, 0);

	$: toilettageTotal = items
		.filter(({ type }) => type === 'toilettage')
		.reduce((acc, curr) => currency(acc).add(curr.total).value, 0);

	$: hospitTotal = items
		.filter(({ type }) => type === 'hospit')
		.reduce((acc, curr) => currency(acc).add(curr.total).value, 0);

	$: saleTotal = items
		.filter(({ type }) => type === 'sale')
		.reduce((acc, curr) => currency(acc).add(curr.total).value, 0);

	$: anonymousSales = items
		.filter(({ type, visit }) => type === 'sale' && !visit)
		.reduce((acc, curr) => currency(acc).add(curr.total).value, 0);

	$: visitSales = items
		.filter(({ type, visit }) => type === 'sale' && visit)
		.reduce((acc, curr) => currency(acc).add(curr.total).value, 0);

	$: visitTotal = items
		.filter(({ type }) => type === 'visit')
		.reduce((acc, curr) => currency(acc).add(curr.total).value, 0);

	$: total = currency(medicalActsTotal)
		.add(surgicalActsTotal)
		.add(toilettageTotal)
		.add(hospitTotal)
		.add(saleTotal)
		.add(visitTotal);
</script>

<div class="flex flex-col items-center justify-start w-full">
	<div
		class="min-w-20 w-full flex items-center justify-center cursor-pointer px-5 py-5 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 focus:outline-none"
	>
		Total général
	</div>
	<div class="w-full p-2 lg:px-0 lg:pt-5 bg-white shadow lg:shadow-2xl border-gray-200">
		<div class="flex flex-col px-2 gap-1">
			<div class="flex items-center justify-between px-3 py-2 bg-gray-200 rounded">
				<button
					type="button"
					disabled
					class="min-w-20 cursor-pointer px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
					>Actes médicaux</button
				>
				<span class="font-bold text-gray-800 p-1 rounded bg-slate-200">{medicalActsTotal} DT</span>
			</div>
			<div class="flex items-center justify-between px-3 py-2 bg-gray-200 rounded">
				<button
					type="button"
					disabled
					class="min-w-20 cursor-pointer px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
					>Actes chirurgicaux</button
				>
				<span class="font-bold text-gray-800 p-1 rounded bg-slate-200">{surgicalActsTotal} DT</span>
			</div>
			<div class="flex items-center justify-between px-3 py-2 bg-gray-200 rounded">
				<button
					type="button"
					disabled
					class="min-w-20 cursor-pointer px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
					>Toilettage</button
				>
				<span class="font-bold text-gray-800 p-1 rounded bg-slate-200">{toilettageTotal} DT</span>
			</div>
			<div class="flex items-center justify-between px-3 py-2 bg-gray-200 rounded">
				<button
					type="button"
					disabled
					class="min-w-20 cursor-pointer px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
					>Hospitalisations</button
				>
				<span class="font-bold text-gray-800 p-1 rounded bg-slate-200">{hospitTotal} DT</span>
			</div>
			<div class="flex items-center justify-between px-3 py-2 bg-gray-200 rounded">
				<button
					type="button"
					disabled
					class="min-w-20 cursor-pointer px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
					>Consultations</button
				>
				<span class="font-bold text-gray-800 p-1 rounded bg-slate-200">{visitTotal} DT</span>
			</div>
			<div class="flex items-center justify-between px-3 py-2 bg-gray-200 rounded">
				<button
					type="button"
					disabled
					class="min-w-20 cursor-pointer px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-red-600 rounded hover:bg-gray-700 focus:outline-none"
					>ventes totales</button
				>
				<span class="font-bold text-gray-800 p-1 rounded bg-slate-200">{saleTotal} DT</span>
			</div>
			<div class="flex items-center justify-between px-3 py-2 bg-gray-200 rounded pl-8">
				<button
					type="button"
					disabled
					class="min-w-20 cursor-pointer px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-yellow-600 rounded-full hover:bg-yellow-700 focus:outline-none"
					>Ventes en boutique</button
				>
				<span class="font-bold text-gray-800 p-1 rounded bg-slate-200">{anonymousSales} DT</span>
			</div>
			<div class="flex items-center justify-between px-3 py-2 bg-gray-200 rounded pl-8">
				<button
					type="button"
					disabled
					class="min-w-20 cursor-pointer px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-blue-500 rounded-full hover:bg-blue-700 focus:outline-none"
					>Ventes en consultations</button
				>
				<span class="font-bold text-gray-800 p-1 rounded bg-slate-200">{visitSales} DT</span>
			</div>

			<div class="flex items-center justify-between px-3 py-2 bg-emerald-300/90 rounded mt-10">
				<button
					type="button"
					disabled
					class="min-w-20 cursor-pointer px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-slate-800 rounded hover:bg-emerald-700 focus:outline-none"
					>TOTAL</button
				>
				<span class="font-bold text-slate-900 px-2 rounded-xl bg-emerald-300/90">{total} DT</span>
			</div>
		</div>
	</div>
</div>
