<header
	class="z-20 text-slate-700 bg-white w-full fixed flex flex-col overflow-hidden px-4 py-3 lg:flex-row shadow-lg"
>
	<a href="/" class="flex items-center whitespace-nowrap text-2xl font-black">
		<span class="mr-2 w-8">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-10" viewBox="0 0 512 512"
				><path
					d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM160.9 286.2c4.8 1.2 9.9 1.8 15.1 1.8c35.3 0 64-28.7 64-64V160h44.2c12.1 0 23.2 6.8 28.6 17.7L320 192h64c8.8 0 16 7.2 16 16v32c0 44.2-35.8 80-80 80H272v50.7c0 7.3-5.9 13.3-13.3 13.3c-1.8 0-3.6-.4-5.2-1.1l-98.7-42.3c-6.6-2.8-10.8-9.3-10.8-16.4c0-2.8 .6-5.5 1.9-8l15-30zM160 160h40 8v32 32c0 17.7-14.3 32-32 32s-32-14.3-32-32V176c0-8.8 7.2-16 16-16zm128 48a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z"
				/></svg
			>
		</span>
	</a>
	<input type="checkbox" class="peer hidden" id="navbar-open" />
	<label class="absolute top-5 right-5 cursor-pointer lg:hidden" for="navbar-open">
		<svg
			class="h-7 w-7"
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="1.5"
				d="M4 6h16M4 12h16M4 18h16"
			/>
		</svg>
	</label>
	<nav
		aria-label="Header Navigation"
		class="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden transition-all lg:ml-24 lg:max-h-full lg:flex-row"
	>
		<ul
			class="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0"
		>
			<li class="lg:mr-12">
				<a class="text-gray-700 py-2 px-5 rounded-full transition hover:bg-gray-200" href="/"
					>Fiche hospit</a
				>
			</li>
			<li class="lg:mr-12">
				<a class="text-gray-700 py-2 px-5 rounded-full transition hover:bg-gray-200" href="/recap"
					>Recap globale</a
				>
			</li>
		</ul>
		<hr class="mt-4 w-full lg:hidden" />
		<div
			class="my-4 flex items-center space-x-6 space-y-2 lg:my-0 lg:ml-auto lg:space-x-8 lg:space-y-0"
		>
			<div class="flex md:justify-end md:items-center">
				<div class="flex md:items-center">
					<div class="block relative">
						<a
							type="button"
							class="py-2 md:px-3 px-1 hover:bg-gray-200 rounded-full relative"
							target="_blank"
							href="https://github.com/rezk2ll/hospit-manager"
						>
							<div class="flex items-center h-5">
								<svg
									class="w-6 h-6"
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									><path
										d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
									/></svg
								>
							</div>
						</a>
					</div>
				</div>
			</div>
		</div>
	</nav>
</header>
