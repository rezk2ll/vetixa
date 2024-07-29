import BillService from '$lib/services/bill';
import type {
	ClientsResponse,
	AnimalsResponse,
	VisitsResponse,
	VisitsPendingViewResponse,
	VisitStatusFilter,
	visitCount
} from '$types';
import type { RecordListOptions, RecordModel } from 'pocketbase';
import type { PageServerLoad } from './$types';
import { unknownClient } from '$utils/client';

export const load = (async ({ locals: { pb }, url }) => {
	const page = parseInt(url.searchParams.get('page') ?? '1');
	const query = url.searchParams.get('query') ?? '';
	const filter = (url.searchParams.get('filter') as VisitStatusFilter) ?? 'all';

	const collection =
		filter === 'pending'
			? 'visits_pending_list'
			: filter === 'completed'
			? 'visits_paid_list'
			: filter === 'partial'
			? 'visits_partial_list'
			: filter === 'control'
			? 'visits_control_list'
			: 'visits';

	const listOptions = {
		expand: 'animal',
		sort: '-updated',
		...(query?.length
			? {
					filter: `animal.name ~ "${query}" || motif ~ "${query}" || animal.client.name ~ "${query}" || animal.client.tel ~ "${query}"`
			  }
			: {})
	} satisfies RecordListOptions;

	const visitRecords = await pb
		.collection(collection)
		.getList<VisitsResponse>(page, 10, listOptions);

	const pendingCount = await pb
		.collection('visits_pending_view')
		.getOne<VisitsPendingViewResponse>('pending');
	const paidCount = await pb
		.collection('visits_paid_view')
		.getOne<VisitsPendingViewResponse>('paid');
	const partialCount = await pb
		.collection('visits_partial_view')
		.getOne<VisitsPendingViewResponse>('partial');
	const totalCount = await pb.collection('visits').getList(1, 1);
	const controlCount = await pb
		.collection('visits_control_view')
		.getOne<VisitsPendingViewResponse>('controle');

	const list = await Promise.all(
		visitRecords.items.map(async (visit) => {
			try {
				const expansion = visit.expand as RecordModel;

				if (!expansion || !expansion.animal) {
					throw Error('anomaly: animal not found');
				}

				const animal = expansion.animal as AnimalsResponse;
				const billService = new BillService(pb, visit);
				const bill = await billService.get();
				const total = await billService.getTotalPrice();
				let client = {};

				if (animal.client) {
					client = await pb.collection('clients').getOne<ClientsResponse>(animal.client);
				} else {
					client = unknownClient
				}

				return {
					...visit,
					bill,
					animal,
					total,
					client
				};
			} catch (error) {
				console.error({ error });
			}
		})
	);

	const visits = list.filter(Boolean);

	return {
		...visitRecords,
		query: query,
		items: visits,
		filter,
		count: {
			total: totalCount.totalItems ?? 0,
			pending: pendingCount.total ?? 0,
			paid: paidCount.total ?? 0,
			partial: partialCount.total ?? 0,
			control: controlCount.total ?? 0
		} satisfies visitCount
	};
}) satisfies PageServerLoad;
