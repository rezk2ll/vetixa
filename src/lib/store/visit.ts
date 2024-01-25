import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { addVisitSchema, updateVisitSchema } from '../schemas/visit';
import type { removeSchema } from '../schemas';

export const addVisitFormStore = writable<SuperValidated<typeof addVisitSchema>>();
export const updateVisitFormStore = writable<SuperValidated<typeof updateVisitSchema>>();
export const deleteVisitFormStore = writable<SuperValidated<typeof removeSchema>>();