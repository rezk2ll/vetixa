import { getDaysBetween } from '$utils/date';
import {
	HospitalisationResponse,
	InventoryItemResponse,
	InventorySaleItem,
	InventorySaleResponse,
	ItemMetadata,
	MedicalActsResponse,
	SurgicalActsResponse,
	ToilettageResponse,
	TypedPocketBase,
	VisitsResponse
} from '$types';
import currency from 'currency.js';
import { RecordModel } from 'pocketbase';

export class SalesService {
	constructor(private readonly pb: TypedPocketBase) {}

	/**
	 * returns a list of inventory sales between two dates.
	 *
	 * @param {string} startDate - the start date in the format 'YYYY-MM-DD'.
	 * @param {string} endDate - the end date in the format 'YYYY-MM-DD'.
	 * @returns {Promise<InventorySaleItem[]>} - a list of inventory sales.
	 */
	inventorySaleList = async (startDate: string, endDate: string): Promise<InventorySaleItem[]> => {
		const list = await this.pb.collection('inventory_sale').getFullList<InventorySaleResponse>({
			filter: this.getQueryFilter(startDate, endDate),
			sort: '-created',
			expand: 'item'
		});

		return list
			.filter((item) => item.expand && (item.expand as RecordModel).item)
			.map((item) => {
				const inventoryItem = (item.expand as RecordModel).item as InventoryItemResponse;

				return {
					...item,
					item: inventoryItem,
					type: 'sale',
					discount: 0
				} satisfies InventorySaleItem;
			});
	};

	/**
	 * returns the list of visit inventory sales between two dates.
	 *
	 * @param {string} startDate - the start date in the format 'YYYY-MM-DD'.
	 * @param {string} endDate - the end date in the format 'YYYY-MM-DD'.
	 * @returns {Promise<InventorySaleItem[]>} - a list of inventory sales.
	 */
	visitInventorySale = async (startDate: string, endDate: string): Promise<InventorySaleItem[]> => {
		const list = await this.pb.collection('visits').getFullList<VisitsResponse<ItemMetadata[]>>({
			filter: this.getQueryFilter(startDate, endDate),
			sort: '-created',
			expand: 'store_items, medical_acts, surgical_acts, toilettage, hospit'
		});

		return list
			.map((item) => {
				const inventoryItems =
					((item.expand as RecordModel)?.store_items as InventoryItemResponse[]) ?? [];
				const surgicalActs =
					((item.expand as RecordModel)?.surgical_acts as SurgicalActsResponse[]) ?? [];
				const medicalActs =
					((item.expand as RecordModel)?.medical_acts as MedicalActsResponse[]) ?? [];
				const toilettage = ((item.expand as RecordModel)?.toilettage as ToilettageResponse[]) ?? [];
				const hospit = (item.expand as RecordModel)?.hospit as HospitalisationResponse;

				const soldInventoryItems = this.getVisitActSales(inventoryItems, item, 'sale');
				const soldSurgicalActs = this.getVisitActSales(surgicalActs, item, 'surgical_act');
				const soldMedicalActs = this.getVisitActSales(medicalActs, item, 'medical_act');
				const soldToilettage = this.getVisitActSales(toilettage, item, 'toilettage');
				const soldHospit = this.getHospitSaleItem(hospit, item);
				const soldVisit = this.getVisitSaleItem(item);

				let soldItems = [
					...soldInventoryItems,
					...soldSurgicalActs,
					...soldMedicalActs,
					...soldToilettage
				];

				if (soldHospit) {
					soldItems = [...soldItems, soldHospit];
				}

				if (soldVisit) {
					soldItems = [...soldItems, soldVisit];
				}

				return soldItems;
			})
			.flat();
	};

