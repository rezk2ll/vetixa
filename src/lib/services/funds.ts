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
	 * returns the balance for a given date from pre-fetched transactions
	 *
	 * @param {Fund[]} transactions - all transactions in the date range
	 * @param {Date} date - the date to get the balance for
	 * @returns {BalanceData} - the balance data for the date
	 */
	private calculateDateBalance = (transactions: Fund[], date: Date): BalanceData => {
		const startOfDay = setHours(date, 0, 0, 0, 0).getTime();
		const endOfDay = setHours(date, 23, 59, 59, 999).getTime();

		const dayTransactions = transactions.filter((t) => {
			const txDate = new Date(t.created).getTime();
			return txDate >= startOfDay && txDate <= endOfDay;
		});

		return {
			income: dayTransactions.reduce(
				(acc, curr) => currency(acc).add(curr.amount > 0 ? curr.amount : 0).value,
				0
			),
			expense: dayTransactions.reduce(
				(acc, curr) => currency(acc).add(curr.amount < 0 ? Math.abs(curr.amount) : 0).value,
				0
			),
			balance: dayTransactions.reduce((acc, curr) => currency(acc).add(curr.amount).value, 0)
		};
	};

	/**
	 * returns the balance for a given list of dates using a single query
	 *
	 * @param {Date[]} dates - the list of dates to get the balance for
	 * @returns {Promise<BalanceData[]>} - the total balance for each date
	 */
	getDatesBalance = async (dates: Date[]): Promise<BalanceData[]> => {
		if (dates.length === 0) return [];

		// Find the full date range and fetch all transactions in a single query
		const sortedDates = [...dates].sort((a, b) => a.getTime() - b.getTime());
		const startDate = setHours(sortedDates[0], 0, 0, 0, 0);
		const endDate = setHours(sortedDates[sortedDates.length - 1], 23, 59, 59, 999);

		const allTransactions = await this.transactions(
			formatFilterDate(startDate),
			formatFilterDate(endDate)
		);

		// Calculate balance for each date from the cached transactions
		return dates.map((date) => this.calculateDateBalance(allTransactions, date));
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
		const queryFilter = startDate.startsWith('@')
			? `created >= ${startDate} && created <= ${endDate}`
			: this.pb.filter(`created >= {:start} && created <= {:end}`, {
					start: startDate.startsWith('@') ? startDate : new Date(startDate),
					end: endDate.startsWith('@') ? endDate : new Date(endDate)
			  });

		const transactionslist = await this.pb
			.collection('fund_transactions')
			.getFullList<FundTransactionsResponse>({
				filter: queryFilter,
				expand: 'user',
				sort: '-created'
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
		const filterString =
			filter === 'income' ? '&& amount > 0' : filter === 'expense' ? '&& amount < 0' : '';

		const queryFilter = startDate.startsWith('@')
			? `created >= ${startDate} && created <= ${endDate} && (description ~ "${query}" || amount ~ "${query}") ${filterString}`
			: this.pb.filter(
					`created >= {:start} && created <= {:end} && (description ~ "${query}" || amount ~ "${query}") ${filterString}`,
					{
						start: startDate.startsWith('@') ? startDate : new Date(startDate),
						end: endDate.startsWith('@') ? endDate : new Date(endDate)
					}
			  );

		const transactionslist = await this.pb
			.collection('fund_transactions')
			.getList<FundTransactionsResponse>(page, 10, {
				filter: queryFilter,
				expand: 'user',
				sort: '-created'
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
