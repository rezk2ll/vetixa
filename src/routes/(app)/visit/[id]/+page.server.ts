import { redirect, error } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type {
	ClinicalExamsResponse,
	MedicalActsResponse,
	SurgicalActsResponse,
	BillsMethodOptions,
	VisitsResponse,
	CagesResponse
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
	updateVisitSchema
} from '$lib/schemas/visit';
import type { RecordModel } from 'pocketbase';
import { message, superValidate, withFiles } from 'sveltekit-superforms/server';
import BillService from '$lib/services/bill';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async ({ params, locals: { pb } }) => {
	const { id } = params;

	try {
		const form = await superValidate(zod(updateVisitSchema), { id: 'update-visit' });
		const addExamForm = await superValidate(zod(addVisitItemsSchema), { id: 'add-exam' });
		const removeExamForm = await superValidate(zod(removeVisitItemSchema), { id: 'remove-exam' });
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

		const visitRecord = await pb.collection('visits').getOne<VisitsResponse>(id, {
			expand: 'medical_acts, clinical_exams, surgical_acts, animal, animal.client, hospit'
		});

		if (!visitRecord) {
			throw redirect(301, '/404');
		}

		const billService = new BillService(pb, visitRecord);
		const bill = await billService.get();

		const visit = {
			...visitRecord,
			animal: {
				...((visitRecord.expand as RecordModel)?.animal || {}),
				client: (visitRecord.expand as RecordModel)?.animal.expand.client || {}
			},
			medical_acts: (visitRecord.expand as RecordModel)?.medical_acts || [],
			clinical_exams: (visitRecord.expand as RecordModel)?.clinical_exams || [],
			surgical_acts: (visitRecord.expand as RecordModel)?.surgical_acts || [],
			hospit: (visitRecord.expand as RecordModel)?.hospit || {},
			bill,
			files: (visitRecord.files || []).map((file) => pb.files.getUrl(visitRecord, file))
		};

		const medicalActs = await pb.collection('medical_acts').getFullList<MedicalActsResponse>();
		const clinicalExams = await pb
			.collection('clinical_exams')
			.getFullList<ClinicalExamsResponse>();
		const surgicalActs = await pb.collection('surgical_acts').getFullList<SurgicalActsResponse>();
		const cages = await pb.collection('cages').getFullList<CagesResponse>();

		return {
			visit,
			bill,
			medicalActs,
			clinicalExams,
			surgicalActs,
			cages,
			form,
			addExamForm,
			removeExamForm,
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
			updateVisitHospitForm
		};
	} catch (err) {
		console.error(err);

		throw error(500, 'Failed to load visit');
	}
}) satisfies PageServerLoad;

export const actions = {
	updateVisit: async ({ locals: { pb }, request, params }) => {
		const form = await superValidate(request, zod(updateVisitSchema), { id: 'update-visit' });

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
		const form = await superValidate(request, zod(payVisitSchema), { id: 'pay-visit' });

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
		const form = await superValidate(request, zod(addVisitItemsSchema), { id: 'add-exam' });

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
		const form = await superValidate(request, zod(removeVisitItemSchema), { id: 'remove-exam' });

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
	},

	addFile: async ({ locals: { pb }, request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod(addVisitFileSchema), { id: 'add-file' });

		try {
			if (!form.valid) {
				throw Error('invalid data');
			}

			const { id } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);

			if (!visit) {
				throw Error('visit not found');
			}

			await pb.collection('visits').update(id, form.data);

			return withFiles({ form });
		} catch (error) {
			console.error(error);
		}
	},

	removeFile: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(removeVisitFileSchema), { id: 'remove-file' });

		try {
			if (!form.valid) {
				throw Error('invalid data');
			}

			const { id, file } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);

			if (!visit) {
				throw Error('visit not found');
			}

			await pb.collection('visits').update(id, {
				...visit,
				'files-': file
			});

			return { form };
		} catch (error) {
			console.error(error);
		}
	},

	updateDiagnostic: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(updateVisitDiagnosticSchema), {
			id: 'update-diagnostic'
		});

		try {
			if (!form.valid) {
				throw Error('invalid data');
			}

			const { id, observations } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);

			if (!visit) {
				throw Error('visit not found');
			}

			await pb.collection('visits').update(id, {
				...visit,
				observations
			});

			return { form };
		} catch (error) {
			console.error(error);
		}
	},

	updateActions: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(updateVisitActionsSchema), {
			id: 'update-actions'
		});

		try {
			if (!form.valid) {
				throw Error('invalid data');
			}

			const { id, actions } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);

			if (!visit) {
				throw Error('visit not found');
			}

			await pb.collection('visits').update(id, {
				...visit,
				actions
			});

			return { form };
		} catch (error) {
			console.error(error);
		}
	},

	addVisitStoreItem: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(addVisitItemsSchema), {
			id: 'add-visit-store-item'
		});

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
				'medical_acts+': items
			});

			await billService.update();

			return { form };
		} catch (error) {
			console.error(error);

			return message(form, 'Failed to add visit exam');
		}
	},

	removeVisitStoreItem: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(removeVisitItemSchema), {
			id: 'remove-visit-store-item'
		});

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
				'medical_acts-': item
			});

			await billService.update();

			return { form };
		} catch (error) {
			console.error(error);
		}
	},

	addMedicalActs: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(addVisitItemsSchema), { id: 'add-medical-acts' });

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
				'medical_acts+': items
			});

			await billService.update();

			return { form };
		} catch (error) {
			console.error(error);

			return message(form, 'Failed to add medical act');
		}
	},

	removeMedicalAct: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(removeVisitItemSchema), {
			id: 'remove-medical-act'
		});

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
				'medical_acts-': item
			});

			await billService.update();

			return { form };
		} catch (error) {
			console.error(error);
		}
	},

	addSurgicalActs: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(addVisitItemsSchema), {
			id: 'add-surgical-acts'
		});

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
				'surgical_acts+': items
			});

			await billService.update();

			return { form };
		} catch (error) {
			console.error(error);

			return message(form, 'Failed to add surgical act');
		}
	},

	removeSurgicalAct: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(removeVisitItemSchema), {
			id: 'remove-surgical-act'
		});

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
				'surgical_acts-': item
			});

			await billService.update();

			return { form };
		} catch (error) {
			console.error(error);
		}
	},

	updateHospit: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(updateVisitHospitalisationSchema), {
			id: 'update-hospit'
		});

		try {
			if (!form.valid) {
				throw Error('invalid data');
			}

			const { id, cage, end, start, note, treatment } = form.data;
			const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
			const billService = new BillService(pb, visit);

			if (!visit) {
				throw Error('visit not found');
			}

			if (visit.hospit) {
				await pb.collection('hospitalisation').update(visit.hospit, {
					cage,
					end,
					start,
					note,
					treatment
				});
			} else {
				const hospit = await pb.collection('hospitalisation').create({
					cage,
					end,
					start,
					note,
					treatment,
					visit: visit.id
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
		}
	}
} satisfies Actions;
