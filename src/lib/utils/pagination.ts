import { goto } from '$app/navigation';
import { browser } from '$app/environment';

/**
 * Get the current URL in the browser, or empty string during SSR.
 */
export const getCurrentUrl = (): string => (browser ? document.location.href : '');

/**
 * Navigate to the next page using URL search params.
 */
export const nextPage = (currentPage: number, totalPages: number): void => {
	if (currentPage >= totalPages) return;
	const url = new URL(getCurrentUrl());
	url.searchParams.set('page', `${currentPage + 1}`);
	goto(url);
};

/**
 * Navigate to the previous page using URL search params.
 */
export const previousPage = (currentPage: number): void => {
	if (currentPage <= 1) return;
	const url = new URL(getCurrentUrl());
	url.searchParams.set('page', `${currentPage - 1}`);
	goto(url);
};

/**
 * Dispatch a search query via URL search params, resetting to page 1.
 */
export const dispatchSearch = (query: string): void => {
	const url = new URL(getCurrentUrl());
	url.searchParams.set('query', query);
	url.searchParams.delete('page');
	goto(url);
};

/**
 * Change the active filter tab via URL search params, resetting to page 1.
 */
export const changeTab = (tab: string): void => {
	const url = new URL(getCurrentUrl());
	url.searchParams.delete('page');

	if (tab === 'all') {
		url.searchParams.delete('filter');
	} else {
		url.searchParams.set('filter', tab);
	}

	goto(url);
};
