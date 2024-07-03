import type { BillsResponse, ClientBill, TypedPocketBase, VisitsResponse } from '$types';
import type { RecordModel } from 'pocketbase';

class ClientService {
	constructor(private readonly pb: TypedPocketBase) {}

	getClientBills = async (clientId: string): Promise<ClientBill[]> => {
		const bills = await this.pb.collection('bills').getFullList<BillsResponse>({
			filter: `visit.animal.client.id = "${clientId}"`,
			expand: 'visit'
		});

		return bills.map((bill: BillsResponse) => {
			return {
				...bill,
				control: ((bill.expand as RecordModel)?.visit as VisitsResponse).control
			} satisfies ClientBill;
		});
	};
}

export default ClientService;
