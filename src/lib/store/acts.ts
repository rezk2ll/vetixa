import { writable } from 'svelte/store';
import {
	type ToilettageResponse,
	type MedicalActsResponse,
	type SurgicalActsResponse
} from '$types';

export const medicalActs = writable<MedicalActsResponse[]>();
export const surgicalActs = writable<SurgicalActsResponse[]>();
export const toilettageActs = writable<ToilettageResponse[]>();
