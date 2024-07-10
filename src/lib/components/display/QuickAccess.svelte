<script lang="ts">
	import ForwardArrow from '$components/icons/ForwardArrow.svelte';

	export let title: string;
	export let description: string;
	export let color: 'pink' | 'blue' | 'gray';
	export let href: string;
	export let action: string;
</script>

<div
	class="relative mt-6 flex w-full xl:w-10/12 flex-col xl:rounded-2xl bg-white bg-clip-border text-gray-700 xl:shadow-lg"
>
	<div class="p-4 px-6 pb-2">
		<div
			class="{color === 'pink'
				? 'text-pink-500'
				: color === 'blue'
				? 'text-blue-500'
				: 'text-blueGray-600'} mb-4"
		>
			<slot />
		</div>
		<h5
			class="mb-2 block font-sans text-xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased"
		>
			{title}
		</h5>
		<p class="block font-sans text-base font-light leading-relaxed text-inherit antialiased">
			{description}
		</p>
	</div>
	<div class="p-6 pt-0 pb-2">
		<a
			class="!font-medium !text-blue-gray-900 !transition-colors hover:!{color === 'pink'
				? 'text-pink-500'
				: color === 'blue'
				? 'text-blue-500'
				: 'text-blueGray-600'}"
			{href}
		>
			<button
				class="flex select-none items-center gap-2 rounded-lg py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase {color ===
				'pink'
					? 'text-pink-500'
					: color === 'blue'
					? 'text-blue-500'
					: 'text-blueGray-600'} transition-all {color === 'pink'
					? 'hover:bg-pink-500/10'
					: color === 'blue'
					? 'hover:bg-blue-500/10'
					: 'hover:bg-blueGray-600/10'} {color === 'pink'
					? 'active:bg-pink-500/30'
					: color === 'blue'
					? 'active:bg-blue-500/30'
					: 'active:bg-blueGray-600/30'} disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
				type="button"
				data-ripple-dark="true"
			>
				{action}

				<ForwardArrow />
			</button>
		</a>
	</div>
</div>
