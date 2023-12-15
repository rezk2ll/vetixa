import prisma from '$lib/prisma';
import { fail } from '@sveltejs/kit';
import type { Actions } from './$types';

export const actions: Actions = {
	default: async ({ request }) => {
		try {
			const data = await request.formData();
			const name = data.get('name') as string;
			const animalName = data.get('animal_name') as string;
			const animalType = data.get('animal_type') as string;
			const sex = data.get('sex') as string;
			const age = data.get('age') as string;
			const weight = data.get('weight') as string;
			const motif = data.get('motif') as string;
			const emission = data.get('emission') as string;
			const pronostic = data.get('pronostic') as string;
			const sortie = data.get('sortie') as string;
			const phone = data.get('phone') as string;

			const client = await prisma.client.create({
				data: {
					name,
					tel: phone
				}
			});

			const animal = await prisma.animal.create({
				data: {
					age,
					name: animalName,
					sex,
					weight,
					type: animalType
				}
			});

			const fiche = await prisma.fiche.create({
				data: {
					date_admission: emission,
					date_sortie: sortie,
					motif,
					pronostic,
					animalId: animal.id,
					clientId: client.id
				}
			});

			return { success: true, fiche };
		} catch (error) {
			console.log(error);

			return fail(500, { error });
		}
	}
};
