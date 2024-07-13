import type { AgendaResponse } from '$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { addAgendaEventSchema, removeSchema, updateAgendaEventSchema } from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async ({ locals: { pb } }) => {
	const addForm = await superValidate(zod(addAgendaEventSchema), { id: 'add-event' });
	const updateForm = await superValidate(zod(updateAgendaEventSchema), { id: 'update-event' });
	const removeForm = await superValidate(zod(removeSchema), { id: 'remove-event' });

	const events = await pb.collection('agenda').getFullList<AgendaResponse>();

	return { events, addForm, updateForm, removeForm };
}) satisfies PageServerLoad;

export const actions: Actions = {
	addEvent: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(addAgendaEventSchema));

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides');
			}

			await pb.collection('agenda').create(form.data);

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, "échec de la création de l'événement", { status: 500 });
		}
	},

	updateEvent: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(updateAgendaEventSchema));

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides');
			}

			await pb.collection('agenda').update(form.data.id, form.data);

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, "échec de la mise à jour de l'événement", { status: 500 });
		}
	},

	removeEvent: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(removeSchema));

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides');
			}

			await pb.collection('agenda').delete(form.data.id);

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, "échec de la suppression de l'événement", { status: 500 });
		}
	}
};
