<script lang="ts">
	import CageCard from '$components/display/cages/CageCard.svelte';
	import { cagesInfo } from '$lib/store/hospit';
</script>

<div class="flex flex-col items-start justify-start xl:pl-10 w-full">
	<div class="flex items-start justify-start">
		<div class="flex gap-2 bg-slate-100/50 h-10 w-80 md:w-96">
			<div
				class="w-full p-1 text-center font-bold flex flex-row gap-5 items-center justify-center text-slate-800"
			>
				<div>Vue de l'hospit</div>

				<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M3.5 3.5H10.5V10.5H3.5V3.5Z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M3.5 13.5H10.5V20.5H3.5V13.5Z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M13.5 3.5H20.5V10.5H13.5V3.5Z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M13.5 13.5H20.5V20.5H13.5V13.5Z"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</div>

			<a
				href="/hospit"
				class="flex flex-row gap-5 items-center justify-center w-full cursor-pointer select-none p-1 text-center bg-blue-600 font-bold text-white transition-colors duration-200 ease-in-out"
			>
				<div>Liste</div>

				<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
						d="M8 6.00067L21 6.00139M8 12.0007L21 12.0015M8 18.0007L21 18.0015M3.5 6H3.51M3.5 12H3.51M3.5 18H3.51M4 6C4 6.27614 3.77614 6.5 3.5 6.5C3.22386 6.5 3 6.27614 3 6C3 5.72386 3.22386 5.5 3.5 5.5C3.77614 5.5 4 5.72386 4 6ZM4 12C4 12.2761 3.77614 12.5 3.5 12.5C3.22386 12.5 3 12.2761 3 12C3 11.7239 3.22386 11.5 3.5 11.5C3.77614 11.5 4 11.7239 4 12ZM4 18C4 18.2761 3.77614 18.5 3.5 18.5C3.22386 18.5 3 18.2761 3 18C3 17.7239 3.22386 17.5 3.5 17.5C3.77614 17.5 4 17.7239 4 18Z"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
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
