<script lang="ts">
	import { run } from 'svelte/legacy';

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

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let {
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
	} = $derived(data);

	run(() => {
		currentVisit.set(visit);
	});
	run(() => {
		updateVisitFormStore.set(form);
	});
	run(() => {
		addVisitToilettageFormStore.set(addToilettageForm);
	});
	run(() => {
		removeVisitItemFormStore.set(removeToilettageForm);
	});
	run(() => {
		medicalActsStore.set(medicalActs);
	});
	run(() => {
		toilettageActs.set(toilettage);
	});
	run(() => {
		surgicalActsStore.set(surgicalActs);
	});
	run(() => {
		payVisitFormStore.set(payVisitForm);
	});
	run(() => {
		addVisitFileFormStore.set(addFileForm);
	});
	run(() => {
		removeVisitFileFormStore.set(removeFileForm);
	});
	run(() => {
		updateVisitDiagnosticFormStore.set(updateDiagnosticForm);
	});
	run(() => {
		updateVisitActionsFormStore.set(updateActionsForm);
	});
	run(() => {
		addVisitStoreItemFormStore.set(addVisitStoreItemForm);
	});
	run(() => {
		removeVisitStoreItemFormStore.set(removeVisitStoreItemForm);
	});
	run(() => {
		addVisitMedicalActsFormStore.set(addMedicalActsForm);
	});
	run(() => {
		removeVisitMedicalActFormStore.set(removeMedicalActForm);
	});
	run(() => {
		addVisitSurgicalActsFormStore.set(addSurgicalActsForm);
	});
	run(() => {
		removeVisitSurgicalActFormStore.set(removeSurgicalActForm);
	});
	run(() => {
		updateVisitHospitalisationFormStore.set(updateVisitHospitForm);
	});
	run(() => {
		cagesList.set(cages);
	});
	run(() => {
		inventoryItems.set(storeItems);
	});
	run(() => {
		generatedBill && visitBill.set(generatedBill);
	});
	run(() => {
		removeVisitHospitalisationFormStore.set(removeVisitHospitForm);
	});
	run(() => {
		updateVisitTreatmentFormStore.set(updateVisitTreatmentForm);
	});
	run(() => {
		activeVisitTab.set(tab as VisitTabsType);
	});
	run(() => {
		updateVisitItemFormStore.set(updateVisitItemForm);
	});
	run(() => {
		doctorList.set(doctors);
	});
	run(() => {
		hospitUpdateCompletedStateFormStore.set(updateHospitCompeltedStateForm);
	});
	let acts = $derived(
		[...visit.toilettage, ...visit.surgical_acts, ...visit.medical_acts].map((item) => item.name)
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
