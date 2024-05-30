import type {
  HospitCompletedViewResponse,
  HospitPendingViewResponse,
  CagesResponse,
  Hospit,
  HospitStatusFilter,
  HospitalisationResponse,
  Treatment
} from '$types';
import type { RecordModel } from 'pocketbase';
import type { PageServerLoad } from './$types';

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

	const cages = await pb.collection('cages').getFullList<CagesResponse>();
	const hospit = await pb.collection(collection).getList<HospitalisationResponse>(page, 10, {
		sort: '-updated',
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

	const pendingCount = await pb
		.collection('hospit_pending_view')
		.getOne<HospitPendingViewResponse>('pending');

	const completedCount = await pb
		.collection('hospit_completed_view')
		.getOne<HospitCompletedViewResponse>('completed');

	return {
		cages,
		pageInfo: {
			...hospit,
			items,
			query,
			filter,
			count: {
				pending: pendingCount.total ?? 0,
				completed: completedCount.total ?? 0
			}
		}
	};
}) satisfies PageServerLoad;
