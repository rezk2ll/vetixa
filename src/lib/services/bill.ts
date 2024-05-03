import type {
	BillsMethodOptions,
	BillsRecord,
	BillsResponse,
	ClinicalExamsResponse,
	FundTransactionsMethodOptions,
	FundTransactionsRecord,
	InventoryItemResponse,
	MedicalActsResponse,
	SurgicalActsResponse,
	TypedPocketBase,
	VisitsResponse
} from '$types';
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
			expand: 'animal, medical_acts, clinical_exams, surgical_acts, animal, hospit, store_items'
		});
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

		const medicalActs: MedicalActsResponse[] =
			(visitRecord.expand as RecordModel)?.medical_acts || [];
		const clinicalExams: ClinicalExamsResponse[] =
			(visitRecord.expand as RecordModel)?.clinical_exams || [];
		const surgicalActs: SurgicalActsResponse[] =
			(visitRecord.expand as RecordModel)?.surgical_acts || [];
		const inventoryItems: InventoryItemResponse[] =
			(visitRecord.expand as RecordModel)?.store_items || [];

		const examsPrice = clinicalExams.reduce((acc, exam) => acc + exam.price, 0);
		const medicalActsPrice = medicalActs.reduce((acc, act) => acc + act.price, 0);
		const surgicalActsPrice = surgicalActs.reduce((acc, act) => acc + act.price, 0);
		const inventoryItemsPrice = inventoryItems.reduce((acc, item) => acc + item.price, 0);

		return examsPrice + medicalActsPrice + surgicalActsPrice + inventoryItemsPrice;
	};
}

export default BillService;
