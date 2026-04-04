import { describe, it, expect } from 'vitest';
import { loginSchema } from './login';

describe('loginSchema', () => {
	it('accepts valid credentials', () => {
		const result = loginSchema.safeParse({ email: 'user@example.com', password: 'secret123' });
		expect(result.success).toBe(true);
	});

	it('rejects invalid email', () => {
		const result = loginSchema.safeParse({ email: 'not-an-email', password: 'secret123' });
		expect(result.success).toBe(false);
	});

	it('rejects empty email', () => {
		const result = loginSchema.safeParse({ email: '', password: 'secret123' });
		expect(result.success).toBe(false);
	});

	it('rejects password shorter than 6 characters', () => {
		const result = loginSchema.safeParse({ email: 'user@example.com', password: '12345' });
		expect(result.success).toBe(false);
	});

	it('accepts password with exactly 6 characters', () => {
		const result = loginSchema.safeParse({ email: 'user@example.com', password: '123456' });
		expect(result.success).toBe(true);
	});
});
