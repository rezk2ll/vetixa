import { writable } from 'svelte/store';
import type { InventoryItemResponse, SalesPageInfo } from '$types';
import type { SuperValidated } from 'sveltekit-superforms';
import type {
	AddInventoryItemData,
	RemoveData,
	SellInventoryItemData,
	UpdateInventoryItemData
} from '$lib/schemas';

export const updatedInventoryItem = writable<InventoryItemResponse>();

export const inventoryItems = writable<InventoryItemResponse[]>([]);
export const addInventoryFormStore = writable<SuperValidated<AddInventoryItemData>>();
export const updateInventoryFormStore = writable<SuperValidated<UpdateInventoryItemData>>();
export const sellInventoryFormStore = writable<SuperValidated<SellInventoryItemData>>();
export const removeInventoryFormStore = writable<SuperValidated<RemoveData>>();
export const inventorySalesPageInfo = writable<SalesPageInfo>();
