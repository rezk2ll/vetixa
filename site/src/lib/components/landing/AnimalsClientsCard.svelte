<script lang="ts">
	import { animalsImageVisible, animalsTextVisible } from '$lib/store';
	import { isIntersecting } from '$lib/utils/observer';
	import { onDestroy, onMount } from 'svelte';

	let imageRef: Element;
	let textRef: Element;

	let imageObserver: IntersectionObserver | undefined;
	let textObserver: IntersectionObserver | undefined;

	onMount(() => {
		imageObserver = isIntersecting(animalsImageVisible);
		textObserver = isIntersecting(animalsTextVisible);

		imageObserver?.observe(imageRef);
		textObserver?.observe(textRef);
	});

	onDestroy(() => {
		imageObserver?.unobserve(imageRef);
		textObserver?.unobserve(textRef);
	});
</script>

<div class="mx-auto items-center pt-40 md:flex lg:pt-0">
	<div
		class="pb-6 md:w-3/6 md:pl-4 {$animalsTextVisible
			? 'opacity-100'
			: 'translate-y-8 opacity-0 '} transition-all duration-700 ease-in"
		bind:this={textRef}
	>
		<div
			class="md:leading-20 pb-2 text-center text-2xl font-extrabold leading-tight text-gray-900 md:px-4 md:text-left md:text-3xl lg:px-0 lg:pl-8 lg:text-5xl"
		>
			Gestion complète <br />des clients et animaux
		</div>
		<p
			class="text-md px-12 pb-2 leading-normal text-gray-500 md:px-4 md:text-left md:text-xl md:leading-normal lg:px-10 lg:pl-8"
		>
			Un système complet pour gérer les clients, les animaux, les factures, les vaccinations, et
			plus encore.
		</p>
	</div>
	<div
		class="relative flex rounded md:w-3/6 {$animalsImageVisible
			? 'opacity-100'
			: 'opacity-0'} transition-all duration-700 ease-in"
		bind:this={imageRef}
	>
		<div
			class=" absolute inset-0 z-20 translate-x-[15%] translate-y-2/4 rounded lg:translate-x-[27%]"
		>
			<img
				class="relative z-20 rounded shadow-all-2xl"
				src="/animals.png"
				alt="visits payment"
				loading="lazy"
			/>
		</div>
		<div class="z-10 rounded shadow-all-2xl">
			<div class="p-0 md:p-2">
				<div class="overflow-hidden">
					<img class="relative z-10" src="/clients.png" alt="vists list" loading="lazy" />
				</div>
			</div>
		</div>
	</div>
</div>
