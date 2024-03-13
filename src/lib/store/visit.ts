import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type {
	addVisitItemSchema,
	addVisitSchema,
	payVisitSchema,
	removeVisitItemSchema,
	updateVisitSchema
} from '$lib/schemas/visit';
import type { removeSchema } from '$lib/schemas';
import type { Visit, VisitTabsType } from '$types';

export const visitItems = writable<Visit[]>([]);

export const addVisitFormStore = writable<SuperValidated<typeof addVisitSchema>>();
export const updateVisitFormStore = writable<SuperValidated<typeof updateVisitSchema>>();
export const deleteVisitFormStore = writable<SuperValidated<typeof removeSchema>>();
export const payVisitFormStore = writable<SuperValidated<typeof payVisitSchema>>();
export const addVisitExamFormStore = writable<SuperValidated<typeof addVisitItemSchema>>();
export const removeVisitItemFormStore = writable<SuperValidated<typeof removeVisitItemSchema>>();

export const activeVisitTab = writable<VisitTabsType>('exams');
export const currentVisit = writable<Visit>();
