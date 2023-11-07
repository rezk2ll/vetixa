<script lang="ts">
	import See from './../../lib/components/icons/See.svelte';
	import type { PageData } from './$types';
	import Trash from '$lib/components/icons/Trash.svelte';

	export let data: PageData;

	$: ({ fiches } = data);
</script>

<div class="antialiased">
	<div class="flex flex-col items-center justify-start lg:pt-20 xl:pt-10">
		<div
			class="w-full xl:w-11/12 px-1 pt-10 lg:p-10 bg-white shadow-2xl border-gray-200 h-screen xl:h-fit xl:rounded-2xl"
		>
			<header class="px-5 py-4 border-b border-gray-100 bg-gray-400">
				<h2 class="font-semibold text-gray-800">Fiches</h2>
			</header>
			<div class="py-3">
				<div class="overflow-x-auto">
					<table class="table-auto w-full">
						<thead class="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
							<tr class="lg:px-20">
								<th class="p-2 whitespace-nowrap">
									<div class="font-semibold text-left">Client</div>
								</th>
								<th class="p-2 whitespace-nowrap">
									<div class="font-semibold text-left">Téléphone</div>
								</th>
								<th class="p-2 whitespace-nowrap">
									<div class="font-semibold text-left">Nom</div>
								</th>
								<th class="p-2 whitespace-nowrap">
									<div class="font-semibold text-left">Type</div>
								</th>
								<th class="p-2 whitespace-nowrap">
									<div class="font-semibold text-center">Sexe</div>
								</th>
								<th class="p-2 whitespace-nowrap">
									<div class="font-semibold text-center">Age</div>
								</th>
								<th class="p-2 whitespace-nowrap">
									<div class="font-semibold text-center">Poids</div>
								</th>
								<th class="p-2 whitespace-nowrap">
									<div class="font-semibold text-center">Motif d'hospitalisation</div>
								</th>
								<th class="p-2 whitespace-nowrap">
									<div class="font-semibold text-center">Date d'admission</div>
								</th>
								<th class="p-2 whitespace-nowrap">
									<div class="font-semibold text-center">Date prévu de sortie</div>
								</th>
								<th class="p-2 whitespace-nowrap">
									<div class="font-semibold text-center">Pronostic</div>
								</th>
								<th class="p-2 whitespace-nowrap">
									<div class="font-semibold text-center">Actions</div>
								</th>
							</tr>
						</thead>
						<tbody class="text-sm divide-y divide-gray-100">
							{#each fiches as fiche}
								<tr>
									<td class="p-2 whitespace-nowrap">
										<div class="text-left">{fiche.client.name}</div>
									</td>
									<td class="p-2 whitespace-nowrap">
										<div class="text-left">{fiche.client.tel}</div>
									</td>
									<td class="p-2 whitespace-nowrap">
										<a
											href="/recap/{fiche.id}"
											class="text-left font-medium text-green-500 hover:underline"
											>{fiche.animal.name}</a
										>
									</td>
									<td class="p-2 whitespace-nowrap">
										<div class="text-lg text-center">{fiche.animal.type}</div>
									</td>
									<td class="p-2 whitespace-nowrap">
										<div class="text-lg text-center">{fiche.animal.sex}</div>
									</td>
									<td class="p-2 whitespace-nowrap">
										<div class="text-lg text-center">{fiche.animal.age}</div>
									</td>
									<td class="p-2 whitespace-nowrap">
										<div class="text-lg text-center">{fiche.animal.weight}</div>
									</td>
									<td class="p-2 whitespace-nowrap">
										<div class="text-lg text-center">{fiche.motif}</div>
									</td>
									<td class="p-2 whitespace-nowrap">
										<div class="text-lg text-center">{fiche.date_admission}</div>
									</td>
									<td class="p-2 whitespace-nowrap">
										<div class="text-lg text-center">{fiche.date_sortie}</div>
									</td>
									<td class="p-2 whitespace-nowrap">
										<div class="text-lg text-center">{fiche.pronostic}</div>
									</td>
									<td class="p-2 whitespace-nowrap flex pt-4">
										<button type="button" class="w-full flex items-center justify-center h-4">
											<See />
										</button>
										<button type="button" class="w-full flex items-center justify-center h-4">
											<Trash />
										</button>
									</td>
								</tr>
							{/each}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</div>
