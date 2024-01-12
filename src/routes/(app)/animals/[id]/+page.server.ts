import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type {
	MedicalActsResponse,
	AnimalsResponse,
	ClinicalExamsResponse,
	SurgicalActsResponse,
	BillsRecord,
	VisitsResponse,
	QueueRecord
} from '../../../../pocketbase-types';
import type { RecordModel } from 'pocketbase';

export const load: PageServerLoad = async ({ params, locals: { pb } }) => {
	const { id } = params;

	const animal = await pb.collection('animals').getOne(id, {
		expand: 'visits(animal)'
	});

	const visits = await Promise.all(
		(animal.expand?.['visits(animal)'] || []).map(async (visit: VisitsResponse) => {
			const expandedVisit = await pb.collection('visits').getOne<VisitsResponse>(visit.id, {
				expand: 'medical_acts, clinical_exams, surgical_acts'
			});

			return {
				...(expandedVisit as VisitsResponse),
				medical_acts: (expandedVisit.expand as RecordModel)?.medical_acts || [],
				clinical_exams: (expandedVisit.expand as RecordModel)?.clinical_exams || [],
				surgical_acts: (expandedVisit.expand as RecordModel)?.surgical_acts || []
			};
		})
	);

	const expandedAnimal = {
		...(animal as AnimalsResponse),
		visits
	};

	const medicalActs = await pb.collection('medical_acts').getFullList<MedicalActsResponse>();
	const clinicalExams = await pb.collection('clinical_exams').getFullList<ClinicalExamsResponse>();
	const surgicalActs = await pb.collection('surgical_acts').getFullList<SurgicalActsResponse>();

	if (!animal) {
		throw redirect(301, '/404');
	}

	return { animal: expandedAnimal, medicalActs, clinicalExams, surgicalActs };
};

export const actions: Actions = {
	addVisit: async ({ request, params, locals: { pb } }) => {
		const { id } = params;

		const data = Object.fromEntries(await request.formData()) as {
			motif: string;
			clinical_exams: string;
			surgical_acts: string;
			medical_acts: string;
			actions: string;
			observations: string;
		};

		const {
			motif,
			actions,
			observations,
			clinical_exams: clinicalExams,
			surgical_acts: surgicalActs,
			medical_acts: medicalActs
		} = data;

		const relatedClinicalExams = clinicalExams ? JSON.parse(clinicalExams) : [];
		const relatedSurgicalActs = surgicalActs ? JSON.parse(surgicalActs) : [];
		const relatedMedicalActs = medicalActs ? JSON.parse(medicalActs) : [];

		const animal = await pb.collection('animals').getOne(id);

		if (!animal) {
			throw redirect(301, '/404');
		}

		const visit = await pb.collection('visits').create<VisitsResponse>({
			actions,
			observations,
			motif,
			animal: id,
			clinical_exams: relatedClinicalExams,
			surgical_acts: relatedSurgicalActs,
			medical_acts: relatedMedicalActs,
			date: Date.now()
		});

		await pb.collection('queue').create<QueueRecord>({
			visit: visit.id,
			served: false
		});

		await pb.collection('bills').create<BillsRecord>({
			visit: visit.id,
			method: 'cash',
			paid: false
		});
	}
};
