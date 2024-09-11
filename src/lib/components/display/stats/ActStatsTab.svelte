<script lang="ts">
	import type { ActStats } from '$types';
	import currency from 'currency.js';

	export let stats: ActStats;

	$: ({ medical, surgical, toilettage } = stats);
	$: total = currency(medical).add(surgical).add(toilettage).value;
</script>

<div class="flex flex-col items-center justify-start w-full">
	<div
		class="min-w-20 w-full flex items-center justify-center cursor-pointer px-5 py-5 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 focus:outline-none"
	>
		actes
	</div>
	<div class="w-full p-2 lg:p-5 bg-white shadow lg:shadow-2xl border-gray-200">
		<div class="flex flex-col px-2 gap-1">
			<div class="flex items-center justify-between px-3 py-2 bg-gray-200 rounded">
				<button
					type="button"
					disabled
					class="min-w-20 cursor-pointer px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
					>Actes médicaux</button
				>
				<span class="font-bold text-gray-800 p-1 rounded bg-slate-200">{stats.medical} DT</span>
			</div>
			<div class="flex items-center justify-between px-3 py-2 bg-gray-200 rounded">
				<button
					type="button"
					disabled
					class="min-w-20 cursor-pointer px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
					>Actes chirurgicaux</button
				>
				<span class="font-bold text-gray-800 p-1 rounded bg-slate-200">{stats.surgical} DT</span>
			</div>
			<div class="flex items-center justify-between px-3 py-2 bg-gray-200 rounded">
				<button
					type="button"
					disabled
					class="min-w-20 cursor-pointer px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 focus:outline-none"
					>Toilettage</button
				>
				<span class="font-bold text-gray-800 p-1 rounded bg-slate-200">{stats.toilettage} DT</span>
			</div>
			<div class="flex items-center justify-between px-3 py-2 bg-gray-200 rounded">
				<button
					type="button"
					disabled
					class="min-w-20 cursor-pointer px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-emerald-500 rounded hover:bg-emerald-700 focus:outline-none"
					>TOTAL</button
				>
				<span class="font-bold text-slate-900 px-2 rounded-xl bg-emerald-300/90">{total} DT</span>
			</div>
		</div>
	</div>
</div>
