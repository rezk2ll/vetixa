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
		.default(0)
		.or(z.string().regex(/\d+/).transform(Number))
		.default(0)
		.refine((n) => n > 0),
	method: z.string().min(1).default('cash'),
	incash: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number)).default(0),
	outcash: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number)).default(0),
	description: z.string()
});

export const addVisitItemsSchema = z.object({
	id: z.string().min(1),
	items: z.array(z.string().min(1))
});

export const removeVisitItemSchema = z.object({
	id: z.string().min(1),
	item: z.string().min(1)
});

export const addVisitFileSchema = z.object({
	id: z.string().min(1),
	files: z
		.instanceof(File, { message: 'Veuillez télécharger un fichier' })
		.refine((file) => file.size <= 100 * 1024 * 1024)
		.array()
});

export const removeVisitFileSchema = z.object({
	id: z.string().min(1),
	file: z.string().min(1)
});

export const updateVisitDiagnosticSchema = z.object({
	id: z.string().min(1),
	observations: z.string().min(1)
});
