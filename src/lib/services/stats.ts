import {
	ActStats,
	ActsType,
	ItemMetadata,
	MedicalActsResponse,
	SurgicalActsResponse,
	ToilettageResponse,
	TypedPocketBase,
	VisitsResponse
} from '$types';
import currency from 'currency.js';
import { RecordModel } from 'pocketbase';

export class StatsService {
	constructor(private readonly pb: TypedPocketBase) {}

	/**
	 * Calculates the total of the medical acts between two dates
	 *
	 * @param {string} startDate - the start date in the format 'YYYY-MM-DD'
	 * @param {string} endDate - the end date in the format 'YYYY-MM-DD'
	 * @returns {Promise<ActStats>} - the total of the medical acts
	 * @example
	 *  const stats = await getActsStats('2021-01-01', '2021-12-31');
	 */
	getActsStats = async (startDate: string, endDate: string): Promise<ActStats> => {
		const stats: ActStats = {
			medical: 0,
			surgical: 0,
			toilettage: 0
		};

		const visits = await this.pb.collection('visits').getFullList<VisitsResponse<ItemMetadata[]>>({
			filter: this.getQueryFilter(startDate, endDate),
			expand: 'medical_acts, surgical_acts, toilettage'
		});

		if (!visits || !visits.length) return stats;

		visits.forEach((visit) => {
			const metadata = visit.item_metadata;

			const medicalActs =
				((visit.expand as RecordModel)?.medical_acts as MedicalActsResponse[]) || [];
			const toilettageActs =
				((visit.expand as RecordModel)?.toilettage as ToilettageResponse[]) || [];
			const surgical_acts =
				((visit.expand as RecordModel)?.surgical_acts as SurgicalActsResponse[]) || [];

			stats.medical = currency(stats.medical).add(this.getActsTotal(medicalActs, metadata)).value;
			stats.surgical = currency(stats.surgical).add(
				this.getActsTotal(surgical_acts, metadata)
			).value;
			stats.toilettage = currency(stats.toilettage).add(
				this.getActsTotal(toilettageActs, metadata)
			).value;
		});

		return stats;
	};

	/**
	 * calculates the total of the medical acts based on the metadata
	 *
	 * @param {ActsType[]} acts - the medical acts
	 * @param {ItemMetadata[] | null} metadata - the metadata
	 * @returns {number} - the total of the medical acts
	 */
	getActsTotal = (acts: ActsType[], metadata: ItemMetadata[] | null): number => {
		return acts.reduce((acc, act) => {
			const itemInfo = metadata?.find(({ item }) => item === act.id);

			if (!metadata || !itemInfo) {
				return currency(acc).add(act.price).value;
			}

			const quantity = itemInfo.quantity || 1;
			const discount = itemInfo.discount || 0;
			const price = currency(act.price).multiply(1 - discount / 100).value;
			const total = currency(price).multiply(quantity).value;

			return currency(acc).add(total).value;
		}, 0);
	};

	/**
	 * Returns the adequate query filter
	 *
	 * @param {string} startDate The start date
	 * @param {string} endDate The end date
	 * @returns The query filter
	 */
	private getQueryFilter = (startDate: string, endDate: string) => {
		return startDate.startsWith('@')
			? `created >= ${startDate} && created <= ${endDate}`
			: this.pb.filter(`created >= {:start} && created <= {:end}`, {
					start: startDate.startsWith('@') ? startDate : new Date(startDate),
					end: endDate.startsWith('@') ? endDate : new Date(endDate)
			  });
	};
}
