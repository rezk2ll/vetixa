import type { RequestEvent } from './$types';
import type { VisitsResponse } from '$types';
import { addVisitFileSchema, removeVisitFileSchema } from '$lib/schemas/visit';
import { setError, superValidate, withFiles } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';

export const addFile = async ({ locals: { pb }, request }: RequestEvent) => {
	const formData = await request.formData();
	const form = await superValidate(formData, zod(addVisitFileSchema), { id: 'add-file' });

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse>(id);

		if (!visit) {
			return setError(form, 'Visite non trouvée', { status: 500 });
		}

		await pb.collection('visits').update(id, form.data);

		return withFiles({ form });
	} catch (error) {
		console.error(error);

		return setError(form, "Échec de l'ajout du fichier", { status: 500 });
	}
};

export const removeFile = async ({ locals: { pb }, request }: RequestEvent) => {
	const form = await superValidate(request, zod(removeVisitFileSchema), { id: 'remove-file' });

	try {
		if (!form.valid) {
			return setError(form, 'Données invalides', { status: 400 });
		}

		const { id, file } = form.data;
		const visit = await pb.collection('visits').getOne<VisitsResponse>(id);

		if (!visit) {
			return setError(form, 'Visite non trouvée', { status: 500 });
		}

		await pb.collection('visits').update(id, {
			...visit,
			'files-': file
		});

		return { form };
	} catch (error) {
		console.error(error);

		return setError(form, 'Échec de la mise à jour de la visite', { status: 500 });
	}
};
