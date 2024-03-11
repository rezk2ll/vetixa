import { z } from 'zod';

export const addVisitSchema = z.object({
	motif: z.string().min(1)
});

export const updateVisitSchema = addVisitSchema.extend({
	id: z.string().min(1)
});

export const payVisitSchema = z.object({
	id: z.string().min(1),
	amount: z
		.number()
		.or(z.string().regex(/\d+/).transform(Number))
		.refine((n) => n > 0),
	method: z.string().min(1).default('cash'),
	incash: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number)),
	outcash: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number)),
	description: z.string()
});
