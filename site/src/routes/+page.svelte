<script lang="ts">
	import ArrowDown from '$lib/components/ArrowDown.svelte';
	import AgendaCard from '$lib/components/landing/AgendaCard.svelte';
	import AnimalsClientsCard from '$lib/components/landing/AnimalsClientsCard.svelte';
	import CaisseCard from '$lib/components/landing/CaisseCard.svelte';
	import HospitCard from '$lib/components/landing/HospitCard.svelte';
	import StockCard from '$lib/components/landing/StockCard.svelte';
	import VisitsCard from '$lib/components/landing/VisitsCard.svelte';
	import Logo from '$lib/components/Logo.svelte';
	import { onMount } from 'svelte';

	onMount(() => {
		if (document.getElementById('nav-mobile-btn')) {
			document.getElementById('nav-mobile-btn')?.addEventListener('click', function () {
				if (this.classList.contains('close')) {
					document.getElementById('nav')?.classList.add('hidden');
					this.classList.remove('close');
				} else {
					document.getElementById('nav')?.classList.remove('hidden');
					this.classList.add('close');
				}
			});
		}
	});
</script>

<div class="overflow-x-hidden antialiased">
	<!-- Header Section -->
	<header class="relative z-50 h-24 w-full">
		<div
			class="container mx-auto flex h-full max-w-6xl items-center justify-center px-8 sm:justify-between xl:px-0"
		>
			<a
				href="/"
				class="relative inline-block flex h-5 h-full items-center font-black leading-none"
			>
				<Logo />
				<span class="ml-3 text-3xl text-gray-800">VETIXA<span class="text-pink-500">.</span></span>
			</a>

			<nav
				id="nav"
				class="absolute left-0 top-0 z-50 mt-24 flex hidden h-64 w-full flex-col items-center justify-between border-t border-gray-200 bg-white pt-5 text-sm text-gray-800 md:relative md:mt-0 md:flex md:h-24 md:w-auto md:flex-row md:border-none md:bg-transparent md:py-0 lg:text-base"
			>
				<a
					href="#"
					class="transition-color ml-0 mr-0 font-bold duration-100 hover:text-indigo-600 md:ml-12 md:mr-3 lg:mr-8"
					>Accueil</a
				>
				<a
					href="#features"
					class="transition-color mr-0 font-bold duration-100 hover:text-indigo-600 md:mr-3 lg:mr-8"
					>Fonctionnalités</a
				>
				<a
					href="#pricing"
					class="transition-color mr-0 font-bold duration-100 hover:text-indigo-600 md:mr-3 lg:mr-8"
					>Prix</a
				>
				<div class="block flex w-full flex-col border-t border-gray-200 font-medium md:hidden">
					<a href="#contact" class="w-full py-2 text-center font-bold text-pink-500">Contact</a>
					<a
						href="#features"
						class="fold-bold relative inline-block w-full bg-indigo-700 px-5 py-3 text-center text-sm leading-none text-white"
						>Découvrir</a
					>
				</div>
			</nav>

			<div
				class="absolute left-0 mt-48 hidden w-full flex-col items-center justify-center border-b border-gray-200 pb-8 md:relative md:mt-0 md:flex md:w-auto md:flex-row md:items-end md:justify-between md:border-none md:bg-transparent md:p-0"
			>
				<a
					href="#_"
					class="relative z-40 mr-0 px-4 py-2 text-sm font-bold text-pink-500 sm:mr-3 md:mt-0 md:px-3 lg:text-white"
					>Contact</a
				>
				<a
					href="#features"
					class="fold-bold relative z-40 inline-block h-full w-auto rounded bg-indigo-700 px-5 py-3 text-sm font-bold leading-none text-white shadow-md transition transition-all duration-100 duration-300 hover:shadow-xl sm:w-full lg:bg-white lg:text-indigo-700 lg:shadow-none"
					>Découvrir</a
				>
				<svg
					class="absolute left-0 top-0 -ml-12 -mt-64 hidden w-screen max-w-3xl lg:block"
					viewBox="0 0 818 815"
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
				>
					<defs>
						<linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="c">
							<stop stop-color="#E614F2" offset="0%" />
							<stop stop-color="#FC3832" offset="100%" />
						</linearGradient>
						<linearGradient x1="0%" y1="0%" x2="100%" y2="100%" id="f">
							<stop stop-color="#657DE9" offset="0%" />
							<stop stop-color="#1C0FD7" offset="100%" />
						</linearGradient>
						<filter
							x="-4.7%"
							y="-3.3%"
							width="109.3%"
							height="109.3%"
							filterUnits="objectBoundingBox"
							id="a"
						>
							<feOffset dy="8" in="SourceAlpha" result="shadowOffsetOuter1" />
							<feGaussianBlur stdDeviation="8" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
							<feColorMatrix
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.15 0"
								in="shadowBlurOuter1"
							/>
						</filter>
						<filter
							x="-4.7%"
							y="-3.3%"
							width="109.3%"
							height="109.3%"
							filterUnits="objectBoundingBox"
							id="d"
						>
							<feOffset dy="8" in="SourceAlpha" result="shadowOffsetOuter1" />
							<feGaussianBlur stdDeviation="8" in="shadowOffsetOuter1" result="shadowBlurOuter1" />
							<feColorMatrix
								values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0"
								in="shadowBlurOuter1"
							/>
						</filter>
						<path
							d="M160.52 108.243h497.445c17.83 0 24.296 1.856 30.814 5.342 6.519 3.486 11.635 8.602 15.12 15.12 3.487 6.52 5.344 12.985 5.344 30.815v497.445c0 17.83-1.857 24.296-5.343 30.814-3.486 6.519-8.602 11.635-15.12 15.12-6.52 3.487-12.985 5.344-30.815 5.344H160.52c-17.83 0-24.296-1.857-30.814-5.343-6.519-3.486-11.635-8.602-15.12-15.12-3.487-6.52-5.343-12.985-5.343-30.815V159.52c0-17.83 1.856-24.296 5.342-30.814 3.486-6.519 8.602-11.635 15.12-15.12 6.52-3.487 12.985-5.343 30.815-5.343z"
							id="b"
						/>
						<path
							d="M159.107 107.829H656.55c17.83 0 24.296 1.856 30.815 5.342 6.518 3.487 11.634 8.602 15.12 15.12 3.486 6.52 5.343 12.985 5.343 30.816V656.55c0 17.83-1.857 24.296-5.343 30.815-3.486 6.518-8.602 11.634-15.12 15.12-6.519 3.486-12.985 5.343-30.815 5.343H159.107c-17.83 0-24.297-1.857-30.815-5.343-6.519-3.486-11.634-8.602-15.12-15.12-3.487-6.519-5.343-12.985-5.343-30.815V159.107c0-17.83 1.856-24.297 5.342-30.815 3.487-6.519 8.602-11.634 15.12-15.12 6.52-3.487 12.985-5.343 30.816-5.343z"
							id="e"
						/>
					</defs>
					<g fill="none" fill-rule="evenodd" opacity=".9">
						<g transform="rotate(65 416.452 409.167)">
							<use fill="#000" filter="url(#a)" xlink:href="#b" />
							<use fill="url(#c)" xlink:href="#b" />
						</g>
						<g transform="rotate(29 421.929 414.496)">
							<use fill="#000" filter="url(#d)" xlink:href="#e" />
							<use fill="url(#f)" xlink:href="#e" />
						</g>
					</g>
				</svg>
			</div>

			<div
				id="nav-mobile-btn"
				class="absolute right-0 top-0 z-50 mr-10 mt-8 block w-6 cursor-pointer select-none sm:mt-10 md:hidden"
			>
				<span class="mt-2 block h-1 w-full transform rounded-full bg-gray-800 duration-200 sm:mt-1"
				></span>
				<span class="mt-1 block h-1 w-full transform rounded-full bg-gray-800 duration-200"></span>
			</div>
		</div>
	</header>
	<!-- End Header Section-->

	<!-- BEGIN HERO SECTION -->
	<div
		class="relative w-full items-center justify-center overflow-x-hidden lg:pb-40 lg:pt-40 xl:pb-64 xl:pt-40"
	>
		<div
			class="container mx-auto -mt-32 flex h-full max-w-6xl flex-col items-center justify-between px-8 lg:flex-row xl:px-0"
		>
			<div
				class="z-30 flex w-full max-w-xl flex-col items-center pt-48 text-center lg:w-1/2 lg:items-start lg:pt-20 lg:text-left xl:pt-40"
			>
				<h1
					class="relative mb-4 text-3xl font-black leading-tight text-gray-900 sm:text-6xl xl:mb-8"
				>
					Votre clinique, mieux gérée
				</h1>
				<p class="mb-8 pr-0 text-base text-gray-600 sm:text-lg lg:pr-20 xl:text-xl">
					Commencez à gérer votre clinique vétérinaire en toute simplicité et profitez d'une
					interface intuitive pour optimiser vos opérations au quotidien.
				</p>
				<a
					href="#features"
					class="fold-bold relative mx-auto mt-0 flex w-auto items-center justify-center gap-5 self-start rounded-md border-t border-gray-200 bg-indigo-600 px-8 py-4 text-base font-bold text-white shadow-xl sm:mt-1 lg:mx-0"
				>
					<span>Découvrir plus</span>
					<ArrowDown />
				</a>
				<!-- Integrates with section -->
				<div class="mt-24 h-32"></div>
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
					<g
						id="Page-1"
						stroke="none"
						stroke-width="1"
						fill="none"
						fill-rule="evenodd"
						opacity=".9"
					>
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
				class="ms:pl-10 relative z-50 flex h-full w-full flex-col items-end justify-center lg:w-1/2"
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
	<!-- HERO SECTION END -->

	<!-- BEGIN FEATURES SECTION -->
	<div
		id="features"
		class="relative w-full border-t border-gray-200 px-8 py-10 md:py-16 lg:py-24 xl:px-0 xl:py-40"
	>
		<div class=" mx-auto flex h-full flex-col items-center justify-between">
			<h3
				class="mt-2 px-5 text-center text-xl font-black leading-tight text-gray-900 sm:mt-0 sm:px-0 sm:text-6xl"
			>
				Conçu pour répondre à vos besoins
			</h3>
			<div class="flex flex-col gap-80">
				<VisitsCard />
				<HospitCard />
				<StockCard />
				<CaisseCard />
				<AgendaCard />
				<AnimalsClientsCard />
			</div>
		</div>
	</div>
	<!-- END FEATURES SECTION -->

	<!-- Start Testimonials -->

	<!-- End Testimonials-->

	<footer class="border-t border-gray-200 bg-white px-4 pb-8 pt-12 text-white">
		<div
			class="container mx-auto flex max-w-6xl flex-col justify-between overflow-hidden px-4 lg:flex-row"
		>
			<div class="mr-4 w-full pl-12 text-left sm:pl-0 sm:text-center lg:w-1/4 lg:text-left">
				<a
					href="/"
					class="block flex justify-start text-left sm:justify-center sm:text-center lg:justify-start lg:text-left"
				>
					<span class="flex items-start sm:items-center">
						<svg
							class="h-6 w-auto fill-current text-gray-800"
							viewBox="0 0 194 116"
							xmlns="http://www.w3.org/2000/svg"
						>
							<g fill-rule="evenodd">
								<path
									d="M96.869 0L30 116h104l-9.88-17.134H59.64l47.109-81.736zM0 116h19.831L77 17.135 67.088 0z"
								>
								</path>
								<path d="M87 68.732l9.926 17.143 29.893-51.59L174.15 116H194L126.817 0z"></path>
							</g>
						</svg>
					</span>
				</a>
				<p class="mr-4 mt-6 text-base text-gray-500">
					Crafting the next-level of user experience and engagement.
				</p>
			</div>
			<div class="mt-6 block w-full pl-10 text-sm sm:flex lg:mt-0 lg:w-3/4">
				<ul class="flex w-full list-none flex-col p-0 text-left font-medium text-gray-700">
					<li
						class="mt-5 inline-block px-3 py-2 font-bold uppercase tracking-wide text-gray-800 md:mt-0"
					>
						Product
					</li>
					<li>
						<a
							href="#_"
							class="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
							>Features</a
						>
					</li>
					<li>
						<a
							href="#_"
							class="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
							>Integrations</a
						>
					</li>
					<li>
						<a
							href="#_"
							class="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
							>Pricing</a
						>
					</li>
					<li>
						<a
							href="#_"
							class="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600">FAQ</a
						>
					</li>
				</ul>
				<ul class="flex w-full list-none flex-col p-0 text-left font-medium text-gray-700">
					<li
						class="mt-5 inline-block px-3 py-2 font-bold uppercase tracking-wide text-gray-800 md:mt-0"
					>
						Company
					</li>
					<li>
						<a
							href="#_"
							class="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
							>Privacy</a
						>
					</li>
					<li>
						<a
							href="#_"
							class="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
							>Terms of Service</a
						>
					</li>
				</ul>
				<ul class="flex w-full list-none flex-col p-0 text-left font-medium text-gray-700">
					<li
						class="mt-5 inline-block px-3 py-2 font-bold uppercase tracking-wide text-gray-800 md:mt-0"
					>
						TailwindCSS
					</li>
					<li>
						<a
							href="https://devdojo.com/tailwindcss/components"
							class="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
							>Tailwind Components</a
						>
					</li>
					<li>
						<a
							href="https://devdojo.com/tailwindcss/templates"
							class="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
							>Tailwind Templates</a
						>
					</li>
					<li>
						<a
							href="https://devdojo.com/tails"
							class="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600">Tails</a
						>
					</li>
				</ul>
				<div class="flex w-full flex-col text-gray-700">
					<div class="mt-5 inline-block px-3 py-2 font-bold uppercase text-gray-800 md:mt-0">
						Follow Us
					</div>
					<div class="mt-2 flex justify-start pl-4">
						<a
							class="mr-6 block flex items-center text-gray-400 no-underline hover:text-gray-600"
							target="_blank"
							rel="noopener noreferrer"
							href="https://devdojo.com"
						>
							<svg
								viewBox="0 0 24 24"
								class="h-5 w-5 fill-current"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M23.998 12c0-6.628-5.372-12-11.999-12C5.372 0 0 5.372 0 12c0 5.988 4.388 10.952 10.124 11.852v-8.384H7.078v-3.469h3.046V9.356c0-3.008 1.792-4.669 4.532-4.669 1.313 0 2.686.234 2.686.234v2.953H15.83c-1.49 0-1.955.925-1.955 1.874V12h3.328l-.532 3.469h-2.796v8.384c5.736-.9 10.124-5.864 10.124-11.853z"
								/>
							</svg>
						</a>
						<a
							class="mr-6 block flex items-center text-gray-400 no-underline hover:text-gray-600"
							target="_blank"
							rel="noopener noreferrer"
							href="https://devdojo.com"
						>
							<svg
								viewBox="0 0 24 24"
								class="h-5 w-5 fill-current"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M23.954 4.569a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.691 8.094 4.066 6.13 1.64 3.161a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.061a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z"
								/>
							</svg>
						</a>
						<a
							class="block flex items-center text-gray-400 no-underline hover:text-gray-600"
							target="_blank"
							rel="noopener noreferrer"
							href="https://devdojo.com"
						>
							<svg
								viewBox="0 0 24 24"
								class="h-5 w-5 fill-current"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
								/>
							</svg>
						</a>
					</div>
				</div>
			</div>
		</div>
		<div class="mt-10 border-t border-gray-100 pt-4 pt-6 text-center text-gray-500">
			© 2020 Landmark. All rights reserved.
		</div>

		<div class="mt-2 border-t border-gray-100 pt-2 pt-4 text-center text-gray-600">
			Distributed By <a href="https://themewagon.com/">Themewagon</a>
		</div>
	</footer>
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
