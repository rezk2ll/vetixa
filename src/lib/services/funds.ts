import type { RecordModel } from 'pocketbase';
import type {
	FundPaymentMethodsStats,
	FundTransactionsResponse,
	TypedPocketBase,
	UsersResponse
} from '$types';
import { setHours } from 'date-fns';
import { formatFilterDate, sortDates } from '$lib/utils/date';
import type { Fund } from '$types';
import currency from 'currency.js';

type BalanceData = {
	income: number;
	expense: number;
	balance: number;
};

export class FundsService {
	constructor(private readonly pb: TypedPocketBase) {}

	/**
	 * returns the balance for a given date
	 *
	 * @param {Date} date - the date to get the balance for
	 *
	 * @returns {Promise<number>} - the total balance
	 */
	getDateBalanceData = async (date: Date): Promise<BalanceData> => {
		const startDate = setHours(date, 0);
		const endDate = setHours(date, 23);

		const transactions = await this.transactions(
			formatFilterDate(startDate),
			formatFilterDate(endDate)
		);

		return {
			income: transactions.reduce(
				(acc, curr) => currency(acc).add(curr.amount > 0 ? curr.amount : 0).value,
				0
			),
			expense: transactions.reduce(
				(acc, curr) => currency(acc).add(curr.amount < 0 ? Math.abs(curr.amount) : 0).value,
				0
			),
			balance: transactions.reduce((acc, curr) => currency(acc).add(curr.amount).value, 0)
		};
	};

	/**
	 * returns the balance for a given list of dates
	 *
	 * @param {Date[]} dates - the list of dates to get the balance for
	 * @returns {Promise<BalanceData[]>} - the total balance for each date
	 */
	getDatesBalance = async (dates: Date[]): Promise<BalanceData[]> => {
		const list = [];

		for (const date of dates) {
			list.push(await this.getDateBalanceData(date));
		}

		return list;
	};

	/**
	 * returns all transactions for a given date range
	 *
	 * @param {string} startDate - the start date
	 * @param {string} endDate - the end date
	 *
	 * @returns {Promise<Fund[]>} the transactions list
	 */
	transactions = async (startDate: string, endDate: string): Promise<Fund[]> => {
		const start = startDate.startsWith('@') ? startDate : `"${startDate}"`;
		const end = endDate.startsWith('@') ? endDate : `"${endDate}"`;

		const transactionslist = await this.pb
			.collection('fund_transactions')
			.getFullList<FundTransactionsResponse>({
				filter: `created >= ${start} && created <= ${end}`,
				expand: 'user'
			});

		const expandedTransactions = transactionslist.map((transaction) => {
			if (!transaction.expand) {
				return {
					...transaction,
					category: transaction.amount > 0 ? 'revenu' : 'frais'
				};
			}

			const user = (transaction.expand as RecordModel).user as unknown as UsersResponse;

			return {
				...transaction,
				user: user.name,
				category: transaction.amount > 0 ? 'revenu' : 'frais'
			} as Fund;
		});

		return expandedTransactions.sort((a, b) => sortDates(a.created, b.created));
	};

	/**
	 * calculates the payment method stats for a given list of transactions
	 *
	 * @param {Fund[]} transactions - the list of transactions
	 * @returns {Promise<FundPaymentMethodsStats>} the payment method stats
	 */
	paymentMethodStats = async (transactions: Fund[]): Promise<FundPaymentMethodsStats> => {
		const stats: FundPaymentMethodsStats = {};

		for (const transaction of transactions) {
			const { method } = transaction;

			if (method.length && transaction.amount > 0) {
				if (stats[method]) {
					stats[method].count++;
					stats[method].total = currency(stats[method].total).add(transaction.amount).value;
				} else {
					stats[method] = { count: 1, total: transaction.amount };
				}
			}
		}

		return stats;
	};
}
