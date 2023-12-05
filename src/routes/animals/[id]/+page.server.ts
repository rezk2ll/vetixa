import prisma from '$lib/prisma';
import { redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const id = +params.id;

	if (isNaN(id)) {
		throw redirect(301, '/404');
	}

	const animal = await prisma.animal.findUnique({
		where: { id },
		include: {
			visits: {
				include: { Bill: true, clinical_exams: true, surgical_acts: true, medical_acts: true }
			}
		}
	});

	const medicalActs = await prisma.medicalAct.findMany({});
	const clinicalExams = await prisma.clinicalExams.findMany();
	const surgicalActs = await prisma.surgicalAct.findMany();

	if (!animal) {
		throw redirect(301, '/404');
	}

	return { animal, medicalActs, clinicalExams, surgicalActs };
};

export const actions: Actions = {
	addVisit: async ({ request, params }) => {
		const id = +params.id;
		if (isNaN(id)) {
			throw redirect(301, '/404');
		}

		const data = await request.formData();

		const motif = data.get('motif') as string;
		const clinicalExams = data.get('clinical_exams') as string;
		const surgicalActs = data.get('surgical_acts') as string;
		const medicalActs = data.get('medical_acts') as string;
		const actions = data.get('actions') as string;
		const observations = data.get('observations') as string;

		const relatedClinicalExams = clinicalExams ? JSON.parse(clinicalExams) : [];
		const relatedSurgicalActs = surgicalActs ? JSON.parse(surgicalActs) : [];
		const relatedMedicalActs = medicalActs ? JSON.parse(medicalActs) : [];

		await prisma.visit.create({
			data: {
				animalId: id,
				motif,
				Bill: {
					create: {
						method: 'cash',
						paid: false
					}
				},
				clinical_exams: {
					connect: relatedClinicalExams
				},
				medical_acts: {
					connect: relatedSurgicalActs
				},
				surgical_acts: {
					connect: relatedMedicalActs
				},
				observations,
				actions
			}
		});
	}
};
