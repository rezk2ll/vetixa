import { describe, it, expect } from 'vitest';
import BillService from './bill';
import type { VisitsResponse, ItemMetadata } from '$types';

const createMockVisit = (overrides = {}): VisitsResponse<ItemMetadata[]> =>
	({
		id: 'visit1',
		visit_price: 0,
		item_metadata: [],
		expand: {},
		...overrides
	}) as unknown as VisitsResponse<ItemMetadata[]>;

const mockPb = {} as never;
const mockVisitRef = { id: 'visit1' } as never;

describe('BillService cost calculations', () => {
	describe('getToilettagePrice', () => {
		it('returns 0 when no toilettage items', () => {
			const service = new BillService(mockPb, mockVisitRef);
			const visit = createMockVisit();
			expect(service.getToilettagePrice(visit)).toBe(0);
		});

		it('sums prices of toilettage items', () => {
			const service = new BillService(mockPb, mockVisitRef);
			const visit = createMockVisit({
				expand: {
					toilettage: [
						{ id: 'a', price: 50 },
						{ id: 'b', price: 30 }
					]
				}
			});
			expect(service.getToilettagePrice(visit)).toBe(80);
		});

		it('applies discount from metadata', () => {
			const service = new BillService(mockPb, mockVisitRef);
			const visit = createMockVisit({
				item_metadata: [{ item: 'a', discount: 20, quantity: 1 }],
				expand: {
					toilettage: [{ id: 'a', price: 100 }]
				}
			});
			// 100 * (1 - 20/100) = 80
			expect(service.getToilettagePrice(visit)).toBe(80);
		});

		it('applies quantity from metadata', () => {
			const service = new BillService(mockPb, mockVisitRef);
			const visit = createMockVisit({
				item_metadata: [{ item: 'a', discount: 0, quantity: 3 }],
				expand: {
					toilettage: [{ id: 'a', price: 25 }]
				}
			});
			// 25 * 3 = 75
			expect(service.getToilettagePrice(visit)).toBe(75);
		});

		it('applies both discount and quantity', () => {
			const service = new BillService(mockPb, mockVisitRef);
			const visit = createMockVisit({
				item_metadata: [{ item: 'a', discount: 50, quantity: 2 }],
				expand: {
					toilettage: [{ id: 'a', price: 100 }]
				}
			});
			// 100 * (1 - 50/100) = 50, then 50 * 2 = 100
			expect(service.getToilettagePrice(visit)).toBe(100);
		});
	});

	describe('getMedicalActsCost', () => {
		it('returns 0 when no medical acts', () => {
			const service = new BillService(mockPb, mockVisitRef);
			const visit = createMockVisit();
			expect(service.getMedicalActsCost(visit)).toBe(0);
		});

		it('sums medical acts prices with metadata', () => {
			const service = new BillService(mockPb, mockVisitRef);
			const visit = createMockVisit({
				item_metadata: [{ item: 'med1', discount: 10, quantity: 2 }],
				expand: {
					medical_acts: [
						{ id: 'med1', price: 200 },
						{ id: 'med2', price: 50 }
					]
				}
			});
			// med1: 200 * 0.9 = 180, * 2 = 360
			// med2: 50 * 1 (no metadata) = 50
			expect(service.getMedicalActsCost(visit)).toBe(410);
		});
	});

	describe('getSurgicalActsCost', () => {
		it('returns 0 when no surgical acts', () => {
			const service = new BillService(mockPb, mockVisitRef);
			const visit = createMockVisit();
			expect(service.getSurgicalActsCost(visit)).toBe(0);
		});

		it('calculates with discount and quantity', () => {
			const service = new BillService(mockPb, mockVisitRef);
			const visit = createMockVisit({
				item_metadata: [{ item: 's1', discount: 25, quantity: 1 }],
				expand: {
					surgical_acts: [{ id: 's1', price: 400 }]
				}
			});
			// 400 * 0.75 = 300
			expect(service.getSurgicalActsCost(visit)).toBe(300);
		});
	});

	describe('getInventoryItemsCost', () => {
		it('returns 0 when no store items', () => {
			const service = new BillService(mockPb, mockVisitRef);
			const visit = createMockVisit();
			expect(service.getInventoryItemsCost(visit)).toBe(0);
		});

		it('calculates multiple items with varying metadata', () => {
			const service = new BillService(mockPb, mockVisitRef);
			const visit = createMockVisit({
				item_metadata: [
					{ item: 'i1', discount: 0, quantity: 5 },
					{ item: 'i2', discount: 50, quantity: 1 }
				],
				expand: {
					store_items: [
						{ id: 'i1', price: 10 },
						{ id: 'i2', price: 60 }
					]
				}
			});
			// i1: 10 * 5 = 50, i2: 60 * 0.5 = 30
			expect(service.getInventoryItemsCost(visit)).toBe(80);
		});
	});

	describe('getHospitalisationCost', () => {
		it('returns 0 when no hospitalisation', async () => {
			const service = new BillService(mockPb, mockVisitRef);
			const visit = createMockVisit();
			expect(await service.getHospitalisationCost(visit)).toBe(0);
		});

		it('calculates cost based on days and price', async () => {
			const service = new BillService(mockPb, mockVisitRef);
			const visit = createMockVisit({
				expand: {
					hospit: {
						start: '2024-01-15T08:00:00',
						end: '2024-01-18T08:00:00',
						price: 50
					}
				}
			});
			// 3 nights between Jan 15-18 (getDaysBetween returns 3), * 50 = 150
			expect(await service.getHospitalisationCost(visit)).toBe(150);
		});

		it('returns 0 for same-day hospitalisation', async () => {
			const service = new BillService(mockPb, mockVisitRef);
			const visit = createMockVisit({
				expand: {
					hospit: {
						start: '2024-01-15T08:00:00',
						end: '2024-01-15T20:00:00',
						price: 50
					}
				}
			});
			expect(await service.getHospitalisationCost(visit)).toBe(0);
		});
	});
});
