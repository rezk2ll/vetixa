import type { SearchResultInfo } from '$types';
import { writable } from 'svelte/store';

export const searchOpen = writable<boolean>(false);
export const searchPage = writable<SearchResultInfo>();
