<script lang="ts">
	import { enhance } from '$app/forms';
	import See from './../../lib/components/icons/See.svelte';
	import type { PageData } from './$types';
	import Trash from '$lib/components/icons/Trash.svelte';
	import ConfirmationDialog from '$lib/components/ConfirmationDialog.svelte';
	import type { Fiche } from '@prisma/client';

	export let data: PageData;

	$: ({ fiches } = data);
	let showConfirmation = false;
	let deleteFromRef: HTMLFormElement;

	let selectedFiche: any | null;

	$: handler = () => {
		deleteFromRef.requestSubmit();

		selectedFiche = null;
		showConfirmation = false;
	};

	const remove = (fiche: Fiche) => {
		selectedFiche = fiche;
		showConfirmation = true;
	};
</script>

<form use:enhance action="?/delete" method="POST" class="hidden" bind:this={deleteFromRef}>
	{#if selectedFiche}
		<input type="hidden" name="id" bind:value={selectedFiche.id} />
	{/if}
</form>

<ConfirmationDialog bind:show={showConfirmation} {handler}>
	<div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
		{#if selectedFiche?.animalId}
			<h3 class="text-base font-semibold leading-6 text-gray-900" id="modal-title">
				Supprimer la fiche de {selectedFiche.animal.name}
			</h3>
		{/if}
		<div class="mt-2">
			<p class="text-sm text-gray-500">
				Êtes-vous sûr de vouloir supprimer cette fiche ? Toutes vos données seront définitivement
				supprimé. Cette action ne peut pas être annulée.
			</p>
		</div>
	</div>
</ConfirmationDialog>
<div class="antialiased" data-sveltekit-preload-data="hover">
	<div class="flex flex-col items-center justify-start lg:pt-20 xl:pt-10 xl:pl-14">
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
									<div class="font-semibold text-left">Espèce</div>
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
										<a
											type="button"
											class="w-full flex items-center justify-center h-4"
											href="/recap/{fiche.id}"
										>
											<See />
										</a>
										<button
											type="button"
											class="w-full flex items-center justify-center h-4"
											on:click={() => remove(fiche)}
										>
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
