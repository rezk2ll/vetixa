import { message, superValidate } from 'sveltekit-superforms/server';
import type {
	AnimalsResponse,
	ClientsResponse,
	QueueResponse,
	VisitsResponse
} from '../../../pocketbase-types';
import type { Actions, PageServerLoad } from './$types';
import { updateQueueSchema } from '$lib/schemas';
import type { RecordModel } from 'pocketbase';
import { redirect, type Redirect } from '@sveltejs/kit';

export const load = (async ({ locals: { pb } }) => {
	const form = await superValidate(updateQueueSchema);

	const queueList = await pb.collection('queue').getFullList<QueueResponse>({
		// filter: 'created >= @todayStart && created <= @todayEnd',
		expand: 'visit, visit.animal, visit.animal.client'
	});

	const queue = queueList.map((item) => ({
		...item,
		visit: {
			...((item.expand as RecordModel).visit as VisitsResponse),
			animal: {
				...(((item.expand as RecordModel).visit.expand as RecordModel).animal as AnimalsResponse),
				client: {
					...((
						((item.expand as RecordModel).visit.expand as RecordModel).animal.expand as RecordModel
					).client as ClientsResponse)
				}
			}
		}
	}));

	return { queue, form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, updateQueueSchema);

		try {
			if (!form.valid) {
				return message(form, 'Failed to update queue');
			}

			const item = await pb
				.collection('queue')
				.getFirstListItem<QueueResponse>(`id = "${form.data.id}"`);

			if (!item.served) {
				await pb.collection('queue').update(form.data.id, {
					served: true
				});
			}

			throw redirect(301, `/visit/${form.data.id}`);
		} catch (error) {
			if ((error as Redirect).location) {
				throw error;
			}

			console.log({ error });

			return message(form, 'Failed to update queue');
		}
	}
};
