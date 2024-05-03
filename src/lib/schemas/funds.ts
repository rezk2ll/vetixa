import { z } from 'zod';

export const addFundsSchema = z.object({
	amount: z
		.number()
		.positive()
		.default(0)
		.refine((n) => n > 0),
	description: z.string().optional().default('')
});
