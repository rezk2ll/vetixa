<script lang="ts">
	import { hospitImageVisible, hospitTextVisible } from '$lib/store';
	import { isIntersecting } from '$lib/utils/observer';
	import { onDestroy, onMount } from 'svelte';

	let imageRef: Element;
	let textRef: Element;

	let imageObserver: IntersectionObserver | undefined;
	let textObserver: IntersectionObserver | undefined;

	onMount(() => {
		imageObserver = isIntersecting(hospitImageVisible);
		textObserver = isIntersecting(hospitTextVisible);

		imageObserver?.observe(imageRef);
		textObserver?.observe(textRef);
	});

	onDestroy(() => {
		imageObserver?.unobserve(imageRef);
		textObserver?.unobserve(textRef);
	});
</script>

<div class="mx-auto flex-row-reverse items-center px-1 pt-40 md:flex lg:pt-0">
	<div
		class="pb-6 md:w-2/5 md:pl-4 {$hospitTextVisible
			? 'opacity-100'
			: 'translate-y-8 opacity-0'} transition-all duration-700 ease-in"
		bind:this={textRef}
	>
		<h2
			class="md:leading-20 pb-2 text-center text-2xl font-extrabold leading-tight text-gray-900 md:px-4 md:text-left md:text-3xl lg:px-0 lg:pl-8 lg:text-5xl"
		>
			Suivi des hospitalisations vétérinaires
		</h2>
		<p
			class="text-md px-12 pb-2 leading-normal text-gray-500 md:px-8 md:text-left md:text-xl md:leading-normal lg:px-0 lg:pl-8"
		>
			Suivi précis et organisation optimale des séjours en clinique.
		</p>
	</div>
	<div
		class="relative flex rounded md:w-3/5 {$hospitImageVisible
			? 'opacity-100'
			: 'opacity-0'} transition-all duration-700 ease-in"
		bind:this={imageRef}
	>
		<div class="absolute inset-0 z-20 translate-x-[8%] translate-y-2/3 lg:translate-x-1/4">
			<img
				class="relative z-20 rounded shadow-all-2xl"
				src="/hospit-2.png"
				alt="Edit Creatives Feature"
				loading="lazy"
			/>
		</div>
		<div class=" z-10 rounded shadow-all-2xl">
			<div class="p-0 md:p-2">
				<div class="overflow-hidden">
					<img
						class="relative z-10 rounded shadow-all-2xl"
						src="/hospit-1.png"
						alt="Edit Creatives Feature"
						loading="lazy"
					/>
				</div>
			</div>
		</div>
	</div>
</div>
