<script lang="ts">
	import PaymentTab from '$components/tabs/visit/PaymentTab.svelte';
	import TabContainer from '$components/tabs/visit/VisitTabContainer.svelte';
	import { addVisitExamFormStore, currentVisit, removeVisitItemFormStore } from '$store/visit';
	import {
		clinicalExams as clinicalExamsStore,
		medicalActs as medicalActsStore,
		surgivalActs as surgivalActsStore
	} from '$store/acts';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ visit, clinicalExams, medicalActs, surgicalActs, form, bill, addExamForm, removeExamForm } =
		data);

	$: currentVisit.set(visit);
	$: addVisitExamFormStore.set(addExamForm);
	$: removeVisitItemFormStore.set(removeExamForm);
	$: medicalActsStore.set(medicalActs);
	$: clinicalExamsStore.set(clinicalExams);
	$: surgivalActsStore.set(surgicalActs);
</script>

<div class="flex flex-col xl:flex-row lg:pl-14 w-full">
	<TabContainer />
	<div class="w-full lg:w-5/12 flex flex-col lg:px-10 gap-3 pt-10">
		<PaymentTab {bill} visitId={visit.id} />
	</div>
</div>
