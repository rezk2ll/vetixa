import { setError, superValidate } from 'sveltekit-superforms/server';
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
import { zod } from 'sveltekit-superforms/adapters';
import currency from 'currency.js';

export const load: PageServerLoad = async ({ locals: { pb } }) => {
	// Initialize forms in parallel
	const [addForm, sellForm, updateForm, deleteForm] = await Promise.all([
		superValidate(zod(addInventoryItemSchema), { id: 'addForm' }),
		superValidate(zod(sellInventoryItemSchema), { id: 'sellForm' }),
		superValidate(zod(updateInventoryItemSchema), { id: 'updateForm' }),
		superValidate(zod(removeSchema), { id: 'deleteForm' })
	]);

	// Fetch data in parallel
	const [items, monthlySales, dailySales, totalSales] = await Promise.all([
		pb.collection('inventory_item').getFullList<InventoryItemResponse>(),
		pb.collection('inventory_sale').getFullList<InventorySaleResponse>({
			filter: 'created >= @monthStart && created <= @monthEnd',
			fields: 'id,total,quantity'
		}),
		pb.collection('inventory_sale').getFullList<InventorySaleResponse>({
			filter: 'created >= @todayStart && created <= @todayEnd',
			fields: 'id,total,quantity'
		}),
		pb.collection('inventory_sale').getFullList<InventorySaleResponse>({
			expand: 'item',
			fields: 'id,quantity,expand.item.name'
		})
	]);

	const dailyRevenu = dailySales.reduce((acc, curr) => {
		return currency(acc).add(curr.total).value;
	}, 0);

	const monthlyRevenu = monthlySales.reduce((acc, curr) => {
		return currency(acc).add(curr.total).value;
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
		const addForm = await superValidate(request, zod(addInventoryItemSchema));

		try {
			if (!addForm.valid) {
				return setError(addForm, 'Données invalides');
			}

			const item = await pb
				.collection('inventory_item')
				.getList(1, 1, { filter: `code = '${addForm.data.code}'` });

			if (item.totalItems != 0) {
				return setError(addForm, 'Code déjà utilisé');
			}

			await pb.collection('inventory_item').create(addForm.data);

			return { addForm };
		} catch (error) {
			console.error(error);

			return setError(addForm, "Échec de l'ajout de l'article en stock", { status: 500 });
		}
	},
	sell: async ({ locals: { pb, user }, request }) => {
		const form = await superValidate(request, zod(sellInventoryItemSchema));

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides');
			}

			const { items, method, incash, outcash } = form.data;

			// Batch fetch all inventory items in a single query
			const itemIds = items.map((i) => i.id);
			const itemsFilter = itemIds.map((id) => `id = "${id}"`).join(' || ');
			const existingItems = await pb.collection('inventory_item').getFullList<InventoryItemResponse>({
				filter: itemsFilter
			});
			const itemsMap = new Map(existingItems.map((item) => [item.id, item]));

			// Validate all items first
			for (const item of items) {
				const existingItem = itemsMap.get(item.id);

				if (!existingItem) {
					return setError(form, 'Article non trouvé');
				}

				if (existingItem.quantity - item.quantity < 0) {
					return setError(form, 'Quantité insuffisante dans le stock');
				}
			}

			// Calculate totals and description first
			let total = 0;
			let description = 'VENTE: ';

			for (const item of items) {
				const existingItem = itemsMap.get(item.id)!;
				const itemTotalPrice = currency(existingItem.price).multiply(item.quantity).value;
				description = `${description}\n ${item.quantity}x ${existingItem.name}`;
				total = currency(total).add(itemTotalPrice).value;
			}

			// Process all sales in parallel
			const salePromises = items.map((item) => {
				const existingItem = itemsMap.get(item.id)!;
				const itemTotalPrice = currency(existingItem.price).multiply(item.quantity).value;

				return Promise.all([
					pb.collection('inventory_sale').create<InventorySaleRecord>({
						total: itemTotalPrice,
						quantity: item.quantity,
						item: item.id,
						seller: user?.id
					}),
					pb.collection('inventory_item').update(item.id, {
						quantity: existingItem.quantity - item.quantity
					})
				]);
			});

			await Promise.all(salePromises);

			await pb.collection('fund_transactions').create<FundTransactionsRecord>({
				amount: total,
				description,
				method: method as FundTransactionsMethodOptions,
				incash,
				outcash,
				user: user?.id
			} satisfies FundTransactionsRecord);

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la vente', { status: 500 });
		}
	},
	delete: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(removeSchema));

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			await pb.collection('inventory_item').delete(form.data.id);
			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, "Échec de la suppression de l'article");
		}
	},
	update: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(updateInventoryItemSchema));
		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			await pb.collection('inventory_item').update(form.data.id, form.data);

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, "Échec de la mise à jour de l'article");
		}
	}
};
