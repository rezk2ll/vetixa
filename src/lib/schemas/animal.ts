import { z } from 'zod';

export const addAnimalSchema = z.object({
	birthday: z.date().max(new Date()),
	name: z.string().min(1),
	sex: z.string().min(1),
	type: z.string().min(1),
	weight: z
		.number()
		.or(z.string().regex(/\d+/).transform(Number))
		.refine((n) => n > 0)
});

export const updateAnimalSchema = addAnimalSchema.extend({
	id: z.string().min(1)
});

export const removeAnimalSchema = z.object({
	id: z.string().min(1)
});
