import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { AnimalsResponse, ClientsResponse } from '../../../../pocketbase-types';

export const load: PageServerLoad = async ({ params, locals: { pb } }) => {
	const { id } = params;

	const client = await pb.collection('clients').getOne(id, { expand: 'animals(client)' });

	if (!client) {
		redirect(301, '/404');
	}

	const animals: AnimalsResponse[] = client.expand?.['animals(client)'] || [];

	return {
		client: {
			...(client as ClientsResponse),
			animals
		}
	};
};

export const actions: Actions = {
	addAnimal: async ({ request, params, locals: { pb } }) => {
		const { id } = params;
		const data = await request.formData();
		const birthday = data.get('birthday') as string;
		const name = data.get('name') as string;
		const sex = data.get('sex') as string;
		const type = data.get('type') as string;
		const weight = data.get('weight') as string;

		const client = await pb.collection('clients').getOne<ClientsResponse>(id);

		if (!client) {
			return fail(400, { message: 'not found ' });
		}

		const animal = await pb.collection('animals').create({
			client: id,
			birthday,
			name,
			sex,
			type,
			weight
		});

		if (!animal) {
			return fail(400, { message: 'error' });
		}

		return { success: true };
	},

	removeAnimal: async ({ request, locals: { pb } }) => {
		try {
			const data = await request.formData();
			const id = data.get('id') as string;

			await pb.collection('animals').delete(id);
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Failed to delete animal' });
		}
	}
};
