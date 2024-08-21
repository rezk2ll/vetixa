<script lang="ts">
	import { managementImageVisible, managementTextVisible } from '$lib/store';
	import { isIntersecting } from '$lib/utils/observer';
	import { onDestroy, onMount } from 'svelte';

	let imageRef: Element;
	let textRef: Element;

	let imageObserver: IntersectionObserver | undefined;
	let textObserver: IntersectionObserver | undefined;

	onMount(() => {
		imageObserver = isIntersecting(managementImageVisible);
		textObserver = isIntersecting(managementTextVisible);

		imageObserver?.observe(imageRef);
		textObserver?.observe(textRef);
	});

	onDestroy(() => {
		imageObserver?.unobserve(imageRef);
		textObserver?.unobserve(textRef);
	});
</script>

<div class="mx-auto items-center px-1 md:flex flex-row-reverse lg:pt-20">
	<div
		class="pb-6 md:w-5/12 {$managementTextVisible
			? 'opacity-100'
			: 'translate-y-8 opacity-0 '} transition-all duration-700 ease-in"
		bind:this={textRef}
	>
		<h2
			class="md:leading-20 pb-2 text-center text-2xl font-extrabold leading-tight text-gray-900 md:px-4 md:text-left md:text-4xl lg:px-0 lg:pl-8 lg:text-5xl"
		>
			Administration intégrale des visites
		</h2>
		<div
			class="text-md px-12 pb-2 text-center leading-normal text-gray-500 md:px-4 md:text-left md:text-xl md:leading-normal lg:px-0 lg:pl-8"
		>
			Gérez chaque consultation avec précision en ajoutant des actes, traitant les paiements, et en administrant factures, certificats, rapports, ordonnances, et fichiers tels que radiographies et documents PDF.
		</div>
	</div>
	<div
		class="relative flex rounded-xl md:w-6/12 {$managementImageVisible
			? 'opacity-100'
			: 'opacity-0'} transition-all duration-700 ease-in"
		bind:this={imageRef}
	>
		<div
			class="absolute inset-0 z-20 -translate-x-[8%] translate-y-1/3 rounded-xl"
		>
			<img
				class="relative z-20 rounded-xl shadow-all-2xl"
				src="/payment.png"
				alt="visits payment"
				loading="lazy"
				height="500"
				width="300"
			/>
		</div>
		<div
			class="absolute inset-0 z-20 translate-x-3/4 translate-y-3/4 rounded-xl"
		>
			<img
				class="relative z-21 rounded-xl shadow-all-2xl"
				src="/acts.png"
				alt="visits acts"
				loading="lazy"
				height="600"
				width="400"
			/>
		</div>
		<div class="z-10 rounded-xl shadow-all-2xl">
			<div class="p-0 md:p-2">
				<div class="overflow-hidden">
					<img
						class="relative z-10"
						src="/interface-visite.png"
						alt="vists list"
						loading="lazy"
						height="200"
						width="800"
					/>
				</div>
			</div>
		</div>
	</div>
</div>
