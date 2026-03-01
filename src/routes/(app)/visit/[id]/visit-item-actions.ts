import type { RequestEvent } from './$types';
import type { VisitsResponse, ItemMetadata } from '$types';
import {
	addVisitItemsSchema,
	removeVisitItemSchema,
	updateVisitItemSchema
} from '$lib/schemas/visit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import BillService from '$lib/services/bill';
import { InventoryService } from '$lib/services/inventory';

export const addToilettage = async ({ locals: { pb }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(addVisitItemsSchema), { id: 'add-toilettage' });

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id, items } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
		const billService = new BillService(pb, visit);

		await pb.collection('visits').update(id, {
			...visit,
			'toilettage+': items
		});

		await billService.update();

		return { form };
	} catch (error) {
		console.error(error);

		return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
	}
};

export const removeToilettage = async ({ locals: { pb }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(removeVisitItemSchema), {
		id: 'remove-toilettage'
	});

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id, item } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
		const billService = new BillService(pb, visit);

		await pb.collection('visits').update(id, {
			...visit,
			'toilettage-': item
		});

		await billService.update();

		return { form };
	} catch (error) {
		console.error(error);

		return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
	}
};

export const addMedicalActs = async ({ locals: { pb }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(addVisitItemsSchema), { id: 'add-medical-acts' });

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id, items } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
		const billService = new BillService(pb, visit);

		await pb.collection('visits').update(id, {
			...visit,
			'medical_acts+': items
		});

		await billService.update();

		return { form };
	} catch (error) {
		console.error(error);

		return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
	}
};

export const removeMedicalAct = async ({ locals: { pb }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(removeVisitItemSchema), {
		id: 'remove-medical-act'
	});

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id, item } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
		const billService = new BillService(pb, visit);

		await pb.collection('visits').update(id, {
			...visit,
			'medical_acts-': item
		});

		await billService.update();

		return { form };
	} catch (error) {
		console.error(error);

		return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
	}
};

export const addSurgicalActs = async ({ locals: { pb }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(addVisitItemsSchema), {
		id: 'add-surgical-acts'
	});

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id, items } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
		const billService = new BillService(pb, visit);

		await pb.collection('visits').update(id, {
			...visit,
			'surgical_acts+': items
		});

		await billService.update();

		return { form };
	} catch (error) {
		console.error(error);

		return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
	}
};

export const removeSurgicalAct = async ({ locals: { pb }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(removeVisitItemSchema), {
		id: 'remove-surgical-act'
	});

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id, item } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
		const billService = new BillService(pb, visit);

		await pb.collection('visits').update(id, {
			...visit,
			'surgical_acts-': item
		});

		await billService.update();

		return { form };
	} catch (error) {
		console.error(error);

		return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
	}
};

export const addVisitStoreItem = async ({ locals: { pb }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(addVisitItemsSchema), {
		id: 'add-visit-store-item'
	});

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id, items } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
		const billService = new BillService(pb, visit);
		const inventoryService = new InventoryService(pb);

		await pb.collection('visits').update(id, {
			...visit,
			'store_items+': items
		});

		await Promise.all(items.map((itemId) => inventoryService.decreaseItemQuantity(itemId, 1)));

		await billService.update();

		return { form };
	} catch (error) {
		console.error(error);

		return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
	}
};

export const removeVisitStoreItem = async ({ locals: { pb }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(removeVisitItemSchema), {
		id: 'remove-visit-store-item'
	});

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id, item } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse<ItemMetadata[]>>(id);
		const billService = new BillService(pb, visit);
		const inventoryService = new InventoryService(pb);

		const itemQuantity =
			visit.item_metadata?.find((metdata) => metdata.item === item)?.quantity ?? 1;

		await inventoryService.increaseItemQuantity(item, itemQuantity);

		await pb.collection('visits').update(id, {
			...visit,
			'store_items-': item
		});

		await billService.update();

		return { form };
	} catch (error) {
		console.error(error);

		return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
	}
};

export const updateVisitItem = async ({ locals: { pb }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(updateVisitItemSchema), {
		id: 'update-visit-item'
	});

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id, discount, quantity, item, type } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse<ItemMetadata[]>>(id);
		const billService = new BillService(pb, visit);
		const inventoryService = new InventoryService(pb);
		const items: ItemMetadata[] = visit.item_metadata || [];
		const existingIndex = items.findIndex((metadata) => metadata.item === item);

		if (type === 'inventory_item') {
			const currentQuantity = existingIndex !== -1 ? items[existingIndex].quantity : 1;
			if (currentQuantity > quantity) {
				await inventoryService.increaseItemQuantity(item, currentQuantity - quantity);
			} else if (currentQuantity < quantity) {
				await inventoryService.decreaseItemQuantity(item, quantity - currentQuantity);
			}
		}

		if (existingIndex !== -1) {
			items[existingIndex].quantity = quantity;
			items[existingIndex].discount = discount;
		} else {
			items.push({ item, discount, quantity });
		}

		await pb.collection('visits').update(id, {
			...visit,
			item_metadata: JSON.stringify(items)
		});

		await billService.update();

		return { form };
	} catch (error) {
		console.error(error);

		return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
	}
};
