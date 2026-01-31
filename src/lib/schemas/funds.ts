import { z } from 'zod';

const numericString = z.union([
	z.number(),
	z.string().transform((val) => (val === '' ? 0 : Number(val)))
]);

export const addFundsSchema = z.object({
	amount: numericString
		.pipe(z.number().min(0.01, { message: 'Montant invalide' }))
		.default(0),
	method: z.string().min(1).default('cash'),
	incash: numericString.pipe(z.number().min(0)).default(0),
	outcash: numericString.pipe(z.number().min(0)).default(0),
	description: z.string()
});
