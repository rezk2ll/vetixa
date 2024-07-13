import z from 'zod';

export const loginSchema = z.object({
	email: z.string().email('Email invalide'),
	password: z.string().min(6, { message: 'Mot de passe invalide, minimum 6 caractères' })
});
