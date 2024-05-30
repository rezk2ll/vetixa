import type { CagesResponse, Hospit, HospitalisationResponse, Treatment } from '$types';
import type { RecordModel } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { pb }, url: { searchParams } }) => {
	const page = parseInt(searchParams.get('page') ?? '1');
	const query = searchParams.get('query') ?? '';

	const cages = await pb.collection('cages').getFullList<CagesResponse>();
	const hospit = await pb.collection('hospitalisation').getList<HospitalisationResponse>(page, 10, {
		filter: `note ~ "${query}" || cage.code ~ "${query}" || visit.animal.name ~ "${query}" || visit.animal.identifier ~ "${query}" || visit.animal.client.name ~ "${query}" || visit.animal.client.tel ~ "${query}"`,
		expand: 'visit, visit.animal, visit.animal.client, cage'
	});

	const items = hospit.items.map((item) => {
		return {
			...item,
			visit: {
				...((item.expand as RecordModel)?.visit || {}),
				animal: {
					...((item.expand as RecordModel)?.visit.expand.animal || {})
				},
				client: (item.expand as RecordModel)?.visit.expand.animal.expand.client || {}
			},
			treatment: (item.treatment as Treatment[]) || [],
			cage: (item.expand as RecordModel)?.cage || {}
		} satisfies Hospit;
	});

	return {
		cages,
		pageInfo: {
			...hospit,
			items,
			query
		}
	};
}) satisfies PageServerLoad;
