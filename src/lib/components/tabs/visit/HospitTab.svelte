<script lang="ts">
	import TextAreaField from '$components/inputs/TextAreaField.svelte';
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	import { fr } from 'date-fns/locale';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { currentVisit, updateVisitHospitalisationFormStore } from '$store/visit';
	import Select from 'svelte-select';
	import { formatDateShort, formatDateString, getDaysBetween, getPreviousDays } from '$utils/date';
	import { cagesList } from '$store/hospit';
	import type { Treatment } from '$types';
	import CollapsibleFormSection from '$components/CollapsibleFormSection.svelte';
	import TextField from '$components/inputs/TextField.svelte';

	let locale = localeFromDateFnsLocale(fr);
	let treatments: Treatment[] = [];

	const booleanValue = [
		{ label: 'oui', value: true },
		{ label: 'non', value: false }
	];

	const urinesList = ['Normale', 'Hemorragique', 'Foncée', "Pas d'urine"];
	const animalStates = [
		'Détériorisé',
		'Moyen',
		'Etat de choc',
		'Bon',
		'Amélioré',
		'Moyen +/-',
		'Mauvais',
		'Stable'
	];
	const matiereFecaleList = [
		'Normale',
		'Diarrhée jaune',
		'diarrhée verte',
		'Diarrhée noire',
		'Diarrhée décolorée'
	];

	const { form, enhance, submitting } = superForm($updateVisitHospitalisationFormStore, {
		taintedMessage: null,
		dataType: 'json',
		resetForm: false
	});

	$: disabled = !$form.cage || !$form.start || !$form.end;
	$: $form.id = $currentVisit.id;
	$: $form.start = $currentVisit.hospit.start ? new Date($currentVisit.hospit?.start) : new Date();
	$: $form.end = $currentVisit.hospit.end ? new Date($currentVisit.hospit?.end) : new Date();
	$: $form.cage = $currentVisit.hospit.cage;
	$: $form.note = $currentVisit.hospit.note;
	$: cages = $cagesList.map((cage) => ({
		label: cage.code,
		value: cage.id
	}));
	$: daysCount =
		$currentVisit.hospit?.start && $currentVisit.hospit?.end
			? getDaysBetween($currentVisit.hospit?.start, $currentVisit.hospit.end)
			: 0;
	$: {
		if (treatments.length !== daysCount) {
			treatments = getPreviousDays(new Date($currentVisit.hospit.end), daysCount).map((day) => {
				if ($currentVisit.hospit.treatment) {
					const existingDay = $currentVisit.hospit.treatment.find(
						(treatment) => treatment.date === formatDateShort(day)
					);

					if (existingDay) {
						return existingDay;
					}
				}

				return {
					date: formatDateShort(day)
				} satisfies Treatment;
			});
		}
	}

	$: $form.treatment = JSON.stringify(treatments);
</script>

