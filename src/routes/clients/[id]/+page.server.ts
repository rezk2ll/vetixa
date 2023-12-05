import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import prisma from '$lib/prisma';

export const load: PageServerLoad = async ({ params }) => {
	const id = +params.id;

	if (isNaN(id)) {
		throw redirect(301, '/404');
	}

	const client = await prisma.client.findUnique({ where: { id }, include: { animals: true } });

	if (!client) {
		throw redirect(301, '/404');
	}

	return { client };
};

export const actions: Actions = {
	addAnimal: async ({ request, params }) => {
		const id = +params.id;
		const data = await request.formData();
		const birthday = data.get('birthday') as string;
		const name = data.get('name') as string;
		const sex = data.get('sex') as string;
		const type = data.get('type') as string;
		const weight = data.get('weight') as string;

		const client = await prisma.client.findUnique({ where: { id } });

		if (!client) {
			return fail(400, { message: 'not found ' });
		}

		const animal = await prisma.animal.create({
			data: {
				clientId: id,
				birthday,
				name,
				sex,
				type,
				weight
			}
		});

		if (!animal) {
			return fail(400, { message: 'error' });
		}

		return { success: true };
	},

	removeAnimal: async ({ request }) => {
		try {
			const data = await request.formData();
			const id = +(data.get('id') as string);

			if (isNaN(id)) {
				return fail(500, { message: 'invalid id' });
			}

			await prisma.animal.delete({ where: { id } });
		} catch (error) {
			console.log(error);
			return fail(500, { message: 'Failed to delete animal' });
		}
	}
};
