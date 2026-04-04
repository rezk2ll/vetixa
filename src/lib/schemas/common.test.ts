import { describe, it, expect } from 'vitest';
import { removeSchema } from './common';

describe('removeSchema', () => {
	it('accepts a valid id', () => {
		const result = removeSchema.safeParse({ id: 'abc123' });
		expect(result.success).toBe(true);
	});

	it('rejects empty id', () => {
		const result = removeSchema.safeParse({ id: '' });
		expect(result.success).toBe(false);
	});

	it('rejects missing id', () => {
		const result = removeSchema.safeParse({});
		expect(result.success).toBe(false);
	});
});
