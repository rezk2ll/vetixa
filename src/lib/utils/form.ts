import type { RequestEvent } from '@sveltejs/kit';
import { setError, superValidate } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';

interface FormActionOptions {
	invalidMessage?: string;
	errorMessage?: string;
}

/**
 * Creates a form action handler with standardized error handling.
 *
 * @example
 * ```ts
 * export const actions = {
 *   updateVisit: createFormAction(
 *     updateVisitSchema,
 *     'update-visit',
 *     async (form, { locals: { pb }, params }) => {
 *       const { id } = params;
 *       await pb.collection('visits').update(id, form.data);
 *       return { form };
 *     },
 *     { errorMessage: 'Échec de la mise à jour de la visite' }
 *   ),
 * };
 * ```
 */
export function createFormAction(
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	schema: any,
	formId: string,
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	handler: (form: any, event: RequestEvent) => Promise<any>,
	options: FormActionOptions = {}
) {
	const { invalidMessage = 'Données invalides', errorMessage = 'Une erreur est survenue' } =
		options;

	return async (event: RequestEvent) => {
		const form = await superValidate(event.request, zod(schema), { id: formId });

		try {
			if (!form.valid) {
				return setError(form, invalidMessage, { status: 400 });
			}

			return await handler(form, event);
		} catch (error) {
			console.error(`[${formId}]`, error);
			return setError(form, errorMessage, { status: 500 });
		}
	};
}
