import { getDaysBetween } from '$lib/utils/date';
import type {
	AnimalsResponse,
	BillInformation,
	BillItem,
	BillsMethodOptions,
	BillsRecord,
	BillsResponse,
	ClientsResponse,
	ClinicalExamsResponse,
	FundTransactionsMethodOptions,
	FundTransactionsRecord,
	HospitalisationResponse,
	InventoryItemResponse,
	ItemMetadata,
	MedicalActsResponse,
	SurgicalActsResponse,
	Treatment,
	TypedPocketBase,
	Visit,
	VisitsResponse
} from '$types';
import currency from 'currency.js';
import type { RecordModel } from 'pocketbase';

class BillService {
	/**
	 * Constructor
	 *
	 * @param {TypedPocketBase} pb - PocketBase instance
	 * @param {VisitsResponse} visit - visit object
	 * @example
	 *  const billService = new BillService(pb, visit);
	 */
	constructor(private readonly pb: TypedPocketBase, private readonly visit: VisitsResponse) {}

	/**
	 * Update the bill total automatically
	 *
	 * @returns {Promise<void>} - the total balance
	 */
	update = async (): Promise<void> => {
		const totalPrice = await this.getTotalPrice();
		const bill = await this.get();

		if (bill.total !== totalPrice) {
			await this.pb.collection('bills').update(bill.id, {
				total: totalPrice,
				paid: bill.total_paid === totalPrice
			} satisfies BillsRecord);
		}
	};

	/**
	 * Fetches the bill
	 *
	 * @returns {Promise<BillsResponse>} - the bill object
	 * @example
	 *  const bill = await billService.get();
	 */
	get = async (): Promise<BillsResponse> => {
		return await this.pb
			.collection('bills')
			.getFirstListItem<BillsResponse>(`visit = "${this.visit.id}"`);
	};

	/**
	 * fetches the expanded visit relations
	 *
	 * @returns {Promise<VisitsResponse>} - the expanded visit object
	 */
	getExpandedVisit = async (): Promise<VisitsResponse<ItemMetadata[]>> => {
		return await this.pb
			.collection('visits')
			.getOne<VisitsResponse<ItemMetadata[]>>(this.visit.id, {
				expand: 'medical_acts, clinical_exams, surgical_acts, hospit, store_items'
			});
	};

	/**
	 * Fetches the visit including the animal and client information
	 *
	 * @returns {Promise<Visit>}
	 */
	getClientExpandedVisit = async (): Promise<Visit> => {
		const visitRecord = await this.pb
			.collection('visits')
			.getOne<VisitsResponse<ItemMetadata[]>>(this.visit.id, {
				expand:
					'medical_acts, clinical_exams, surgical_acts, animal, animal.client, hospit, store_items'
			});

		const visit = {
			...visitRecord,
			animal: {
				...(((visitRecord.expand as RecordModel)?.animal as AnimalsResponse) || {}),
				client: ((visitRecord.expand as RecordModel)?.animal.expand.client as ClientsResponse) || {}
			},
			medical_acts:
				((visitRecord.expand as RecordModel)?.medical_acts as MedicalActsResponse[]) || [],
			clinical_exams:
				((visitRecord.expand as RecordModel)?.clinical_exams as ClinicalExamsResponse[]) || [],
			surgical_acts:
				((visitRecord.expand as RecordModel)?.surgical_acts as SurgicalActsResponse[]) || [],
			hospit:
				((visitRecord.expand as RecordModel)?.hospit as HospitalisationResponse<Treatment[]>) || {},
			store_items:
				((visitRecord.expand as RecordModel)?.store_items as InventoryItemResponse[]) || [],
			bill: await this.get()
		};

		return visit;
	};

	/**
	 * Creates a new bill
	 *
	 * @param {number} total - the total balance
	 * @returns {Promise<BillsResponse>} - the bill object
	 * @example
	 *  const bill = await billService.create(100);
	 */
	create = async (total: number): Promise<BillsResponse> => {
		return await this.pb.collection('bills').create<BillsResponse>({
			visit: this.visit.id,
			paid: false,
			total
		} satisfies BillsRecord);
	};

