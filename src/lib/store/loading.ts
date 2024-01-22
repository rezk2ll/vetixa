import { writable } from 'svelte/store';

export const globalLoading = writable<boolean>(false);
