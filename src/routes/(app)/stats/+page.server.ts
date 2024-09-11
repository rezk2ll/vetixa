import { isValid, parse } from 'date-fns';
import type { PageServerLoad } from './$types';
import { SalesService } from '$lib/services/sale';
import { StatsService } from '$lib/services/stats';

export const load = (async ({ locals: { pb }, url: { searchParams } }) => {
	let startDate = '@monthStart';
	let endDate = '@monthEnd';

	const urlStartDate = searchParams.get('startDate');
	const urlEndDate = searchParams.get('endDate');

	if (urlStartDate && urlEndDate) {
		const parsedStartDate = parse(urlStartDate, 'yyyy-MM-dd HH:mm', new Date());
		const parsedEndDate = parse(urlEndDate, 'yyyy-MM-dd HH:mm', new Date());

		if (isValid(parsedStartDate) && isValid(parsedEndDate)) {
			startDate = urlStartDate;
			endDate = urlEndDate;
		}
	}

	const salesService = new SalesService(pb);
	const statsService = new StatsService(pb);

	const items = await salesService.list(startDate, endDate);
	const stats = await statsService.getActsStats(startDate, endDate);

	return { page: { items, startDate, endDate }, stats };
}) satisfies PageServerLoad;
