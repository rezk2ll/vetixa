import type { RequestEvent } from './$types';
import type { VisitsResponse } from '$types';
import {
	updateVisitDiagnosticSchema,
	updateVisitActionsSchema,
	updateVisitTreatmentSchema
} from '$lib/schemas/visit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';

export const updateDiagnostic = async ({ locals: { pb }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(updateVisitDiagnosticSchema), {
		id: 'update-diagnostic'
	});

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id, observations } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse>(id);

		await pb.collection('visits').update(id, {
			...visit,
			observations
		});

		return { form };
	} catch (error) {
		console.error(error);

		return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
	}
};

export const updateActions = async ({ locals: { pb }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(updateVisitActionsSchema), {
		id: 'update-actions'
	});

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id, actions } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse>(id);

		await pb.collection('visits').update(id, {
			...visit,
			actions
		});

		return { form };
	} catch (error) {
		console.error(error);

		return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
	}
};

export const updateTreatment = async ({ locals: { pb }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(updateVisitTreatmentSchema), {
		id: 'update-treatment'
	});

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id, treatment } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse>(id);

		await pb.collection('visits').update(id, {
			...visit,
			treatment
		});

		return { form };
	} catch (error) {
		console.error(error);

		return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
	}
};
