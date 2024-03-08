import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { ClinicalExamsResponse, MedicalActsResponse, SurgicalActsResponse } from '$root/types';
import type { RecordModel } from 'pocketbase';
import { updateVisitSchema } from '$lib/schemas/visit';
import { superValidate } from 'sveltekit-superforms/server';

export const load = (async ({ params, locals: { pb } }) => {
	const { id } = params;

	const vistRecord = await pb.collection('visits').getOne(id, {
		expand: 'medical_acts, clinical_exams, surgical_acts, animal'
	});

	console.log({ vistRecord  });

	const form = await superValidate(updateVisitSchema, { id: 'update-visit' });

	if (!vistRecord) {
		throw redirect(301, '/404');
	}

	const visit = {
		...vistRecord,
		animal: (vistRecord.expand as RecordModel)?.animal || {},
		medical_acts: (vistRecord.expand as RecordModel)?.medical_acts || [],
		clinical_exams: (vistRecord.expand as RecordModel)?.clinical_exams || [],
		surgical_acts: (vistRecord.expand as RecordModel)?.surgical_acts || []
	};

	const medicalActs = await pb.collection('medical_acts').getFullList<MedicalActsResponse>();
	const clinicalExams = await pb.collection('clinical_exams').getFullList<ClinicalExamsResponse>();
	const surgicalActs = await pb.collection('surgical_acts').getFullList<SurgicalActsResponse>();

	return {
		visit,
		medicalActs,
		clinicalExams,
		surgicalActs,
		form
	};
}) satisfies PageServerLoad;
