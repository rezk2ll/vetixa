import type { AnimalsResponse, ClientsResponse, SearchEntityType } from '$types';
import type { RecordModel } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { pb }, url: { searchParams } }) => {
	const page = parseInt(searchParams.get('page') ?? '1');
	const query = searchParams.get('query') ?? '';
	const target = searchParams.get('target') as SearchEntityType;

	const searchCollection = target === 'animal' ? 'animals' : 'clients';
	const searchFilter =
		target === 'animal'
			? `name ~ "${query}" || identifier ~ "${query}" || type ~ "${query}" || breed ~ "${query}"`
			: `name ~ "${query}" || tel ~ "${query}" || email ~ "${query}" || address ~ "${query}"`;
	const searchExpand = target === 'animal' ? `client` : `animals(client)`;

	const results = await pb
		.collection(searchCollection)
		.getList<AnimalsResponse | ClientsResponse>(page, 10, {
			filter: searchFilter,
			expand: searchExpand
		});

	let items = results.items;

	if (target === 'animal') {
		items = items.map((animal) => ({
			...animal,
			client: ((animal.expand as RecordModel).client as ClientsResponse).name || ''
		}));
	}

	return {
		...results,
		target,
		items,
		query
	};
}) satisfies PageServerLoad;
