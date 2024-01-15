<script lang="ts">
	import TextField from '$lib/components/inputs/TextField.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { addEventFormStore } from '$root/lib/store/agenda';
	import TextAreaField from '../../inputs/TextAreaField.svelte';
	import DateInput from 'date-picker-svelte/DateInput.svelte';
	import { localeFromDateFnsLocale } from 'date-picker-svelte/locale';
	import { fr } from 'date-fns/locale';
	import { formatISO } from 'date-fns';

	let locale = localeFromDateFnsLocale(fr);

	export let open = false;
	export let start: Date;
	export let end: Date;

	const { enhance, form } = superForm($addEventFormStore, {
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
</script>

<div class="flex items-center justify-center">
	<svg
		data-slot="icon"
		class="w-8 h-8 text-gray-700 dark:text-gray-300"
		fill="none"
		stroke-width="1.5"
		stroke="currentColor"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		aria-hidden="true"
	>
		<path
			stroke-linecap="round"
			stroke-linejoin="round"
			d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
		/>
	</svg>
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
			bind:value={start}
			dynamicPositioning={true}
			timePrecision="minute"
			format="yyyy-MM-dd HH:mm"
			{locale}
		/>
		<div class="text-slate-500">
			<svg
				data-slot="icon"
				fill="none"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-5 h-5"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5"
				/>
			</svg>
		</div>
		<DateInput
			id="endPicker"
			bind:value={end}
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
