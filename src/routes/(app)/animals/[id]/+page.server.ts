import { redirect, type Redirect } from '@sveltejs/kit';
import type { Actions, PageServerLoad } from './$types';
import type {
	AnimalsResponse,
	BillsRecord,
	VisitsResponse,
	QueueRecord,
	ClientsResponse,
	BillsResponse,
	AnimalVisit
} from '$types';
import type { RecordModel } from 'pocketbase';
import { updateAnimalSchema } from '$lib/schemas';
import { superValidate, setError } from 'sveltekit-superforms/client';
import { addVisitSchema, updateVisitSchema } from '$lib/schemas/visit';
import { zod } from 'sveltekit-superforms/adapters';
import { unknownClient } from '$utils/client';

export const load: PageServerLoad = async ({ params, locals: { pb }, url }) => {
	const { id } = params;
	const isNew = url.searchParams.get('new') === 'true';

	const addForm = await superValidate(zod(addVisitSchema), { id: 'add-visit' });
	const updateForm = await superValidate(zod(updateVisitSchema), { id: 'update-visit' });
	const form = await superValidate(zod(updateAnimalSchema), { id: 'update-animal' });

	const animal = await pb.collection('animals').getOne<AnimalsResponse>(id, {
		expand: 'visits_via_animal, client'
	});

	if (!animal) {
		throw redirect(301, '/404');
	}

	const visits = await Promise.all(
		(((animal.expand as RecordModel)?.['visits_via_animal'] as VisitsResponse[]) || []).map(
			async (visit: VisitsResponse) => {
				const bill = await pb
					.collection('bills')
					.getFirstListItem<BillsResponse>(`visit="${visit.id}"`);

				return {
					...visit,
					animal: {
						...animal,
						client: ((animal.expand as RecordModel)?.client as ClientsResponse) || unknownClient
					},
					bill
				} satisfies AnimalVisit;
			}
		)
	);

	const expandedAnimal = {
		...(animal as AnimalsResponse),
		visits,
		client: ((animal.expand as RecordModel)?.client as ClientsResponse) || unknownClient
	};

	const vaccinationVisits = visits.filter(({ vaccination }) => vaccination);

	return {
		animal: expandedAnimal,
		form,
		isNew,
		addForm,
		updateForm,
		vaccinationVisits
	};
};

export const actions: Actions = {
	addVisit: async ({ request, params, locals: { pb } }) => {
		const form = await superValidate(request, zod(addVisitSchema), { id: 'add-visit' });

		try {
			const { id } = params;
			const animal = await pb.collection('animals').getOne(id);

			if (!animal || !animal.id) {
				return setError(form, 'Animal introuvable', { status: 404 });
			}

			if (!form.valid) {
				return setError(form, 'Données invalides');
			}

			const { control, motif, vaccination } = form.data;

			const visit = await pb.collection('visits').create<VisitsResponse>({
				motif,
				control,
				vaccination,
				animal: id,
				date: Date.now()
			});

			if (!visit || !visit.id) {
				return setError(form, 'Échec de la création de la visite', { status: 500 });
			}

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

			return setError(form, 'Échec de la création de la visite');
		}
	},

	updateAnimal: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(updateAnimalSchema), { id: 'update-animal' });

		try {
			if (!form.valid) {
				return setError(form, 'Failed to update animal');
			}

			const { id } = form.data;
			const animal = await pb.collection('animals').getOne(id);

			if (!animal || !animal.id) {
				return setError(form, 'Animal introuvable', { status: 404 });
			}

			await pb.collection('animals').update(form.data.id, form.data);

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, "Échec de la mise à jour de l'animal");
		}
	}
};
