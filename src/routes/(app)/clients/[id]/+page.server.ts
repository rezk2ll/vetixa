import { redirect, type Redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { AnimalsResponse, ClientsResponse } from '$types';
import { setError, superValidate } from 'sveltekit-superforms/server';
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

	let client;

	try {
		client = await pb.collection('clients').getOne(id, { expand: 'animals(client)' });
	} catch (error) {
		if (!client) {
			throw redirect(301, '/404');
		}
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
				return setError(form, 'Données invalides', { status: 400 });
			}

			const client = await pb.collection('clients').getOne<ClientsResponse>(id);

			if (!client || !client.id) {
				return setError(form, 'Client introuvable', { status: 404 });
			}

			const animal = await pb.collection('animals').create({
				...form.data,
				client: id
			});

			if (!animal || !animal.id) {
				return setError(form, "Échec de l'ajout de l'animal", { status: 500 });
			}

			throw redirect(303, `/animals/${animal.id}/?new=true`);
		} catch (error) {
			if ((error as Redirect).location) {
				throw error;
			}
			console.error(error);

			return setError(form, "Échec de l'ajout de l'animal", { status: 500 });
		}
	},

	removeAnimal: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(removeSchema), { id: 'remove-animal' });
		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id } = form.data;

			const animal = await pb.collection('animals').getOne(id);

			if (!animal || !animal.id) {
				return setError(form, 'Animal introuvable', { status: 404 });
			}

			await pb.collection('animals').delete(id);

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, "Échec de la suppression de l'animal", { status: 500 });
		}
	},

	updateAnimal: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(updateAnimalSchema), { id: 'update-animal' });

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id } = form.data;
			const animal = await pb.collection('animals').getOne(id);

			if (!animal || !animal.id) {
				return setError(form, 'Animal introuvable', { status: 404 });
			}

			await pb.collection('animals').update(id, form.data);

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, "Échec de la mise à jour de l'animal", { status: 500 });
		}
	},

	updateClient: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(updateClientSchema), { id: 'update-client' });

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id } = form.data;
			const client = await pb.collection('clients').getOne(id);

			if (!client || !client.id) {
				return setError(form, 'Client introuvable', { status: 404 });
			}

			await pb.collection('clients').update(form.data.id, form.data);

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la mise à jour du client', { status: 500 });
		}
	}
};
