import { superValidate } from 'sveltekit-superforms/server';
import type { Actions, PageServerLoad } from './$types';
import { addFundsSchema } from '$lib/schemas';
import { fail, json } from '@sveltejs/kit';
import { isValid, parse } from 'date-fns';
import { getPreviousDays, getPreviousDaysLabels } from '$lib/utils/date';
import { FundsService } from '$lib/services/funds';
import { zod } from 'sveltekit-superforms/adapters';
import type { fundsStatusFilter } from '$types';

export const load: PageServerLoad = async ({ locals: { pb }, url: { searchParams } }) => {
	const addFundsForm = await superValidate(zod(addFundsSchema), { id: 'addFunds' });
	const addExpenses = await superValidate(zod(addFundsSchema), { id: 'addExpenses' });
	const fundsService = new FundsService(pb);

	let startDate = '@todayStart';
	let endDate = '@todayEnd';

	const urlStartDate = searchParams.get('startDate');
	const urlEndDate = searchParams.get('endDate');
	const page = parseInt(searchParams.get('page') || '1');
	const filter = (searchParams.get('filter') as fundsStatusFilter) || 'all';
	const query = searchParams.get('query') || '';

	const currentDate = new Date();

	const previousDates = getPreviousDays(currentDate);
	const labels = getPreviousDaysLabels(currentDate);
	const balanceData = await fundsService.getDatesBalance(previousDates);

	if (urlStartDate && urlEndDate) {
		const parsedStartDate = parse(urlStartDate, 'yyyy-MM-dd HH:mm', new Date());
		const parsedEndDate = parse(urlEndDate, 'yyyy-MM-dd HH:mm', new Date());

		if (isValid(parsedStartDate) && isValid(parsedEndDate)) {
			startDate = urlStartDate;
			endDate = urlEndDate;
		}
	}

	const pageTransactions = await fundsService.transactionPage(
		startDate,
		endDate,
		page,
		filter,
		query
	);

	const transactions = await fundsService.transactions(startDate, endDate);
	const stats = await fundsService.paymentMethodStats(transactions);

	return {
		addFundsForm,
		addExpenses,
		pageInfo: pageTransactions,
		labels,
		balanceData,
		stats
	};
};

export const actions: Actions = {
	addFunds: async ({ request, locals: { pb, user } }) => {
		const form = await superValidate(request, zod(addFundsSchema), { id: 'addFunds' });

		try {
			if (!form.valid) {
				return fail(400, { form });
			}

			await pb.collection('fund_transactions').create({
				...form.data,
				user: user?.id
			});
		} catch (error) {
			return fail(500, { form });
		}

		return { form };
	},

	addExpenses: async ({ request, locals: { pb, user } }) => {
		const form = await superValidate(request, zod(addFundsSchema), { id: 'addExpenses' });

		try {
			if (!form.valid) {
				return fail(400, { form });
			}

			const { amount } = form.data;

			await pb.collection('fund_transactions').create({
				...form.data,
				amount: -amount,
				user: user?.id
			});
		} catch (error) {
			console.error(json(error));
			return fail(500, { form });
		}

		return { form };
	}
};
