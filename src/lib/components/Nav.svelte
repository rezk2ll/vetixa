<header
	class="z-20 text-slate-700 bg-white w-full fixed flex flex-col overflow-hidden px-4 py-3 lg:flex-row shadow-lg"
>
	<a href="/" class="flex items-center whitespace-nowrap text-2xl font-black">
		<img src="/logo.svg" alt="logo" class="h-10 xl:h-12" />
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
