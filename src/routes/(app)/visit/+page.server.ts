import type {
	AnimalsResponse,
	VisitsResponse,
	VisitsPendingViewResponse,
	VisitStatusFilter,
	visitCount,
	BillsResponse,
	FundTransactionsResponse,
	ItemMetadata
} from '$types';
import type { RecordListOptions, RecordModel } from 'pocketbase';
import type { PageServerLoad } from './$types';
import { unknownClient } from '$utils/client';
import { getDaysBetween } from '$utils/date';
import currency from 'currency.js';

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
		expand: 'animal, animal.client, medical_acts, toilettage, surgical_acts, hospit, store_items',
		sort: '-updated',
		...(query?.length
			? {
					filter: `animal.name ~ "${query}" || motif ~ "${query}" || animal.client.name ~ "${query}" || animal.client.tel ~ "${query}"`
			  }
			: {})
	} satisfies RecordListOptions;

	// Fetch visits with all needed expansions
	const visitRecords = await pb
		.collection(collection)
		.getList<VisitsResponse<ItemMetadata[]>>(page, 10, listOptions);

	// Fetch counts in parallel
	const [pendingCount, paidCount, partialCount, totalCount, controlCount] = await Promise.all([
		pb.collection('visits_pending_view').getOne<VisitsPendingViewResponse>('pending'),
		pb.collection('visits_paid_view').getOne<VisitsPendingViewResponse>('paid'),
		pb.collection('visits_partial_view').getOne<VisitsPendingViewResponse>('partial'),
		pb.collection('visits').getList(1, 1),
		pb.collection('visits_control_view').getOne<VisitsPendingViewResponse>('controle')
	]);

	// Batch fetch all bills and their transaction histories
	const visitIds = visitRecords.items.map((v) => v.id);
	const billsMap = new Map<string, BillsResponse>();
	const billHistoryMap = new Map<string, FundTransactionsResponse[]>();

	if (visitIds.length > 0) {
		const billsFilter = visitIds.map((id) => `visit = "${id}"`).join(' || ');
		const bills = await pb.collection('bills').getFullList<BillsResponse>({
			filter: billsFilter
		});
		bills.forEach((bill) => billsMap.set(bill.visit, bill));

		// Batch fetch transaction histories for all bills
		const billIds = bills.map((b) => b.id);
		if (billIds.length > 0) {
			const historyFilter = billIds.map((id) => `bill = "${id}"`).join(' || ');
			const histories = await pb
				.collection('fund_transactions')
				.getFullList<FundTransactionsResponse>({
					filter: historyFilter
				});
			histories.forEach((h) => {
				const existing = billHistoryMap.get(h.bill) || [];
				existing.push(h);
				billHistoryMap.set(h.bill, existing);
			});
		}
	}

	// Calculate totals and build list without additional queries
	const list = visitRecords.items
		.map((visit) => {
			try {
				const expansion = visit.expand as RecordModel;

				if (!expansion || !expansion.animal) {
					throw Error('anomaly: animal not found');
				}

				const animal = expansion.animal as AnimalsResponse;
				const animalExpansion = animal.expand as RecordModel | undefined;
				const client = animalExpansion?.client || unknownClient;

				// Get bill from cache
				const billRecord = billsMap.get(visit.id);
				const bill = billRecord
					? {
							...billRecord,
							history: billHistoryMap.get(billRecord.id) || []
					  }
					: undefined;

				// Calculate total price from expanded data (no additional queries)
				const total = calculateVisitTotal(visit, expansion);

				return {
					...visit,
					bill,
					animal,
					total,
					client
				};
			} catch (error) {
				console.error({ error });
				return null;
			}
		})
		.filter(Boolean);

	return {
		...visitRecords,
		query: query,
		items: list,
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

/**
 * Calculate visit total from expanded data without additional queries
 */
function calculateVisitTotal(
	visit: VisitsResponse<ItemMetadata[]>,
	expansion: RecordModel
): number {
	const metadataMap = new Map((visit.item_metadata ?? []).map((m) => [m.item, m]));

	const calculateItemsTotal = (items: { id: string; price: number }[] = []) =>
		items.reduce((acc, item) => {
			const metadata = metadataMap.get(item.id);
			const discount = metadata?.discount ?? 0;
			const quantity = metadata?.quantity ?? 1;
			const price = currency(item.price).multiply(1 - discount / 100).value;
			return currency(acc).add(currency(price).multiply(quantity)).value;
		}, 0);

	const toilettageTotal = calculateItemsTotal(expansion.toilettage || []);
	const medicalActsTotal = calculateItemsTotal(expansion.medical_acts || []);
	const surgicalActsTotal = calculateItemsTotal(expansion.surgical_acts || []);
	const storeItemsTotal = calculateItemsTotal(expansion.store_items || []);

	let hospitTotal = 0;
	if (expansion.hospit) {
		const { start, end, price = 0 } = expansion.hospit;
		const days = Math.abs(getDaysBetween(start, end));
		hospitTotal = currency(price).multiply(Math.max(days, 0)).value;
	}

	return currency(visit.visit_price || 0)
		.add(toilettageTotal)
		.add(medicalActsTotal)
		.add(surgicalActsTotal)
		.add(storeItemsTotal)
		.add(hospitTotal).value;
}
