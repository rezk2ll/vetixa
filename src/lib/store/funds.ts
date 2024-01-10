import type { addFundsSchema } from '$lib/schemas';
import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { Fund } from '../../types';

export const addFundsFormStore = writable<SuperValidated<typeof addFundsSchema>>();
export const addExpenseFormStore = writable<SuperValidated<typeof addFundsSchema>>();
export const fundItems = writable<Fund[]>([]);

