import { type ConfigurationResponse } from '$types';
import { writable } from 'svelte/store';

export const configuration = writable<Partial<ConfigurationResponse>>({
	logo: '/logo.svg'
});
