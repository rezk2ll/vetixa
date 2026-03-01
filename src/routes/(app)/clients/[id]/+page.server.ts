import { error, redirect } from '@sveltejs/kit';
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
	} catch (e) {
		if (e && typeof e === 'object' && 'status' in e && e.status === 404) {
			redirect(301, '/404');
		}

		throw error(500, 'Erreur lors du chargement du client');
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

		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		let animal;
		try {
			await pb.collection('clients').getOne<ClientsResponse>(id);

			animal = await pb.collection('animals').create({
				...form.data,
				client: id
			});
		} catch (error) {
			console.error(error);

			return setError(form, "Échec de l'ajout de l'animal", { status: 500 });
		}

		redirect(303, `/animals/${animal.id}/?new=true`);
	},

	removeAnimal: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(removeSchema), { id: 'remove-animal' });
		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id } = form.data;

			await pb.collection('animals').getOne(id);
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
			await pb.collection('animals').getOne(id);
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
			await pb.collection('clients').getOne(id);
			await pb.collection('clients').update(form.data.id, form.data);

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la mise à jour du client', { status: 500 });
		}
	}
};
