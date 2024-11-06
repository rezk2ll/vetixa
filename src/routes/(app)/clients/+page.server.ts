import type { Actions, PageServerLoad } from './$types';
import type { ClientsPageInfo, ClientsResponse } from '$types';
import type { RecordModel } from 'pocketbase';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { addClientSchema, removeSchema, updateClientSchema } from '$lib/schemas';
import { redirect, type Redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ locals: { pb }, url: { searchParams } }) => {
	const shortCut = !!searchParams.get('shortcut');
	const page = parseInt(searchParams.get('page') || '1');
	const query = searchParams.get('query') || '';

	const addForm = await superValidate(zod(addClientSchema), { id: 'add-client' });
	const updateForm = await superValidate(zod(updateClientSchema), { id: 'update-client' });
	const deleteForm = await superValidate(zod(removeSchema), { id: 'delete-client' });

	const clientsPage = await pb.collection('clients').getList<ClientsResponse>(page, 10, {
		expand: 'animals(client)',
		filter: `name ~ "${query}" || tel ~ "${query}" || address ~ "${query}" || email ~ "${query}"`,
		sort: '-created'
	});

	const items = clientsPage.items.map((client) => ({
		...client,
		animals: (client.expand as RecordModel['expand'])?.['animals(client)'] || []
	}));

	return {
		addForm,
		updateForm,
		deleteForm,
		shortCut,
		pageInfo: {
			...clientsPage,
			items,
			query
		} satisfies ClientsPageInfo
	};
};

export const actions: Actions = {
	addClient: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(addClientSchema), { id: 'add-client' });
		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { firstname, lastname } = form.data;

			const client = await pb.collection('clients').create({
				...form.data,
				name: `${firstname} ${lastname}`
			});

			if (!client || !client.id) {
				throw new Error('Failed to create client');
			}

			throw redirect(303, `/clients/${client.id}/?new=true`);
		} catch (error) {
			if ((error as Redirect).location) {
				throw error;
			}
			console.error(error);

			return setError(form, "Échec de l'ajout du client", { status: 500 });
		}
	},

	removeClient: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(removeSchema), { id: 'delete-client' });
		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id } = form.data;

			const client = await pb.collection('clients').getOne(id);

			if (!client || !client.id) {
				return setError(form, 'Client introuvable', { status: 404 });
			}

			if (client.animals && client.animals.length > 0) {
				return setError(form, 'Client has animals assigned', { status: 400 });
			}

			await pb.collection('clients').delete(id);

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la suppression du client', { status: 500 });
		}
	},

	updateClient: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(updateClientSchema), { id: 'update-client' });

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { firstname, lastname, id } = form.data;

			const client = await pb.collection('clients').getOne(id);

			if (!client || !client.id) {
				return setError(form, 'Client introuvable', { status: 404 });
			}

			await pb.collection('clients').update(id, {
				...form.data,
				name: `${firstname} ${lastname}`
			});

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la mise à jour du client');
		}
	}
};