	/**
	 * returns the list of inventory sales and visit inventory sales between two dates.
	 *
	 * @param {string} startDate - the start date in the format 'YYYY-MM-DD'.
	 * @param {string} endDate - the end date in the format 'YYYY-MM-DD'.
	 * @returns {Promise<InventorySaleItem[]>} - a list of inventory sales.
	 * @example
	 *  const sales = await salesService.list('2021-01-01', '2021-01-31');
	 */
	list = async (startDate: string, endDate: string): Promise<InventorySaleItem[]> => {
		const [inventorySales, visitSales] = await Promise.all([
			this.inventorySaleList(startDate, endDate),
			this.visitInventorySale(startDate, endDate)
		]);

		return [...inventorySales, ...visitSales].sort((a, b) => b.created.localeCompare(a.created));
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

	/**
	 * Parses the visit inventory sales
	 *
	 * @param {InventoryItemResponse[] | SurgicalActsResponse[] | MedicalActsResponse[] | ToilettageResponse[]} items - the list of inventory items.
	 * @param {VisitsResponse<ItemMetadata[]>} visit - the visit object.
	 * @param {'sale' | 'medical_act' | 'surgical_act' | 'toilettage' | 'visit'} type - the type of the sale.
	 * @returns {InventorySaleItem[]} - the list of inventory sales.
	 * @private
	 */
	private getVisitActSales = (
		items: (
			| InventoryItemResponse
			| SurgicalActsResponse
			| MedicalActsResponse
			| ToilettageResponse
		)[] = [],
		visit: VisitsResponse<ItemMetadata[]>,
		type: InventorySaleItem['type']
	): InventorySaleItem[] => {
		return items.map((item) => {
			const itemInfo = visit.item_metadata?.find((metadata) => metadata.item === item.id);
			const description = (item as InventoryItemResponse).description ?? '';

			if (!visit.item_metadata || !itemInfo) {
				return {
					...visit,
					item: {
						...item,
						description
					},
					quantity: 1,
					total: item.price,
					type,
					visit: visit.id,
					discount: 0
				} satisfies InventorySaleItem;
			}

			const quantity = itemInfo.quantity;
			const discount = itemInfo.discount || 0;
			const price = currency(item.price).multiply(1 - discount / 100).value;
			const total = currency(price).multiply(quantity).value;

			return {
				...visit,
				item: {
					...item,
					description
				},
				quantity: itemInfo.quantity,
				total,
				type,
				visit: visit.id,
				discount: itemInfo.discount || 0
			} satisfies InventorySaleItem;
		});
	};

	/**
	 * Returns the hospitalisation sale item
	 *
	 * @param {HospitalisationResponse} item - the hospitalisation item
	 * @param {VisitsResponse<ItemMetadata[]>} visit - the visit object
	 * @returns {InventorySaleItem | null} - the hospitalisation sale item
	 */
	private getHospitSaleItem = (
		item: HospitalisationResponse,
		visit: VisitsResponse<ItemMetadata[]>
	): InventorySaleItem | null => {
		if (!item) return null;

		const { start, end, price = 0 } = item;
		const quantity = Math.abs(getDaysBetween(start, end));
		const total = currency(price).multiply(Math.max(quantity, 0)).value;

		return {
			...visit,
			item: {
				...item,
				name: 'Hospitalisation',
				code: '',
				description: ''
			},
			quantity,
			total,
			type: 'hospit',
			visit: visit.id,
			discount: 0
		} satisfies InventorySaleItem;
	};

	/**
	 * Returns the visit sale item
	 *
	 * @param {VisitsResponse<ItemMetadata[]>} visit - the visit object
	 * @returns {InventorySaleItem | null} - the visit sale item
	 */
	private getVisitSaleItem = (visit: VisitsResponse<ItemMetadata[]>): InventorySaleItem | null => {
		const price = visit.visit_price ?? 0;

		if (!price) return null;

		return {
			...visit,
			item: {
				...visit,
				name: 'consultation',
				code: '',
				description: ''
			},
			quantity: 1,
			total: price,
			type: 'visit',
			visit: visit.id,
			discount: 0
		} satisfies InventorySaleItem;
	};
}
