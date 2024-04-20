import type { addFundsSchema } from '$lib/schemas';
import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { Fund } from '$types';
import type { Infer } from 'sveltekit-superforms';

export const addFundsFormStore = writable<SuperValidated<Infer<typeof addFundsSchema>>>();
export const addExpenseFormStore = writable<SuperValidated<Infer<typeof addFundsSchema>>>();
export const fundItems = writable<Fund[]>([]);

