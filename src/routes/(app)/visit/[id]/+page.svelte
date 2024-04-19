<script lang="ts">
	import PaymentTab from '$components/tabs/visit/PaymentTab.svelte';
	import TabContainer from '$components/tabs/visit/VisitTabContainer.svelte';
	import {
		addVisitExamFormStore,
		addVisitFileFormStore,
		currentVisit,
		payVisitFormStore,
		removeVisitFileFormStore,
		removeVisitItemFormStore
	} from '$store/visit';
	import {
		clinicalExams as clinicalExamsStore,
		medicalActs as medicalActsStore,
		surgivalActs as surgivalActsStore
	} from '$store/acts';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({
		visit,
		clinicalExams,
		medicalActs,
		surgicalActs,
		form,
		bill,
		addExamForm,
		removeExamForm,
		addFileForm,
		removeFileForm,
		payVisitForm
	} = data);

	$: currentVisit.set(visit);
	$: addVisitExamFormStore.set(addExamForm);
	$: removeVisitItemFormStore.set(removeExamForm);
	$: medicalActsStore.set(medicalActs);
	$: clinicalExamsStore.set(clinicalExams);
	$: surgivalActsStore.set(surgicalActs);
	$: payVisitFormStore.set(payVisitForm);
	$: addVisitFileFormStore.set(addFileForm);
	$: removeVisitFileFormStore.set(removeFileForm);
</script>

<div class="flex flex-col xl:flex-row lg:pl-14 w-full">
	<TabContainer />
	<div class="w-full lg:w-5/12 flex flex-col lg:px-10 gap-3 pt-10">
		<PaymentTab {bill} visitId={visit.id} />
	</div>
</div>
