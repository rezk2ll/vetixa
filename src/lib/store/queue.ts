import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { UpdateQueueData } from '$lib/schemas';
import type { Queue } from '$types';

export const updateQueueFormStore = writable<SuperValidated<UpdateQueueData>>();
export const queue = writable<Queue>([]);
