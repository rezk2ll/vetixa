<script lang="ts">
	import Select from 'svelte-select';
	import { fr } from 'date-fns/locale';
	import { superForm } from 'sveltekit-superforms';
	import { DateInput, localeFromDateFnsLocale } from 'date-picker-svelte';
	import TextAreaField from '$components/inputs/TextAreaField.svelte';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import { currentVisit } from '$store/visit';
	import {
		removeVisitHospitalisationFormStore,
		updateVisitHospitalisationFormStore
	} from '$store/hospit';
	import { formatDateShort, formatDateString, getDaysBetween, getPreviousDays } from '$utils/date';
	import { cagesList } from '$store/hospit';
	import type { Treatment } from '$types';
	import CollapsibleFormSection from '$components/CollapsibleFormSection.svelte';
	import ObservationForm from '$components/forms/hospit/ObservationForm.svelte';
	import NumberField from '$components/inputs/NumberField.svelte';
	import RemoveButton from '$components/buttons/removeButton.svelte';
	import ConfirmationDialog from '$components/ConfirmationDialog.svelte';
	import LoadingSpinner from '$components/display/LoadingSpinner.svelte';

	let locale = localeFromDateFnsLocale(fr);
	let treatments: Treatment[] = [];
	let removeFormRef: HTMLFormElement;
	let invalidated: boolean = false;
	let showConfirmation = false;
	let loading: boolean;

	const { form, enhance, submitting } = superForm($updateVisitHospitalisationFormStore, {
		taintedMessage: null,
		dataType: 'json',
		resetForm: false,
		onSubmit: () => {
			loading = true;
		},
		onResult: ({ result }) => {
			if (result.type === 'success') {
				setTimeout(() => {
					invalidated = true;
					loading = false;
				}, 250);
			}
		},
		id: 'update-hospit'
	});

	const { enhance: removeEnhance, submitting: removeSubmitting } = superForm(
		$removeVisitHospitalisationFormStore,
		{
			taintedMessage: null,
			resetForm: false,
			onResult: ({ result }) => {
				if (result.type === 'success') {
					invalidated = true;
				}
			},
			id: 'remove-hospit'
		}
	);

	const handleRemoveHospit = () => {
		removeFormRef.requestSubmit();
		showConfirmation = false;
	};

	const handleShowConfirmation = () => {
		showConfirmation = true;
	};

	$: disabled = !$form.cage || !$form.start || !$form.end;
	$: $form.id = $currentVisit.id;
	$: $form.start = $currentVisit.hospit.start?.length
		? new Date($currentVisit.hospit.start)
		: new Date();
	$: $form.end = $currentVisit.hospit.end?.length ? new Date($currentVisit.hospit.end) : new Date();
	$: $form.cage = $currentVisit.hospit.cage;
	$: $form.note = $currentVisit.hospit.note;
	$: $form.price = $currentVisit.hospit.price;
	$: cages = $cagesList.map((cage) => ({
		label: cage.code,
		value: cage.id
	}));
	$: daysCount =
		$currentVisit.hospit?.start && $currentVisit.hospit?.end
			? getDaysBetween($currentVisit.hospit?.start, $currentVisit.hospit.end)
			: 0;
	$: if (invalidated || treatments.length !== daysCount) {
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

	$: $form.treatment = JSON.stringify(treatments);
</script>

<form
	action="?/removeHospit"
	method="post"
	class="hidden"
	use:removeEnhance
	bind:this={removeFormRef}
>
	<input type="hidden" name="id" bind:value={$currentVisit.id} />
</form>

<ConfirmationDialog bind:show={showConfirmation} handler={handleRemoveHospit}>
	<div>
		<div class="mt-2 text-center">
			<h3 class="text-lg font-medium leading-6 text-gray-800 dark:text-white" id="modal-title">
				Annuler la hospitalisation?
			</h3>
			<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
				Êtes-vous sûr de vouloir annuler la hospitalisation? ? Toutes vos données seront
				définitivement supprimé. Cette action ne peut pas être annulée.
			</p>
		</div>
	</div>
</ConfirmationDialog>

<div class="container px-4 mt-5 pb-5 relative">
	<div class="flex flex-col space-y-5">
		<div class="flex items-center justify-between">
			<h2 class="text-lg font-medium text-gray-800 dark:text-white">
				{daysCount} jours de hospitalisation
			</h2>
		</div>
		{#if loading}
			<div
				class="absolute top-0 right-0 w-full h-full z-[80] bg-slate-100/50 flex items-center justify-center"
			>
				<LoadingSpinner />
			</div>
		{/if}
		<form method="post" action="?/updateHospit" use:enhance class="flex flex-col gap-5 w-full">
			<input type="hidden" name="id" value={$form.id} />
			<TextAreaField name="note" label="Note" bind:value={$form.note} placeholder="" />
			<div class="flex flex-col lg:flex-row gap-2 lg:gap-5 justify-start">
				<div class="flex w-full justify-between lg:w-auto lg:gap-4">
					<div class="hospit">
						<label class="text-gray-700 dark:text-gray-200 pl-2" for="startdate"
							>Date d'admission</label
						>
						<DateInput
							id="startdate"
							class="rounded-full"
							bind:value={$form.start}
							timePrecision="minute"
							closeOnSelection={true}
							format="yyyy-MM-dd HH:mm"
							{locale}
						/>
					</div>
					<div class="text-slate-500 flex items-center justify-center py-10">
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
					<div class="hospit">
						<label class="text-gray-700 dark:text-gray-200 pl-2" for="enddate"
							>Date de sortie prévue</label
						>
						<DateInput
							bind:value={$form.end}
							id="enddate"
							min={$form.start}
							format="yyyy-MM-dd HH:mm"
							closeOnSelection={true}
							timePrecision="minute"
							{locale}
						/>
					</div>
				</div>

				<div class="min-w-60 shrink pt-6">
					<Select
						id="cage"
						name="cage"
						items={cages}
						value={$form.cage}
						listOffset={10}
						placeholder="veuillez sélectionner un cage"
						bind:justValue={$form.cage}
						class="h-[48px] rounded-[4px] ring-1 pt-1 focus:outline-none ring-gray-300 px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent"
					/>
				</div>
				<div class="min-w-96">
					<NumberField
						size="medium"
						label="Prix"
						placeholder="montant"
						bind:value={$form.price}
						name="price"
						isInValid={false}
					/>
				</div>
			</div>

			<div
				class="flex flex-col lg:flex-row items-center justify-between lg:px-2 lg:py-1 border-t bg-gray-100"
			>
				<div class="flex flex-row gap-1 lg:space-x-5 w-full lg:w-2/3">
					<SubmitButton small {disabled} loading={$submitting}>Payer</SubmitButton>
					<RemoveButton
						small
						loading={$removeSubmitting}
						disabled={daysCount === 0}
						handler={handleShowConfirmation}>Annuler l'hospitalisation</RemoveButton
					>
				</div>
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

<style lang="css">
	:global(.hospit .date-time-field input[type='text']) {
		height: 50px;
	}
</style>
