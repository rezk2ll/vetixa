import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { loginSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals.pb.authStore.isValid) {
		throw redirect(303, '/');
	}

	const form = await superValidate(zod(loginSchema));

	return { form };
};

export const actions: Actions = {
	default: async ({ locals, request }) => {
		const form = await superValidate(request, zod(loginSchema));

		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		try {
			await locals.pb.collection('users').authWithPassword(form.data.email, form.data.password);

			throw redirect(303, '/');
		} catch (error) {
			form.data.password = '';

			return setError(form, 'Identifiants invalides', { status: 400 });
		}
	}
};
