import { redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type {
	MedicalActsResponse,
	SurgicalActsResponse,
	BillsMethodOptions,
	VisitsResponse,
	CagesResponse,
	InventoryItemResponse,
	Visit,
	ItemMetadata,
	DoctorsResponse,
	ToilettageResponse
} from '$types';
import {
	addVisitFileSchema,
	addVisitItemsSchema,
	payVisitSchema,
	removeVisitFileSchema,
	removeVisitItemSchema,
	updateVisitActionsSchema,
	updateVisitDiagnosticSchema,
	updateVisitHospitalisationSchema,
	updateVisitItemSchema,
	updateVisitSchema,
	updateVisitTreatmentSchema
} from '$lib/schemas/visit';
import type { RecordModel } from 'pocketbase';
import { setError, superValidate, withFiles } from 'sveltekit-superforms/server';
import BillService from '$lib/services/bill';
import { zod } from 'sveltekit-superforms/adapters';
import { removeSchema } from '$lib/schemas';
import { InventoryService } from '$lib/services/inventory';
import { cageCompare } from '$utils/cage';
import { unknownClient } from '$utils/client';
import { unknownAnimal } from '$lib/utils/animal';
import { updateHospitCompletedStateSchema } from '$lib/schemas/hospit';

export const load = (async ({ params, locals: { pb }, url: { searchParams } }) => {
	const { id } = params;
	const tab = searchParams.get('tab') || 'info';
	let currentCage: CagesResponse | null = null;

	try {
		const form = await superValidate(zod(updateVisitSchema), { id: 'update-visit' });
		const addToilettageForm = await superValidate(zod(addVisitItemsSchema), {
			id: 'add-toilettage'
		});
		const removeToilettageForm = await superValidate(zod(removeVisitItemSchema), {
			id: 'remove-toilettage'
		});
		const payVisitForm = await superValidate(zod(payVisitSchema), { id: 'pay-visit' });
		const addFileForm = await superValidate(zod(addVisitFileSchema), { id: 'add-file' });
		const removeFileForm = await superValidate(zod(removeVisitFileSchema), { id: 'remove-file' });
		const updateDiagnosticForm = await superValidate(zod(updateVisitDiagnosticSchema), {
			id: 'update-diagnostic'
		});
		const updateActionsForm = await superValidate(zod(updateVisitActionsSchema), {
			id: 'update-actions'
		});
		const addVisitStoreItemForm = await superValidate(zod(addVisitItemsSchema), {
			id: 'add-visit-store-item'
		});
		const removeVisitStoreItemForm = await superValidate(zod(removeVisitItemSchema), {
			id: 'remove-visit-store-item'
		});
		const addMedicalActsForm = await superValidate(zod(addVisitItemsSchema), {
			id: 'add-medical-acts'
		});
		const removeMedicalActForm = await superValidate(zod(removeVisitItemSchema), {
			id: 'remove-medical-act'
		});
		const addSurgicaActsForm = await superValidate(zod(addVisitItemsSchema), {
			id: 'add-surgical-acts'
		});
		const removeSurgicalActForm = await superValidate(zod(removeVisitItemSchema), {
			id: 'remove-surgical-act'
		});
		const updateVisitHospitForm = await superValidate(zod(updateVisitHospitalisationSchema), {
			id: 'update-hospit'
		});
		const removeVisitHospitForm = await superValidate(zod(removeSchema), {
			id: 'remove-hospit'
		});
		const updateVisitTreatmentForm = await superValidate(zod(updateVisitTreatmentSchema), {
			id: 'update-treatment'
		});
		const updateVisitItemForm = await superValidate(zod(updateVisitItemSchema), {
			id: 'update-visit-item'
		});
		const updateHospitCompeltedStateForm = await superValidate(
			zod(updateHospitCompletedStateSchema),
			{
				id: 'change-completed'
			}
		);

		const visitRecord = await pb.collection('visits').getOne<VisitsResponse>(id, {
			expand: 'medical_acts, toilettage, surgical_acts, animal, animal.client, hospit, store_items'
		});

		if (!visitRecord) {
			throw redirect(301, '/404');
		}

		const billService = new BillService(pb, visitRecord);
		const bill = await billService.get();

		const visit = {
			...visitRecord,
			animal: {
				...((visitRecord.expand as RecordModel)?.animal || unknownAnimal),
				client: (visitRecord.expand as RecordModel)?.animal?.expand?.client || unknownClient
			},
			medical_acts: (visitRecord.expand as RecordModel)?.medical_acts || [],
			toilettage: (visitRecord.expand as RecordModel)?.toilettage || [],
			surgical_acts: (visitRecord.expand as RecordModel)?.surgical_acts || [],
			hospit: (visitRecord.expand as RecordModel)?.hospit || {},
			store_items: (visitRecord.expand as RecordModel)?.store_items || [],
			bill,
			files: (visitRecord.files || []).map((file) => pb.files.getUrl(visitRecord, file))
		} as Visit;

		const medicalActs = await pb.collection('medical_acts').getFullList<MedicalActsResponse>();
		const toilettage = await pb.collection('toilettage').getFullList<ToilettageResponse>();
		const surgicalActs = await pb.collection('surgical_acts').getFullList<SurgicalActsResponse>();
		const storeItems = await pb.collection('inventory_item').getFullList<InventoryItemResponse>({
			filter: 'quantity > 0'
		});

		let cages = await pb.collection('available_cages').getFullList<CagesResponse>();
		cages = cages.sort(cageCompare);

		if (visit.hospit && visit.hospit.cage) {
			currentCage = await pb.collection('cages').getOne<CagesResponse>(visit.hospit.cage);
			if (currentCage && cages.findIndex(({ code }) => code === currentCage?.code) === -1) {
				cages = [currentCage, ...cages];
			}
		}

		const generatedBill = await billService.generateBill();
		const doctors = await pb.collection('doctors').getFullList<DoctorsResponse>();

		return {
			tab,
			visit,
			bill,
			medicalActs,
			toilettage,
			surgicalActs,
			cages,
			doctors,
			storeItems,
			form,
			addToilettageForm,
			removeToilettageForm,
			payVisitForm,
			addFileForm,
			removeFileForm,
			updateDiagnosticForm,
			updateActionsForm,
			addVisitStoreItemForm,
			removeVisitStoreItemForm,
			addMedicalActsForm,
			removeMedicalActForm,
			addSurgicaActsForm,
			removeSurgicalActForm,
			updateVisitHospitForm,
			generatedBill,
			removeVisitHospitForm,
			updateVisitTreatmentForm,
			updateVisitItemForm,
			updateHospitCompeltedStateForm
		};
	} catch (err) {
		console.error(err);

		throw error(500, 'Impossible de charger la visite');
	}
}) satisfies PageServerLoad;

export const actions = {
	updateVisit: async ({ locals: { pb }, request, params }) => {
		const form = await superValidate(request, zod(updateVisitSchema), { id: 'update-visit' });

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id } = params;

			const item = await pb.collection('visits').getOne<VisitsResponse>(id);

			if (!item) {
				return setError(form, 'Visite non trouvée', { status: 500 });
			}

			const updated = await pb.collection('visits').update<VisitsResponse>(id, form.data);

			const billService = new BillService(pb, updated);
			await billService.update();

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la mise à jour de la visite');
		}
	},

	addPayment: async ({ locals: { pb, user }, request }) => {
		const form = await superValidate(request, zod(payVisitSchema), { id: 'pay-visit' });

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { amount, id, incash, method, outcash, description: desc } = form.data;
			const item = await pb.collection('visits').getOne<VisitsResponse>(id);

			if (!item) {
				return setError(form, 'Visite non trouvée', { status: 500 });
			}

			const billService = new BillService(pb, item);
			const expandedVisit = await billService.getClientExpandedVisit();

			const visitLink = `visite client: <a href="/visit/${item.id}" class="text-blue-500">${expandedVisit.animal.client.name}</a>`;

			const description = desc.length ? `${desc}\n ${visitLink}` : visitLink;

			await billService.pay(
				amount,
				method as BillsMethodOptions,
				incash,
				outcash,
				description,
				user?.id ?? ''
			);

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
		}
	},

	addToilettage: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(addVisitItemsSchema), { id: 'add-toilettage' });

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id, items } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
			const billService = new BillService(pb, visit);

			if (!visit) {
				return setError(form, 'Visite non trouvée', { status: 500 });
			}

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
	},

	removeToilettage: async ({ locals: { pb }, request }) => {
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

			if (!visit) {
				return setError(form, 'Visite non trouvée', { status: 500 });
			}

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
	},

	addFile: async ({ locals: { pb }, request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(addVisitFileSchema), { id: 'add-file' });

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);

			if (!visit) {
				return setError(form, 'Visite non trouvée', { status: 500 });
			}

			await pb.collection('visits').update(id, form.data);

			return withFiles({ form });
		} catch (error) {
			console.error(error);

			return setError(form, "Échec de l'ajout du fichier", { status: 500 });
		}
	},

	removeFile: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(removeVisitFileSchema), { id: 'remove-file' });

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id, file } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);

			if (!visit) {
				return setError(form, 'Visite non trouvée', { status: 500 });
			}

			await pb.collection('visits').update(id, {
				...visit,
				'files-': file
			});

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
		}
	},

	updateDiagnostic: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(updateVisitDiagnosticSchema), {
			id: 'update-diagnostic'
		});

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id, observations } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);

			if (!visit) {
				return setError(form, 'Visite non trouvée', { status: 500 });
			}

			await pb.collection('visits').update(id, {
				...visit,
				observations
			});

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
		}
	},

	updateActions: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(updateVisitActionsSchema), {
			id: 'update-actions'
		});

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id, actions } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);

			if (!visit) {
				return setError(form, 'Visite non trouvée', { status: 500 });
			}

			await pb.collection('visits').update(id, {
				...visit,
				actions
			});

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
		}
	},

	addVisitStoreItem: async ({ locals: { pb }, request }) => {
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

			if (!visit) {
				return setError(form, 'Visite non trouvée', { status: 500 });
			}

			await pb.collection('visits').update(id, {
				...visit,
				'store_items+': items
			});

			items.forEach(async (itemId) => {
				await inventoryService.decreaseItemQuantity(itemId, 1);
			});

			await billService.update();

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
		}
	},

	removeVisitStoreItem: async ({ locals: { pb }, request }) => {
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

			if (!visit) {
				return setError(form, 'Visite non trouvée', { status: 500 });
			}

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
	},

	addMedicalActs: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(addVisitItemsSchema), { id: 'add-medical-acts' });

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id, items } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
			const billService = new BillService(pb, visit);

			if (!visit) {
				return setError(form, 'Visite non trouvée', { status: 500 });
			}

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
	},

	removeMedicalAct: async ({ locals: { pb }, request }) => {
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

			if (!visit) {
				return setError(form, 'Données invalides', { status: 400 });
			}

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
	},

	addSurgicalActs: async ({ locals: { pb }, request }) => {
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

			if (!visit) {
				return setError(form, 'Données invalides', { status: 400 });
			}

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
	},

	removeSurgicalAct: async ({ locals: { pb }, request }) => {
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

			if (!visit) {
				return setError(form, 'Données invalides', { status: 400 });
			}

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
	},

	updateHospit: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(updateVisitHospitalisationSchema), {
			id: 'update-hospit'
		});

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id, cage, end, start, note, treatment, price } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
			const billService = new BillService(pb, visit);

			if (!visit) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			if (visit.hospit) {
				await pb.collection('hospitalisation').update(visit.hospit, {
					cage,
					end,
					start,
					note,
					treatment,
					price
				});
			} else {
				const hospit = await pb.collection('hospitalisation').create({
					cage,
					end,
					start,
					note,
					treatment,
					visit: visit.id,
					price
				});

				await pb.collection('visits').update(id, {
					...visit,
					hospit: hospit.id
				});
			}

			await billService.update();

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
		}
	},

	removeHospit: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(removeSchema), { id: 'remove-hospit' });

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
			const billService = new BillService(pb, visit);

			if (!visit) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			if (visit.hospit) {
				await pb.collection('hospitalisation').delete(visit.hospit);
				await pb.collection('visits').update<VisitsResponse>(id, { ...visit, hospit: null });
				await billService.update();
			}

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
		}
	},

	updateTreatment: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(updateVisitTreatmentSchema), {
			id: 'update-treatment'
		});

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id, treatment } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);

			if (!visit) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			await pb.collection('visits').update(id, {
				...visit,
				treatment
			});

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
		}
	},

	updateVisitItem: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(updateVisitItemSchema), {
			id: 'update-visit-item'
		});

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id, discount, quantity, item, type } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse<ItemMetadata[]>>(id);

			if (!visit) {
				return setError(form, 'Données invalides', { status: 400 });
			}
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
	}
} satisfies Actions;
