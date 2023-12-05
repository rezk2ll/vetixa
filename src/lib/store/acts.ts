import type { SurgicalAct, MedicalAct, ClinicalExams } from '@prisma/client';
import { writable } from 'svelte/store';

export const medicalActs = writable<MedicalAct[]>();
export const surgivalActs = writable<SurgicalAct[]>();
export const clinicalExams = writable<ClinicalExams[]>();
