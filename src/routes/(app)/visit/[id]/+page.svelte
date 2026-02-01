<script lang="ts">
	import PaymentTab from '$components/tabs/visit/PaymentTab.svelte';
	import TabContainer from '$components/tabs/visit/VisitTabContainer.svelte';
	import {
		activeVisitTab,
		addVisitFileFormStore,
		addVisitMedicalActsFormStore,
		addVisitStoreItemFormStore,
		addVisitSurgicalActsFormStore,
		addVisitToilettageFormStore,
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
		medicalActs as medicalActsStore,
		surgicalActs as surgicalActsStore,
		toilettageActs
	} from '$store/acts';
	import {
		cagesList,
		hospitUpdateCompletedStateFormStore,
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
		toilettage,
		medicalActs,
		surgicalActs,
		cages,
		storeItems,
		bill,
		addToilettageForm,
		removeToilettageForm,
		addFileForm,
		removeFileForm,
		payVisitForm,
		updateDiagnosticForm,
		updateActionsForm,
		addVisitStoreItemForm,
		removeVisitStoreItemForm,
		addMedicalActsForm,
		removeMedicalActForm,
		addSurgicalActsForm,
		removeSurgicalActForm,
		updateVisitHospitForm,
		generatedBill,
		removeVisitHospitForm,
		updateVisitTreatmentForm,
		updateVisitItemForm,
		tab,
		doctors,
		updateHospitCompeltedStateForm
	} = data);

	$: currentVisit.set(visit);
	$: updateVisitFormStore.set(form);
	$: addVisitToilettageFormStore.set(addToilettageForm);
	$: removeVisitItemFormStore.set(removeToilettageForm);
	$: medicalActsStore.set(medicalActs);
	$: toilettageActs.set(toilettage);
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
	$: addVisitSurgicalActsFormStore.set(addSurgicalActsForm);
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
	$: hospitUpdateCompletedStateFormStore.set(updateHospitCompeltedStateForm);
	$: acts = [...visit.toilettage, ...visit.surgical_acts, ...visit.medical_acts].map(
		(item) => item.name
	);
</script>

<div class="flex flex-col lg:flex-row lg:pl-5 w-full lg:overflow-x-auto">
	<TabContainer />
	<div class="w-full flex flex-col lg:pl-5 lg:pr-3 gap-3 lg:pt-10 pb-10 lg:min-w-[425px]">
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
