import type { updateQueueSchema } from '$lib/schemas';
import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { Queue } from '$root/types';

export const updateQueueFormStore = writable<SuperValidated<typeof updateQueueSchema>>();
export const queue = writable<Queue>([]);