	/**
	 * add a payment to the bill
	 *
	 * @param {number} amount - the amount to pay
	 * @param {BillsMethodOptions} method - the payment method
	 * @param {number} incash - the amount paid in cash
	 * @param {number} outcash - the amount paid out of cash
	 * @param {string} description - the description of the payment
	 * @param {string} userId - the id of the user
	 * @returns {Promise<void>} - the bill object
	 * @example
	 *  const bill = await billService.pay(120, 'cash', 150, 30, 'payment', 'user');
	 */
	pay = async (
		amount: number,
		method: BillsMethodOptions,
		incash: number = 0,
		outcash: number = 0,
		description: string,
		userId: string
	): Promise<void> => {
		const bill = await this.get();

		const totalPaid = currency(bill.total_paid).add(amount).value;
		const paid = currency(bill.total).subtract(totalPaid).value === 0;

		await this.pb.collection('bills').update(bill.id, {
			paid,
			method,
			total_paid: totalPaid
		} satisfies BillsRecord);

		await this.pb.collection('fund_transactions').create({
			amount,
			method: method as unknown as FundTransactionsMethodOptions,
			outcash,
			incash,
			description,
			user: userId
		} satisfies FundTransactionsRecord);
	};

	/**
	 * returns the current sum of the bill
	 * @returns {Promise<number>} - the total balance
	 */
	getTotalPrice = async (): Promise<number> => {
		const visitRecord = await this.getExpandedVisit();
		const hostpitCost = await this.getHospitalisationCost(visitRecord);

		const total = currency(visitRecord.visit_price)
			.add(hostpitCost)
			.add(this.getExamsCost(visitRecord))
			.add(this.getInventoryItemsCost(visitRecord))
			.add(this.getMedicalActsCost(visitRecord))
			.add(this.getSurgicalActsCost(visitRecord));

		return total.value;
	};

	/**
	 * Calculate the exams cost
	 *
	 * @param {VisitsResponse} visit - the expanded visit
	 * @returns {number} - the exams total cost
	 */
	getExamsCost = (visit: VisitsResponse<ItemMetadata[]>): number => {
		const exams: ClinicalExamsResponse[] = (visit.expand as RecordModel)?.clinical_exams || [];

		return exams.reduce((acc, exam) => {
			const discount =
				(visit.item_metadata || []).find(({ item }) => item === exam.id)?.discount ?? 0;
			const quantity =
				(visit.item_metadata || []).find(({ item }) => item === exam.id)?.quantity ?? 1;

			const price = currency(exam.price).multiply(1 - discount / 100).value;
			const total = currency(price).multiply(quantity).value;

			return currency(acc).add(total).value;
		}, 0);
	};

	/**
	 * Calculate medical acts cost
	 *
	 * @param {VisitsResponse} visit - the expanded visit
	 * @returns {number} - the medical acts total cost
	 */
	getMedicalActsCost = (visit: VisitsResponse<ItemMetadata[]>): number => {
		const medicalActs: MedicalActsResponse[] = (visit.expand as RecordModel)?.medical_acts || [];

		return medicalActs.reduce((acc, act) => {
			const discount =
				(visit.item_metadata || []).find(({ item }) => item === act.id)?.discount ?? 0;
			const quantity =
				(visit.item_metadata || []).find(({ item }) => item === act.id)?.quantity ?? 1;

			const price = currency(act.price).multiply(1 - discount / 100).value;
			const total = currency(price).multiply(quantity).value;

			return currency(acc).add(total).value;
		}, 0);
	};

	/**
	 * Calculate surgical acts cost
	 *
	 * @param {VisitsResponse} visit - the expanded visit
	 * @returns {number} - the surgical acts total cost
	 */
	getSurgicalActsCost = (visit: VisitsResponse<ItemMetadata[]>): number => {
		const surgicalActs: SurgicalActsResponse[] = (visit.expand as RecordModel)?.surgical_acts || [];

		return surgicalActs.reduce((acc, act) => {
			const discount =
				(visit.item_metadata || []).find(({ item }) => item === act.id)?.discount ?? 0;
			const quantity =
				(visit.item_metadata || []).find(({ item }) => item === act.id)?.quantity ?? 1;

			const price = currency(act.price).multiply(1 - discount / 100).value;
			const total = currency(price).multiply(quantity).value;

			return currency(acc).add(total).value;
		}, 0);
	};

