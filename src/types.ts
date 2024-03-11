import type {
	FundTransactionsResponse,
	QueueResponse,
	VisitsResponse,
	AnimalsResponse,
	ClientsResponse,
	BillsResponse
} from './pocketbase-types';

export * from './pocketbase-types';

export type storeStatusFilter = 'all' | 'available' | 'alert' | 'unavailable';
export type fundsStatusFilter = 'all' | 'income' | 'expense';
export type QueueStatusFilter = 'pending' | 'completed';
export type AnimalStatusFilter = 'all' | 'chat' | 'chien' | 'male' | 'female';
export type VisitStatusFilter = 'all' | 'pending' | 'partial' | 'completed';

export interface Fund extends FundTransactionsResponse {
	category: string;
	description: string;
}

export interface QueueItem extends Omit<QueueResponse, 'visit'> {
	visit: Visit;
}

export interface Visit extends Omit<VisitsResponse, 'animal'> {
	animal: expandedAnimal;
	bill: BillsResponse;
}

export interface expandedAnimal extends Omit<AnimalsResponse, 'client'> {
	client: ClientsResponse;
}

export type Queue = QueueItem[];

export type ClientsResponseData = IClient[];

export interface IClient extends Omit<ClientsResponse, 'animals'> {
	animals: AnimalsResponse[];
}

export type PaymentMethodType = 'cash' | 'tpe' | 'cheque';
