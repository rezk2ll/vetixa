import type { RecordModel } from 'pocketbase';
import type {
	BillsResponse,
	FundPaymentMethodsStats,
	FundTransactionsResponse,
	FundsPageInfo,
	FundsTotal,
	TypedPocketBase,
	UsersResponse,
	fundsStatusFilter
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
				expand: 'user',
				sort: 'created'
			});

		return this.expandTranscations(transactionslist);
	};

	/**
	 * Fetches a given page of transactions
	 *
	 * @param {string} startDate - the start date
	 * @param {string} endDate - the end date
	 * @param {number} page - the page number
	 * @param {fundsStatusFilter} filter - the filter to apply
	 * @param {string} query - the query to search for
	 * @returns {Promise<Fund[]>} the transactions list
	 */
	transactionPage = async (
		startDate: string,
		endDate: string,
		page: number = 1,
		filter: fundsStatusFilter = 'all',
		query: string = ''
	): Promise<Omit<FundsPageInfo, 'total' | 'count'>> => {
		const start = startDate.startsWith('@') ? startDate : `"${startDate}"`;
		const end = endDate.startsWith('@') ? endDate : `"${endDate}"`;

		const filterString =
			filter === 'income' ? '&& amount > 0' : filter === 'expense' ? '&& amount < 0' : '';

		const transactionslist = await this.pb
			.collection('fund_transactions')
			.getList<FundTransactionsResponse>(page, 10, {
				filter: `created >= ${start} && created <= ${end} && description ~ "${query}" ${filterString}`,
				expand: 'user'
			});
		const items = this.expandTranscations(transactionslist.items);

		return {
			...transactionslist,
			items,
			query,
			filter,
			startDate,
			endDate
		};
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

	/**
	 * Expand a transaction list and return a formatted fund list
	 *
	 * @param {FundTransactionsResponse[]} transactions - the list of transactions
	 * @returns {Fund[]} the expanded fund list
	 */
	private expandTranscations = (transactions: FundTransactionsResponse[]): Fund[] =>
		transactions
			.map((transaction) => {
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
			})
			.sort((a, b) => sortDates(a.created, b.created));

	/**
	 * Fetches the totals stats of a transactions list
	 *
	 * @param {FundTransactionsResponse[]} transactions - the list of transactions
	 * @param {string} startDate - the start date
	 * @param {string} endDate - the end date
	 * @returns {Promise<FundsTotal>} the totals stats
	 */
	transactionsTotals = async (
		transactions: FundTransactionsResponse[],
		startDate: string,
		endDate: string
	): Promise<FundsTotal> => {
		const income = transactions.reduce(
			(acc, curr) => currency(acc).add(curr.amount > 0 ? curr.amount : 0).value,
			0
		);
		const expense = transactions.reduce(
			(acc, curr) => currency(acc).add(curr.amount < 0 ? Math.abs(curr.amount) : 0).value,
			0
		);
		const balance = currency(income).subtract(expense).value;

		const unpaidBills = await this.pb.collection('bills').getFullList<BillsResponse>({
			filter: `total_paid < total && created >= "${startDate}" && created <= "${endDate}"`
		});

		const remaining = unpaidBills.reduce(
			(acc, curr) => currency(acc).add(curr.total).subtract(curr.total_paid).value,
			0
		);

		return {
			balance,
			expense,
			income,
			remaining
		};
	};
}
