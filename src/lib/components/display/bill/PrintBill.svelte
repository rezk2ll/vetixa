<script lang="ts">
	import type { BillInformation } from '$types';
	import PrimaryButton from '$components/buttons/PrimaryButton.svelte';
	import InvoiceIcon from '$components/icons/InvoiceIcon.svelte';

	export let bill: BillInformation | undefined;
	export let handler: () => void = () => {};

	$: disabled = bill === undefined;
</script>

<div class="flex flex-col gap-6 w-full">
	<PrimaryButton full {disabled} {handler}>
		<div class="flex space-x-5 items-start justify-start w-full">
			<InvoiceIcon />
			<span class="text-base font-semibold grow">facture</span>
		</div>
	</PrimaryButton>
</div>
