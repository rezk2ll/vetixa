<script lang="ts">
	import { agendaImageVisible, agendaTextVisible } from '$lib/store';
	import { isIntersecting } from '$lib/utils/observer';
	import { onDestroy, onMount } from 'svelte';

	let imageRef: Element;
	let textRef: Element;

	let imageObserver: IntersectionObserver | undefined;
	let textObserver: IntersectionObserver | undefined;

	onMount(() => {
		imageObserver = isIntersecting(agendaImageVisible);
		textObserver = isIntersecting(agendaTextVisible);

		imageObserver?.observe(imageRef);
		textObserver?.observe(textRef);
	});

	onDestroy(() => {
		imageObserver?.unobserve(imageRef);
		textObserver?.unobserve(textRef);
	});
</script>

<div class="mx-auto items-center pt-24 md:flex lg:pt-0">
	<div
		class="pb-6 md:w-2/5 md:pl-4 {$agendaTextVisible
			? 'opacity-100'
			: 'translate-y-8 opacity-0'} transition-all duration-700 ease-in"
		bind:this={textRef}
	>
		<h2
			class="md:leading-20 pb-2 text-center text-2xl font-extrabold leading-tight text-gray-900 md:px-4 md:text-left md:text-3xl lg:px-0 lg:pl-8 lg:text-5xl"
		>
			Agenda vétérinaire intégré
		</h2>
		<p
			class="text-md px-12 pb-2 text-center leading-normal text-gray-500 md:px-4 md:text-left md:text-xl md:leading-normal lg:px-0 lg:pl-8"
		>
			Coordonnez toutes vos activités vétérinaires avec un calendrier complet et flexible.
		</p>
	</div>
	<div
		class="relative flex rounded-xl md:w-3/5 lg:translate-x-24 {$agendaImageVisible
			? 'opacity-100'
			: 'opacity-0'} transition-all duration-700 ease-in"
		bind:this={imageRef}
	>
		<div
			class=" absolute inset-0 z-20 translate-x-[30%] translate-y-1/3 rounded-xl lg:translate-x-1/3 xl:translate-x-2/4"
		>
			<img
				class="relative z-20 h-64 rounded-xl shadow-all-2xl lg:h-auto"
				src="/agenda-1.png"
				alt="ajout agenda"
				loading="lazy"
			/>
		</div>
		<div class="z-10 rounded-xl shadow-all-2xl">
			<div class="p-0 md:p-2">
				<div class="overflow-hidden">
					<img class="relative z-10" src="/agenda-2.png" alt="agenda" loading="lazy" />
				</div>
			</div>
		</div>
	</div>
</div>
