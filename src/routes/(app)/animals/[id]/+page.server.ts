import { redirect, type Redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type {
	MedicalActsResponse,
	AnimalsResponse,
	ClinicalExamsResponse,
	SurgicalActsResponse,
	BillsRecord,
	VisitsResponse,
	QueueRecord,
	ClientsResponse
} from '$types';
import type { RecordModel } from 'pocketbase';
import { removeSchema, updateAnimalSchema } from '$lib/schemas';
import { superValidate, message } from 'sveltekit-superforms/client';
import { addVisitSchema, updateVisitSchema } from '$lib/schemas/visit';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ params, locals: { pb }, url }) => {
	const { id } = params;
	const isNew = url.searchParams.get('new') === 'true';

	const addForm = await superValidate(zod(addVisitSchema), { id: 'add-visit' });
	const updateForm = await superValidate(zod(updateVisitSchema), { id: 'update-visit' });
	const deleteForm = await superValidate(zod(removeSchema), { id: 'delete-visit' });
	const form = await superValidate(zod(updateAnimalSchema), { id: 'update-animal' });

	const animal = await pb.collection('animals').getOne(id, {
		expand: 'visits(animal), client'
	});

	const visits = await Promise.all(
		(animal.expand?.['visits(animal)'] || []).map(async (visit: VisitsResponse) => {
			const expandedVisit = await pb.collection('visits').getOne<VisitsResponse>(visit.id, {
				expand: 'medical_acts, clinical_exams, surgical_acts'
			});

			const bill = await pb.collection('bills').getFirstListItem(`visit="${visit.id}"`);

			return {
				...(expandedVisit as VisitsResponse),
				animal,
				medical_acts: (expandedVisit.expand as RecordModel)?.medical_acts || [],
				clinical_exams: (expandedVisit.expand as RecordModel)?.clinical_exams || [],
				surgical_acts: (expandedVisit.expand as RecordModel)?.surgical_acts || [],
				bill
			};
		})
	);

	const expandedAnimal = {
		...(animal as AnimalsResponse),
		visits,
		client: ((animal.expand as RecordModel)?.client as ClientsResponse).name || ''
	};

	const medicalActs = await pb.collection('medical_acts').getFullList<MedicalActsResponse>();
	const clinicalExams = await pb.collection('clinical_exams').getFullList<ClinicalExamsResponse>();
	const surgicalActs = await pb.collection('surgical_acts').getFullList<SurgicalActsResponse>();

	if (!animal) {
		throw redirect(301, '/404');
	}

	return {
		animal: expandedAnimal,
		medicalActs,
		clinicalExams,
		surgicalActs,
		form,
		isNew,
		addForm,
		updateForm,
		deleteForm
	};
};

export const actions: Actions = {
	addVisit: async ({ request, params, locals: { pb } }) => {
		const form = await superValidate(request, zod(addVisitSchema), { id: 'add-visit' });

		try {
			const { id } = params;

			const animal = await pb.collection('animals').getOne(id);

			if (!animal) {
				throw redirect(301, '/404');
			}

			if (!form.valid) {
				return message(form, 'Failed to add visit');
			}

			const visit = await pb.collection('visits').create<VisitsResponse>({
				motif: form.data.motif,
				animal: id,
				date: Date.now()
			});

			await pb.collection('queue').create<QueueRecord>({
				visit: visit.id,
				served: false
			});

			await pb.collection('bills').create<BillsRecord>({
				visit: visit.id,
				paid: false,
				total_paid: 0
			});

			throw redirect(303, `/queue`);
		} catch (error) {
			if ((error as Redirect).location) {
				throw error;
			}

			console.error(error);

			return message(form, 'Failed to add visit');
		}
	},

	updateAnimal: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(updateAnimalSchema), { id: 'update-animal' });

		try {
			if (!form.valid) {
				return message(form, 'Failed to update animal');
			}

			await pb.collection('animals').update(form.data.id, form.data);
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to update animal');
		}

		return { form };
	}
};
