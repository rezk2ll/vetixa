import { setError, superValidate } from 'sveltekit-superforms/server';
import type {
	AnimalsResponse,
	BillsResponse,
	ClientsResponse,
	QueueResponse,
	VisitsResponse
} from '$types';
import type { Actions, PageServerLoad } from './$types';
import { updateQueueSchema } from '$lib/schemas';
import type { RecordModel } from 'pocketbase';
import { redirect, type Redirect } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async ({ locals: { pb } }) => {
	const form = await superValidate(zod(updateQueueSchema));

	const queueList = await pb.collection('queue').getFullList<QueueResponse>({
		filter: 'created >= @todayStart && created <= @todayEnd',
		expand: 'visit, visit.animal, visit.animal.client'
	});

	const list = await Promise.all(
		queueList.map(async (item) => {
			try {
				const bill = await pb
					.collection('bills')
					.getFirstListItem<BillsResponse>(`visit = "${item.visit}"`);

				const expansion = item.expand as RecordModel;
				if (!expansion || !expansion.visit) {
					throw Error('anomaly: visit not found');
				}

				const visit = expansion.visit as VisitsResponse;
				const visitExpansion = visit.expand as RecordModel;
				if (!visitExpansion || !visitExpansion.animal) {
					throw Error('anomaly: animal not found');
				}
				const animal = visitExpansion.animal as AnimalsResponse;
				const animalExpansion = animal.expand as RecordModel;
				if (!animalExpansion || !animalExpansion.client) {
					throw Error('anomaly: client not found');
				}
				const client = animalExpansion.client as ClientsResponse;

				return {
					...item,
					visit: {
						...visit,
						bill,
						animal: {
							...animal,
							client
						}
					}
				};
			} catch (error) {
				console.error(error);
			}
		})
	);

	const queue = list.filter(Boolean);

	return { queue, form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(updateQueueSchema));

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const item = await pb
				.collection('queue')
				.getFirstListItem<QueueResponse>(`id = "${form.data.id}"`);

			if (!item.served) {
				await pb.collection('queue').update(form.data.id, {
					served: true
				});
			}

			throw redirect(301, `/visit/${item.visit}`);
		} catch (error) {
			if ((error as Redirect).location) {
				throw error;
			}

			console.error(error);

			return setError(form, "Échec de la mise à jour de la file d'attente", { status: 500 });
		}
	}
};
