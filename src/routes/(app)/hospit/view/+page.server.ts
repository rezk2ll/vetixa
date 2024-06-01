import type { CageItem, CagesResponse, HospitPendingListResponse, Treatment } from '$types';
import type { RecordModel } from 'pocketbase';
import type { PageServerLoad } from './$types';

export const load = (async ({ locals: { pb } }) => {
	const cages = await pb.collection('cages').getFullList<CagesResponse>();
	const hospitList = await pb
		.collection('hospit_pending_list')
		.getFullList<HospitPendingListResponse>({
			expand: 'visit, visit.animal, visit.animal.client, cage'
		});

	const cageList: CageItem[] = cages.map((cage) => {
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
	});
	return {
		cageList
	};
}) satisfies PageServerLoad;
