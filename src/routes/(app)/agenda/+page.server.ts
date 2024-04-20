import type { AgendaResponse } from '$types';
import { message, superValidate } from 'sveltekit-superforms/server';
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
				return message(form, 'invalid data', { status: 400 });
			}

			await pb.collection('agenda').create(form.data);
		} catch (error) {
			console.error(error);

			return message(form, 'something went wrong', { status: 500 });
		}

		return { form };
	},

	updateEvent: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(updateAgendaEventSchema));

		try {
			if (!form.valid) {
				return message(form, 'invalid data', { status: 400 });
			}

			await pb.collection('agenda').update(form.data.id, form.data);
		} catch (error) {
			console.error(error);

			return message(form, 'something went wrong', { status: 500 });
		}

		return { form };
	},

	removeEvent: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(removeSchema));

		try {
			if (!form.valid) {
				return message(form, 'invalid data', { status: 400 });
			}

			await pb.collection('agenda').delete(form.data.id);
		} catch (error) {
			console.error(error);

			return message(form, 'something went wrong', { status: 500 });
		}

		return { form };
	}
};
