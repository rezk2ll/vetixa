import { writable } from 'svelte/store';
import type { addClientSchema, removeSchema, updateClientSchema } from '$lib/schemas';
import type { SuperValidated } from 'sveltekit-superforms';
import type { ClientsPageInfo } from '$types';
import type { Infer } from 'sveltekit-superforms';

export const addClientFormStore = writable<SuperValidated<Infer<typeof addClientSchema>>>();
export const updateClientFormStore = writable<SuperValidated<Infer<typeof updateClientSchema>>>();
export const removeClientFormStore = writable<SuperValidated<Infer<typeof removeSchema>>>();
export const clientsPageInfo = writable<ClientsPageInfo>();
