<script lang="ts">
	import CertificateIcon from '$lib/components/icons/CertificateIcon.svelte';
	import PrintIcon from '$lib/components/icons/PrintIcon.svelte';
	import type { PrintableTab } from '$types';

	export let tab: PrintableTab = 'documents';

	const changeTab = (payload: PrintableTab) => {
		tab = payload;
	};
</script>

<div class="flex overflow-x-auto whitespace-nowrap w-full">
	<button
		type="button"
		on:click={() => changeTab('documents')}
		class="inline-flex items-center w-full h-12 px-2 py-2 text-center text-gray-700 {tab ===
		'documents'
			? 'border border-b-0'
			: 'bg-transparent border-b'}  border-gray-300 sm:px-4 rounded-t-md -px-1 whitespace-nowrap focus:outline-none"
	>
		<PrintIcon />

		<span class="mx-1 text-sm sm:text-base"> Documents </span>
	</button>

	<button
		type="button"
		on:click={() => changeTab('certificates')}
		class="inline-flex items-center w-full h-12 px-2 py-2 text-center text-gray-700 {tab ===
		'certificates'
			? 'border border-b-0'
			: 'bg-transparent border-b'} border-gray-300 sm:px-4 -px-1 whitespace-nowrap cursor-base focus:outline-none hover:border-gray-400 dark:hover:border-gray-300"
	>
		<CertificateIcon />

		<span class="mx-1 text-sm sm:text-base"> Certificats </span>
	</button>
</div>
