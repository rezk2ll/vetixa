import { writable } from 'svelte/store';

// Hero
export const isPhoneVisible = writable<boolean>(false);

// visits card
export const visitsImageVisible = writable<boolean>(false);
export const visitsTextVisible = writable<boolean>(false);

// agenda card
export const agendaImageVisible = writable<boolean>(false);
export const agendaTextVisible = writable<boolean>(false);

// stock card
export const stockImageVisible = writable<boolean>(false);
export const stockTextVisible = writable<boolean>(false);

// caisse card
export const caisseImageVisible = writable<boolean>(false);
export const caisseTextVisible = writable<boolean>(false);

// hospit card
export const hospitImageVisible = writable<boolean>(false);
export const hospitTextVisible = writable<boolean>(false);

// animals and clients
export const animalsImageVisible = writable<boolean>(false);
export const animalsTextVisible = writable<boolean>(false);

// contacts
export const contactTextVisible = writable<boolean>(false);
export const contactContainerVisible = writable<boolean>(false);
