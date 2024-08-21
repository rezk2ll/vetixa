<script>
	import Logo from '$lib/components/Logo.svelte';
</script>

<header class="relative z-50 h-24 w-full">
	<div
		class="container mx-auto flex h-full max-w-6xl items-center justify-center px-8 sm:justify-between xl:px-0"
	>
		<a href="/" class="relative flex h-full items-center font-black leading-none">
			<Logo />
			<span class="ml-3 text-3xl text-gray-800">VETIXA<span class="text-pink-500">.</span></span>
		</a>
		<nav
			id="nav"
			class="absolute left-0 top-0 z-50 mt-24 flex hidden h-64 w-full flex-col items-center justify-between border-t border-gray-200 bg-white pt-5 text-sm text-gray-800 md:relative md:mt-0 md:flex md:h-24 md:w-auto md:flex-row md:border-none md:bg-transparent md:py-0 lg:text-base"
		>
			<a
				href="/"
				class="transition-color ml-0 mr-0 font-bold duration-100 hover:text-indigo-600 md:ml-12 md:mr-3 lg:mr-8"
				>Accueil</a
			>
			<a
				href="#features"
				class="transition-color mr-0 font-bold duration-100 hover:text-indigo-600 md:mr-3 lg:mr-8"
				>Fonctionnalités</a
			>
			<a href="#testimonials" class="transition-color font-bold duration-100 hover:text-indigo-600"
				>Témoignages</a
			>
			<div class=" flex w-full flex-col border-t border-gray-200 font-medium md:hidden">
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
				href="#contact"
				class="relative z-40 mr-0 px-4 py-2 text-sm font-bold text-pink-500 sm:mr-3 md:mt-0 md:px-3 lg:text-white"
				>Contact</a
			>
			<a
				href="#features"
				class="fold-bold relative z-40 inline-block h-full w-auto rounded bg-indigo-700 px-5 py-3 text-sm font-bold leading-none text-white shadow-md transition-all duration-300 hover:shadow-xl sm:w-full lg:bg-white lg:text-indigo-700 lg:shadow-none"
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
