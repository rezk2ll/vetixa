import { writable } from 'svelte/store';
import type { AnimalsResponse } from '$root/types';
import type { SuperValidated } from 'sveltekit-superforms';
import type { addAnimalSchema, removeSchema, updateAnimalSchema } from '$lib/schemas';

export const animals = writable<AnimalsResponse[]>([]);
export const addAnimalFormStore = writable<SuperValidated<typeof addAnimalSchema>>();
export const updateAnimalFormStore = writable<SuperValidated<typeof updateAnimalSchema>>();
export const deleteAnimalFormStore = writable<SuperValidated<typeof removeSchema>>();
