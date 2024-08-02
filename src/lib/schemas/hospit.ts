import { z } from 'zod';

export const changeHospitColorsSchema = z.object({
	id: z.string().min(1),
	color: z.string().min(0, { message: 'Veuillez choisir une couleur' })
});
