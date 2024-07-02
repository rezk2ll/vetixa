import { writable } from 'svelte/store';
import type { DoctorsResponse } from '../../pocketbase-types';

export const doctorList = writable<DoctorsResponse[]>([]);
