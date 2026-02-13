<script lang="ts">
	import type { entityDetailsList } from '$types';
	import AgeDisplay from '$components/display/AgeDisplay.svelte';

	export let details: entityDetailsList;
</script>

<div class="border-t border-gray-100 dark:border-gray-700">
	<dl class="divide-y divide-gray-100 dark:divide-gray-700">
		{#each details as detail}
			{#if detail.value}
				<div class="px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-3 sm:px-0">
					<dt class="text-sm font-medium leading-6 text-gray-900 dark:text-gray-100">
						{detail.name}
					</dt>
					<dd class="mt-1 text-sm leading-6 text-gray-700 dark:text-gray-300 sm:col-span-2 sm:mt-0">
						{#if detail.isAge === true}
							<AgeDisplay date={detail.value.toString()} death={detail.death} dead={detail.dead} />
						{:else}
							{detail.value}
						{/if}
						{#if detail.prefix}
							{detail.prefix}
						{/if}
					</dd>
				</div>
			{/if}
		{/each}
	</dl>
</div>
