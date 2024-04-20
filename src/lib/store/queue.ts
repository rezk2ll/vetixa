import type { updateQueueSchema } from '$lib/schemas';
import { writable } from 'svelte/store';
import type { SuperValidated } from 'sveltekit-superforms';
import type { Queue } from '$types';
import type { Infer } from 'sveltekit-superforms';

export const updateQueueFormStore = writable<SuperValidated<Infer<typeof updateQueueSchema>>>();
export const queue = writable<Queue>([]);
