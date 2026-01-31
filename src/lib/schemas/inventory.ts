import z from 'zod';

const numericString = z.union([
	z.number(),
	z.string().transform((val) => (val === '' ? 0 : Number(val)))
]);

export const addInventoryItemSchema = z.object({
	name: z.string().min(3, { message: 'Nom invalide, minimum 3 caractères' }),
	quantity: numericString
		.pipe(z.number().min(0, { message: 'Quantité invalide' }))
		.default(0),
	price: numericString
		.pipe(z.number().min(0.01, { message: 'Prix invalide' }))
		.default(0),
	cost: numericString
		.pipe(z.number().min(0.01, { message: "Prix d'achat invalide" }))
		.default(0),
	alert: numericString
		.pipe(z.number().min(1, { message: 'Alerte invalide' }))
		.default(10),
	tva: numericString
		.pipe(z.number().min(0, { message: 'TVA invalide' }))
		.default(0),
	gain: numericString
		.pipe(z.number().min(0, { message: 'Marge de gain invalide' }))
		.default(0),
	description: z.string().optional(),
	code: z.string().min(1, { message: 'Code invalide' })
});

const inventoryItemSchema = z.object({
	id: z.string().min(1),
	quantity: numericString.pipe(z.number().min(1, { message: 'Quantité invalide' }))
});

export const sellInventoryItemSchema = z.object({
	items: z.array(inventoryItemSchema).nonempty(),
	method: z.string().min(1).default('cash'),
	incash: numericString.pipe(z.number().min(0)).default(0),
	outcash: numericString.pipe(z.number().min(0)).default(0)
});

export const updateInventoryItemSchema = addInventoryItemSchema.extend({
	id: z.string().min(1, { message: 'Id invalide' })
});
