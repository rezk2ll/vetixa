import { writable } from 'svelte/store';
import type { AnimalsResponse } from '$types';
import type { SuperValidated } from 'sveltekit-superforms';
import type { addAnimalSchema, removeSchema, updateAnimalSchema } from '$lib/schemas';
import type { Infer } from 'sveltekit-superforms';

export const animals = writable<AnimalsResponse[]>([]);
export const addAnimalFormStore = writable<SuperValidated<Infer<typeof addAnimalSchema>>>();
export const updateAnimalFormStore = writable<SuperValidated<Infer<typeof updateAnimalSchema>>>();
export const deleteAnimalFormStore = writable<SuperValidated<Infer<typeof removeSchema>>>();
