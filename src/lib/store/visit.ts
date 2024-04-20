import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type {
	addVisitFileSchema,
	addVisitItemsSchema,
	addVisitSchema,
	payVisitSchema,
	removeVisitFileSchema,
	removeVisitItemSchema,
	updateVisitSchema
} from '$lib/schemas/visit';
import type { removeSchema } from '$lib/schemas';
import type { Visit, VisitTabsType } from '$types';
import type { Infer } from 'sveltekit-superforms';

export const visitItems = writable<Visit[]>([]);

export const addVisitFormStore = writable<SuperValidated<Infer<typeof addVisitSchema>>>();
export const updateVisitFormStore = writable<SuperValidated<Infer<typeof updateVisitSchema>>>();
export const deleteVisitFormStore = writable<SuperValidated<Infer<typeof removeSchema>>>();
export const payVisitFormStore = writable<SuperValidated<Infer<typeof payVisitSchema>>>();
export const addVisitExamFormStore = writable<SuperValidated<Infer<typeof addVisitItemsSchema>>>();
export const removeVisitItemFormStore =
	writable<SuperValidated<Infer<typeof removeVisitItemSchema>>>();
export const addVisitFileFormStore = writable<SuperValidated<Infer<typeof addVisitFileSchema>>>();
export const removeVisitFileFormStore =
	writable<SuperValidated<Infer<typeof removeVisitFileSchema>>>();

export const activeVisitTab = writable<VisitTabsType>('exams');
export const currentVisit = writable<Visit>();
