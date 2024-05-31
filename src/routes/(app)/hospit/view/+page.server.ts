import type { CagesResponse } from '$types';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { pb } }) => {
	const cages = await pb.collection('cages').getFullList<CagesResponse>();

	return {
		cages
	};
}) satisfies PageServerLoad;
