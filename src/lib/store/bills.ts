import { writable } from 'svelte/store';
import type { BillsResponse } from '$types';

export const clientBills = writable<BillsResponse[]>([]);
