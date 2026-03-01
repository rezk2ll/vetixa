import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type {
	AddVisitData,
	UpdateVisitData,
	PayVisitData,
	AddVisitItemsData,
	RemoveVisitItemData,
	AddVisitFileData,
	RemoveVisitFileData,
	UpdateVisitDiagnosticData,
	UpdateVisitActionsData,
	UpdateVisitTreatmentData,
	UpdateVisitItemData
} from '$lib/schemas/visit';
import type { AnimalVisit, BillInformation, Visit, VisitTabsType } from '$types';

export const visitItems = writable<AnimalVisit[]>([]);
export const vaccinationVisitList = writable<AnimalVisit[]>([]);

export const activeVisitTab = writable<VisitTabsType>('info');
export const currentVisit = writable<Visit>();
export const visitBill = writable<BillInformation>();

export const addVisitFormStore = writable<SuperValidated<AddVisitData>>();
export const updateVisitFormStore = writable<SuperValidated<UpdateVisitData>>();
export const payVisitFormStore = writable<SuperValidated<PayVisitData>>();
export const addVisitToilettageFormStore = writable<SuperValidated<AddVisitItemsData>>();
export const removeVisitItemFormStore = writable<SuperValidated<RemoveVisitItemData>>();
export const addVisitFileFormStore = writable<SuperValidated<AddVisitFileData>>();
export const removeVisitFileFormStore = writable<SuperValidated<RemoveVisitFileData>>();
export const updateVisitDiagnosticFormStore = writable<SuperValidated<UpdateVisitDiagnosticData>>();
export const updateVisitActionsFormStore = writable<SuperValidated<UpdateVisitActionsData>>();
export const addVisitStoreItemFormStore = writable<SuperValidated<AddVisitItemsData>>();
export const removeVisitStoreItemFormStore = writable<SuperValidated<RemoveVisitItemData>>();
export const addVisitMedicalActsFormStore = writable<SuperValidated<AddVisitItemsData>>();
export const removeVisitMedicalActFormStore = writable<SuperValidated<RemoveVisitItemData>>();
export const addVisitSurgicalActsFormStore = writable<SuperValidated<AddVisitItemsData>>();
export const removeVisitSurgicalActFormStore = writable<SuperValidated<RemoveVisitItemData>>();
export const updateVisitTreatmentFormStore = writable<SuperValidated<UpdateVisitTreatmentData>>();
export const updateVisitItemFormStore = writable<SuperValidated<UpdateVisitItemData>>();
