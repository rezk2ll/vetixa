import { removeSchema, updateAnimalSchema } from '$lib/schemas';
import { superValidate, message } from 'sveltekit-superforms/server';
import type { AnimalStatusFilter, AnimalsPageInfo, AnimalsResponse, ClientsResponse } from '$types';
import type { Actions, PageServerLoad } from './$types';
import type { RecordModel } from 'pocketbase';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ locals: { pb }, url: { searchParams } }) => {
	const page = parseInt(searchParams.get('page') || '1');
	const query = searchParams.get('query') || '';
	const filter = (searchParams.get('filter') as AnimalStatusFilter) || 'all';

	const collection =
		filter === 'chat'
			? 'animals_cats_list'
			: filter === 'chien'
			? 'animals_dogs_list'
			: filter === 'male'
			? 'animals_male_list'
			: filter === 'female'
			? 'animals_female_list'
			: 'animals';
	const queryFilter = `name ~ "${query}" || type ~ "${query}" ||  breed ~ "${query}" || client.name ~ "${query}" || identifier ~ "${query}"`;

	const animalsPage = await pb.collection(collection).getList<AnimalsResponse>(page, 10, {
		sort: '-created',
		expand: 'client',
		filter: queryFilter
	});

	const items = animalsPage.items.map((animal) => ({
		...animal,
		client: ((animal.expand as RecordModel).client as ClientsResponse).name || ''
	}));

	const removeForm = await superValidate(zod(removeSchema), { id: 'remove-animal' });
	const updateForm = await superValidate(zod(updateAnimalSchema), { id: 'update-animal' });

	const dogsCount = await pb
		.collection('animals')
		.getList(1, 1, { filter: `(${queryFilter}) && type = "chien"` });
	const catsCount = await pb
		.collection('animals')
		.getList(1, 1, { filter: `(${queryFilter}) && type = "chat"` });
	const maleCount = await pb
		.collection('animals')
		.getList(1, 1, { filter: `(${queryFilter}) && sex = "male"` });
	const femaleCount = await pb
		.collection('animals')
		.getList(1, 1, { filter: `(${queryFilter}) && sex = "female"` });
	const allCount = await pb.collection('animals').getList(1, 1);

	return {
		removeForm,
		updateForm,
		pageInfo: {
			...animalsPage,
			items,
			query,
			filter,
			count: {
				all: allCount.totalItems ?? 0,
				cats: catsCount.totalItems ?? 0,
				dogs: dogsCount.totalItems ?? 0,
				male: maleCount.totalItems ?? 0,
				female: femaleCount.totalItems ?? 0
			}
		} satisfies AnimalsPageInfo
	};
};

export const actions: Actions = {
	removeAnimal: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(removeSchema), { id: 'remove-animal' });
		try {
			if (!form.valid) {
				return message(form, 'Failed to delete animal');
			}

			await pb.collection('animals').delete(form.data.id);
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to delete animal');
		}

		return { form };
	},

	updateAnimal: async ({ request, locals: { pb } }) => {
		const form = await superValidate(request, zod(updateAnimalSchema), { id: 'update-animal' });

		try {
			if (!form.valid) {
				return message(form, 'Failed to update animal');
			}

			await pb.collection('animals').update(form.data.id, form.data);
		} catch (error) {
			console.error(error);
			return message(form, 'Failed to update animal');
		}

		return { form };
	}
};
