import prisma from '$lib/prisma';
import type { PageServerLoad } from '../$types';

export const load: PageServerLoad = async () => {
	const fiches = await prisma.fiche.findMany({ include: { animal: true, client: true } });

	return {
		fiches
	};
};
