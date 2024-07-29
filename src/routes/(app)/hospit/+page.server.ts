import type {
	Hospit,
	HospitStatusFilter,
	HospitalisationResponse,
	Treatment,
	HospitPageInfo
} from '$types';
import type { RecordModel } from 'pocketbase';
import type { PageServerLoad } from './$types';
import { unknownClient } from '$utils/client';
import { unknownAnimal } from '$utils/animal';

export const load = (async ({ locals: { pb }, url: { searchParams } }) => {
	const page = parseInt(searchParams.get('page') ?? '1');
	const query = searchParams.get('query') ?? '';
	const filter = (searchParams.get('filter') as HospitStatusFilter) ?? 'all';

	const collection =
		filter === 'pending'
			? 'hospit_pending_list'
			: filter === 'complete'
			? 'hospit_completed_list'
			: 'hospitalisation';
	const queryFilter = `note ~ "${query}" || cage.code ~ "${query}" || visit.animal.name ~ "${query}" || visit.animal.identifier ~ "${query}" || visit.animal.client.name ~ "${query}" || visit.animal.client.tel ~ "${query}"`;

	const hospit = await pb.collection(collection).getList<HospitalisationResponse>(page, 10, {
		sort: '-updated',
		filter: queryFilter,
		expand: 'visit, visit.animal, visit.animal.client, cage'
	});

	const items = hospit.items.map((item) => {
		return {
			...item,
			visit: {
				...((item.expand as RecordModel)?.visit || {}),
				animal: {
					...((item.expand as RecordModel)?.visit.expand?.animal || unknownAnimal)
				},
				client: (item.expand as RecordModel)?.visit.expand?.animal.expand?.client || unknownClient
			},
			treatment: (item.treatment as Treatment[]) || [],
			cage: (item.expand as RecordModel)?.cage || {}
		} satisfies Hospit;
	});

	const pendingCount = await pb.collection('hospitalisation').getList(1, 1, {
		filter: `(${queryFilter}) && end > @todayEnd`
	});

	const completedCount = await pb.collection('hospitalisation').getList(1, 1, {
		filter: `(${queryFilter}) && end < @todayEnd`
	});
	const allCount = await pb.collection('hospitalisation').getList(1, 1);

	return {
		pageInfo: {
			...hospit,
			items,
			query,
			filter,
			count: {
				all: allCount.totalItems ?? 0,
				pending: pendingCount.totalItems ?? 0,
				completed: completedCount.totalItems ?? 0
			}
		} satisfies HospitPageInfo
	};
}) satisfies PageServerLoad;
