import { z } from 'zod';

export const addVisitSchema = z.object({
	motif: z.string().min(1)
});

export const updateVisitSchema = addVisitSchema.extend({
	id: z.string().min(1)
});
