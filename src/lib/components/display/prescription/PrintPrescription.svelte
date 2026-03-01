<script lang="ts">
	import PrimaryButton from '$components/buttons/PrimaryButton.svelte';
	import PrescriptionIcon from '$components/icons/PrescriptionIcon.svelte';

	interface Props {
		treatment: string | undefined;
		handler?: () => void;
	}

	let { treatment, handler = () => {} }: Props = $props();

	let disabled = $derived(treatment === undefined || treatment.length === 0);
</script>

<div class="flex flex-col gap-6">
	<PrimaryButton full {disabled} {handler}>
		<div class="flex space-x-5 items-start justify-start">
			<PrescriptionIcon />
			<span class="text-base font-semibold grow">ordonnace</span>
		</div>
	</PrimaryButton>
</div>
