import { redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type {
	FundTransactionsRecord,
	BillsResponse,
	ClinicalExamsResponse,
	MedicalActsResponse,
	SurgicalActsResponse,
	FundTransactionsMethodOptions,
	BillsRecord,
	BillsMethodOptions
} from '$types';
import type { RecordModel } from 'pocketbase';
import { payVisitSchema, updateVisitSchema } from '$lib/schemas/visit';
import { message, superValidate } from 'sveltekit-superforms/server';

export const load = (async ({ params, locals: { pb } }) => {
	const { id } = params;

	try {
		const visitRecord = await pb.collection('visits').getOne(id, {
			expand: 'medical_acts, clinical_exams, surgical_acts, animal'
		});

		const form = await superValidate(updateVisitSchema, { id: 'update-visit' });

		if (!visitRecord) {
			throw redirect(301, '/404');
		}

		const visit = {
			...visitRecord,
			animal: (visitRecord.expand as RecordModel)?.animal || {},
			medical_acts: (visitRecord.expand as RecordModel)?.medical_acts || [],
			clinical_exams: (visitRecord.expand as RecordModel)?.clinical_exams || [],
			surgical_acts: (visitRecord.expand as RecordModel)?.surgical_acts || []
		};

		const bill = await pb
			.collection('bills')
			.getFirstListItem<BillsResponse>(`visit = "${visitRecord.id}"`);
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
			form
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
			const item = await pb.collection('visits').getOne<BillsResponse>(id);

			if (!item) {
				throw Error('visit not found');
			}

			if (item.paid) {
				throw Error('visit already paid');
			}

			const bill = await pb.collection('bills').getFirstListItem<BillsResponse>(`visit = "${id}"`);
			const paid = bill.total - amount === 0;
			const totalPaid = bill.total_paid + amount;

			await pb.collection('bills').update(bill.id, {
				...bill,
				paid,
				total_paid: totalPaid,
				method: method as BillsMethodOptions
			} satisfies BillsRecord);

			await pb.collection('fund_transactions').create({
				amount,
				method: method as FundTransactionsMethodOptions,
				outcash,
				incash,
				description,
				user: user?.id
			} satisfies FundTransactionsRecord);

			return { form };
		} catch (error) {
			return message(form, 'Failed to update visit payment');
		}
	}
} satisfies Actions;
