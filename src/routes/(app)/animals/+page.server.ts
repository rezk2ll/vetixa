import type { AnimalsResponse } from '../../../pocketbase-types';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	const animals = locals.pb.collection('animals').getFullList<AnimalsResponse>();

	return { animals };
};
