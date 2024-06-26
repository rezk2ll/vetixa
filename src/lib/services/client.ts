import type { BillsResponse, TypedPocketBase } from '$types';

class ClientService {
	constructor(private readonly pb: TypedPocketBase) {}

	getClientBills = async (clientId: string): Promise<BillsResponse[]> => {
		return await this.pb.collection('bills').getFullList<BillsResponse>({
			filter: `visit.animal.client.id = "${clientId}"`
		});
	};
}

export default ClientService;
