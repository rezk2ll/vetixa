<script lang="ts">
	import TextField from '$components/inputs/TextField.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { addEventFormStore } from '$store/agenda';
	import TextAreaField from '../../inputs/TextAreaField.svelte';
	import DateInput from 'date-picker-svelte/DateInput.svelte';
	import { localeFromDateFnsLocale } from 'date-picker-svelte/locale';
	import fr from 'date-fns/locale/fr/index';
	import { formatISO } from 'date-fns';
	import { toast } from 'svelte-sonner';
	import DoubleArrow from '$components/icons/DoubleArrow.svelte';
	import CalendarIcon from '$components/icons/CalendarIcon.svelte';
	import { getMaxSelectionDate } from '$lib/utils/date';

	let locale = localeFromDateFnsLocale(fr);
  let maxDate = getMaxSelectionDate();

	export let open = false;
	export let start: Date;
	export let end: Date;

	const { enhance, form, allErrors } = superForm($addEventFormStore, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				open = false;
			}
		},
		dataType: 'json',
		taintedMessage: null,
		resetForm: true
	});

	$: $form.start = formatISO(start);
	$: $form.end = formatISO(end);
	$: $allErrors.map((error) => {
		toast.error(error.messages.join('. '));
	});
</script>

<div class="flex items-center justify-center">
	<CalendarIcon />
</div>

<div class="mt-2 text-center">
	<h3
		class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
		id="modal-title"
	>
		Nouvel évènement
	</h3>
	<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
		Veuillez remplir le formulaire ci-dessous avec des détails précis
	</p>
</div>

<form use:enhance action="?/addEvent" class="mt-4 flex flex-col space-y-8" method="POST">
	<div class="flex items-center justify-between z-50 space-x-2 mt-0 h-6 w-full px-14">
		<DateInput
			id="startPicker"
			class="rounded-full"
      max={maxDate}
			bind:value={start}
			dynamicPositioning={true}
			timePrecision="minute"
			format="yyyy-MM-dd HH:mm"
			{locale}
		/>
		<div class="text-slate-500">
			<DoubleArrow />
		</div>
		<DateInput
			id="endPicker"
			bind:value={end}
      max={maxDate}
			min={start}
			format="yyyy-MM-dd HH:mm"
			closeOnSelection={true}
			dynamicPositioning={true}
			timePrecision="minute"
			{locale}
		/>
	</div>
	<TextField name="title" label="Titre" bind:value={$form.title} isInValid={false} />
	<TextField name="location" label="Emplacement" bind:value={$form.location} isInValid={false} />
	<TextAreaField
		name="description"
		label="Description"
		bind:value={$form.description}
		placeholder=""
		isInValid={false}
	/>

	<div class="mt-4 sm:flex sm:items-center sm:-mx-2">
		<button
			type="button"
			on:click={() => (open = false)}
			class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
		>
			Annuler
		</button>

		<button
			type="submit"
			class="w-full px-4 py-2 mt-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-emerald-600 rounded-md sm:mt-0 sm:w-1/2 sm:mx-2 hover:bg-emerald-500 focus:outline-none focus:ring focus:ring-emerald-300 focus:ring-opacity-40"
		>
			Confirmer
		</button>
	</div>
</form>
