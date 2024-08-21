import { writable } from 'svelte/store';

export const isPhoneVisible = writable<boolean>(false);

export const visitsImageVisible = writable<boolean>(false);
export const visitsTextVisible = writable<boolean>(false);

export const agendaImageVisible = writable<boolean>(false);
export const agendaTextVisible = writable<boolean>(false);

export const stockImageVisible = writable<boolean>(false);
export const stockTextVisible = writable<boolean>(false);

export const caisseImageVisible = writable<boolean>(false);
export const caisseTextVisible = writable<boolean>(false);

export const hospitImageVisible = writable<boolean>(false);
export const hospitTextVisible = writable<boolean>(false);

export const animalsImageVisible = writable<boolean>(false);
export const animalsTextVisible = writable<boolean>(false);

export const contactTextVisible = writable<boolean>(false);
export const contactContainerVisible = writable<boolean>(false);

export const managementTextVisible = writable<boolean>(false);
export const managementImageVisible = writable<boolean>(false);
