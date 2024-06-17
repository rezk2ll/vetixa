<script lang="ts">
	import FundsEvolution from '$components/charts/funds/FundsEvolution.svelte';
	import FundsPaymentMethodsStats from '$components/charts/funds/FundsPaymentMethodsStats.svelte';
	import IncomeEvolution from '$components/charts/funds/IncomeEvolution.svelte';
	import FundsList from '$components/lists/FundsList.svelte';
	import { addExpenseFormStore, addFundsFormStore, fundsPageInfo } from '$store/funds';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ labels, balanceData, stats, pageInfo, addExpenses, addFundsForm } = data);

	$: addFundsFormStore.set(addFundsForm);
	$: addExpenseFormStore.set(addExpenses);
	$: fundsPageInfo.set(pageInfo);

	$: balance = balanceData.map(({ balance }) => balance);
	$: income = balanceData.map(({ income }) => income);
	$: expense = balanceData.map(({ expense }) => expense);
</script>

<div class="flex flex-col xl:flex-row lg:pl-14 w-full">
	<FundsList />
	<div class="w-full lg:w-5/12 flex flex-col lg:px-10 lg:gap-3 lg:pt-10">
		<FundsEvolution {labels} data={balance} />
		<IncomeEvolution {labels} bind:income bind:expense />
		<FundsPaymentMethodsStats {stats} />
	</div>
</div>
