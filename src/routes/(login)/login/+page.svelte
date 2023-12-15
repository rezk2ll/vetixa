<script lang="ts">
	import { enhance } from '$app/forms';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	let imageNumber = 1;

	setInterval(() => {
		imageNumber = Math.floor(Math.random() * 7) + 1;
	}, 20000);

	export let data: PageData;

	const { form, message } = superForm(data.form);
</script>

<div class="bg-white dark:bg-gray-900">
	<div class="flex justify-center h-screen">
		<div
			class="hidden bg-cover lg:block lg:w-2/3 transition-all duration-300 ease-in-out"
			style="background-image: url(/bg-{imageNumber}.jpg)"
		>
			<div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
				<div>
					<h2 class="text-3xl font-bold text-white sm:text-3xl uppercase">Vet Management system</h2>

					<p class="max-w-xl text-lg mt-3 text-slate-300">
						gérez votre clinique vétérinaire en toute simplicité
					</p>
				</div>
			</div>
		</div>
		<div class="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
			<div class="flex-1">
				<div class="text-center">
					<div class="flex justify-center mx-auto">
						<img class="w-auto h-7 sm:h-8" src="/logo.svg" alt="" />
					</div>

					<p class="mt-3 text-gray-500 dark:text-gray-300">
						Identifiez vous pour accéder à votre compte
					</p>
				</div>
				{#if $message === 'failed'}
					<div class="w-full text-white bg-red-500">
						<div class="container flex items-center justify-between px-6 py-4 mx-auto">
							<div class="flex">
								<svg viewBox="0 0 40 40" class="w-6 h-6 fill-current">
									<path
										d="M20 3.36667C10.8167 3.36667 3.3667 10.8167 3.3667 20C3.3667 29.1833 10.8167 36.6333 20 36.6333C29.1834 36.6333 36.6334 29.1833 36.6334 20C36.6334 10.8167 29.1834 3.36667 20 3.36667ZM19.1334 33.3333V22.9H13.3334L21.6667 6.66667V17.1H27.25L19.1334 33.3333Z"
									/>
								</svg>

								<p class="mx-3">échec de connexion</p>
							</div>
						</div>
					</div>
				{/if}

				<div class="mt-8">
					<form method="POST" use:enhance>
						<div>
							<label for="email" class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
								>Email</label
							>
							<input
								type="email"
								name="email"
								id="email"
								bind:value={$form.email}
								placeholder="example@example.com"
								class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
							/>
						</div>

						<div class="mt-6">
							<div class="flex justify-between mb-2">
								<label for="password" class="text-sm text-gray-600 dark:text-gray-200"
									>Mot de passe</label
								>
							</div>

							<input
								type="password"
								name="password"
								id="password"
								bind:value={$form.password}
								placeholder="*********"
								class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
							/>
						</div>

						<div class="mt-6">
							<button
								class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
							>
								Connexion
							</button>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
