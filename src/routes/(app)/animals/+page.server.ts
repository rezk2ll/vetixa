import { removeAnimalSchema, updateAnimalSchema } from '$lib/schemas';
import { superValidate, message } from 'sveltekit-superforms/server';
import type { AnimalsResponse } from '../../../pocketbase-types';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const animals = await locals.pb
		.collection('animals')
		.getFullList<AnimalsResponse>({ sort: '-created' });

	const removeForm = await superValidate(removeAnimalSchema, { id: 'remove-animal' });
	const updateForm = await superValidate(updateAnimalSchema, { id: 'update-animal' });

	return { animals, removeForm, updateForm };
};

export const actions: Actions = {
	removeAnimal: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, removeAnimalSchema, { id: 'remove-animal' });
		try {
			if (!form.valid) {
				return message(form, 'Failed to delete animal');
			}

			await pb.collection('animals').delete(form.data.id);
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to delete animal');
		}

		return { form };
	},

	updateAnimal: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, updateAnimalSchema, { id: 'update-animal' });

		try {
			if (!form.valid) {
				return message(form, 'Failed to update animal');
			}

			await pb.collection('animals').update(form.data.id, form.data);
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to update animal');
		}

		return { form };
	}
};
