<script lang="ts">
	import PrimaryButton from '$components/buttons/PrimaryButton.svelte';
	import ReportIcon from '$lib/components/icons/ReportIcon.svelte';

	export let report: string | undefined;
	export let handler: () => void = () => {};

	$: disabled = report === undefined || report.length === 0;
</script>

<div class="flex flex-col gap-6">
	<PrimaryButton full {disabled} {handler}>
		<div class="flex space-x-5 items-start justify-start">
			<ReportIcon />
			<div class="text-base font-semibold grow">Compte rendu</div>
		</div>
	</PrimaryButton>
</div>
