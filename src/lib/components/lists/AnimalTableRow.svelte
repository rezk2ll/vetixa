<script lang="ts">
	import type { AnimalsResponse } from '$types';
	import AgeDisplay from '$components/display/AgeDisplay.svelte';
	import AnimalIcon from '$components/display/animal/AnimalIcon.svelte';
	import EditIcon from '$components/icons/EditIcon.svelte';
	import TrashIcon from '$components/icons/TrashIcon.svelte';
	import { createEventDispatcher } from 'svelte';

	export let animal: AnimalsResponse;
	export let showOwner: boolean = false;

	const dispatch = createEventDispatcher<{
		remove: AnimalsResponse;
		update: AnimalsResponse;
	}>();
</script>

<tr class={animal.deceased ? 'bg-red-100/80' : ''}>
	<td class="px-4 py-2.5 text-sm font-medium text-gray-700 whitespace-nowrap">
		<div class="inline-flex items-center gap-x-3">
			<div class="flex items-center gap-x-2">
				<a
					href="/animals/{animal.id}"
					class="hover:underline font-semibold capitalize text-gray-800 dark:text-white"
				>
					{animal.name}
				</a>
			</div>
		</div>
	</td>
	{#if showOwner}
		<td class="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
			<div class="flex items-center gap-x-2">
				<p
					class="px-3 py-1 text-xs text-blue-600 bg-blue-100 dark:text-blue-300 dark:bg-blue-900/60 rounded-full"
				>
					{animal.client}
				</p>
			</div>
		</td>
	{/if}
	<td
		class="px-4 py-2.5 text-sm {animal.sex === 'male'
			? 'text-blue-500 dark:text-blue-400'
			: 'text-pink-500 dark:text-pink-400'}  whitespace-nowrap"
	>
		<AnimalIcon type={animal.type} />
	</td>
	<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap">{animal.type}</td>
	<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap">{animal.sex}</td>
	<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap">{animal.weight}</td>
	<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap">
		<AgeDisplay date={animal.birthday} death={animal.deathdate} dead={animal.deceased} />
	</td>
	<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap">{animal.color}</td>
	<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap">{animal.breed}</td>
	<td class="px-4 py-2.5 text-sm text-gray-500 whitespace-nowrap">{animal.identifier}</td>

	<td class="px-4 py-2.5 text-sm whitespace-nowrap">
		<div class="flex items-end justify-end gap-x-6 w-full">
			<button
				on:click={() => dispatch('remove', animal)}
				class="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
			>
				<TrashIcon />
			</button>

			<button
				type="button"
				on:click={() => dispatch('update', animal)}
				title="Modifier le client"
				class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 hover:text-yellow-500 focus:outline-none"
			>
				<EditIcon />
			</button>
		</div>
	</td>
</tr>
