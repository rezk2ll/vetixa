import { writable } from 'svelte/store';
import type { HospitPageInfo, CagesResponse, HospitalisationResponse, CageItem } from '$types';
import type { RemoveData } from '$lib/schemas';
import type { UpdateVisitHospitalisationData } from '$lib/schemas/visit';
import type { SuperValidated } from 'sveltekit-superforms';
import type { ChangeHospitColorsData, UpdateHospitCompletedStateData } from '$lib/schemas/hospit';

export const hospitList = writable<HospitalisationResponse[]>([]);
export const cagesList = writable<CagesResponse[]>([]);
export const cagesInfo = writable<CageItem[]>([]);

export const updateVisitHospitalisationFormStore =
	writable<SuperValidated<UpdateVisitHospitalisationData>>();
export const removeVisitHospitalisationFormStore = writable<SuperValidated<RemoveData>>();
export const hospitPageInfo = writable<HospitPageInfo>();
export const hospitChangeColorFormStore = writable<SuperValidated<ChangeHospitColorsData>>();
export const hospitUpdateCompletedStateFormStore =
	writable<SuperValidated<UpdateHospitCompletedStateData>>();
