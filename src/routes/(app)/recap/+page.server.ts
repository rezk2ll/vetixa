import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';
import type { PageServerLoad } from '../../$types';
import type { Actions } from './$types';

export const load: PageServerLoad = async () => {
	const fiches = await prisma.fiche.findMany({ include: { animal: true, client: true } });

	return {
		fiches
	};
};

export const actions: Actions = {
	delete: async ({ request }) => {
		const data = await request.formData();

		const id = +(data.get('id') as string);

		if (!id || isNaN(id)) {
			return fail(400, { message: 'invalid id' });
		}

		const fiche = await prisma.fiche.findUnique({ where: { id } });

		if (!fiche) {
			return fail(404, { message: 'not found' });
		}

		await prisma.diagnostic.deleteMany({ where: { ficheId: fiche.id } });

		await prisma.fiche.delete({ where: { id } });
	}
};
