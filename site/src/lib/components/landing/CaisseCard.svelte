<script lang="ts">
	import { caisseTextVisible, caisseImageVisible } from '$lib/store';
	import { isIntersecting } from '$lib/utils/observer';
	import { onDestroy, onMount } from 'svelte';

	let imageRef: Element;
	let textRef: Element;

	let imageObserver: IntersectionObserver | undefined;
	let textObserver: IntersectionObserver | undefined;

	onMount(() => {
		imageObserver = isIntersecting(caisseImageVisible);
		textObserver = isIntersecting(caisseTextVisible);

		imageObserver?.observe(imageRef);
		textObserver?.observe(textRef);
	});

	onDestroy(() => {
		imageObserver?.unobserve(imageRef);
		textObserver?.unobserve(textRef);
	});
</script>

<div class="-my-24 mx-auto flex-row-reverse items-center md:flex lg:-my-40">
	<div
		class="pb-6 md:w-2/5 md:pl-4 {$caisseTextVisible
			? 'opacity-100'
			: 'translate-y-1/3 opacity-0'} transition-all duration-700 ease-in"
		bind:this={textRef}
	>
		<h2
			class="md:leading-20 pb-2 text-center text-2xl font-extrabold leading-tight text-gray-900 md:px-4 md:text-left md:text-4xl lg:px-0 lg:pl-8 lg:text-5xl"
		>
			Suivi précis de la caisse
		</h2>
		<p
			class="text-md px-12 pb-2 leading-normal text-gray-500 md:px-4 md:text-left md:text-xl md:leading-normal lg:px-0 lg:pl-8"
		>
			Analysez les mouvements de trésorerie minute par minute avec des graphiques d'évolution et des
			statistiques.
		</p>
	</div>
	<div
		class="relative flex rounded-xl md:w-3/5 {$caisseImageVisible
			? 'opacity-100'
			: '-translate-x-1/4 translate-y-1/3 -skew-y-12 opacity-0'} transition-all duration-700 ease-in"
		bind:this={imageRef}
	>
		<div class="absolute inset-0 z-20 translate-x-1/4 translate-y-2/3 rounded-xl"></div>
		<div class=" z-10 rounded-xl shadow-all-2xl">
			<div class="p-0 md:p-2">
				<div class="overflow-hidden">
					<img
						class="relative z-10 rounded-lg shadow-all-2xl"
						src="/caisse.png"
						alt="Edit Creatives Feature"
						loading="lazy"
					/>
				</div>
			</div>
		</div>
	</div>
</div>
