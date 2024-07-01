import { fail, redirect, type Redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { AnimalsResponse, ClientsResponse } from '$types';
import { message, superValidate } from 'sveltekit-superforms/server';
import {
	addAnimalSchema,
	removeSchema,
	updateAnimalSchema,
	updateClientSchema
} from '$lib/schemas';
import { zod } from 'sveltekit-superforms/adapters';
import ClientService from '$lib/services/client';

export const load: PageServerLoad = async ({ params, locals: { pb }, url }) => {
	const { id } = params;

	const isNew = url.searchParams.get('new') === 'true';
	const form = await superValidate(zod(updateClientSchema), { id: 'update-client' });
	const addForm = await superValidate(zod(addAnimalSchema), { id: 'add-animal' });
	const updateForm = await superValidate(zod(updateAnimalSchema), { id: 'update-animal' });
	const removeForm = await superValidate(zod(removeSchema), { id: 'remove-animal' });

	const client = await pb.collection('clients').getOne(id, { expand: 'animals(client)' });

	if (!client) {
		throw redirect(301, '/404');
	}

	const clientService = new ClientService(pb);
	const bills = await clientService.getClientBills(id);

	const animals: AnimalsResponse[] = client.expand?.['animals(client)'] || [];

	return {
		client: {
			...(client as ClientsResponse),
			animals
		},
		form,
		addForm,
		updateForm,
		removeForm,
		isNew,
		bills
	};
};

export const actions: Actions = {
	addAnimal: async ({ request, params, locals: { pb } }) => {
		const { id } = params;

		const form = await superValidate(request, zod(addAnimalSchema), { id: 'add-animal' });

		try {
			if (!form.valid) {
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

			throw redirect(303, `/animals/${animal.id}/?new=true`);
		} catch (error) {
			if ((error as Redirect).location) {
				throw error;
			}
			console.error(error);
			return message(form, 'Failed to add animal');
		}
	},

	removeAnimal: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(removeSchema), { id: 'remove-animal' });
		try {
			if (!form.valid) {
				return message(form, 'Failed to delete animal');
			}

			await pb.collection('animals').delete(form.data.id);
		} catch (error) {
			console.error(error);
			return fail(500, { message: 'Failed to delete animal' });
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
	},

	updateClient: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(updateClientSchema), { id: 'update-client' });

		try {
			if (!form.valid) {
				return message(form, 'Failed to update client');
			}

			await pb.collection('clients').update(form.data.id, form.data);
		} catch (error) {
			console.error(error);

			return message(form, 'Failed to update client');
		}

		return { form };
	}
};
