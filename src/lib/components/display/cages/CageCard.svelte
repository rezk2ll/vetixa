<script lang="ts">
	import EmptyCage from './EmptyCage.svelte';
	import type { CageItem } from '$types';
	import AnimalIcon from '$components/display/animal/AnimalIcon.svelte';
	import { daysDiff, formatDateStringShort, formatFilterDate } from '$utils/date';
	import PrimaryButton from '$components/buttons/PrimaryButton.svelte';
	import { goto } from '$app/navigation';
	import Time from '$components/icons/Time.svelte';
	import ForwardArrow from '$components/icons/ForwardArrow.svelte';
	import User from '$components/icons/SmallUser.svelte';
	import Note from '$components/icons/Note.svelte';
	import Info from '$components/icons/Info.svelte';
	import Edit from '$components/icons/Edit.svelte';
	import Phone from '$components/icons/Phone.svelte';
	import PaintColors from '$components/icons/PaintColors.svelte';
	import { getTextColor } from '$utils/color';

	export let cage: CageItem;
	export let handleColorChange: (id: string) => void = (_id: string) => {};

	$: isNew = cage.hospit && daysDiff(cage.hospit.start, formatFilterDate(new Date())) === 0;
	$: isDead = (cage.hospit && cage.hospit.visit.animal.deceased) || false;
	$: color = cage.hospit?.color;
	$: textColor = getTextColor(color ?? '');
</script>

<div
	style="background-color: {color};"
	class="flex flex-col rounded {color
		? ''
		: isDead
		? 'bg-red-500/80'
		: isNew
		? 'bg-emerald-100/90'
		: 'bg-white'} shadow-xl relative min-h-52"
>
	<span class="absolute top-0 left-0 bg-black text-slate-200 text-md font-semibold py-1 px-2">
		{cage.code}
	</span>
	<div class="flex flex-col justify-center pt-8 pb-2 px-5 h-full">
		{#if cage.hospit}
			<div
				class="absolute top-0 left-14 text-md font-semibold py-1 px-2 {cage.hospit?.visit.animal
					.sex === 'male'
					? 'text-blue-400'
					: 'text-pink-500'}"
			>
				{cage.hospit?.visit.animal.name}
			</div>
			<div
				class="absolute top-1 right-1 {cage.hospit?.visit.animal.sex === 'male'
					? 'text-blue-500 '
					: 'text-pink-500 '}"
			>
				<AnimalIcon type={cage.hospit?.visit.animal.type} />
			</div>
			<div class="flex flex-col grow {textColor}">
				<div class="flex flex-row w-full text-sm gap-2 pt-2">
					<Time />
					<div>{formatDateStringShort(cage.hospit?.start)}</div>
					<div class="text-slate-500 flex items-center justify-center">
						<ForwardArrow />
					</div>
					<div>{formatDateStringShort(cage.hospit?.end)}</div>
				</div>
				<div class="flex flex-row w-full text-sm gap-2 pt-2">
					<User />
					<div class="font-semibold">Propriétaire</div>
					<div class="text-slate-500 flex items-center justify-center">
						{'-'}
					</div>
					<div>{cage.hospit.visit.client.name}</div>
				</div>
				{#if cage.hospit.visit.client.tel}
					<div class="flex flex-row w-full text-sm gap-2 pt-2">
						<Phone />
						<div class="font-semibold">Téléphone</div>
						<div class="text-slate-500 flex items-center justify-center">
							{'-'}
						</div>
						<div>{cage.hospit.visit.client.tel}</div>
					</div>
				{/if}
				<div class="flex flex-row w-full text-sm gap-2 pt-2">
					<Note />
					<div class="font-semibold">Motif</div>
					<div class="text-slate-500 flex items-center justify-center">
						{'-'}
					</div>
					<div class="w-full truncate">{cage.hospit.visit.motif}</div>
				</div>
				{#if cage.hospit.note}
					<div class="flex flex-row w-full text-sm gap-2 pt-2">
						<Info />
						<div class="font-semibold">Note</div>
						<div class="text-slate-500 flex items-center justify-center">
							{'-'}
						</div>
						<div class="w-full truncate">{cage.hospit.note}</div>
					</div>
				{/if}
				{#if cage.hospit.treatment?.length}
					{#each cage.hospit.treatment as treatment}
						{#if treatment.traitement !== undefined}
							<div class="my-1 p-1 bg-orange-600 text-white rounded-lg ring-1 ring-gray-200/30">
								{treatment.traitement}
							</div>
						{/if}
					{/each}
				{/if}
			</div>

			<div class="mt-auto flex gap-5">
				<PrimaryButton full handler={() => goto(`/visit/${cage.hospit?.visit.id}?tab=hospit`)}>
					<div class="flex flex-row items-center justify-center gap-5">
						<div>Modifier</div>
						<Edit />
					</div>
				</PrimaryButton>
				{#if cage.hospit && cage.hospit.id}
					<button
						type="button"
						title="changer la couleur"
						on:click={() => handleColorChange(cage.hospit?.id ?? '')}
					>
						<PaintColors />
					</button>
				{/if}
			</div>
		{:else}
			<EmptyCage />
		{/if}
	</div>
</div>
