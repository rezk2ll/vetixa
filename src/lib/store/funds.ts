import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { AddFundsData } from '$lib/schemas';
import type { FundsPageInfo } from '$types';

export const addFundsFormStore = writable<SuperValidated<AddFundsData>>();
export const addExpenseFormStore = writable<SuperValidated<AddFundsData>>();
export const fundsPageInfo = writable<FundsPageInfo>();
