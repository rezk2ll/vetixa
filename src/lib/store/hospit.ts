import { writable } from 'svelte/store';
import type { HospitPageInfo, CagesResponse, HospitalisationResponse, CageItem } from '$types';
import type { removeSchema } from '$lib/schemas';
import type { updateVisitHospitalisationSchema } from '$lib/schemas/visit';
import type { SuperValidated, Infer } from 'sveltekit-superforms';
import type {
	changeHospitColorsSchema,
	updateHospitCompletedStateSchema
} from '$lib/schemas/hospit';

export const hospitList = writable<HospitalisationResponse[]>([]);
export const cagesList = writable<CagesResponse[]>([]);
export const cagesInfo = writable<CageItem[]>([]);

export const updateVisitHospitalisationFormStore =
	writable<SuperValidated<Infer<typeof updateVisitHospitalisationSchema>>>();
export const removeVisitHospitalisationFormStore =
	writable<SuperValidated<Infer<typeof removeSchema>>>();
export const hospitPageInfo = writable<HospitPageInfo>();
export const hospitChangeColorFormStore =
	writable<SuperValidated<Infer<typeof changeHospitColorsSchema>>>();
export const hospitUpdateCompletedStateFormStore =
	writable<SuperValidated<Infer<typeof updateHospitCompletedStateSchema>>>();
