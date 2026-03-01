import type { AgendaResponse } from '$types';
import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { AddAgendaEventData, UpdateAgendaEventData } from '$lib/schemas';

export const events = writable<AgendaResponse[]>([]);
export const addEventFormStore = writable<SuperValidated<AddAgendaEventData>>();
export const updateEventFormStore = writable<SuperValidated<UpdateAgendaEventData>>();
