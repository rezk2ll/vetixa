import { writable } from 'svelte/store';
import type { AnimalsPageInfo, AnimalsResponse } from '$types';
import type { SuperValidated } from 'sveltekit-superforms';
import type { AddAnimalData, RemoveData, UpdateAnimalData } from '$lib/schemas';

export const currentAnimal = writable<AnimalsResponse>();
export const animals = writable<AnimalsResponse[]>([]);
export const addAnimalFormStore = writable<SuperValidated<AddAnimalData>>();
export const updateAnimalFormStore = writable<SuperValidated<UpdateAnimalData>>();
export const deleteAnimalFormStore = writable<SuperValidated<RemoveData>>();
export const animalsPageInfo = writable<AnimalsPageInfo>();
