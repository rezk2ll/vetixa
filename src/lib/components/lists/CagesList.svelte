<script lang="ts">
	import CageCard from '$components/display/cages/CageCard.svelte';
	import Grid from '$components/icons/Grid.svelte';
	import List from '$components/icons/List.svelte';
	import { cagesInfo } from '$store/hospit';
</script>

<div class="flex flex-col items-start justify-start xl:pl-14 w-full">
	<div class="flex items-start justify-start w-full">
		<div class="flex gap-2 bg-slate-100/50 h-10 w-full md:w-96 px-5">
			<div
				class="w-full p-1 text-center font-bold flex flex-row gap-5 items-center justify-center text-slate-800"
			>
				<div>Vue de l'hospit</div>

				<Grid />
			</div>

			<a
				href="/hospit"
				class="flex flex-row gap-5 items-center justify-center w-full cursor-pointer select-none p-1 text-center bg-blue-600 font-bold text-white transition-colors duration-200 ease-in-out"
			>
				<div>Liste</div>

				<List />
			</a>
		</div>
	</div>
	<div class="w-full px-1 pt-10 lg:p-2 bg-slate-100/50 shadow-2xl border-gray-200">
		<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 px-4 py-4 w-full">
			{#each $cagesInfo as cage}
				<CageCard {cage} />
			{/each}
		</div>
	</div>
</div>
