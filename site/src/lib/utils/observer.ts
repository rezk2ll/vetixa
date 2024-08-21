import { browser } from '$app/environment';
import type { Writable } from 'svelte/store';

export const isIntersecting = (store: Writable<boolean>): IntersectionObserver | undefined => {
	if (!browser) return;

	return new IntersectionObserver(
		([entry]) => {
			store.set(entry.isIntersecting && entry.intersectionRatio >= 0.5);
		},
		{ root: null, threshold: 0.5 }
	);
};
