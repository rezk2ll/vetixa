<script lang="ts">
	import { formatDateTime } from '$lib/utils/date';
	import type { QueueItem } from '$types';
	import Cat from '../icons/Cat.svelte';
	import Dog from '../icons/Dog.svelte';

	export let data: QueueItem | null = null;

	$: visit = data ? data.visit : null;
</script>

	<div class="w-full xl:max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
		<img class="object-cover object-center w-full h-96" src="/bg-2.jpg" alt="avatar" />

		<div class="flex items-center space-x-2 text-gray-900 px-5 py-3 bg-gray-900">
			<svg
				data-slot="icon"
				class="w-6 h-6"
				fill="currentColor"
				stroke-width="1.5"
				stroke="white"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
				/>
			</svg>
			<h1 class="text-lg font-semibold text-white">Dernière consultation en cours</h1>
		</div>
		<div class="px-6 py-4">
			{#if data && visit}
				<h1 class="text-xl font-semibold text-gray-800 dark:text-white">
					{visit.animal.client.name}
				</h1>

				<p class="py-2 text-gray-700 dark:text-gray-400">
					{visit.motif}
				</p>

				<div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
					<span
						class="text-sm {visit.animal.sex === 'male'
							? 'text-blue-500 '
							: 'text-pink-500 '} dark:text-gray-300 whitespace-nowrap"
					>
						{#if visit.animal.type === 'chien'}
							<Dog />
						{:else}
							<Cat />
						{/if}
					</span>

					<h1 class="px-2 text-sm">{visit.animal.name}</h1>
				</div>

				<div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
					<svg
						data-slot="icon"
						fill="none"
						class="w-6 h-6"
						stroke-width="1.5"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>

					<h1 class="px-2 text-sm">{formatDateTime(data.created)}</h1>
				</div>
			{:else}
				<h1 class="px-2 text-sm">Aucune consultation n'est en cours pour le moment</h1>
			{/if}
		</div>
	</div>
