import { describe, it, expect } from 'vitest';
import { updateQueueSchema } from './queue';

describe('updateQueueSchema', () => {
	it('accepts a valid id', () => {
		const result = updateQueueSchema.safeParse({ id: 'q1' });
		expect(result.success).toBe(true);
	});

	it('rejects empty id', () => {
		const result = updateQueueSchema.safeParse({ id: '' });
		expect(result.success).toBe(false);
	});

	it('rejects missing id', () => {
		const result = updateQueueSchema.safeParse({});
		expect(result.success).toBe(false);
	});
});
