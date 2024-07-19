import z from 'zod';

export const addInventoryItemSchema = z.object({
	name: z.string().min(3, { message: 'Nom invalide, minimum 3 caractères' }),
	quantity: z
		.number()
		.or(z.string().regex(/\d+/).transform(Number))
		.default(0)
		.refine((n) => n >= 0, { message: 'Quantité invalide' }),
	price: z
		.number()
		.or(z.string().regex(/\d+/).transform(Number))
		.default(0)
		.refine((n) => n > 0, { message: 'Prix invalide' }),
	cost: z
		.number()
		.or(z.string().regex(/\d+/).transform(Number))
		.default(0)
		.refine((n) => n > 0, { message: "Prix d'achat invalide" }),
	alert: z
		.number()
		.min(0, { message: 'Alerte invalide' })
		.default(10)
		.or(z.string().regex(/\d+/).transform(Number))
		.default(0)
		.refine((n) => n >= 0, { message: 'Alerte invalide' }),
	tva: z
		.number()
		.min(0)
		.default(0)
		.or(z.string().regex(/\d+/).transform(Number))
		.default(0)
		.refine((n) => n >= 0, { message: 'TVA invalide' }),
	gain: z
		.number()
		.min(0)
		.default(0)
		.or(z.string().regex(/\d+/).transform(Number))
		.default(0)
		.refine((n) => n >= 0, { message: 'Marge de gain invalide' }),
	description: z.string().optional(),
	code: z.string().min(1, { message: 'Code invalide' })
});

const inventoryItemSchema = z.object({
	id: z.string().min(1),
	quantity: z
		.number()
		.or(z.string().regex(/\d+/).transform(Number))
		.refine((n) => n > 0, { message: 'Quantité invalide' })
});

export const sellInventoryItemSchema = z.object({
	items: z.array(inventoryItemSchema).nonempty(),
	method: z.string().min(1).default('cash'),
	incash: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number)),
	outcash: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number))
});

export const updateInventoryItemSchema = addInventoryItemSchema.extend({
	id: z.string().min(1, { message: 'Id invalide' })
});
