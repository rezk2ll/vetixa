import { z } from 'zod';

export const addVisitSchema = z.object({
	motif: z.string().min(1, { message: 'Motif invalide' }),
	control: z.boolean().optional().default(false),
	vaccination: z.boolean().optional().default(false)
});

export const updateVisitSchema = addVisitSchema.extend({
	id: z.string().min(1),
	visit_price: z
		.number()
		.min(0)
		.default(0)
		.or(z.string().regex(/\d+/).transform(Number))
		.default(0),
	doctor: z.string().min(1, { message: 'Veuillez choisir un médecin' }).optional()
});

export const payVisitSchema = z.object({
	id: z.string().min(1),
	amount: z
		.number()
		.default(0)
		.or(z.string().regex(/\d+/).transform(Number))
		.default(0)
		.refine((n) => n > 0, { message: 'Montant invalide' }),
	method: z.string().min(1).default('cash'),
	incash: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number)).default(0),
	outcash: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number)).default(0),
	description: z.string()
});

export const addVisitItemsSchema = z.object({
	id: z.string().min(1, { message: 'Id invalide' }),
	items: z.array(z.string().min(1))
});

export const removeVisitItemSchema = z.object({
	id: z.string().min(1),
	item: z.string().min(1, { message: 'Id invalide' })
});

const ALLOWED_MIME_TYPES = [
	'image/jpeg',
	'image/png',
	'image/gif',
	'image/webp',
	'application/pdf',
	'video/mp4',
	'video/quicktime',
	'video/webm'
];

export const addVisitFileSchema = z.object({
	id: z.string().min(1, { message: 'Id invalide' }),
	files: z
		.instanceof(File, { message: 'Veuillez télécharger un fichier' })
		.refine((file) => file.size <= 100 * 1024 * 1024, {
			message: 'Fichier invalide, Taille maximale 100Mo'
		})
		.refine((file) => ALLOWED_MIME_TYPES.includes(file.type), {
			message:
				'Type de fichier non autorisé. Formats acceptés : JPEG, PNG, GIF, WebP, PDF, MP4, WebM'
		})
		.array()
});

export const removeVisitFileSchema = z.object({
	id: z.string().min(1, { message: 'Id invalide' }),
	file: z.string().min(1, { message: 'Id de fichier invalide' })
});

export const updateVisitDiagnosticSchema = z.object({
	id: z.string().min(1),
	observations: z.string().optional()
});

export const updateVisitActionsSchema = z.object({
	id: z.string().min(1),
	actions: z.string().optional()
});

export const updateVisitHospitalisationSchema = z.object({
	id: z.string().min(1),
	note: z.string().optional(),
	start: z.date({ message: "Date d'admission invalide" }),
	end: z.date({ message: 'Date de sortie invalide' }),
	treatment: z.string().optional(),
	cage: z.string().min(1, { message: 'cage invalide' }),
	price: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number)).default(0)
});

export const updateVisitTreatmentSchema = z.object({
	id: z.string().min(1),
	treatment: z.string().optional()
});

export const updateVisitItemSchema = z.object({
	id: z.string().min(1),
	item: z.string().min(1),
	discount: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number)).default(0),
	quantity: z.number().min(0).default(0).or(z.string().regex(/\d+/).transform(Number)).default(1),
	type: z.string().optional()
});

export type AddVisitData = z.infer<typeof addVisitSchema>;
export type UpdateVisitData = z.infer<typeof updateVisitSchema>;
export type PayVisitData = z.infer<typeof payVisitSchema>;
export type AddVisitItemsData = z.infer<typeof addVisitItemsSchema>;
export type RemoveVisitItemData = z.infer<typeof removeVisitItemSchema>;
export type AddVisitFileData = z.infer<typeof addVisitFileSchema>;
export type RemoveVisitFileData = z.infer<typeof removeVisitFileSchema>;
export type UpdateVisitDiagnosticData = z.infer<typeof updateVisitDiagnosticSchema>;
export type UpdateVisitActionsData = z.infer<typeof updateVisitActionsSchema>;
export type UpdateVisitHospitalisationData = z.infer<typeof updateVisitHospitalisationSchema>;
export type UpdateVisitTreatmentData = z.infer<typeof updateVisitTreatmentSchema>;
export type UpdateVisitItemData = z.infer<typeof updateVisitItemSchema>;
