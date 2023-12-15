import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type { ClientsResponse } from '../../../pocketbase-types';
import type { RecordModel } from 'pocketbase';

export const load: PageServerLoad = async ({ locals: { pb } }) => {
	const clients = await pb
		.collection('clients')
		.getFullList<ClientsResponse>({ expand: 'animals(client)' });

	const clientsWithAnimals = clients.map((client) => ({
		...client,
		animals: (client.expand as RecordModel['expand'])?.['animals(client)'] || []
	}));

	return { clients: clientsWithAnimals };
};

export const actions: Actions = {
	add: async ({ request, locals: { pb } }) => {
		try {
			const data = await request.formData();

			const firstName = data.get('firstname') as string;
			const lastName = data.get('lastname') as string;
			const email = data.get('email') as string;
			const tel = data.get('phone') as string;
			const address = data.get('address') as string;

			const name = `${firstName} ${lastName}`;

			await pb.collection('clients').create({
				firstName,
				lastName,
				name,
				address,
				tel,
				email
			});

			return { success: true };
		} catch (error) {
			return fail(500, { message: 'error' });
		}
	},
	delete: async ({ request, locals: { pb } }) => {
		try {
			const data = await request.formData();

			const id = data.get('id') as string;

			await pb.collection('clients').delete(id);
		} catch (error) {
			console.log(error);

			return fail(500, { message: 'Failed to delete client' });
		}
	}
};
