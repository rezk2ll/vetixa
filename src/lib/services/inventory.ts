import type { InventoryItemResponse, TypedPocketBase } from '$types';

export class InventoryService {
	constructor(private readonly pb: TypedPocketBase) {}

	/**
	 * Increase the quantity of an item in the store.
	 *
	 * @param {string} id - the id of the store item.
	 * @param {number} quantity - the quantity to increase by.
	 */
	async increaseItemQuantity(id: string, quantity: number): Promise<void> {
		if (quantity < 1) {
			return;
		}

		try {
			const item = await this.getInventoryItem(id);

			await this.pb.collection('inventory_item').update(id, {
				...item,
				'quantity+': quantity
			});
		} catch (error) {
			console.error('Failed to update inventory item');

      throw error;
		}
	}

	/**
	 * Decrease the quantity of an item in the store.
	 *
	 * @param {string} id - the id of the store item.
	 * @param {number} quantity - the quantity to decrease by.
	 */
	async decreaseItemQuantity(id: string, quantity: number) {
		if (quantity < 1) {
			return;
		}

		try {
			const item = await this.getInventoryItem(id);

			if (item.quantity < quantity) {
				throw new Error('Not enough items');
			}

			await this.pb.collection('inventory_item').update(id, {
				...item,
				'quantity-': quantity
			});
		} catch (error) {
			console.error('Failed to update inventory item');
      
      throw error;
		}
	}

	/**
	 * Fetches a single inventory item.
	 *
	 * @param {string} id - the id of the inventory item.
	 * @returns {Promise<InventoryItemResponse>} the inventory item.
	 */
	async getInventoryItem(id: string): Promise<InventoryItemResponse> {
		return this.pb.collection('inventory_item').getOne<InventoryItemResponse>(id);
	}
}
