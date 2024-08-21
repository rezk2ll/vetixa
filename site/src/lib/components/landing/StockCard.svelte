<script lang="ts">
	import { stockImageVisible, stockTextVisible } from '$lib/store';
	import { isIntersecting } from '$lib/utils/observer';
	import { onDestroy, onMount } from 'svelte';

	let imageRef: Element;
	let textRef: Element;

	let imageObserver: IntersectionObserver | undefined;
	let textObserver: IntersectionObserver | undefined;

	onMount(() => {
		imageObserver = isIntersecting(stockImageVisible);
		textObserver = isIntersecting(stockTextVisible);

		imageObserver?.observe(imageRef);
		textObserver?.observe(textRef);
	});

	onDestroy(() => {
		imageObserver?.unobserve(imageRef);
		textObserver?.unobserve(textRef);
	});
</script>

<div class="mx-auto items-center md:flex">
	<div
		class="pb-6 md:w-2/5 md:pl-4 {$stockTextVisible
			? 'opacity-100'
			: 'translate-y-12 opacity-0'} transition-all duration-700 ease-in"
		bind:this={textRef}
	>
		<h2
			class="md:leading-20 pb-2 text-center text-2xl font-extrabold leading-tight text-gray-900 md:px-4 md:text-left md:text-4xl lg:px-0 lg:pl-8 lg:text-5xl"
		>
			Gestion avancée des inventaires
		</h2>
		<div
			class="text-md px-8 pb-2 leading-normal text-gray-500 md:px-4 md:text-left md:text-xl md:leading-normal lg:px-2 lg:pl-8"
		>
			Gérez vos stocks de produits vétérinaires et visualisez les tendances avec des outils
			analytiques.
		</div>
	</div>
	<div
		class="relative flex rounded-xl p-1 shadow-all-2xl md:w-3/5 {$stockImageVisible
			? 'opacity-100'
			: '-translate-y-1/3 translate-x-1/4 -skew-y-12 opacity-0'} transition-all duration-700 ease-in"
	>
		<div class=" absolute inset-0 z-20 translate-y-1/3 rounded-xl"></div>
		<div class="z-10 rounded-xl">
			<div class="" bind:this={imageRef}>
				<div class="overflow-hidden">
					<img class="relative z-10" src="/stock.png" alt="vists list" loading="lazy" />
				</div>
			</div>
		</div>
	</div>
</div>
