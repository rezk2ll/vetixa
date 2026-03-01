<script lang="ts">
	import { run } from 'svelte/legacy';

	import FundsEvolution from '$components/charts/funds/FundsEvolution.svelte';
	import FundsPaymentMethodsStats from '$components/charts/funds/FundsPaymentMethodsStats.svelte';
	import IncomeEvolution from '$components/charts/funds/IncomeEvolution.svelte';
	import FundsList from '$components/lists/FundsList.svelte';
	import { addExpenseFormStore, addFundsFormStore, fundsPageInfo } from '$store/funds';
	import type { PageData } from './$types';

	interface Props {
		data: PageData;
	}

	let { data }: Props = $props();

	let { labels, balanceData, stats, pageInfo, addExpenses, addFundsForm } = $derived(data);

	run(() => {
		addFundsFormStore.set(addFundsForm);
	});
	run(() => {
		addExpenseFormStore.set(addExpenses);
	});
	run(() => {
		fundsPageInfo.set(pageInfo);
	});

	let balance = $derived(balanceData.map(({ balance }) => balance));
	let income = $derived(balanceData.map(({ income }) => income));
	let expense = $derived(balanceData.map(({ expense }) => expense));
</script>

<div class="flex flex-col xl:flex-row lg:pl-14 w-full">
	<FundsList />
	<div class="w-full lg:w-5/12 flex flex-col lg:px-10 lg:gap-3 lg:pt-10">
		<FundsEvolution {labels} data={balance} />
		<IncomeEvolution {labels} bind:income bind:expense />
		<FundsPaymentMethodsStats {stats} />
	</div>
</div>
