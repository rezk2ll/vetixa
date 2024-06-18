<script lang="ts">
	import CollapsibleSection from '$components/CollapsibleSection.svelte';
	import TextField from '$components/inputs/TextField.svelte';
	import type { Observation } from '$types';
	import Select from 'svelte-select';

	export let entity: Observation;
	export let index: number = 0;
	export let title: string | undefined;

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
</script>

<CollapsibleSection
	size="full"
	shadow
	color="primary"
	title={title ?? 'Nouvelle observation'}
	show={index === 0}
>
	<div class="flex flex-col gap-2">
		<div class="flex flex-col lg:flex-row lg:gap-4 justify-between">
			<TextField required name="time" bind:value={entity.time} label="Temps" isInValid={false} />
			<TextField
				required
				name="responsible"
				bind:value={entity.responsible}
				label="Responsable"
				isInValid={false}
			/>
			<TextField
				name="temperature"
				bind:value={entity.temperature}
				label="T° / Heure"
				isInValid={false}
			/>
		</div>
		<div class="flex flex-col lg:flex-row gap-3 justify-between">
			<div class="w-full lg:w-1/3 min-w-60">
				<label class="text-gray-700 dark:text-gray-200 pl-2" for="alimentation-{index}"
					>Alimentation</label
				>
				<Select
					id="alimentation-{index}"
					items={booleanValue}
					listOffset={10}
					placeholder="veuillez sélectionner"
					bind:value={entity.alimentation}
					class="rounded-[4px] focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent "
				/>
			</div>
			<div class="w-full lg:w-1/3 min-w-60">
				<label class="text-gray-700 dark:text-gray-200 pl-2" for="abreuvement-{index}"
					>Abreuvement</label
				>
				<Select
					items={booleanValue}
					id="abreuvement-{index}"
					listOffset={10}
					placeholder="veuillez sélectionner"
					bind:value={entity.abreuvement}
					class="rounded-[4px] focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent "
				/>
			</div>
			<div class="w-full lg:w-1/3 min-w-60">
				<label class="text-gray-700 dark:text-gray-200 pl-2" for="vaumissement-{index}"
					>Vaumissement</label
				>
				<Select
					id="vaumissement-{index}"
					items={booleanValue}
					listOffset={10}
					placeholder="veuillez sélectionner"
					bind:value={entity.vaumissement}
					class="rounded-[4px] focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent "
				/>
			</div>
		</div>
		<div class="flex flex-col lg:flex-row gap-3 justify-between w-full">
			<div class="w-full lg:w-1/3 min-w-60">
				<label class="text-gray-700 dark:text-gray-200 pl-2" for="fecale-{index}"
					>Matière fécale</label
				>
				<Select
					id="fecale-{index}"
					items={matiereFecaleList}
					listOffset={10}
					placeholder="veuillez sélectionner"
					value={entity.matiere_fecale}
					bind:justValue={entity.matiere_fecale}
					class="rounded-[4px] focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent "
				/>
			</div>
			<div class="w-full lg:w-1/3 min-w-60">
				<label class="text-gray-700 dark:text-gray-200 pl-2" for="urines-{index}">Urines</label>
				<Select
					id="urines-{index}"
					items={urinesList}
					listOffset={10}
					placeholder="veuillez sélectionner"
					value={entity.urines}
					bind:justValue={entity.urines}
					class="rounded-[4px] focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent "
				/>
			</div>
			<div class="w-full lg:w-1/3 min-w-60">
				<label class="text-gray-700 dark:text-gray-200 pl-2" for="state-{index}"
					>Etat physiologique</label
				>
				<Select
					id="state-{index}"
					items={animalStates}
					listOffset={10}
					placeholder="veuillez sélectionner"
					value={entity.state}
					bind:justValue={entity.state}
					class="rounded-[4px] focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent "
				/>
			</div>
		</div>
	</div>
</CollapsibleSection>
