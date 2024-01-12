import type {
	AnimalsResponse,
	ClientsResponse,
	FundTransactionsResponse,
	QueueResponse,
	VisitsResponse
} from './pocketbase-types';

export type storeStatusFilter = 'all' | 'available' | 'alert' | 'unavailable';
export type fundsStatusFilter = 'all' | 'income' | 'expense';
export type QueueStatusFilter = 'pending' | 'completed';
export type AnimalStatusFilter = 'all' | 'chat' | 'chien' | 'male' | 'female';

export interface Fund extends FundTransactionsResponse {
	category: string;
	description: string;
}

export interface QueueItem extends Omit<QueueResponse, 'visit'> {
	visit: expandedVisit;
}

export interface expandedVisit extends Omit<VisitsResponse, 'animal'> {
	animal: expandedAnimal;
}

export interface expandedAnimal extends Omit<AnimalsResponse, 'client'> {
	client: ClientsResponse;
}

export type Queue = QueueItem[];
