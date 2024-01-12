import type { AgendaResponse } from '$root/types';
import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { addAgendaEventSchema, removeSchema, updateAgendaEventSchema } from '../schemas';

export const events = writable<AgendaResponse[]>([]);
export const addEventFormStore = writable<SuperValidated<typeof addAgendaEventSchema>>();
export const updateEventFormStore = writable<SuperValidated<typeof updateAgendaEventSchema>>();
export const removeEventFormStore = writable<SuperValidated<typeof removeSchema>>();