<section class="container px-4 mx-auto mt-5 pb-5">
	<div class="flex flex-col space-y-5">
		<div class="sm:flex sm:items-center sm:justify-between">
			<h2 class="text-lg font-medium text-gray-800 dark:text-white">
				{daysCount} jours de hospitalisation
			</h2>
		</div>
		<form method="post" action="?/updateHospit" use:enhance class="flex flex-col gap-5">
			<input type="hidden" name="id" value={$form.id} />
			<TextAreaField name="note" label="Note" bind:value={$form.note} placeholder="" />
			<div class="flex flex-row gap-5 justify-between">
				<div class="">
					<label class="text-gray-700 dark:text-gray-200 pl-2" for="startdate"
						>Date d'admission</label
					>
					<DateInput
						id="startdate"
						class="rounded-full"
						bind:value={$form.start}
						timePrecision="minute"
						closeOnSelection={true}
						format="yyyy-MM-dd"
						{locale}
					/>
				</div>
				<div class="text-slate-500 flex items-center justify-center py-5">
					<svg
						data-slot="icon"
						fill="none"
						stroke-width="1.5"
						stroke="currentColor"
						viewBox="0 0 24 24"
						class="w-5 h-5"
						xmlns="http://www.w3.org/2000/svg"
						aria-hidden="true"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
						/>
					</svg>
				</div>
				<div class="p-1">
					<label class="text-gray-700 dark:text-gray-200 pl-2" for="enddate"
						>Date de sortie prévue</label
					>
					<DateInput
						bind:value={$form.end}
						id="enddate"
						min={$form.start}
						format="yyyy-MM-dd"
						closeOnSelection={true}
						timePrecision="minute"
						{locale}
					/>
				</div>
				<div class="shrink min-w-96">
					<label class="text-gray-700 dark:text-gray-200 pl-2" for="cage">Cage</label>
					<Select
						id="cage"
						name="cage"
						items={cages}
						value={$form.cage}
						listOffset={10}
						placeholder="veuillez sélectionner"
						bind:justValue={$form.cage}
						class="rounded-[4px] focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent "
					/>
				</div>
			</div>

			<div class="flex items-center justify-between px-3 py-2 border-t bg-gray-100">
				<SubmitButton small {disabled} loading={$submitting}>Payer</SubmitButton>
				<div class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
					{#if $currentVisit.hospit.updated}
						Dernière mise à jour: {formatDateString($currentVisit.hospit.updated)}
					{/if}
				</div>
			</div>
		</form>
		<div class="flex flex-col gap-2 w-full">
			{#each treatments as _, index}
				<CollapsibleFormSection
					color="info"
					title={treatments[index].date}
					size="full"
					show={index === 0}
				>
					<div class="flex flex-col gap-3">
						<div class="flex flex-row justify-between gap-5">
							<TextField
								name="responsible"
								bind:value={treatments[index].responsible}
								label="Responsable"
								isInValid={false}
							/>
							<TextField
								name="temperature"
								bind:value={treatments[index].temperature}
								label="T° / Heure"
								isInValid={false}
							/>
						</div>
						<TextAreaField
							placeholder=""
							label="Traitement"
							name="treatment"
							bind:value={treatments[index].traitement}
							isInValid={false}
						/>
						<div class="flex flex-row gap-5 justify-between">
							<div class="shrink min-w-96">
								<label class="text-gray-700 dark:text-gray-200 pl-2" for="alimentation-{index}"
									>Alimentation</label
								>
								<Select
									id="alimentation-{index}"
									items={booleanValue}
									listOffset={10}
									placeholder="veuillez sélectionner"
									bind:value={treatments[index].alimentation}
									class="rounded-[4px] focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent "
								/>
							</div>
							<div class="shrink min-w-96">
								<label class="text-gray-700 dark:text-gray-200 pl-2" for="abreuvement-{index}"
									>Abreuvement</label
								>
								<Select
									items={booleanValue}
									id="abreuvement-{index}"
									listOffset={10}
									placeholder="veuillez sélectionner"
									bind:value={treatments[index].abreuvement}
									class="rounded-[4px] focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent "
								/>
							</div>
							<div class="shrink min-w-96">
								<label class="text-gray-700 dark:text-gray-200 pl-2" for="vaumissement-{index}"
									>Vaumissement</label
								>
								<Select
									id="vaumissement-{index}"
									items={booleanValue}
									listOffset={10}
									placeholder="veuillez sélectionner"
									bind:value={treatments[index].vaumissement}
									class="rounded-[4px] focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent "
								/>
							</div>
						</div>
						<div class="flex flex-row gap-3 justify-between">
							<div class="shrink min-w-96">
								<label class="text-gray-700 dark:text-gray-200 pl-2" for="fecale-{index}"
									>Matière fécale</label
								>
								<Select
									id="fecale-{index}"
									items={matiereFecaleList}
									listOffset={10}
									placeholder="veuillez sélectionner"
									value={treatments[index].matiere_fecale}
									bind:justValue={treatments[index].matiere_fecale}
									class="rounded-[4px] focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent "
								/>
							</div>
							<div class="shrink min-w-96">
								<label class="text-gray-700 dark:text-gray-200 pl-2" for="urines-{index}"
									>Urines</label
								>
								<Select
									id="urines-{index}"
									items={urinesList}
									listOffset={10}
									placeholder="veuillez sélectionner"
									value={treatments[index].urines}
									bind:justValue={treatments[index].urines}
									class="rounded-[4px] focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent "
								/>
							</div>
							<div class="shrink min-w-96">
								<label class="text-gray-700 dark:text-gray-200 pl-2" for="state-{index}"
									>Etat physiologique</label
								>
								<Select
									id="state-{index}"
									items={animalStates}
									listOffset={10}
									placeholder="veuillez sélectionner"
									value={treatments[index].state}
									bind:justValue={treatments[index].state}
									class="rounded-[4px] focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent "
								/>
							</div>
						</div>
					</div>
				</CollapsibleFormSection>
			{/each}
		</div>
	</div>
</section>
