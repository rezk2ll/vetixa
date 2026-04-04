import { describe, it, expect } from 'vitest';
import { changeHospitColorsSchema, updateHospitCompletedStateSchema } from './hospit';

describe('changeHospitColorsSchema', () => {
	it('accepts valid color change', () => {
		const result = changeHospitColorsSchema.safeParse({ id: 'h1', color: '#FF0000' });
		expect(result.success).toBe(true);
	});

	it('rejects empty id', () => {
		const result = changeHospitColorsSchema.safeParse({ id: '', color: '#FF0000' });
		expect(result.success).toBe(false);
	});
});

describe('updateHospitCompletedStateSchema', () => {
	it('accepts valid completed state', () => {
		const result = updateHospitCompletedStateSchema.safeParse({ id: 'h1', completed: true });
		expect(result.success).toBe(true);
	});

	it('defaults completed to true', () => {
		const result = updateHospitCompletedStateSchema.safeParse({ id: 'h1' });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.completed).toBe(true);
		}
	});

	it('accepts false', () => {
		const result = updateHospitCompletedStateSchema.safeParse({ id: 'h1', completed: false });
		expect(result.success).toBe(true);
		if (result.success) {
			expect(result.data.completed).toBe(false);
		}
	});
});
