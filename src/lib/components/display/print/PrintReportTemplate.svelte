<script lang="ts">
	import { formatDateSimple } from '$lib/utils/date';
	import type { expandedAnimal } from '$types';
	import { configuration } from '$store/configuration';
	import PrintableFooter from '$components/display/PrintableFooter.svelte';
	import PrintableHeader from '$components/display/PrintableHeader.svelte';

	export let report: string | undefined;
	export let actions: string | undefined;
	export let doctor: string | undefined;
	export let animal: expandedAnimal;
	export let acts: string[] | undefined;
</script>

<div class="sm:w-11/12 lg:w-full">
	<div class="flex flex-col p-2 bg-white rounded-xl h-full">
		<div class="flex justify-between">
			{#if $configuration}
				<PrintableHeader config={$configuration} />
			{/if}

			<h2
				class="text-2xl md:text-3xl font-semibold text-gray-800 underline first-letter:capitalize text-center"
			>
				compte rendu
			</h2>
			<div class="text-lg text-gray-500">
				{#if doctor && doctor.length}
					Dr {doctor}
				{/if}
			</div>
		</div>

		<div class="mt-1 grid sm:grid-cols-2 gap-2">
			<div>
				<div class="flex flex-row space-x-1">
					<h3 class="text-md font-semibold text-gray-800 text-lg">
						{animal.type}
						{animal.sex}
						{animal.name}
					</h3>
				</div>
			</div>

			<div class="sm:text-end space-y-2">
				<div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
					<dl class="grid sm:grid-cols-5 gap-x-3">
						<dt class="col-span-3 font-semibold text-gray-800 text-lg">Date:</dt>
						<dd class="col-span-2 text-gray-500 text-lg">{formatDateSimple(new Date())}</dd>
					</dl>
				</div>
			</div>
		</div>
		<div class="mt-2">
			<hr />
			{@html report}
			{#if actions}
				<hr />
				<div class="pt-2">
					<div class="text-center font-semibold text-lg pt-1">Conduites à tenir</div>
					{@html actions}
				</div>
			{/if}
			{#if acts && acts.length}
				<div class="pt-2">
					<hr />
					<div class="py-2 text-center font-semibold text-lg">Actes</div>
					<div class="flex felx-row gap-1">
						{#each acts as act, index}
							<div>{act} {index === acts.length - 1 ? '' : '-'}</div>
						{/each}
					</div>
				</div>
			{/if}
		</div>
	</div>
	{#if $configuration}
		<PrintableFooter config={$configuration} />
	{/if}
</div>
