<script lang="ts">
	import PaymentTab from '$components/tabs/visit/PaymentTab.svelte';
	import TabContainer from '$components/tabs/visit/VisitTabContainer.svelte';
	import {
		activeVisitTab,
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
		updateVisitFormStore,
		updateVisitItemFormStore,
		updateVisitTreatmentFormStore,
		visitBill
	} from '$store/visit';
	import {
		clinicalExams as clinicalExamsStore,
		medicalActs as medicalActsStore,
		surgicalActs as surgicalActsStore
	} from '$store/acts';
	import {
		cagesList,
		removeVisitHospitalisationFormStore,
		updateVisitHospitalisationFormStore
	} from '$store/hospit';
	import type { PageData } from './$types';
	import { inventoryItems } from '$store/inventory';
	import VisitPrintables from '$components/display/VisitPrintables.svelte';
	import type { VisitTabsType } from '$types';
	import { doctorList } from '$lib/store/doctor';

	export let data: PageData;

	$: ({
		form,
		visit,
		clinicalExams,
		medicalActs,
		surgicalActs,
		cages,
		storeItems,
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
		removeSurgicalActForm,
		updateVisitHospitForm,
		generatedBill,
		removeVisitHospitForm,
		updateVisitTreatmentForm,
		updateVisitItemForm,
		tab,
		doctors
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
	$: updateVisitHospitalisationFormStore.set(updateVisitHospitForm);
	$: cagesList.set(cages);
	$: inventoryItems.set(storeItems);
	$: generatedBill && visitBill.set(generatedBill);
	$: removeVisitHospitalisationFormStore.set(removeVisitHospitForm);
	$: updateVisitTreatmentFormStore.set(updateVisitTreatmentForm);
	$: activeVisitTab.set(tab as VisitTabsType);
	$: updateVisitItemFormStore.set(updateVisitItemForm);
	$: doctorList.set(doctors);
	$: acts = [...visit.clinical_exams, ...visit.surgical_acts, ...visit.medical_acts].map(
		(item) => item.name
	);
</script>

<div class="flex flex-col lg:flex-row lg:pl-5 w-full">
	<TabContainer />
	<div class="w-full lg:w-5/12 flex flex-col lg:pl-5 lg:pr-3 gap-3 lg:pt-10 pb-10">
		<div class="flex flex-col gap-2 lg:gap-5 w-full">
			<VisitPrintables
				report={visit.observations}
				bill={generatedBill}
				doctor={visit.doctor}
				treatment={visit.treatment}
				animal={visit.animal}
				actions={visit.actions}
				{acts}
			/>
			<PaymentTab {bill} />
		</div>
	</div>
</div>
