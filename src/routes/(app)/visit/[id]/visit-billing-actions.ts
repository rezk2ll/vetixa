import type { RequestEvent } from './$types';
import type { VisitsResponse, BillsMethodOptions } from '$types';
import { payVisitSchema } from '$lib/schemas/visit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import BillService from '$lib/services/bill';

export const addPayment = async ({ locals: { pb, user }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(payVisitSchema), { id: 'pay-visit' });

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { amount, id, incash, method, outcash, description: desc } = form.data;
		const item = await pb.collection('visits').getOne<VisitsResponse>(id);
		const billService = new BillService(pb, item);
		const expandedVisit = await billService.getClientExpandedVisit();

		const visitLink = `visite client: <a href="/visit/${item.id}" class="text-blue-500">${expandedVisit.animal.client.name}</a>`;

		const description = desc.length ? `${desc}\n ${visitLink}` : visitLink;

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

		return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
	}
};
