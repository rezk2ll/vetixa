import { z } from 'zod';

export const addAnimalSchema = z.object({
	birthday: z.date().max(new Date()),
	name: z.string().min(1),
	sex: z.string().min(1),
	type: z.string().min(1),
	weight: z
		.number()
		.default(0)
		.refine((n) => n > 0, 'poids invalide'),
	color: z.string().optional(),
	breed: z.string().optional(),
	identifier: z.string().optional()
});

export const updateAnimalSchema = addAnimalSchema.extend({
	id: z.string().min(1),
	deceased: z.boolean().optional(),
	deathdate: z.date().optional()
});
