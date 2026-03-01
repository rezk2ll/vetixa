import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { AddClientData, RemoveData, UpdateClientData } from '$lib/schemas';
import type { ClientsPageInfo, IClient } from '$types';

export const currentClient = writable<IClient>();
export const addClientFormStore = writable<SuperValidated<AddClientData>>();
export const updateClientFormStore = writable<SuperValidated<UpdateClientData>>();
export const removeClientFormStore = writable<SuperValidated<RemoveData>>();
export const clientsPageInfo = writable<ClientsPageInfo>();
