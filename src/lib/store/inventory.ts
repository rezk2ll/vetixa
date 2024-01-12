import { writable } from 'svelte/store';
import type { InventoryItemResponse } from '$root/types';

export const inventoryItems = writable<InventoryItemResponse[]>([]);
