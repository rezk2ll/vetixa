<script lang="ts">
	import ArrowDown from '$lib/components/ArrowDown.svelte';
	import { isPhoneVisible } from '$lib/store';
	import { isIntersecting } from '$lib/utils/observer';
	import { onDestroy, onMount } from 'svelte';

	let phoneRef: Element;
	let observer: IntersectionObserver | undefined;

	onMount(() => {
		observer = isIntersecting(isPhoneVisible);

		observer?.observe(phoneRef);
	});

	onDestroy(() => {
		observer?.unobserve(phoneRef);
	});
</script>

<div
	class="relative w-full items-center justify-center overflow-hidden lg:pb-40 lg:pt-40 xl:pb-64 xl:pt-40"
>
	<div
		class="container mx-auto -mt-32 flex h-full max-w-6xl flex-col items-center justify-between lg:flex-row lg:px-8 xl:px-0"
	>
		<div
			class="z-30 flex w-full max-w-xl flex-col items-center px-8 pt-48 text-left lg:w-1/2 lg:items-start lg:px-0 lg:pt-20 xl:pt-40"
		>
			<div
				class="relative mb-4 text-center text-4xl font-black leading-tight text-gray-900 sm:text-6xl xl:mb-8"
			>
				Votre clinique,<br /> mieux gérée
			</div>
			<p class="mb-8 pr-0 text-base text-gray-600 sm:text-lg lg:pr-20 xl:text-xl">
				Commencez à gérer votre clinique vétérinaire en toute simplicité et profitez d'une interface
				intuitive pour optimiser vos opérations au quotidien.
			</p>
			<!-- Integrates with section -->
			<svg
				class="left-svg absolute left-0 -ml-64 mt-24 max-w-md"
				viewBox="0 0 423 423"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
			>
				<defs>
					<linearGradient x1="100%" y1="0%" x2="4.48%" y2="0%" id="linearGradient-1">
						<stop stop-color="#5C54DB" offset="0%" />
						<stop stop-color="#6A82E7" offset="100%" />
					</linearGradient>
					<filter
						x="-9.3%"
						y="-6.7%"
						width="118.7%"
						height="118.7%"
						filterUnits="objectBoundingBox"
						id="filter-3"
					>
						<feOffset dy="8" in="SourceAlpha" result="shadowOffsetOuter1" />
						<feGaussianBlur stdDeviation="8" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
						<feColorMatrix
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
							in="shadowBlurOuter1"
						/>
					</filter>
					<rect id="path-2" x="63" y="504" width="300" height="300" rx="40" />
				</defs>
				<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity=".9">
					<g id="Desktop-HD" transform="translate(-39 -531)">
						<g id="Hero" transform="translate(43 83)">
							<g id="Rectangle-6" transform="rotate(45 213 654)">
								<use fill="#000" filter="url(#filter-3)" xlink:href="#path-2" />
								<use fill="url(#linearGradient-1)" xlink:href="#path-2" />
							</g>
						</g>
					</g>
				</g>
			</svg>
		</div>
		<div
			class="relative z-50 flex h-full w-full flex-col items-end justify-center sm:pl-10 lg:w-1/2"
		>
			<div class="container left-0 w-full max-w-4xl lg:absolute lg:w-screen xl:max-w-6xl">
				<img
					alt="mockup"
					src="/mockup1.png"
					class="w-full lg:-ml-12 lg:mb-0 lg:mt-24 lg:h-full xl:mt-40"
				/>
			</div>
		</div>
	</div>
</div>

<div
	class="relative w-full items-center justify-center overflow-hidden lg:pb-40 lg:pt-60 xl:pb-80 xl:pt-60"
>
	<div
		class="container mx-auto -mt-32 flex h-full max-w-6xl flex-col items-center justify-between px-8 lg:flex-row-reverse xl:px-0"
	>
		<div
			class="z-[99] flex w-full max-w-xl flex-col items-center pt-48 text-left lg:w-1/2 lg:items-start lg:pt-20 xl:pt-40"
		>
			<div
				class="relative mb-4 text-center text-3xl font-black leading-tight text-gray-900 sm:text-6xl xl:mb-8"
			>
				Toujours à portée de main
			</div>
			<div class="mb-8 pr-0 text-base text-gray-600 sm:text-lg lg:pr-20 xl:text-xl">
				Gérez votre clinique de n'importe où,
				<br />
				sur desktop, tablette et mobile.
			</div>
			<a
				href="#features"
				class="fold-bold relative mx-auto mt-0 hidden w-auto items-center justify-center gap-5 self-start rounded-md border-t border-gray-200 bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl sm:mt-1 lg:mx-0 lg:flex"
			>
				<span>Découvrir plus</span>
				<ArrowDown />
			</a>
			<svg
				class="left-svg absolute right-0 -mr-64 mt-24 max-w-md"
				viewBox="0 0 423 423"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
			>
				<defs>
					<linearGradient x1="100%" y1="0%" x2="4.48%" y2="0%" id="linearGradient-2">
						<stop stop-color="#DE3163" offset="0%" />
						<stop stop-color="#DE3163" offset="100%" />
					</linearGradient>
					<filter
						x="-9.3%"
						y="-6.7%"
						width="118.7%"
						height="118.7%"
						filterUnits="objectBoundingBox"
						id="filter-3"
					>
						<feOffset dy="8" in="SourceAlpha" result="shadowOffsetOuter1" />
						<feGaussianBlur stdDeviation="8" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
						<feColorMatrix
							values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
							in="shadowBlurOuter1"
						/>
					</filter>
					<rect id="path-2" x="63" y="504" width="300" height="300" rx="40" />
				</defs>
				<g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" opacity=".9">
					<g id="Desktop-HD" transform="translate(-39 -531)">
						<g id="Hero" transform="translate(43 83)">
							<g id="Rectangle-6" transform="rotate(45 213 654)">
								<use fill="#9F2B68" filter="url(#filter-3)" xlink:href="#path-2" />
								<use fill="url(#linearGradient-2)" xlink:href="#path-2" />
							</g>
						</g>
					</g>
				</g>
			</svg>
		</div>
		<div class="relative z-50 flex w-full flex-col items-start justify-center sm:pl-10 lg:w-1/3">
			<div
				bind:this={phoneRef}
				class="container flex w-full max-w-4xl items-center justify-center lg:absolute lg:left-0 lg:block lg:w-screen"
			>
				<img
					alt="phone mockup"
					src="/phone-mockup.png"
					class="transition-all duration-700 ease-in lg:mb-0 lg:mt-24 xl:-ml-12 xl:mt-40 {$isPhoneVisible
						? 'opacity-100'
						: 'opacity-0'}"
					height="500"
					width="300"
				/>
			</div>
		</div>
	</div>
</div>

<style lang="css">
	@media (max-width: 1520px) {
		.left-svg {
			display: none;
		}
	}

	:global(#nav-mobile-btn.close span:first-child) {
		transform: rotate(45deg);
		top: 4px;
		position: relative;
		background: #a0aec0;
	}

	:global(#nav-mobile-btn.close span:nth-child(2)) {
		transform: rotate(-45deg);
		margin-top: 0px;
		background: #a0aec0;
	}
</style>
