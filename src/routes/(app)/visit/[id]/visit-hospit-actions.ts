import type { RequestEvent } from './$types';
import type { VisitsResponse } from '$types';
import { updateVisitHospitalisationSchema } from '$lib/schemas/visit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { removeSchema } from '$lib/schemas';
import BillService from '$lib/services/bill';

export const updateHospit = async ({ locals: { pb }, request }: RequestEvent) => {
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
};

export const removeHospit = async ({ locals: { pb }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(removeSchema), { id: 'remove-hospit' });

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse>(id);
		const billService = new BillService(pb, visit);

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
};
