import { writable } from 'svelte/store';
import type { CagesResponse, HospitalisationResponse } from '$types';

export const hospitList = writable<HospitalisationResponse[]>([]);
export const cagesList = writable<CagesResponse[]>([]);
