import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { addVisitSchema, payVisitSchema, updateVisitSchema } from '../schemas/visit';
import type { removeSchema } from '../schemas';
import type { Visit, VisitTabsType } from '$types';

export const visitItems = writable<Visit[]>([]);
export const addVisitFormStore = writable<SuperValidated<typeof addVisitSchema>>();
export const updateVisitFormStore = writable<SuperValidated<typeof updateVisitSchema>>();
export const deleteVisitFormStore = writable<SuperValidated<typeof removeSchema>>();
export const payVisitFormStore = writable<SuperValidated<typeof payVisitSchema>>();
export const activeVisitTab = writable<VisitTabsType>('exams');
