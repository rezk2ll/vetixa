import type { AgendaResponse } from '$types';
import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { addAgendaEventSchema, updateAgendaEventSchema } from '../schemas';
import type { Infer } from 'sveltekit-superforms';

export const events = writable<AgendaResponse[]>([]);
export const addEventFormStore = writable<SuperValidated<Infer<typeof addAgendaEventSchema>>>();
export const updateEventFormStore =
	writable<SuperValidated<Infer<typeof updateAgendaEventSchema>>>();
