import type { FundTransactionsResponse } from './pocketbase-types';

export type storeStatusFilter = 'all' | 'available' | 'alert' | 'unavailable';
export type fundsStatusFilter = 'all' | 'income' | 'expense';

export interface Fund extends FundTransactionsResponse {
	category: string;
	description: string;
}
