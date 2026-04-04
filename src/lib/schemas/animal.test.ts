import { describe, it, expect } from 'vitest';
import { addAnimalSchema, updateAnimalSchema } from './animal';

const validAnimal = {
	birthday: new Date('2020-01-01'),
	name: 'Rex',
	sex: 'male',
	type: 'chien',
	weight: 10
};

describe('addAnimalSchema', () => {
	it('accepts valid animal data', () => {
		const result = addAnimalSchema.safeParse(validAnimal);
		expect(result.success).toBe(true);
	});

	it('rejects future birthday', () => {
		const future = new Date();
		future.setFullYear(future.getFullYear() + 1);
		const result = addAnimalSchema.safeParse({ ...validAnimal, birthday: future });
		expect(result.success).toBe(false);
	});

	it('rejects empty name', () => {
		const result = addAnimalSchema.safeParse({ ...validAnimal, name: '' });
		expect(result.success).toBe(false);
	});

	it('rejects negative weight', () => {
		const result = addAnimalSchema.safeParse({ ...validAnimal, weight: -1 });
		expect(result.success).toBe(false);
	});

	it('accepts zero weight', () => {
		const result = addAnimalSchema.safeParse({ ...validAnimal, weight: 0 });
		expect(result.success).toBe(true);
	});

	it('allows optional color, breed, identifier', () => {
		const result = addAnimalSchema.safeParse({
			...validAnimal,
			color: 'brun',
			breed: 'Berger',
			identifier: 'ID001'
		});
		expect(result.success).toBe(true);
	});
});

describe('updateAnimalSchema', () => {
	it('requires an id', () => {
		const result = updateAnimalSchema.safeParse(validAnimal);
		expect(result.success).toBe(false);
	});

	it('accepts valid update data', () => {
		const result = updateAnimalSchema.safeParse({ ...validAnimal, id: 'abc123' });
		expect(result.success).toBe(true);
	});

	it('allows deceased and deathdate fields', () => {
		const result = updateAnimalSchema.safeParse({
			...validAnimal,
			id: 'abc123',
			deceased: true,
			deathdate: new Date('2024-01-01')
		});
		expect(result.success).toBe(true);
	});
});
