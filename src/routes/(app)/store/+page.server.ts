import { message, superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import {
	addInventoryItemSchema,
	removeSchema,
	sellInventoryItemSchema,
	updateInventoryItemSchema
} from '$lib/schemas';
import type {
	FundTransactionsMethodOptions,
	FundTransactionsRecord,
	InventoryItemResponse,
	InventorySaleRecord,
	InventorySaleResponse
} from '$types';
import type { RecordModel } from 'pocketbase';
import { fail } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ locals: { pb } }) => {
	const addForm = await superValidate(addInventoryItemSchema, { id: 'addForm' });
	const sellForm = await superValidate(sellInventoryItemSchema, { id: 'sellForm' });
	const updateForm = await superValidate(updateInventoryItemSchema, { id: 'updateForm' });
	const deleteForm = await superValidate(removeSchema, { id: 'deleteForm' });

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
	}, 0);

	return {
		addForm,
		sellForm,
		updateForm,
		deleteForm,
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
		const addForm = await superValidate(request, addInventoryItemSchema);

		try {
			if (!addForm.valid) {
				return fail(400, { addForm });
			}

			const item = await pb
				.collection('inventory_item')
				.getList(1, 1, { filter: `code = ${addForm.data.code}` });

			if (item.totalItems != 0) {
				return fail(400, { addForm });
			}

			await pb.collection('inventory_item').create(addForm.data);

			return { addForm };
		} catch (error) {
			return fail(400, { addForm });
		}
	},
	sell: async ({ locals: { pb, user }, request }) => {
		const form = await superValidate(request, sellInventoryItemSchema);

		try {
			if (!form.valid) {
				return message(form, 'Invalid data');
			}

			let total = 0;
			const { items, method, incash, outcash } = form.data;

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

				total += item.quantity * existingItem.price;

				await pb.collection('inventory_item').update(item.id, {
					quantity: existingItem.quantity - item.quantity
				});
			}

			await pb.collection('fund_transactions').create<FundTransactionsRecord>({
				amount: total,
				description: 'vente de stock',
				method: method as FundTransactionsMethodOptions,
				incash,
				outcash,
				user: user?.id
			} satisfies FundTransactionsRecord);

			return { form };
		} catch (error) {
			return message(form, 'Failed to sell inventory item');
		}
	},
	delete: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, removeSchema);

		try {
			if (!form.valid) {
				return message(form, 'invalid item id');
			}

			await pb.collection('inventory_item').delete(form.data.id);
			return { form };
		} catch (error) {
			return message(form, 'Failed to delete inventory item');
		}
	},
	update: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, updateInventoryItemSchema);
		try {
			if (!form.valid) {
				return message(form, 'Invalid data');
			}

			await pb.collection('inventory_item').update(form.data.id, form.data);

			return { form };
		} catch (error) {
			console.log(error);
			return message(form, 'Failed to update inventory item');
		}
	}
};
