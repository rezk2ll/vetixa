<script>
	import Logo from '$lib/components/Logo.svelte';
</script>
	<footer class="border-t border-gray-200 bg-white px-4 pb-8 pt-12 text-white">
		<div
			class="container mx-auto flex max-w-6xl flex-col justify-between overflow-hidden px-4 lg:flex-row"
		>
			<div class="mr-4 w-full pl-12 text-left sm:pl-0 sm:text-center lg:w-1/4 lg:text-left">
				<a
					href="/"
					class="block flex justify-start text-left sm:justify-center sm:text-center lg:justify-start lg:text-left"
				>
					<span class="flex items-start sm:items-center grayscale">
            <Logo />
					</span>
				</a>
				<p class="mr-4 mt-6 text-base text-gray-500">
					Concevons des solutions complètes pour la gestion efficace de votre clinique vétérinaire
				</p>
			</div>
			<div class="mt-6 block w-full pl-10 text-sm sm:flex lg:mt-0 lg:w-3/4">
				<ul class="flex w-full list-none flex-col p-0 text-left font-medium text-gray-700">
					<li
						class="mt-5 inline-block px-3 py-2 font-bold uppercase tracking-wide text-gray-800 md:mt-0"
					>
						Produit
					</li>
					<li>
						<a
							href="#features"
							class="inline-block px-3 py-2 text-gray-500 no-underline hover:text-gray-600"
							>Fonctionnalités</a
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
							href="https://facebook.com/vetixatn"
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
							href="#"
						>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    class="h-6"
    viewBox="0 0 512 512">
    
    <path
      d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z" />
  </svg>
						</a>
						<a
							class="block flex items-center text-gray-400 no-underline hover:text-gray-600"
							target="_blank"
							rel="noopener noreferrer"
							href="https://github.com/rezk2ll"
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
		<div class="mt-10 border-t border-gray-100 pt-4 lg:pt-6 text-center text-gray-500">
			© {new Date().getFullYear()} Vetixa. All rights reserved.
		</div>
	</footer>