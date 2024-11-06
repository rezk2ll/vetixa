import { removeSchema, updateAnimalSchema } from '$lib/schemas';
import { superValidate, setError } from 'sveltekit-superforms/server';
import type { AnimalStatusFilter, AnimalsPageInfo, AnimalsResponse, ClientsResponse } from '$types';
import type { Actions, PageServerLoad } from './$types';
import type { RecordModel } from 'pocketbase';
import { zod } from 'sveltekit-superforms/adapters';
import { unknownClient } from '$lib/utils/client';

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
	const queryFilter = `name ~ "${query}" || type ~ "${query}" ||  breed ~ "${query}" || identifier ~ "${query}"`;

	const animalsPage = await pb.collection(collection).getList<AnimalsResponse>(page, 10, {
		sort: '-created',
		expand: 'client',
		filter: queryFilter
	});

	const items = animalsPage.items
		.map((animal) => {
			try {
				const expansion = animal.expand as RecordModel;
				let name = '';

				if (!expansion || !expansion.client) {
					console.error('anomaly: client not found');

					name = unknownClient.name;
				} else {
					const client = expansion.client as ClientsResponse;

					name = client.name;
				}

				return {
					...animal,
					client: name
				};
			} catch (error) {
				console.error({ error });
			}
		})
		.filter((item) => item !== undefined);

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
				return setError(form, 'Données invalides');
			}

			const { id } = form.data;
			const animal = await pb.collection('animals').getOne(id);

			if (!animal || !animal.id) {
				return setError(form, 'Animal introuvable', { status: 404 });
			}

			await pb.collection('animals').delete(form.data.id);

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, "Échec de la suppression de l'animal");
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
