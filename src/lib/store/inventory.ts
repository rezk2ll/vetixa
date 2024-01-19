import { writable } from 'svelte/store';
import type { InventoryItemResponse } from '$root/types';
import type { SuperValidated } from 'sveltekit-superforms';
import type {
	addInventoryItemSchema,
	removeSchema,
	sellInventoryItemSchema,
	updateInventoryItemSchema
} from '$lib/schemas';

export const inventoryItems = writable<InventoryItemResponse[]>([]);
export const addInventoryFormStore = writable<SuperValidated<typeof addInventoryItemSchema>>();
export const updateInventoryFormStore =
	writable<SuperValidated<typeof updateInventoryItemSchema>>();
export const sellInventoryFormStore = writable<SuperValidated<typeof sellInventoryItemSchema>>();
export const removeInventoryFormStore = writable<SuperValidated<typeof removeSchema>>();
