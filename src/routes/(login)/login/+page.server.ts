import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import type { ConfigurationResponse } from '$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		redirect(303, '/');
	}

	const form = await superValidate(zod(loginSchema));

	let configuration: ConfigurationResponse | undefined;

	try {
		configuration = await locals.pb
			.collection('configuration')
			.getFirstListItem<ConfigurationResponse>('');
	} catch (error) {
		console.error(error);
	}

	return { form, configuration };
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		try {
			await locals.pb.collection('users').authWithPassword(form.data.email, form.data.password);
		} catch (error) {
			console.error({ error });

			form.data.password = '';

			return setError(form, 'Identifiants invalides', { status: 400 });
		}

		redirect(303, '/');
	}
};
