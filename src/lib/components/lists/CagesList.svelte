<script lang="ts">
	import CageCard from '$components/display/cages/CageCard.svelte';
	import Grid from '$components/icons/Grid.svelte';
	import List from '$components/icons/List.svelte';
	import { cagesInfo, hospitChangeColorFormStore } from '$store/hospit';
	import { superForm } from 'sveltekit-superforms';
	import ColorPicker from 'svelte-awesome-color-picker';
	import Modal from '$components/Modal.svelte';
	import PrimaryButton from '../buttons/PrimaryButton.svelte';
	import { toast } from 'svelte-sonner';
	import CageColorCodes from '$lib/components/display/cages/CageColorCodes.svelte';

	let formRef: HTMLFormElement;
	let hex: string;
	let showPicker = false;

	const { enhance, submitting, form, allErrors } = superForm($hospitChangeColorFormStore, {
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
		}
	});

	const handleSubmit = () => {
		$form.color = hex;

		formRef.requestSubmit();
	};

	const handleColorChange = (id: string) => {
		$form.id = id;
		showPicker = true;
	};

	$: $form.color = hex;

	$: $allErrors.map((error) => {
		toast.error(error.messages.join('. '));
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
		<Modal bind:open={showPicker} size="small">
			<div class="flex flex-col picker w-full">
				<ColorPicker
					bind:hex
					textInputModes={['hex']}
					isDialog={false}
					--picker-width="240px"
					--cp-border-color="transparent"
					--cp-text-color="text-gray-200"
				/>
				<div class="flex flex-row gap-5 w-full">
					<button
						type="button"
						on:click={() => (showPicker = false)}
						class="w-full px-4 lg:py-2 mt-3 lg:mt-0 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
					>
						Annuler
					</button>
					<PrimaryButton disabled={$submitting} loading={$submitting} handler={handleSubmit} full>
						Sauvegarder
					</PrimaryButton>
				</div>
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
