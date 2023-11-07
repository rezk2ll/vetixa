<script lang="ts">
	export let title: string;
	export let color: 'primary' | 'secondary' | 'info' = 'secondary';
	export let size: 'small' | 'big' | 'full' = 'big';
	export let show: boolean = true;
</script>

<div
	class="w-full {size === 'small'
		? 'xl:w-1/2'
		: size === 'big'
		? 'xl:w-10/12'
		: ''} p-5 xl:p-10 bg-white {color === 'info'
		? 'border border-teal-400'
		: 'shadow-2xl'} border-gray-200 xl:rounded-2xl h-fit mb-5"
>
	<button
		type="button"
		class="flex justify-between px-5 py-4 border-b border-gray-100 {color === 'primary'
			? 'bg-green-400'
			: color === 'secondary'
			? 'bg-gray-300'
			: 'bg-teal-300'} w-full"
		on:click={() => (show = !show)}
	>
		<h2 class="font-semibold text-gray-800">{title}</h2>
		<span class="transition {show ? '' : 'rotate-180	'}">
			<svg
				fill="none"
				height="24"
				shape-rendering="geometricPrecision"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				width="24"
				><path d="M6 9l6 6 6-6" />
			</svg>
		</span>
	</button>
	<div class="py-3 xl:px-5 {show ? '' : 'hidden'}">
		<slot />
	</div>
</div>
