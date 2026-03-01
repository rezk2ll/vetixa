import { redirect, error, isRedirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type {
	MedicalActsResponse,
	SurgicalActsResponse,
	VisitsResponse,
	CagesResponse,
	InventoryItemResponse,
	Visit,
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
import { setError, superValidate } from 'sveltekit-superforms/server';
import BillService from '$lib/services/bill';
import { zod } from 'sveltekit-superforms/adapters';
import { removeSchema } from '$lib/schemas';
import { cageCompare } from '$utils/cage';
import { unknownClient } from '$utils/client';
import { unknownAnimal } from '$lib/utils/animal';
import { updateHospitCompletedStateSchema } from '$lib/schemas/hospit';
import { buildFileProxyUrl } from '$utils/file';

import { addPayment } from './visit-billing-actions';
import {
	addToilettage,
	removeToilettage,
	addMedicalActs,
	removeMedicalAct,
	addSurgicalActs,
	removeSurgicalAct,
	addVisitStoreItem,
	removeVisitStoreItem,
	updateVisitItem
} from './visit-item-actions';
import { updateDiagnostic, updateActions, updateTreatment } from './visit-clinical-actions';
import { addFile, removeFile } from './visit-file-actions';
import { updateHospit, removeHospit } from './visit-hospit-actions';

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
		const addSurgicalActsForm = await superValidate(zod(addVisitItemsSchema), {
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
			redirect(301, '/404');
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
			files: (visitRecord.files || []).map((file) =>
				buildFileProxyUrl(visitRecord.collectionId, visitRecord.id, file)
			)
		} as Visit;

		// Parallelize independent queries for better performance
		const [medicalActs, toilettage, surgicalActs, storeItems, cagesResult, doctors, generatedBill] =
			await Promise.all([
				pb.collection('medical_acts').getFullList<MedicalActsResponse>(),
				pb.collection('toilettage').getFullList<ToilettageResponse>(),
				pb.collection('surgical_acts').getFullList<SurgicalActsResponse>(),
				pb.collection('inventory_item').getFullList<InventoryItemResponse>({
					filter: 'quantity > 0'
				}),
				pb.collection('available_cages').getFullList<CagesResponse>(),
				pb.collection('doctors').getFullList<DoctorsResponse>(),
				billService.generateBill()
			]);

		let cages = cagesResult.sort(cageCompare);

		if (visit.hospit && visit.hospit.cage) {
			currentCage = await pb.collection('cages').getOne<CagesResponse>(visit.hospit.cage);
			if (currentCage && cages.findIndex(({ code }) => code === currentCage?.code) === -1) {
				cages = [currentCage, ...cages];
			}
		}

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
			addSurgicalActsForm,
			removeSurgicalActForm,
			updateVisitHospitForm,
			generatedBill,
			removeVisitHospitForm,
			updateVisitTreatmentForm,
			updateVisitItemForm,
			updateHospitCompeltedStateForm
		};
	} catch (err) {
		if (isRedirect(err)) {
			throw err;
		}
		console.error(err);

		error(500, 'Impossible de charger la visite');
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

			await pb.collection('visits').getOne<VisitsResponse>(id);
			const updated = await pb.collection('visits').update<VisitsResponse>(id, form.data);

			const billService = new BillService(pb, updated);
			await billService.update();

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la mise à jour de la visite');
		}
	},

	addPayment,
	addToilettage,
	removeToilettage,
	addMedicalActs,
	removeMedicalAct,
	addSurgicalActs,
	removeSurgicalAct,
	addVisitStoreItem,
	removeVisitStoreItem,
	updateVisitItem,
	updateDiagnostic,
	updateActions,
	updateTreatment,
	addFile,
	removeFile,
	updateHospit,
	removeHospit
} satisfies Actions;
