<script lang="ts">
	import FundsEvolution from '$lib/components/charts/funds/FundsEvolution.svelte';
	import IncomeEvolution from '$lib/components/charts/funds/IncomeEvolution.svelte';
	import FundsList from '$lib/components/lists/FundsList.svelte';
	import { addExpenseFormStore, addFundsFormStore, fundItems } from '$lib/store/funds';
	import type { PageData } from './$types';

	export let data: PageData;

	$: addFundsFormStore.set(data.addFundsForm);
	$: addExpenseFormStore.set(data.addExpenses);
	$: fundItems.set(data.transactions);
	$: ({ labels, balanceData } = data);

	$: balance = balanceData.map(({ balance }) => balance);
	$: income = balanceData.map(({ income }) => income);
	$: expense = balanceData.map(({ expense }) => expense);
</script>

<div class="flex flex-col xl:flex-row lg:pl-14 w-full">
	<FundsList />
	<div class="w-full lg:w-5/12 flex flex-col lg:px-10 gap-3 pt-10">
		<FundsEvolution {labels} data={balance} />
		<IncomeEvolution {labels} bind:income bind:expense />
	</div>
</div>
