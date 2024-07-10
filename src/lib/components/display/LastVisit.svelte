<script lang="ts">
	import ClockIcon from '$components/icons/ClockIcon.svelte';
	import FileIcon from '$components/icons/FileIcon.svelte';
	import AnimalIcon from '$components/display/animal/AnimalIcon.svelte';
	import { formatDateTime } from '$lib/utils/date';
	import type { QueueItem } from '$types';

	export let data: QueueItem | null = null;

	$: visit = data ? data.visit : null;
</script>

<div class="w-full xl:max-w-md overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800">
	<img class="object-cover object-center w-full h-96" src="/bg-2.jpg" alt="avatar" />

	<div class="flex items-center space-x-2 text-gray-900 px-5 py-3 bg-gray-900">
		<FileIcon />
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
					<AnimalIcon type={visit.animal.type} />
				</span>

				<h1 class="px-2 text-sm">{visit.animal.name}</h1>
			</div>

			<div class="flex items-center mt-4 text-gray-700 dark:text-gray-200">
				<ClockIcon />

				<h1 class="px-2 text-sm">{formatDateTime(data.created)}</h1>
			</div>
		{:else}
			<h1 class="px-2 text-sm">Aucune consultation n'est en cours pour le moment</h1>
		{/if}
	</div>
</div>
