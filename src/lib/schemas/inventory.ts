import z from 'zod';

export const addInventoryItemSchema = z.object({
	name: z.string().min(3),
	quantity: z
		.number()
		.or(z.string().regex(/\d+/).transform(Number))
		.refine((n) => n >= 0),
	price: z
		.number()
		.or(z.string().regex(/\d+/).transform(Number))
		.refine((n) => n > 0),
	cost: z
		.number()
		.or(z.string().regex(/\d+/).transform(Number))
		.refine((n) => n > 0),
	alert: z
		.number()
		.min(1)
		.default(10)
		.or(z.string().regex(/\d+/).transform(Number))
		.refine((n) => n > 0),
	tva: z
		.number()
		.min(1)
		.default(10)
		.or(z.string().regex(/\d+/).transform(Number))
		.refine((n) => n > 0),
	description: z.string().optional(),
	code: z.string()
});

const inventoryItemSchema = z.object({
	id: z.string().min(1),
	quantity: z
		.number()
		.or(z.string().regex(/\d+/).transform(Number))
		.refine((n) => n > 0)
});

export const sellInventoryItemSchema = z.object({
	items: z.array(inventoryItemSchema).nonempty(),
	method: z.string().min(1).default('cash'),
	incash: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number)),
	outcash: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number))
});

export const updateInventoryItemSchema = addInventoryItemSchema.extend({
	id: z.string().min(1)
});
