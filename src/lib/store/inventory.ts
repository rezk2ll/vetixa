import { writable } from 'svelte/store';
import type { InventoryItemResponse } from '../../pocketbase-types';

export const inventoryItems = writable<InventoryItemResponse[]>([]);
