import prisma from '$lib/prisma';
import { fail, redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = +params.id;

	if (isNaN(id)) {
		throw redirect(301, '/404');
	}

	const fiche = await prisma.fiche.findUnique({
		where: { id },
		include: { animal: true, client: true }
	});

	if (!fiche) {
		throw redirect(301, '/404');
	}

	const diagnostics = await prisma.diagnostic.findMany({ where: { ficheId: id } });

	return {
		fiche,
		diagnostics
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const id = +params.id;
		const data = await request.formData();

		const date = data.get('date') as string;
		const time = data.get('time') as string;
		const alimentation = data.get('alimentation') as string;
		const abreuvement = data.get('abreuvement') as string;
		const urines = data.get('urines') as string;
		const vaumissement = data.get('vaumissement') as string;
		const bilan = data.get('bilan') as string;
		const traitement = data.get('traitement') as string;
		const anti = data.get('anti') as string;
		const state = data.get('state') as string;

		const fiche = await prisma.fiche.findUnique({ where: { id } });

		if (!fiche) {
			return fail(404, { message: 'not found' });
		}

		const diagnostic = await prisma.diagnostic.create({
			data: {
				abreuvement,
				alimentation,
				anti,
				bilan,
				state,
				time,
				traitement,
				urines,
				vaumissement,
				date,
				ficheId: fiche.id
			}
		});

		if (!diagnostic) {
			return fail(500, { message: 'error' });
		}

		return { success: true };
	}
};
