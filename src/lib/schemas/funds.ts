import { z } from 'zod';

export const addFundsSchema = z.object({
	amount: z
		.number()
		.positive()
		.or(z.string().regex(/\d+/).transform(Number))
		.default(0)
		.refine((n) => n > 0),
	description: z.string().optional().default('')
});
