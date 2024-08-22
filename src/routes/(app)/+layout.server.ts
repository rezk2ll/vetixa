import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { type ConfigurationResponse } from '$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals.user) {
		throw redirect(303, '/login');
	}

	let configuration: ConfigurationResponse | undefined;
	let logo = '/logo.png';

	try {
		configuration = await locals.pb
			.collection('configuration')
			.getFirstListItem<ConfigurationResponse>('');
		if (configuration && configuration.logo) {
			logo = locals.pb.files.getUrl(configuration, configuration.logo);
		}
	} catch (error) {
		console.error(error);
	}

	return {
		config: {
			...configuration,
			logo
		}
	};
};
