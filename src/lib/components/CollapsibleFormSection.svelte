<script lang="ts">
	export let title: string;
	export let color: 'primary' | 'secondary' | 'info' = 'secondary';
	export let size: 'small' | 'big' | 'full' = 'big';
	export let show: boolean = true;
	export let shadow: boolean = true;
</script>

<div
	class="w-full px-1 {size === 'small'
		? 'xl:w-1/2'
		: size === 'big'
		? 'xl:w-10/12'
		: ''} bg-white {color === 'info' ? '' : shadow ? 'shadow-2xl' : ''} pb-1"
>
	<button
		type="button"
		class="flex justify-between px-5 py-4 border-b border-gray-100 {color === 'primary'
			? 'bg-blueGray-200'
			: color === 'secondary'
			? 'bg-gray-300'
			: 'bg-gray-100'} w-full"
		on:click={() => (show = !show)}
	>
		<h2 class="font-semibold text-gray-800">{title}</h2>
		<span class="transition {show ? '' : '-rotate-90	'}">
			<svg
				fill="none"
				shape-rendering="geometricPrecision"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				class="w-6"
				><path d="M6 9l6 6 6-6" />
			</svg>
		</span>
	</button>
	<div class="transition-all ease-in-out {show ? '' : 'hidden'} w-full px-1">
		<slot />
	</div>
</div>
