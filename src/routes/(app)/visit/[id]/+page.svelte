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

	$effect(() => {
		currentVisit.set(visit);
	});
	$effect(() => {
		updateVisitFormStore.set(form);
	});
	$effect(() => {
		addVisitToilettageFormStore.set(addToilettageForm);
	});
	$effect(() => {
		removeVisitItemFormStore.set(removeToilettageForm);
	});
	$effect(() => {
		medicalActsStore.set(medicalActs);
	});
	$effect(() => {
		toilettageActs.set(toilettage);
	});
	$effect(() => {
		surgicalActsStore.set(surgicalActs);
	});
	$effect(() => {
		payVisitFormStore.set(payVisitForm);
	});
	$effect(() => {
		addVisitFileFormStore.set(addFileForm);
	});
	$effect(() => {
		removeVisitFileFormStore.set(removeFileForm);
	});
	$effect(() => {
		updateVisitDiagnosticFormStore.set(updateDiagnosticForm);
	});
	$effect(() => {
		updateVisitActionsFormStore.set(updateActionsForm);
	});
	$effect(() => {
		addVisitStoreItemFormStore.set(addVisitStoreItemForm);
	});
	$effect(() => {
		removeVisitStoreItemFormStore.set(removeVisitStoreItemForm);
	});
	$effect(() => {
		addVisitMedicalActsFormStore.set(addMedicalActsForm);
	});
	$effect(() => {
		removeVisitMedicalActFormStore.set(removeMedicalActForm);
	});
	$effect(() => {
		addVisitSurgicalActsFormStore.set(addSurgicalActsForm);
	});
	$effect(() => {
		removeVisitSurgicalActFormStore.set(removeSurgicalActForm);
	});
	$effect(() => {
		updateVisitHospitalisationFormStore.set(updateVisitHospitForm);
	});
	$effect(() => {
		cagesList.set(cages);
	});
	$effect(() => {
		inventoryItems.set(storeItems);
	});
	$effect(() => {
		generatedBill && visitBill.set(generatedBill);
	});
	$effect(() => {
		removeVisitHospitalisationFormStore.set(removeVisitHospitForm);
	});
	$effect(() => {
		updateVisitTreatmentFormStore.set(updateVisitTreatmentForm);
	});
	$effect(() => {
		activeVisitTab.set(tab as VisitTabsType);
	});
	$effect(() => {
		updateVisitItemFormStore.set(updateVisitItemForm);
	});
	$effect(() => {
		doctorList.set(doctors);
	});
	$effect(() => {
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
