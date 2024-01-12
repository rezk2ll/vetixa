import { writable } from 'svelte/store';
import type { addClientSchema, removeClientSchema, updateClientSchema } from '$lib/schemas';
import type { SuperValidated } from 'sveltekit-superforms';
import type { ClientsResponseData } from '$root/types';

export const addClientFormStore = writable<SuperValidated<typeof addClientSchema>>();
export const updateClientFormStore = writable<SuperValidated<typeof updateClientSchema>>();
export const removeClientFormStore = writable<SuperValidated<typeof removeClientSchema>>();

export const clients = writable<ClientsResponseData>([]);
