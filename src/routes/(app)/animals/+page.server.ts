import { removeSchema, updateAnimalSchema } from '$lib/schemas';
import { superValidate, message } from 'sveltekit-superforms/server';
import type { AnimalsResponse, ClientsResponse } from '$types';
import type { Actions, PageServerLoad } from './$types';
import type { RecordModel } from 'pocketbase';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ locals }) => {
	const animalsList = await locals.pb
		.collection('animals')
		.getFullList<AnimalsResponse>({ sort: '-created', expand: 'client' });

	const animals = animalsList.map((animal) => ({
		...animal,
		client: ((animal.expand as RecordModel).client as ClientsResponse).name || ''
	}));

	const removeForm = await superValidate(zod(removeSchema), { id: 'remove-animal' });
	const updateForm = await superValidate(zod(updateAnimalSchema), { id: 'update-animal' });

	console.log('returning', removeForm, updateForm)

	return { animals, removeForm, updateForm };
};

export const actions: Actions = {
	removeAnimal: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(removeSchema), { id: 'remove-animal' });
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
		const form = await superValidate(request, zod(updateAnimalSchema), { id: 'update-animal' });

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
