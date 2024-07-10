<script lang="ts">
	import Avatar from '$components/Avatar.svelte';
	import EditIcon from '$components/icons/EditIcon.svelte';
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
							<EditIcon />
						</a>
					</div>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
