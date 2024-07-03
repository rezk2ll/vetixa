import { writable } from 'svelte/store';
import type { ClientBill } from '$types';

export const clientBills = writable<ClientBill[]>([]);
