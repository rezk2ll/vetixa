import { z } from 'zod';

export const updateQueueSchema = z.object({
	id: z.string().min(1, { message: 'Id invalide' })
});
