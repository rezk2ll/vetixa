import { writable } from 'svelte/store';
import type { InventoryItemResponse, SalesPageInfo } from '$types';
import type { SuperValidated } from 'sveltekit-superforms';
import type {
	addInventoryItemSchema,
	removeSchema,
	sellInventoryItemSchema,
	updateInventoryItemSchema
} from '$lib/schemas';
import type { Infer } from 'sveltekit-superforms';

export const updatedInventoryItem = writable<InventoryItemResponse>();

export const inventoryItems = writable<InventoryItemResponse[]>([]);
export const addInventoryFormStore =
	writable<SuperValidated<Infer<typeof addInventoryItemSchema>>>();
export const updateInventoryFormStore =
	writable<SuperValidated<Infer<typeof updateInventoryItemSchema>>>();
export const sellInventoryFormStore =
	writable<SuperValidated<Infer<typeof sellInventoryItemSchema>>>();
export const removeInventoryFormStore = writable<SuperValidated<Infer<typeof removeSchema>>>();
export const inventorySalesPageInfo = writable<SalesPageInfo>();
