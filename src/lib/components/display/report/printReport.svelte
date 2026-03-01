<script lang="ts">
	import PrimaryButton from '$components/buttons/PrimaryButton.svelte';
	import ReportIcon from '$lib/components/icons/ReportIcon.svelte';

	interface Props {
		report: string | undefined;
		handler?: () => void;
	}

	let { report, handler = () => {} }: Props = $props();

	let disabled = $derived(report === undefined || report.length === 0);
</script>

<div class="flex flex-col gap-6">
	<PrimaryButton full {disabled} {handler}>
		<div class="flex space-x-5 items-start justify-start">
			<ReportIcon />
			<div class="text-base font-semibold grow">Compte rendu</div>
		</div>
	</PrimaryButton>
</div>
