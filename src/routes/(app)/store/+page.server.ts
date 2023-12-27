import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { addInventoryItemSchema, sellInventoryItemSchema } from '$lib/schemas';
import type {
	InventoryItemResponse,
	InventorySaleRecord,
	InventorySaleResponse
} from '../../../pocketbase-types';
import type { RecordModel } from 'pocketbase';

export const load: PageServerLoad = async ({ locals: { pb } }) => {
	const addForm = await superValidate(addInventoryItemSchema, { id: 'addForm' });
	const sellForm = await superValidate(sellInventoryItemSchema, { id: 'sellForm' });

	const items = await pb.collection('inventory_item').getFullList<InventoryItemResponse>();
	const monthlySales = await pb.collection('inventory_sale').getFullList<InventorySaleResponse>({
		filter: 'created >= @monthStart && created <= @monthEnd'
	});
	const dailySales = await pb.collection('inventory_sale').getFullList<InventorySaleResponse>({
		filter: 'created >= @todayStart && created <= @todayEnd'
	});

	const totalSales = await pb.collection('inventory_sale').getFullList<InventorySaleResponse>({
		expand: 'item'
	});

	const dailyRevenu = dailySales.reduce((acc, curr) => {
		return acc + curr.total;
	}, 0);

	const monthlyRevenu = monthlySales.reduce((acc, curr) => {
		return acc + curr.total;
	}, 0);

	const bestSellers = totalSales.reduce((acc, curr) => {
		if (!curr.expand) return acc;
		const itemMetadata = (curr.expand as RecordModel).item as unknown as InventoryItemResponse;

		if (acc[itemMetadata.name]) {
			acc[itemMetadata.name] += curr.quantity;
		} else {
			acc[itemMetadata.name] = curr.quantity;
		}
		return acc;
	}, {} as Record<string, number>);

	const totalSoldItems = totalSales.reduce((acc, curr) => {
		return acc + curr.quantity;
	}, 0)

	return {
		addForm,
		sellForm,
		items,
		totalSales: totalSales.length,
		dailyRevenu,
		dailySales: dailySales.length,
		monthlyRevenu,
		monthlySales: monthlySales.length,
		bestSellers,
		totalSoldItems
	};
};

export const actions: Actions = {
	add: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, addInventoryItemSchema);

		try {
			if (!form.valid) {
				return message(form, 'Invalid data');
			}

			const item = await pb
				.collection('inventory_item')
				.getList(1, 1, { filter: `code = ${form.data.code}` });

			if (item.totalItems != 0) {
				return message(form, 'Item already exists');
			}

			await pb.collection('inventory_item').create(form.data);

			return { success: true };
		} catch (error) {
			return message(form, 'Failed to add inventory item');
		}
	},
	sell: async ({ locals: { pb, user }, request }) => {
		const form = await superValidate(request, sellInventoryItemSchema);

		try {
			if (!form.valid) {
				return message(form, 'Invalid data');
			}

			const { items } = form.data;

			for (const item of items) {
				const existingItem = await pb
					.collection('inventory_item')
					.getOne<InventoryItemResponse>(item.id);

				if (!existingItem) {
					return message(form, 'Item not found');
				}

				if (existingItem.quantity - item.quantity < 0) {
					return message(form, 'Not enough in stock');
				}

				await pb.collection('inventory_sale').create<InventorySaleRecord>({
					total: item.quantity * existingItem.price,
					quantity: item.quantity,
					item: item.id,
					seller: user?.id
				});

				await pb.collection('inventory_item').update(item.id, {
					quantity: existingItem.quantity - item.quantity
				});
			}

			return { form };
		} catch (error) {
			console.log({ error });
			return message(form, 'Failed to sell inventory item');
		}
	}
};
