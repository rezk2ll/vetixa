<!-- <script lang="ts">
	import Details from '$lib/components/Details.svelte';
	import CollapsibleSection from '$lib/components/CollapsibleSection.svelte';
	import DiagnosticForm from '$lib/components/forms/DiagnosticForm.svelte';

	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ fiche, diagnostics } = data);
	$: ({ animal, client } = fiche);

	$: details = [
		{ name: 'Nom', value: animal.name },
		{ name: "Espèce", value: animal.type },
		{ name: 'Age', value: animal.age },
		{ name: 'Sexe', value: animal.sex },
		{ name: 'Poids', value: animal.weight },
		{ name: 'Propriétaire', value: `${client.name} ( ${client.tel} )` }
	];

	$: diagnosticDetails = diagnostics.map((diagnostic) => ({
		date: `${diagnostic.date} - ${diagnostic.time}`,
		data: [
			{ name: 'Abreuvement', value: diagnostic.abreuvement },
			{ name: 'Alimentation', value: diagnostic.alimentation },
			{ name: 'Urines', value: diagnostic.urines },
			{ name: 'Vaumissement', value: diagnostic.vaumissement },
			{ name: 'Bilan effectué', value: diagnostic.bilan },
			{ name: 'Anti Parasitaire', value: diagnostic.anti },
			{ name: 'Etat physiologique', value: diagnostic.state },
			{ name: 'Traitement', value: diagnostic.traitement }
		]
	}));

	$: ficheDetails = [
		{ name: "Date d'admission", value: fiche.date_admission },
		{ name: 'Date prévu de sortie', value: fiche.date_sortie },
		{ name: "Motif d'hospitalisation", value: fiche.motif },
		{ name: 'Pronostic', value: fiche.pronostic }
	];
</script>

<div class="antialiased">
	<div class="flex flex-col xl:flex-row xl:p-20 w-full pt-5">
		<div class="flex flex-col w-full xl:w-1/2 space-y-5 mb-5">
			<CollapsibleSection title={animal.name} color="primary">
				<CollapsibleSection title="Détails de la Fiche" size="full" show={false} color="info">
					<Details details={ficheDetails} />
				</CollapsibleSection>
				<Details {details} />
			</CollapsibleSection>
			<CollapsibleSection title="Nouveau diagnostic médical">
				<DiagnosticForm />
			</CollapsibleSection>
		</div>
		<CollapsibleSection title="Historique" size="small">
			{#each diagnosticDetails as detail}
				<CollapsibleSection title={detail.date} color="info" size="full">
					<Details details={detail.data} />
				</CollapsibleSection>
			{/each}
		</CollapsibleSection>
	</div>
</div> -->
