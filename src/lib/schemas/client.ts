import { z } from 'zod';

export const clientSchema = z.object({
	firstname: z.string().min(1, { message: 'Prénom invalide' }),
	lastname: z.string().min(1, { message: 'Nom invalide' }),
	email: z.union([z.literal(''), z.string().email('Email invalide')]),
	tel: z.string().min(1, { message: 'Tel invalide' }),
	address: z.string().optional(),
	note: z.string().optional()
});

export const addClientSchema = clientSchema;

export const updateClientSchema = clientSchema.extend({
	id: z.string().min(1, { message: 'Id client invalide' })
});

export type AddClientData = z.infer<typeof addClientSchema>;
export type UpdateClientData = z.infer<typeof updateClientSchema>;
