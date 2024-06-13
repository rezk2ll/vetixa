import { writable } from 'svelte/store';
import type { ClinicalExamsResponse, MedicalActsResponse, SurgicalActsResponse } from '$types';

export const medicalActs = writable<MedicalActsResponse[]>();
export const surgicalActs = writable<SurgicalActsResponse[]>();
export const clinicalExams = writable<ClinicalExamsResponse[]>();
