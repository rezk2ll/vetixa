import z from 'zod';

export const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(6)
});

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
	items: z.array(inventoryItemSchema).nonempty()
});

export const updateInventoryItemSchema = addInventoryItemSchema.extend({
	id: z.string().min(1)
});

export const deleteInventoryItemSchema = z.object({
	id: z.string().min(1)
});

export const addFundsSchema = z.object({
	amount: z
		.number()
		.positive()
		.or(z.string().regex(/\d+/).transform(Number))
		.refine((n) => n > 0),
	description: z.string().optional().default('')
});

export const updateQueueSchema = z.object({
	id: z.string().min(1)
});

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
