import type {
	CageItem,
	CagesResponse,
	HospitPendingListResponse,
	HospitalisationResponse,
	Treatment
} from '$types';
import type { RecordModel } from 'pocketbase';
import type { Actions, PageServerLoad } from './$types';
import { setError, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { changeHospitColorsSchema, updateHospitCompletedStateSchema } from '$lib/schemas/hospit';
import { cageCompare } from '$utils/cage';
import { unknownClient } from '$utils/client';
import { unknownAnimal } from '$utils/animal';

export const load = (async ({ locals: { pb } }) => {
	const cages = await pb.collection('cages').getFullList<CagesResponse>();
	const hospitList = await pb
		.collection('hospit_pending_list')
		.getFullList<HospitPendingListResponse>({
			expand: 'visit, visit.animal, visit.animal.client, cage'
		});
	const changeHospitColorForm = await superValidate(zod(changeHospitColorsSchema), {
		id: 'change-color'
	});

	const updateHospitCompeltedStateForm = await superValidate(
		zod(updateHospitCompletedStateSchema),
		{
			id: 'change-completed'
		}
	);

	const cageList: CageItem[] = cages
		.map((cage) => {
			const matchingHospit = hospitList.find((item) => item.cage === cage.id);

			if (!matchingHospit) {
				return cage;
			}

			return {
				...cage,
				hospit: {
					...matchingHospit,
					cage,
					treatment: (matchingHospit.treatment as Treatment[]) || [],
					visit: {
						...((matchingHospit.expand as RecordModel)?.visit || {}),
						animal: {
							...((matchingHospit.expand as RecordModel)?.visit.expand?.animal || unknownAnimal)
						},
						client:
							(matchingHospit.expand as RecordModel)?.visit.expand?.animal.expand?.client ||
							unknownClient
					}
				}
			} satisfies CageItem;
		})
		.sort(cageCompare);

	return {
		cageList,
		changeHospitColorForm,
		updateHospitCompeltedStateForm
	};
}) satisfies PageServerLoad;

export const actions = {
	changeColor: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(changeHospitColorsSchema), {
			id: 'change-color'
		});

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id, color } = form.data;

			const hospit = await pb.collection('hospitalisation').getOne<HospitalisationResponse>(id);

			if (!hospit || !hospit.id) {
				return setError(form, 'Hospitalisation non trouvée');
			}

			await pb.collection('hospitalisation').update(id, {
				color
			});

			return { form };
		} catch (error) {
			console.error(error);

			return setError(form, 'Échec de la mise à jour de la couleur');
		}
	},

	changeCompletedState: async ({ locals: { pb }, request }) => {
		const form = await superValidate(request, zod(updateHospitCompletedStateSchema), {
			id: 'change-completed'
		});

		try {
			if (!form.valid) {
				return setError(form, 'Données invalides', { status: 400 });
			}

			const { id, completed } = form.data;
			const hospit = await pb.collection('hospitalisation').getOne<HospitalisationResponse>(id);

			if (!hospit || !hospit.id) {
				return setError(form, 'Hospitalisation non trouvée');
			}

			if (!completed) {
				if (!hospit.cage) {
					return setError(form, 'cage invalide', { status: 500 });
				}

				try {
					const avaibleCage = await pb
						.collection('available_cages')
						.getOne<CagesResponse>(hospit.cage);

					if (!avaibleCage) {
						return setError(form, 'Cage déjà occupée', { status: 500 });
					}
				} catch (error) {
					return setError(form, 'Cage déjà occupée', { status: 500 });
				}
			}

			await pb.collection('hospitalisation').update(id, {
				completed
			});

			return { form };
		} catch (error) {
			console.error({ error });

			return setError(form, "Une erreur s'est produite lors du vidage de la cage");
		}
	}
} satisfies Actions;
