import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { AnimalsResponse, ClientsResponse } from '../../../../pocketbase-types';
import { message, superValidate } from 'sveltekit-superforms/server';
import { addAnimalSchema, removeAnimalSchema, updateAnimalSchema } from '$lib/schemas';

export const load: PageServerLoad = async ({ params, locals: { pb } }) => {
	const { id } = params;

	const addForm = superValidate(addAnimalSchema, { id: 'add-animal' });
	const updateForm = superValidate(updateAnimalSchema, { id: 'update-animal' });
	const removeForm = superValidate(removeAnimalSchema, { id: 'remove-animal' });

	const client = await pb.collection('clients').getOne(id, { expand: 'animals(client)' });

	if (!client) {
		throw redirect(301, '/404');
	}

	const animals: AnimalsResponse[] = client.expand?.['animals(client)'] || [];

	return {
		client: {
			...(client as ClientsResponse),
			animals
		},
		addForm,
		updateForm,
		removeForm
	};
};

export const actions: Actions = {
	addAnimal: async ({ request, params, locals: { pb } }) => {
		const { id } = params;

		const form = await superValidate(request, addAnimalSchema, { id: 'add-animal' });

		try {
			if (!form.valid) {
				console.log(form.errors);
				return message(form, 'invalid data');
			}

			const client = await pb.collection('clients').getOne<ClientsResponse>(id);

			if (!client) {
				return fail(400, { message: 'not found ' });
			}

			const animal = await pb.collection('animals').create({
				...form.data,
				client: id
			});

			if (!animal) {
				return fail(400, { message: 'error' });
			}
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to add animal');
		}

		return { form };
	},

	removeAnimal: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, removeAnimalSchema, { id: 'remove-animal' });
		try {
			if (!form.valid) {
				return message(form, 'Failed to delete animal');
			}

			await pb.collection('animals').delete(form.data.id);
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Failed to delete animal' });
		}

		return { form }
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
