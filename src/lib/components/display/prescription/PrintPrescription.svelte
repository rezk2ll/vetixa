<script lang="ts">
	import PrimaryButton from '$components/buttons/PrimaryButton.svelte';
	import PrescriptionIcon from '$components/icons/PrescriptionIcon.svelte';

	export let treatment: string | undefined;
	export let handler: () => void = () => {};

	$: disabled = treatment === undefined || treatment.length === 0;
</script>

<div class="flex flex-col gap-6">
	<PrimaryButton full {disabled} {handler}>
		<div class="flex space-x-5 items-start justify-start">
			<PrescriptionIcon />
			<span class="text-base font-semibold grow">ordonnace</span>
		</div>
	</PrimaryButton>
</div>
