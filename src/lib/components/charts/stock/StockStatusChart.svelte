<script lang="ts">
	import { onMount } from 'svelte';
	import Chart from 'chart.js/auto';

	export let data: number[];

	onMount(async () => {
		const ctx = (document.getElementById('stock-chart') as HTMLCanvasElement).getContext('2d');

		if (ctx)
			new Chart(ctx, {
				type: 'pie',
				data: {
					labels: ['En repture', 'En stock', 'En alerte'],
					datasets: [
						{
							data,
							backgroundColor: [
								'rgba(239, 68, 68, 0.8)',
								'rgba(16 ,185, 129, 0.8)',
								'rgba(255, 206, 86, 0.8)'
							],
							borderColor: [
								'rgba(239, 68, 68, 1)',
								'rgba(16 ,185, 129, 1)',
								'rgba(255, 206, 86, 1)'
							],
							borderWidth: 1
						}
					]
				},
				options: {
					responsive: true,
					maintainAspectRatio: false,
					spacing: 0,
					plugins: {
						legend: {
							display: true,
							position: 'bottom',
							title: {
								display: true,
								padding: 10
							}
						}
					}
				}
			});
	});
</script>

<div class="flex flex-col items-center justify-start w-full xl:py-8">
	<div class="w-full px-1 pt-10 lg:py-5 bg-white shadow-2xl border-gray-200 h-fit xl:rounded">
		<canvas id="stock-chart" />
	</div>
</div>
