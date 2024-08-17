import { z } from 'zod';

export const changeHospitColorsSchema = z.object({
	id: z.string().min(1),
	color: z.string().min(0, { message: 'Veuillez choisir une couleur' })
});

export const updateHospitCompletedStateSchema = z.object({
	id: z.string().min(1),
	completed: z.boolean().default(true)
});
