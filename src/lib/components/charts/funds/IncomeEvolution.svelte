<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let income: number[];
	export let expense: number[];
	export let labels: string[];

	onMount(async () => {
		const ctx = (document.getElementById('income-evolution-chart') as HTMLCanvasElement).getContext(
			'2d'
		);

		if (ctx)
			new Chart(ctx, {
				type: 'line',
				data: {
					labels,
					datasets: [
						{
							label: 'Revenus',
							data: income,
							borderColor: 'rgb(16, 185, 129)'
						},
						{
							label: 'Dépenses',
							data: expense,
							borderColor: 'rgb(239, 68, 68)'
						}
					]
				},
				options: {
					responsive: true,
					plugins: {
						legend: {
							position: 'top'
						},
						title: {
							display: true,
							text: ''
						}
					}
				}
			});
	});
</script>

<div class="flex flex-col items-center justify-start w-full">
	<div class="w-full px-5 pt-10 lg:py-5 bg-white shadow-2xl border-gray-200 xl:rounded">
		<canvas id="income-evolution-chart" />
	</div>
</div>
