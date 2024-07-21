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
import { changeHospitColorsSchema } from '$lib/schemas/hospit';

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
							...((matchingHospit.expand as RecordModel)?.visit.expand.animal || {})
						},
						client: (matchingHospit.expand as RecordModel)?.visit.expand.animal.expand.client || {}
					}
				}
			} satisfies CageItem;
		})
		.sort((a, b) => {
			const extractParts = (str: string): [string, number] => {
				str = str.trim();
				const alphaPart = str.match(/^[^\d]*/)?.[0] ?? '';
				const numPart = str.match(/\d+$/)?.[0] ?? '0';
				return [alphaPart, parseInt(numPart, 10)];
			};

			const [alphaA, numA] = extractParts(a.code.toLowerCase());
			const [alphaB, numB] = extractParts(b.code.toLowerCase());

			const alphaCompare = alphaA.localeCompare(alphaB, undefined, { sensitivity: 'base' });
			if (alphaCompare !== 0) {
				return alphaCompare;
			}

			return numA - numB;
		});

	return {
		cageList,
		changeHospitColorForm
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

			if (!hospit) {
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
	}
} satisfies Actions;
