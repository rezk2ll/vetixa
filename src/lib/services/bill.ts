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
	ConfigResponse,
	FundTransactionsMethodOptions,
	FundTransactionsRecord,
	HospitalisationResponse,
	InventoryItemResponse,
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
	getExpandedVisit = async (): Promise<VisitsResponse> => {
		return await this.pb.collection('visits').getOne<VisitsResponse>(this.visit.id, {
			expand: 'medical_acts, clinical_exams, surgical_acts, hospit, store_items'
		});
	};

	/**
	 * Fetches the visit including the animal and client information
	 *
	 * @returns {Promise<Visit>}
	 */
	getClientExpandedVisit = async (): Promise<Visit> => {
		const visitRecord = await this.pb.collection('visits').getOne<VisitsResponse>(this.visit.id, {
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

		const totalPaid = bill.total_paid + amount;
		const paid = bill.total - totalPaid === 0;

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

		return (
			hostpitCost +
			this.getExamsCost(visitRecord) +
			this.getInventoryItemsCost(visitRecord) +
			this.getMedicalActsCost(visitRecord) +
			this.getSurgicalActsCost(visitRecord)
		);
	};

	/**
	 * Calculate the exams cost
	 *
	 * @param {VisitsResponse} visit - the expanded visit
	 * @returns {number} - the exams total cost
	 */
	getExamsCost = (visit: VisitsResponse): number => {
		const exams: ClinicalExamsResponse[] = (visit.expand as RecordModel)?.medical_acts || [];

		return exams.reduce((acc, exam) => acc + exam.price, 0);
	};

	/**
	 * Calculate medical acts cost
	 *
	 * @param {VisitsResponse} visit - the expanded visit
	 * @returns {number} - the medical acts total cost
	 */
	getMedicalActsCost = (visit: VisitsResponse): number => {
		const medicalActs: MedicalActsResponse[] = (visit.expand as RecordModel)?.medical_acts || [];

		return medicalActs.reduce((acc, act) => acc + act.price, 0);
	};

	/**
	 * Calculate surgical acts cost
	 *
	 * @param {VisitsResponse} visit - the expanded visit
	 * @returns {number} - the surgical acts total cost
	 */
	getSurgicalActsCost = (visit: VisitsResponse): number => {
		const surgicalActs: SurgicalActsResponse[] = (visit.expand as RecordModel)?.surgical_acts || [];

		return surgicalActs.reduce((acc, act) => acc + act.price, 0);
	};

	/**
	 * Calculate inventory items cost
	 *
	 * @param {VisitsResponse} visit - the expanded visit
	 * @returns {number} - the inventory items total cost
	 */
	getInventoryItemsCost = (visit: VisitsResponse): number => {
		const inventoryItems: InventoryItemResponse[] =
			(visit.expand as RecordModel)?.store_items || [];

		return inventoryItems.reduce((acc, item) => acc + item.price, 0);
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

		const { start, end } = hospitalisation;

		const hospitConfig = await this.pb
			.collection('config')
			.getFirstListItem<ConfigResponse>('code = "hospit_price"');

		const price = currency(hospitConfig.value ?? 0);
		const days = Math.abs(getDaysBetween(start, end));

		return price.multiply(days).value;
	};

	/**
	 * Generate the bill information
	 */
	generateBill = async (): Promise<BillInformation | undefined> => {
		try {
			const visit = await this.getClientExpandedVisit();

			if (visit.bill.total === 0) {
				throw Error('empty bill');
			}

			return {
				animal: visit.animal.name,
				client: visit.animal.client.name,
				items: await this.getBillItems(visit)
			};
		} catch (error) {
			console.error('failed to generate bill', error);
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
			...visit.clinical_exams.map(
				({ price, name, code }) =>
					({
						price,
						code,
						name,
						quantity: 1
					} satisfies BillItem)
			),
			...visit.medical_acts.map(
				({ price, name, code }) =>
					({
						price,
						code,
						name,
						quantity: 1
					} satisfies BillItem)
			),
			...visit.surgical_acts.map(
				({ price, name, code }) =>
					({
						price,
						code,
						name,
						quantity: 1
					} satisfies BillItem)
			),
			...visit.store_items.map(
				({ price, name, code }) =>
					({
						price,
						code,
						name,
						quantity: 1
					} satisfies BillItem)
			)
		];

		if (visit.hospit) {
			const { start, end } = visit.hospit;
			const hospitQuantity = getDaysBetween(start, end);
			const price = await this.getHospitalisationCost(visit as unknown as VisitsResponse);

			items = [
				...items,
				{ name: 'Hospitalisation', price, quantity: hospitQuantity, code: 'hospit' }
			];
		}

		return items;
	};
}

export default BillService;
