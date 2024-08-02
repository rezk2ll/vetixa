<script lang="ts">
	import CageCard from '$components/display/cages/CageCard.svelte';
	import Grid from '$components/icons/Grid.svelte';
	import List from '$components/icons/List.svelte';
	import { cagesInfo, hospitChangeColorFormStore } from '$store/hospit';
	import { superForm } from 'sveltekit-superforms';
	import Modal from '$components/Modal.svelte';
	import { toast } from 'svelte-sonner';
	import CageColorCodes from '$lib/components/display/cages/CageColorCodes.svelte';
	import '@simonwep/pickr/dist/themes/classic.min.css';
	import { onMount } from 'svelte';

	let formRef: HTMLFormElement;
	let showPicker = false;

	const { enhance, form, allErrors } = superForm($hospitChangeColorFormStore, {
		taintedMessage: null,
		resetForm: true,
		id: 'change-color',
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('La couleur a été modifiée avec succès', {
					important: true,
					position: 'bottom-center'
				});
				$form.id = '';
				showPicker = false;
			}
		},
		dataType: 'json'
	});

	const handleSubmit = (color: string) => {
		$form.color = color;
		formRef.requestSubmit();
	};

	const handleColorChange = (id: string) => {
		$form.id = id;
		showPicker = true;
	};

	$: $allErrors.map((error) => {
		toast.error(error.messages.join('. '));
	});

	onMount(async () => {
		await import('@simonwep/pickr').then((Pickr) => {
			const pickr = Pickr.default.create({
				el: '.color-picker',
				theme: 'classic',
				appClass: '!shadow-none',
				default: '#e33d94d9',

				swatches: [
					'rgba(244, 67, 54, 1)',
					'rgba(233, 30, 99, 1)',
					'rgba(227, 61, 148)',
					'rgba(103, 58, 183, 1)',
					'rgba(63, 81, 181, 1)',
					'rgba(33, 150, 243, 1)',
					'rgba(3, 169, 244, 1)',
					'rgba(0, 188, 212, 1)',
					'rgba(0, 150, 136, 1)',
					'rgba(76, 175, 80, 1)',
					'rgba(139, 195, 74, 1)',
					'rgba(205, 220, 57, 1)',
					'rgba(255, 235, 59, 1)',
					'rgba(249, 105, 14);'
				],

				showAlways: true,
				inline: true,
				autoReposition: true,

				components: {
					preview: true,
					hue: true,
					palette: true,

					interaction: {
						clear: true,
						save: true,
						cancel: true
					}
				},
				i18n: {
					'btn:save': 'Sauvegarder',
					'btn:clear': 'Supprimer',
					'btn:cancel': 'Annuler'
				}
			});

			pickr.on('save', (color: { toHEXA: () => { toString: { (): string } } }) => {
				const toSubmit = color ? color.toHEXA().toString() : '';
				handleSubmit(toSubmit);
			});

			pickr.on('cancel', () => {
				showPicker = false;
			});
		});
	});
</script>

<div class="flex flex-col items-start justify-start xl:pl-14 w-full">
	<div class="flex flex-col lg:flex-row items-start justify-start w-full">
		<div class="flex gap-2 bg-slate-100/50 h-12 w-full md:w-[500px] pl-5">
			<div
				class="w-full p-1 text-center font-bold flex flex-row gap-5 items-center justify-center text-slate-800"
			>
				<div>Vue de l'hospit</div>

				<Grid />
			</div>

			<a
				href="/hospit"
				class="flex flex-row gap-5 items-center justify-center w-full cursor-pointer select-none p-1 text-center bg-blue-600 font-bold text-white transition-colors duration-200 ease-in-out"
			>
				<div>Liste</div>

				<List />
			</a>
		</div>
		<CageColorCodes />
	</div>
	<div class="w-full px-1 pt-10 lg:p-2 bg-slate-100/50 shadow-2xl border-gray-200">
		<Modal bind:open={showPicker} size="medium">
			<div class="flex flex-col picker w-full">
				<div class="color-picker w-full" />
			</div>
			<input type="text" id="coloris" />
		</Modal>

		<form class="hidden" method="post" action="?/changeColor" use:enhance bind:this={formRef}>
			<input type="hidden" name="id" bind:value={$form.id} />
			<input type="hidden" name="color" bind:value={$form.color} />
		</form>

		<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3 px-4 py-4 w-full">
			{#each $cagesInfo as cage}
				<CageCard {cage} {handleColorChange} />
			{/each}
		</div>
	</div>
</div>
