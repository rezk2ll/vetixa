import prisma from '$lib/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const animals = await prisma.animal.findMany();

	return { animals };
};
