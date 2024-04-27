<script lang="ts">
	import PaymentTab from '$components/tabs/visit/PaymentTab.svelte';
	import TabContainer from '$components/tabs/visit/VisitTabContainer.svelte';
	import {
		addVisitExamFormStore,
		addVisitFileFormStore,
		addVisitMedicalActsFormStore,
		addVisitStoreItemFormStore,
		addVisitSurgicalActsFormStore,
		currentVisit,
		payVisitFormStore,
		removeVisitFileFormStore,
		removeVisitItemFormStore,
		removeVisitMedicalActFormStore,
		removeVisitStoreItemFormStore,
		removeVisitSurgicalActFormStore,
		updateVisitActionsFormStore,
		updateVisitDiagnosticFormStore,
		updateVisitFormStore
	} from '$store/visit';
	import {
		clinicalExams as clinicalExamsStore,
		medicalActs as medicalActsStore,
		surgicalActs as surgicalActsStore
	} from '$store/acts';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({
		form,
		visit,
		clinicalExams,
		medicalActs,
		surgicalActs,
		bill,
		addExamForm,
		removeExamForm,
		addFileForm,
		removeFileForm,
		payVisitForm,
		updateDiagnosticForm,
		updateActionsForm,
		addVisitStoreItemForm,
		removeVisitStoreItemForm,
		addMedicalActsForm,
		removeMedicalActForm,
		addSurgicaActsForm,
		removeSurgicalActForm
	} = data);

	$: currentVisit.set(visit);
	$: updateVisitFormStore.set(form);
	$: addVisitExamFormStore.set(addExamForm);
	$: removeVisitItemFormStore.set(removeExamForm);
	$: medicalActsStore.set(medicalActs);
	$: clinicalExamsStore.set(clinicalExams);
	$: surgicalActsStore.set(surgicalActs);
	$: payVisitFormStore.set(payVisitForm);
	$: addVisitFileFormStore.set(addFileForm);
	$: removeVisitFileFormStore.set(removeFileForm);
	$: updateVisitDiagnosticFormStore.set(updateDiagnosticForm);
	$: updateVisitActionsFormStore.set(updateActionsForm);
	$: addVisitStoreItemFormStore.set(addVisitStoreItemForm);
	$: removeVisitStoreItemFormStore.set(removeVisitStoreItemForm);
	$: addVisitMedicalActsFormStore.set(addMedicalActsForm);
	$: removeVisitMedicalActFormStore.set(removeMedicalActForm);
	$: addVisitSurgicalActsFormStore.set(addSurgicaActsForm);
	$: removeVisitSurgicalActFormStore.set(removeSurgicalActForm);
</script>

<div class="flex flex-col xl:flex-row lg:pl-14 w-full">
	<TabContainer />
	<div class="w-full lg:w-5/12 flex flex-col lg:px-10 gap-3 pt-10">
		<PaymentTab {bill} visitId={visit.id} />
	</div>
</div>
