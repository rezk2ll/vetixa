import {
	InventoryItemResponse,
	InventorySaleItem,
	InventorySaleResponse,
	ItemMetadata,
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

		return list.map((item) => {
			const inventoryItem = (item.expand as RecordModel).item as InventoryItemResponse;

			return {
				...item,
				item: inventoryItem
			};
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
			expand: 'store_items'
		});

		return list
			.map((item) => {
				const inventoryItems = (item.expand as RecordModel)?.store_items as InventoryItemResponse[];

				if (!inventoryItems || inventoryItems.length === 0) return [];

				return inventoryItems.map((visitItem) => {
					const itemInfo = item.item_metadata?.find((metadata) => metadata.item === visitItem.id);

					if (!item.item_metadata || !itemInfo) {
						return {
							...item,
							item: visitItem,
							quantity: 1,
							total: visitItem.price
						} satisfies InventorySaleItem;
					} else {
						const quantity = itemInfo.quantity;
						const discount = itemInfo.discount || 0;
						const price = currency(visitItem.price).multiply(1 - discount / 100).value;
						const total = currency(price).multiply(quantity).value;

						return {
							...item,
							item: visitItem,
							quantity,
							total,
							discount,
							visit: item.id
						} satisfies InventorySaleItem;
					}
				});
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
}
