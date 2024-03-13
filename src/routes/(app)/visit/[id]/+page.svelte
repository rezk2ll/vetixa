<script lang="ts">
	import PaymentTab from '$components/tabs/visit/PaymentTab.svelte';
	import TabContainer from '$components/tabs/visit/VisitTabContainer.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	$: ({ visit, clinicalExams, medicalActs, surgicalActs, form, bill } = data);
</script>

<div class="flex flex-col xl:flex-row lg:pl-14 w-full">
	<TabContainer />
	<div class="w-full lg:w-5/12 flex flex-col lg:px-10 gap-3 pt-10">
		<PaymentTab {bill} />
	</div>
</div>
