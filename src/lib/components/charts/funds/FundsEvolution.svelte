<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let labels: string[];
	export let data: number[];

	onMount(async () => {
		const ctx = (document.getElementById('funds-evolution-chart') as HTMLCanvasElement).getContext(
			'2d'
		);

		if (ctx)
			new Chart(ctx, {
				type: 'line',
				data: {
					labels,
					datasets: [
						{
							label: 'Évolution de la trésorerie',
							data
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
		<canvas id="funds-evolution-chart" />
	</div>
</div>
