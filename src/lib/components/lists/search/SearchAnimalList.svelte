<script lang="ts">
	import AgeDisplay from '$components/display/AgeDisplay.svelte';
	import AnimalIcon from '$components/display/animal/AnimalIcon.svelte';
	import type { AnimalsResponse } from '$types';

	export let items: AnimalsResponse[];
</script>

<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
	<thead class="bg-gray-50 dark:bg-gray-800">
		<tr>
			<th
				scope="col"
				class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
			>
				<div class="flex items-center gap-x-3">Nom</div>
			</th>

			<th
				scope="col"
				class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
			>
				<div class="flex items-center gap-x-3">Propriétaire</div>
			</th>

			<th
				scope="col"
				class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
				>Espèce</th
			>

			<th
				scope="col"
				class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
				>Sexe</th
			>
			<th
				scope="col"
				class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
				>Poids</th
			>
			<th
				scope="col"
				class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
				>Age</th
			>
			<th
				scope="col"
				class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
				>Couleur</th
			>
			<th
				scope="col"
				class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
				>Race</th
			>
			<th
				scope="col"
				class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
				>Identifiant</th
			>

			<th scope="col" class="relative py-3.5 px-4">
				<span class="sr-only">Edit</span>
			</th>
		</tr>
	</thead>
	<tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
		{#each items as item}
			<tr>
				<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
					<div
						class="flex items-center gap-x-2 px-4 py-2.5 text-sm {item.sex === 'male'
							? 'text-blue-500 '
							: 'text-pink-500 '}  whitespace-nowrap"
					>
						<AnimalIcon type={item.type} />
						<div>
							<a href="/animals/{item.id}" class="font-medium text-gray-800 hover:underline"
								>{item.name}</a
							>
							<p class="text-sm font-normal text-gray-600 dark:text-gray-400">{item.identifier}</p>
						</div>
					</div></td
				>
				<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
					>{item.client}</td
				>
				<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
					>{item.type}</td
				>
				<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
					>{item.sex}</td
				>
				<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
					>{item.weight} KG</td
				>
				<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
					<AgeDisplay date={item.birthday} dead={item.deceased} death={item.deathdate} />
				</td>
				<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
					>{item.color}</td
				>
				<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
					>{item.breed}</td
				>
				<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
					>{item.identifier}</td
				>

				<td class="px-4 py-4 text-sm whitespace-nowrap">
					<div class="flex items-center gap-x-6">
						<a
							href="/animals/{item.id}"
							class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-5 h-5"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
								/>
							</svg>
						</a>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
