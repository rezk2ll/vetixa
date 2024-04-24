import type { visitPageInfo } from '$types';
import { writable } from 'svelte/store';

export const activityPage = writable<visitPageInfo>();
