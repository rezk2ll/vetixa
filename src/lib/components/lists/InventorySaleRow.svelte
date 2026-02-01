<script lang="ts">
	import { formatDateStringShort, formatDateStringToTime } from '$utils/date';
	import { getSaleType } from '$utils/sales';
	import Store from '$components/icons/Store.svelte';
	import DiagnosticIcon from '$components/icons/DiagnosticIcon.svelte';
	import type { InventorySaleItem } from '$types';

	export let item: InventorySaleItem;
</script>

<tr>
	<td class="px-4 py-3 text-sm font-medium whitespace-nowrap">
		<h2 class="font-medium text-gray-800 dark:text-white capitalize min-h-7">
			{formatDateStringShort(item.created)}
		</h2>
	</td>
	<td class="px-4 py-3 text-sm font-medium whitespace-nowrap">
		<h2 class="font-medium text-gray-600 dark:text-white capitalize min-h-7">
			{formatDateStringToTime(item.created)}
		</h2>
	</td>
	<td class="px-1 py-3 text-sm font-medium">
		<p class="text-sm font-normal text-black first-letter:capitalize whitespace-pre-line min-h-7">
			{item.item.name}
		</p>
		<p class="text-xs font-normal text-gray-600 first-letter:capitalize whitespace-pre-line">
			{@html item.item.description ?? ''}
		</p>
	</td>
	<td class="px-2 py-3 text-sm font-medium">
		<p
			class="text-sm font-normal text-gray-600 first-letter:capitalize whitespace-pre-line min-h-7"
		>
			{getSaleType(item.type)}
		</p>
	</td>
	<td class="px-4 py-3 text-sm font-medium min-h-28">
		<p
			class="text-sm font-normal text-gray-600 first-letter:capitalize whitespace-pre-line min-h-7"
		>
			{item.item.code ?? ''}
		</p>
	</td>
	<td class="px-4 py-3 text-sm font-medium whitespace-nowrap">
		<p class="text-sm font-normal text-gray-600 first-letter:capitalize min-h-7">
			{item.quantity}
		</p>
	</td>
	<td class="px-4 py-3 text-sm font-medium whitespace-nowrap">
		<p class="text-sm font-normal text-gray-600 first-letter:capitalize min-h-7">
			{item.discount ?? 0}
		</p>
	</td>
	<td class="px-4 py-3 text-sm font-medium whitespace-nowrap">
		{#if item.visit}
			<a class="flex gap-1 items-center justify-center text-blue-500" href="/visit/{item.visit}">
				<DiagnosticIcon />
				<span class="first-letter:capitalize"> Visite </span>
			</a>
		{:else}
			<div class="flex gap-1 items-center justify-center">
				<Store size="small" />
				<span class="first-letter:capitalize">Boutique</span>
			</div>
		{/if}
	</td>

	<td class="px-4 py-3 text-sm whitespace-nowrap">
		<div
			class="inline px-3 py-1 text-sm font-normal rounded-full text-emerald-600 gap-x-2 bg-emerald-100/60"
		>
			{item.total} dt
		</div>
	</td>
</tr>
