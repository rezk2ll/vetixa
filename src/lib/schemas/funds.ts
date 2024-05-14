import { z } from 'zod';

export const addFundsSchema = z.object({
	amount: z
		.number()
		.default(0)
		.or(z.string().regex(/\d+/).transform(Number))
		.default(0)
		.refine((n) => n > 0),
	method: z.string().min(1).default('cash'),
	incash: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number)).default(0),
	outcash: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number)).default(0),
	description: z.string()
});
