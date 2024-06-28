<script lang="ts">
	import SubmitButton from '$lib/components/buttons/SubmitButton.svelte';
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms/client';

	let imageNumber = 1;

	setInterval(() => {
		imageNumber = Math.floor(Math.random() * 7) + 1;
	}, 20000);

	export let data: PageData;

	const { form, message, submitting, enhance } = superForm(data.form, {
		resetForm: false
	});
</script>

<div class="bg-white dark:bg-gray-900">
	<div class="flex justify-center h-screen">
		<div
			class="hidden bg-cover lg:block lg:w-2/3 transition-all duration-300 ease-in-out"
			style="background-image: url(/bg-{imageNumber}.jpg)"
		>
			<div class="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
				<div>
					<h2 class="text-3xl font-bold text-white sm:text-6xl uppercase">Vetixa</h2>

					<p class="max-w-xl text-lg mt-3 text-slate-200">
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
					<div class="w-full text-white bg-red-500 rounded-md shadow-xl mt-6">
						<div class="container flex items-center justify-between px-6 py-4 mx-auto">
							<div class="flex">
								<svg
									class="w-7 h-6"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6.30928 9C8.59494 5 9.96832 3 12 3C14.3107 3 15.7699 5.58716 18.6883 10.7615L19.0519 11.4063C21.4771 15.7061 22.6897 17.856 21.5937 19.428C20.4978 21 17.7864 21 12.3637 21H11.6363C6.21356 21 3.50217 21 2.40626 19.428C1.45498 18.0635 2.24306 16.2635 4.05373 13"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
									/>
									<path
										d="M12 8V13"
										stroke="currentColor"
										stroke-width="1.5"
										stroke-linecap="round"
									/>
									<circle cx="12" cy="16" r="1" fill="currentColor" />
								</svg>

								<p class="mx-5 text-md">échec de connexion</p>
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
							<SubmitButton text="connexion" disabled={$submitting} loading={$submitting} full />
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</div>
