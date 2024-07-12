import { z } from 'zod';

export const removeSchema = z.object({
	id: z.string().min(1, { message: 'Identifiant invalide' })
});
