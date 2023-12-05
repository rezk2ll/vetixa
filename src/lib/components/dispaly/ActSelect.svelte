<script lang="ts">
	import SelectActForm from './../forms/SelectActForm.svelte';
	import Modal from '../Modal.svelte';
	import type { SurgicalAct, MedicalAct, ClinicalExams } from '@prisma/client';

	export let title: string;
	export let description: string;
	export let items: SurgicalAct[] | MedicalAct[] | ClinicalExams[] = [];
	export let name: string;

	let open = false;
	let value: string = "";
</script>

<input type="hidden" {value} {name}>
<div
	class="flex flex-col items-center py-6 space-y-3 text-center bg-gray-100 rounded-xl dark:bg-gray-800 h-full"
>
	<Modal bind:open>
		<SelectActForm bind:open {title} {items} bind:value>
			<slot />
		</SelectActForm>
	</Modal>
	<span
		class="inline-block p-3 text-blue-500 bg-blue-100 rounded-full dark:text-white dark:bg-blue-500"
	>
		<slot />
	</span>

	<h1 class="text-xl font-semibold text-gray-700 capitalize dark:text-white">{title}</h1>

	<p class="text-gray-500 dark:text-gray-300 grow">
		{description}
	</p>

	<button
		type="button"
		on:click={() => (open = true)}
		class="flex items-center -mx-1 text-sm text-blue-500 capitalize transition-colors duration-300 transform dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
	>
		<svg
			fill="none"
			stroke="currentColor"
			class="w-6"
			stroke-width="1.5"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
			/>
		</svg>
	</button>
</div>
