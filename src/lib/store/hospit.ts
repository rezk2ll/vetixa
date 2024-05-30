import { writable } from 'svelte/store';
import type { HospitPageInfo, CagesResponse, HospitalisationResponse } from '$types';
import type { removeSchema } from '$lib/schemas';
import type { updateVisitHospitalisationSchema } from '$lib/schemas/visit';
import type { SuperValidated, Infer } from 'sveltekit-superforms';

export const hospitList = writable<HospitalisationResponse[]>([]);
export const cagesList = writable<CagesResponse[]>([]);
export const updateVisitHospitalisationFormStore =
	writable<SuperValidated<Infer<typeof updateVisitHospitalisationSchema>>>();
export const removeVisitHospitalisationFormStore =
	writable<SuperValidated<Infer<typeof removeSchema>>>();
export const hospitPageInfo = writable<HospitPageInfo>();
