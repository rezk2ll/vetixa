<script lang="ts">
	import type { BillInformation, expandedAnimal, PrintableTab } from '$types';
	import PrintPdf, { Page } from 'svelte-printpdf';
	import PrintBill from '$components/display/bill/PrintBill.svelte';
	import PrintPrescription from '$components/display/prescription/PrintPrescription.svelte';
	import PrintReport from '$components/display/report/printReport.svelte';
	import PrintableTabs from '$components/display/PrintableTabs.svelte';
	import PrintCertificate from '$components/display/certificates/PrintCertificate.svelte';
	import PrintBillTemplate from '$components/display/print/PrintBillTemplate.svelte';
	import PrintPrescriptionTemplate from '$components/display/print/PrintPrescriptionTemplate.svelte';
	import PrintReportTemplate from '$components/display/print/PrintReportTemplate.svelte';
	import PrintCertificateTemplate from '$components/display/print/PrintCertificateTemplate.svelte';

	export let bill: BillInformation | undefined;
	export let doctor: string | undefined;
	export let treatment: string | undefined;
	export let report: string | undefined;
	export let actions: string | undefined;
	export let animal: expandedAnimal;
	export let acts: string[] | undefined;
	export let tab: PrintableTab = 'documents';

	let print = false;
	let showBill = false;
	let showPrescription = false;
	let showReport = false;
	let showCertificate = false;

	const handlePrintBill = () => {
		showPrescription = false;
		showReport = false;
		showBill = true;

		setTimeout(() => {
			print = true;
		}, 250);
	};

	const handlePrintPrescription = () => {
		showBill = false;
		showReport = false;
		showPrescription = true;

		setTimeout(() => {
			print = true;
		}, 250);
	};

	const handlePrintReport = () => {
		showBill = false;
		showPrescription = false;
		showReport = true;

		setTimeout(() => {
			print = true;
		}, 250);
	};

	const handlePrintCertificate = () => {
		showBill = false;
		showPrescription = false;
		showReport = false;
		showCertificate = true;

		setTimeout(() => {
			print = true;
		}, 250);
	};
</script>

<div
	class="flex flex-col gap-2 w-full p-1 pt-10 lg:p-8 lg:pb-3 bg-white shadow border-gray-200 xl:rounded px-2"
>
	<PrintableTabs bind:tab />
	{#if tab === 'documents'}
		<PrintBill {bill} handler={handlePrintBill} />
		<PrintPrescription {treatment} handler={handlePrintPrescription} />
		<PrintReport {report} handler={handlePrintReport} />
	{:else}
		<PrintCertificate handler={handlePrintCertificate} />
	{/if}
</div>

<div class="screen:hidden px-0 w-full">
	<PrintPdf bind:print>
		<Page>
			{#if showBill}
				<PrintBillTemplate {bill} {doctor} />
			{:else if showPrescription}
				<PrintPrescriptionTemplate {treatment} {doctor} {animal} />
			{:else if showReport}
				<PrintReportTemplate {report} {actions} {doctor} {animal} {acts} />
			{:else if showCertificate}
				<PrintCertificateTemplate {doctor} {animal} />
			{/if}
		</Page>
	</PrintPdf>
</div>