	/**
	 * Calculate inventory items cost
	 *
	 * @param {VisitsResponse} visit - the expanded visit
	 * @returns {number} - the inventory items total cost
	 */
	getInventoryItemsCost = (visit: VisitsResponse<ItemMetadata[]>): number => {
		const inventoryItems: InventoryItemResponse[] =
			(visit.expand as RecordModel)?.store_items || [];

		return inventoryItems.reduce((acc, act) => {
			const discount =
				(visit.item_metadata || []).find(({ item }) => item === act.id)?.discount ?? 0;
			const quantity =
				(visit.item_metadata || []).find(({ item }) => item === act.id)?.quantity ?? 1;

			const price = currency(act.price).multiply(1 - discount / 100).value;
			const total = currency(price).multiply(quantity).value;

			return currency(acc).add(total).value;
		}, 0);
	};

	/**
	 * Calculate hospitalisation cost
	 *
	 * @param {VisitsResponse} visit - the expanded visit
	 * @returns {Promise<number>} - the hospitalisation total cost
	 */
	getHospitalisationCost = async (visit: VisitsResponse): Promise<number> => {
		const hospitalisation: HospitalisationResponse = (visit.expand as RecordModel)?.hospit;

		if (!hospitalisation) return 0;

		const { start, end, price = 0 } = hospitalisation;
		const days = Math.abs(getDaysBetween(start, end));

		return currency(price).multiply(days).value;
	};

	/**
	 * Generate the bill information
	 */
	generateBill = async (): Promise<BillInformation | undefined> => {
		try {
			const visit = await this.getClientExpandedVisit();

			if (visit.bill.total === 0) {
				return;
			}

			return {
				id: visit.bill.id,
				animal: visit.animal.name,
				client: visit.animal.client.name,
				items: await this.getBillItems(visit)
			};
		} catch (error) {
			console.error('failed to generate bill', { error });
		}
	};

	/**
	 * get the list of items in the bill
	 *
	 * @param {Visit} visit - the visit object
	 * @returns {Promise<BillItem[]>} - the bill items
	 */
	getBillItems = async (visit: Visit): Promise<BillItem[]> => {
		let items: BillItem[] = [
			...(visit.visit_price
				? [
						{
							price: visit.visit_price,
							code: '-',
							name: 'Consultation',
							total: visit.visit_price,
							quantity: 1,
							discount: 0
						}
				  ]
				: []),
			...visit.clinical_exams.map(({ price, name, code, id }) => {
				const metadata = visit.item_metadata?.find(({ item }) => item === id);
				const quantity = metadata?.quantity ?? 1;

				return {
					price,
					code,
					name,
					total: currency(price).multiply(quantity).value,
					quantity: metadata?.quantity ?? 1,
					discount: metadata?.discount ?? 0
				} satisfies BillItem;
			}),
			...visit.medical_acts.map(({ price, name, code, id }) => {
				const metadata = visit.item_metadata?.find(({ item }) => item === id);
				const quantity = metadata?.quantity ?? 1;

				return {
					price,
					code,
					name,
					total: currency(price).multiply(quantity).value,
					quantity: metadata?.quantity ?? 1,
					discount: metadata?.discount ?? 0
				} satisfies BillItem;
			}),
			...visit.surgical_acts.map(({ price, name, code, id }) => {
				const metadata = visit.item_metadata?.find(({ item }) => item === id);
				const quantity = metadata?.quantity ?? 1;

				return {
					price,
					code,
					name,
					total: currency(price).multiply(quantity).value,
					quantity,
					discount: metadata?.discount ?? 0
				} satisfies BillItem;
			}),
			...visit.store_items.map(({ price, name, code, id }) => {
				const metadata = visit.item_metadata?.find(({ item }) => item === id);
				const quantity = metadata?.quantity ?? 1;

				return {
					price,
					code,
					name,
					total: currency(price).multiply(quantity).value,
					quantity,
					discount: metadata?.discount ?? 0
				} satisfies BillItem;
			})
		];

		if (visit.hospit.start) {
			const { start, end, price = 0 } = visit.hospit;
			const hospitQuantity = getDaysBetween(start, end);
			const total = currency(price).multiply(hospitQuantity).value;

			items = [
				...items,
				{
					name: 'Hospitalisation',
					price: price,
					quantity: hospitQuantity,
					code: 'hospit',
					total,
					discount: 0
				}
			];
		}

		return items;
	};
}

export default BillService;
