import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type {
	addVisitFileSchema,
	addVisitItemsSchema,
	addVisitSchema,
	payVisitSchema,
	removeVisitFileSchema,
	removeVisitItemSchema,
	updateVisitSchema,
	updateVisitDiagnosticSchema,
	updateVisitActionsSchema,
	updateVisitTreatmentSchema,
	updateVisitItemSchema
} from '$lib/schemas/visit';
import type { AnimalVisit, BillInformation, Visit, VisitTabsType } from '$types';
import type { Infer } from 'sveltekit-superforms';

export const visitItems = writable<AnimalVisit[]>([]);
export const vaccinationVisitList = writable<AnimalVisit[]>([]);

export const activeVisitTab = writable<VisitTabsType>('info');
export const currentVisit = writable<Visit>();
export const visitBill = writable<BillInformation>();

export const addVisitFormStore = writable<SuperValidated<Infer<typeof addVisitSchema>>>();
export const updateVisitFormStore = writable<SuperValidated<Infer<typeof updateVisitSchema>>>();
export const payVisitFormStore = writable<SuperValidated<Infer<typeof payVisitSchema>>>();
export const addVisitExamFormStore = writable<SuperValidated<Infer<typeof addVisitItemsSchema>>>();
export const removeVisitItemFormStore =
	writable<SuperValidated<Infer<typeof removeVisitItemSchema>>>();
export const addVisitFileFormStore = writable<SuperValidated<Infer<typeof addVisitFileSchema>>>();
export const removeVisitFileFormStore =
	writable<SuperValidated<Infer<typeof removeVisitFileSchema>>>();
export const updateVisitDiagnosticFormStore =
	writable<SuperValidated<Infer<typeof updateVisitDiagnosticSchema>>>();
export const updateVisitActionsFormStore =
	writable<SuperValidated<Infer<typeof updateVisitActionsSchema>>>();
export const addVisitStoreItemFormStore =
	writable<SuperValidated<Infer<typeof addVisitItemsSchema>>>();
export const removeVisitStoreItemFormStore =
	writable<SuperValidated<Infer<typeof removeVisitItemSchema>>>();
export const addVisitMedicalActsFormStore =
	writable<SuperValidated<Infer<typeof addVisitItemsSchema>>>();
export const removeVisitMedicalActFormStore =
	writable<SuperValidated<Infer<typeof removeVisitItemSchema>>>();
export const addVisitSurgicalActsFormStore =
	writable<SuperValidated<Infer<typeof addVisitItemsSchema>>>();
export const removeVisitSurgicalActFormStore =
	writable<SuperValidated<Infer<typeof removeVisitItemSchema>>>();
export const updateVisitTreatmentFormStore =
	writable<SuperValidated<Infer<typeof updateVisitTreatmentSchema>>>();
export const updateVisitItemFormStore =
	writable<SuperValidated<Infer<typeof updateVisitItemSchema>>>();
