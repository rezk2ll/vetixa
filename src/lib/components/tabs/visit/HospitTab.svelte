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
	import ObservationForm from '$components/forms/hospit/ObservationForm.svelte';

	let locale = localeFromDateFnsLocale(fr);
	let treatments: Treatment[] = [];

	const { form, enhance, submitting } = superForm($updateVisitHospitalisationFormStore, {
		taintedMessage: null,
		dataType: 'json',
		resetForm: false,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				invalidated = true;
			}
		}
	});

	let invalidated: boolean = false;

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
		if (treatments.length !== daysCount || invalidated) {
			treatments = getPreviousDays(new Date($currentVisit.hospit.end), daysCount).map((day) => {
				if ($currentVisit.hospit.treatment) {
					const existingDay = $currentVisit.hospit.treatment.find(
						(treatment) => treatment.date === formatDateShort(day)
					);

					if (existingDay) {
						return {
							...existingDay,
							observations: [{}, ...(existingDay.observations || []).filter((obs) => obs.time)]
						};
					}
				}

				invalidated = false;

				return {
					date: formatDateShort(day),
					observations: [{}]
				} satisfies Treatment;
			});
		}
	}

	$: $form.treatment = JSON.stringify(treatments);
</script>

<div class="container px-4 mt-5 pb-5">
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
		<div class="flex flex-col gap-2">
			{#each treatments as _, index}
				<CollapsibleFormSection
					color="info"
					title={treatments[index].date}
					size="full"
					show={index === 0}
				>
					<div class="flex flex-col gap-1 pt-3">
						<TextAreaField
							placeholder=""
							label="Traitement"
							name="treatment"
							bind:value={treatments[index].traitement}
							isInValid={false}
						/>

						{#each treatments[index].observations as _, observationIndex}
							<ObservationForm
								title={treatments[index].observations[observationIndex].time}
								bind:entity={treatments[index].observations[observationIndex]}
								index={observationIndex}
							/>
						{/each}
					</div>
				</CollapsibleFormSection>
			{/each}
		</div>
	</div>
</div>
