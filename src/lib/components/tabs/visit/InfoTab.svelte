<script lang="ts">
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import NumberField from '$components/inputs/NumberField.svelte';
	import TextAreaField from '$components/inputs/TextAreaField.svelte';
	import { doctorList } from '$store/doctor';
	import { currentVisit, updateVisitFormStore } from '$lib/store/visit';
	import { formatDateString } from '$utils/date';
	import Select from 'svelte-select';
	import { superForm } from 'sveltekit-superforms/client';
	import Vaccination from '$components/icons/Vaccination.svelte';
	import MagnifierGlass from '$components/icons/MagnifierGlass.svelte';
	import { toast } from 'svelte-sonner';

	const { enhance, form, submitting, allErrors } = superForm($updateVisitFormStore, {
		taintedMessage: null,
		resetForm: false,
		dataType: 'json',
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Mis à jour avec succés', { important: true, position: 'bottom-center' });
			}
		}
	});

	currentVisit.subscribe(({ id }) => {
		$form.id = id;
	});

	$: $form.motif = $currentVisit.motif;
	$: $form.id = $currentVisit.id;
	$: $form.doctor = $currentVisit.doctor;
	$: $form.visit_price = $currentVisit.visit_price;
	$: $form.control = $currentVisit.control;
	$: $form.vaccination = $currentVisit.vaccination;
	$: doctors = $doctorList.map((doctor) => ({
		label: doctor.name,
		value: doctor.name
	}));

	$: $allErrors.map((error) => {
		toast.error(error.messages.join('. '));
	});
</script>

<div class="flex flex-col gap-2">
	<form
		use:enhance
		action="?/updateVisit"
		class="mt-4 flex flex-col w-full px-2 lg:px-0"
		method="POST"
	>
		<input type="hidden" bind:value={$currentVisit.id} name="id" />
		<div class="flex flex-col pb-1">
			<TextAreaField
				label="Motif de la visite"
				name="motif"
				bind:value={$form.motif}
				placeholder="motif"
			/>
			<div class="flex flex-col lg:flex-row lg:gap-5 h-full justify-center pb-0.5">
				<div class="flex flex-col justify-center item-center pt-6 w-full">
					<Select
						id="cage"
						name="cage"
						items={doctors}
						value={$form.doctor}
						listOffset={10}
						placeholder="Docteur"
						bind:justValue={$form.doctor}
						class="h-[57px] rounded-[4px] ring-1 pt-1 focus:outline-none ring-gray-300 px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent"
					/>
				</div>
				<div class="flex items-center justify-center flex-col w-full pb-0.5">
					<NumberField
						label="Prix du consultation"
						name="visit_price"
						bind:value={$form.visit_price}
						placeholder=""
						isInValid={false}
					/>
				</div>
				<div class="flex items-center justify-end flex-col w-full pt-5 lg:pt-0">
					<input
						bind:checked={$form.control}
						type="checkbox"
						id="control"
						value={$form.control}
						class="hidden peer"
					/>
					<label
						for="control"
						class="inline-flex items-center justify-between w-full p-5 py-3 text-gray-500 bg-white border-2 border-gray-100 rounded-lg cursor-pointer peer-checked:border-emerald-600 hover:text-gray-600 peer-checked:text-gray-800 hover:bg-gray-50"
					>
						<div class="flex gap-2">
							<MagnifierGlass />
							<div class="w-full text-base pt-1">visite de contrôle</div>
						</div>
					</label>
				</div>
				<div class="flex items-center justify-end flex-col w-full pt-5 lg:pt-0">
					<input
						bind:checked={$form.vaccination}
						type="checkbox"
						id="vaccination"
						value={$form.vaccination}
						class="hidden peer"
					/>
					<label
						for="vaccination"
						class="inline-flex items-center justify-between w-full p-5 py-3 text-gray-500 bg-white border-2 border-gray-100 rounded-lg cursor-pointer peer-checked:border-emerald-600 hover:text-gray-600 peer-checked:text-gray-800 hover:bg-gray-50"
					>
						<div class="flex gap-2">
							<Vaccination />
							<div class="w-full text-base pt-1">consultation vaccinale</div>
						</div>
					</label>
				</div>
			</div>
		</div>

		<div class="flex items-center justify-between px-3 py-2 border-t bg-gray-100">
			<SubmitButton small loading={$submitting} />
			<div
				class="flex flex-col gap-1 lg:flex-row px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap"
			>
				<div>Dernière mise à jour:</div>
				<div>
					{formatDateString($currentVisit.updated)}
				</div>
			</div>
		</div>
	</form>
</div>
