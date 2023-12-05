import { fail } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async () => {
	const clients = await prisma.client.findMany({
		include: { animals: { select: { name: true, sex: true } } }
	});

	return { clients };
};

export const actions: Actions = {
	add: async ({ request }) => {
		try {
			const data = await request.formData();

			const firstName = data.get('firstname') as string;
			const lastName = data.get('lastname') as string;
			const email = data.get('email') as string;
			const tel = data.get('phone') as string;
			const address = data.get('address') as string;

			const name = `${firstName} ${lastName}`;

			await prisma.client.create({
				data: {
					firstName,
					lastName,
					name,
					address,
					tel,
					email
				}
			});

			return { success: true };
		} catch (error) {
			return fail(500, { message: 'error' });
		}
	},
	delete: async ({ request }) => {
		try {
			const data = await request.formData();

			console.log({ data })

			const id = +(data.get('id') as string);

			if (!id || isNaN(id)) {
				return fail(400, { message: 'invalid id' });
			}

			console.log(id)

			await prisma.client.delete({ where: { id } });
		} catch (error) {
			console.log(error);

			return fail(500, { message: 'Failed to delete client' });
		}
	}
};
