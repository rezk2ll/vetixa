import { redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type {
	ClinicalExamsResponse,
	MedicalActsResponse,
	SurgicalActsResponse,
	BillsMethodOptions,
	VisitsResponse
} from '$types';
import {
	addVisitItemsSchema,
	payVisitSchema,
	removeVisitItemSchema,
	updateVisitSchema
} from '$lib/schemas/visit';
import type { RecordModel } from 'pocketbase';
import { message, superValidate } from 'sveltekit-superforms/server';
import BillService from '$lib/services/bill';

export const load = (async ({ params, locals: { pb } }) => {
	const { id } = params;

	try {
		const form = await superValidate(updateVisitSchema, { id: 'update-visit' });
		const addExamForm = await superValidate(addVisitItemsSchema, { id: 'add-exam' });
		const removeExamForm = await superValidate(removeVisitItemSchema, { id: 'remove-exam' });
		const visitRecord = await pb.collection('visits').getOne<VisitsResponse>(id, {
			expand: 'medical_acts, clinical_exams, surgical_acts, animal'
		});

		if (!visitRecord) {
			throw redirect(301, '/404');
		}

		const billService = new BillService(pb, visitRecord);
		const bill = await billService.get();

		const visit = {
			...visitRecord,
			animal: (visitRecord.expand as RecordModel)?.animal || {},
			medical_acts: (visitRecord.expand as RecordModel)?.medical_acts || [],
			clinical_exams: (visitRecord.expand as RecordModel)?.clinical_exams || [],
			surgical_acts: (visitRecord.expand as RecordModel)?.surgical_acts || [],
			bill
		};

		const medicalActs = await pb.collection('medical_acts').getFullList<MedicalActsResponse>();
		const clinicalExams = await pb
			.collection('clinical_exams')
			.getFullList<ClinicalExamsResponse>();
		const surgicalActs = await pb.collection('surgical_acts').getFullList<SurgicalActsResponse>();

		return {
			visit,
			bill,
			medicalActs,
			clinicalExams,
			surgicalActs,
			form,
			addExamForm,
			removeExamForm
		};
	} catch (err) {
		console.error(err);

		throw error(500, 'Failed to load visit');
	}
}) satisfies PageServerLoad;

export const actions = {
	updateVisit: async ({ locals: { pb }, request, params }) => {
		const form = await superValidate(request, updateVisitSchema, { id: 'update-visit' });

		try {
			if (!form.valid) {
				return message(form, 'Failed to update visit');
			}

			const { id } = params;

			await pb.collection('visits').update(id, form.data);

			return { form };
		} catch (error) {
			return message(form, 'Failed to update visit');
		}
	},

	addPayment: async ({ locals: { pb, user }, request }) => {
		const form = await superValidate(request, payVisitSchema, { id: 'pay-visit' });

		try {
			if (!form.valid) {
				throw Error('invalid data');
			}

			const { amount, id, incash, method, outcash, description } = form.data;
			const item = await pb.collection('visits').getOne<VisitsResponse>(id);

			if (!item) {
				throw Error('visit not found');
			}

			const billService = new BillService(pb, item);

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

			return message(form, 'Failed to update visit payment');
		}
	},

	addExams: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, addVisitItemsSchema, { id: 'add-exam' });

		try {
			if (!form.valid) {
				throw Error('invalid data');
			}

			const { id, items } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
			const billService = new BillService(pb, visit);

			if (!visit) {
				throw Error('visit not found');
			}

			await pb.collection('visits').update(id, {
				...visit,
				'clinical_exams+': items
			});

			await billService.update();

			return { form };
		} catch (error) {
			console.error(error);

			return message(form, 'Failed to add visit exam');
		}
	},

	removeExam: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, removeVisitItemSchema, { id: 'remove-exam' });

		try {
			if (!form.valid) {
				throw Error('invalid data');
			}

			const { id, item } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
			const billService = new BillService(pb, visit);

			if (!visit) {
				throw Error('visit not found');
			}

			await pb.collection('visits').update(id, {
				...visit,
				'clinical_exams-': item
			});

			await billService.update();

			return { form };
		} catch (error) {
			console.error(error);
		}
	}
} satisfies Actions;
