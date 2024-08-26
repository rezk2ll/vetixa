import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { type ConfigurationResponse } from '$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	let configuration: ConfigurationResponse | undefined;

	try {
		configuration = await locals.pb
			.collection('configuration')
			.getFirstListItem<ConfigurationResponse>('');
	} catch (error) {
		console.error(error);
	}

	return {
		configuration
	};
};
