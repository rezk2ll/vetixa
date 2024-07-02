<script lang="ts">
	import Avatar from '$components/Avatar.svelte';
	import type { ClientsResponse } from '$types';

	export let items: ClientsResponse[];
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
				class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
				>Email</th
			>

			<th
				scope="col"
				class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
				>Numéro de téléphone</th
			>
			<th
				scope="col"
				class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
				>Adresse</th
			>
			<th
				scope="col"
				class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
				>Note</th
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
					<div class="flex items-center gap-x-2">
						<Avatar name={item.name} />
						<div>
							<a
								href="/clients/{item.id}"
								class="font-medium text-gray-800 dark:text-white hover:underline">{item.name}</a
							>
						</div>
					</div></td
				>
				<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
					>{item.email}</td
				>
				<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
					>{item.tel}</td
				>
				<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
					>{item.address}</td
				>
				<td class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
					>{item.note}</td
				>

				<td class="px-4 py-4 text-sm whitespace-nowrap">
					<div class="flex items-center gap-x-6">
						<a
							href="/clients/{item.id}"
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
