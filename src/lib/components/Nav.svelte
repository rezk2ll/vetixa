<script lang="ts">
	import pb from '$lib/pocketbase';
	import UserAvatar from './UserAvatar.svelte';
	import { enhance } from '$app/forms';
	import { currentUser } from '$lib/store/user';
	import { onMount } from 'svelte';
	import { searchOpen } from '$lib/store/search';
	import Modal from '$components/Modal.svelte';
	import SearchForm from '$components/forms/search/searchForm.svelte';
	import { env } from '$env/dynamic/public';

	let open = false;

	$: avatarUrl = $currentUser && pb.files.getUrl($currentUser, $currentUser?.avatar);

	onMount(() => {
		window.addEventListener('keydown', (event) => {
			if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
				event.preventDefault();
				openSearch();
			} else if (event.key === 'Escape') {
				searchOpen.set(false);
			}
		});
	});

	const openSearch = () => {
		searchOpen.set(true);
	};
</script>

<Modal open={$searchOpen} size="bigmedium">
	<SearchForm />
</Modal>
<aside
	class="flex z-10 flex-col fixed items-center w-16 h-screen bg-transparent py-8 overflow-y-auto {open
		? 'hidden'
		: ''}"
>
	<nav class="flex flex-col flex-1 space-y-6 pt-14 xl:pt-20 w-full">
		<button
			type="button"
			title="Affichier"
			class="p-1.5 text-gray-700 focus:outline-nones transition-all duration-200 rounded-lg xl:font-bold"
			on:click={() => (open = !open)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="currentColor"
				stroke="currentColor"
				class="w-4 h-4 xl:h-8"
				viewBox="0 0 320 512"
				><path
					d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
				/></svg
			>
		</button>
	</nav>
</aside>

<aside
	class="flex z-10 flex-col fixed items-center w-16 h-screen py-8 overflow-y-auto bg-white border-r rtl:border-l rtl:border-r-0 {open
		? ''
		: 'hidden xl:flex'}"
>
	<nav class="flex flex-col flex-1 space-y-6 pt-14 xl:pt-20">
		<button
			type="button"
			title="Accueil"
			class="p-1.5 text-gray-700 focus:outline-nones transition-all duration-200 rounded-lg hover:bg-gray-100 xl:hidden"
			on:click={() => (open = !open)}
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-4 h-4"
				viewBox="0 0 320 512"
				fill="currentColor"
				stroke="currentColor"
				><path
					d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"
				/></svg
			>
		</button>
		<a
			href="/"
			title="Accueil"
			class="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
				/>
			</svg>
		</a>

		<a
			title="Visites"
			href="/visit"
			class="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100"
		>
			<svg
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
				/>
			</svg>
		</a>

		<a
			href="/clients"
			title="Liste des clients"
			class="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100"
		>
			<svg
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
				/>
			</svg>
		</a>
		<a
			href="/animals"
			title="Liste des animaux"
			class="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-6 h-6"
				fill="currentColor"
				stroke="currentColor"
				viewBox="0 0 512 512"
				><path
					d="M269.4 2.9C265.2 1 260.7 0 256 0s-9.2 1-13.4 2.9L54.3 82.8c-22 9.3-38.4 31-38.3 57.2c.5 99.2 41.3 280.7 213.6 363.2c16.7 8 36.1 8 52.8 0C454.7 420.7 495.5 239.2 496 140c.1-26.2-16.3-47.9-38.3-57.2L269.4 2.9zM160.9 286.2c4.8 1.2 9.9 1.8 15.1 1.8c35.3 0 64-28.7 64-64V160h44.2c12.1 0 23.2 6.8 28.6 17.7L320 192h64c8.8 0 16 7.2 16 16v32c0 44.2-35.8 80-80 80H272v50.7c0 7.3-5.9 13.3-13.3 13.3c-1.8 0-3.6-.4-5.2-1.1l-98.7-42.3c-6.6-2.8-10.8-9.3-10.8-16.4c0-2.8 .6-5.5 1.9-8l15-30zM160 160h40 8v32 32c0 17.7-14.3 32-32 32s-32-14.3-32-32V176c0-8.8 7.2-16 16-16zm128 48a16 16 0 1 0 -32 0 16 16 0 1 0 32 0z"
				/></svg
			>
		</a>

		<a
			href="/agenda"
			title="Agenda"
			class="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100"
		>
			<svg
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
				/>
			</svg>
		</a>

		<a
			title="Magasin"
			href="/store"
			class="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100"
		>
			<svg
				fill="none"
				stroke="currentColor"
				stroke-width="1.5"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z"
				/>
			</svg>
		</a>
		<a
			title="Caisse"
			href="/funds"
			class="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100"
		>
			<svg
				data-slot="icon"
				fill="none"
				stroke-width="1.5"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				aria-hidden="true"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 12a2.25 2.25 0 0 0-2.25-2.25H15a3 3 0 1 1-6 0H5.25A2.25 2.25 0 0 0 3 12m18 0v6a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 9m18 0V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v3"
				/>
			</svg>
		</a>
		<a
			title="File d'attente"
			href="/queue"
			class="p-2 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				class="w-5 h-5"
				fill="currentColor"
				viewBox="0 0 384 512"
			>
				<path
					d="M32 0C14.3 0 0 14.3 0 32S14.3 64 32 64V75c0 42.4 16.9 83.1 46.9 113.1L146.7 256 78.9 323.9C48.9 353.9 32 394.6 32 437v11c-17.7 0-32 14.3-32 32s14.3 32 32 32H64 320h32c17.7 0 32-14.3 32-32s-14.3-32-32-32V437c0-42.4-16.9-83.1-46.9-113.1L237.3 256l67.9-67.9c30-30 46.9-70.7 46.9-113.1V64c17.7 0 32-14.3 32-32s-14.3-32-32-32H320 64 32zM288 437v11H96V437c0-25.5 10.1-49.9 28.1-67.9L192 301.3l67.9 67.9c18 18 28.1 42.4 28.1 67.9z"
				/></svg
			>
		</a>
	</nav>

	<div class="flex flex-col space-y-6">
		<a
			target="_blank"
			href={`${env.PUBLIC_POCKETBASE_URL}/_/`}
			title="Paramètres"
			class="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-100"
		>
			<svg
				width="800px"
				height="800px"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				class="w-6 h-6"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle cx="12" cy="12" r="3" stroke="#1C274C" stroke-width="1.5" />
				<path
					d="M3.66122 10.6392C4.13377 10.9361 4.43782 11.4419 4.43782 11.9999C4.43781 12.558 4.13376 13.0638 3.66122 13.3607C3.33966 13.5627 3.13248 13.7242 2.98508 13.9163C2.66217 14.3372 2.51966 14.869 2.5889 15.3949C2.64082 15.7893 2.87379 16.1928 3.33973 16.9999C3.80568 17.8069 4.03865 18.2104 4.35426 18.4526C4.77508 18.7755 5.30694 18.918 5.83284 18.8488C6.07287 18.8172 6.31628 18.7185 6.65196 18.5411C7.14544 18.2803 7.73558 18.2699 8.21895 18.549C8.70227 18.8281 8.98827 19.3443 9.00912 19.902C9.02332 20.2815 9.05958 20.5417 9.15224 20.7654C9.35523 21.2554 9.74458 21.6448 10.2346 21.8478C10.6022 22 11.0681 22 12 22C12.9319 22 13.3978 22 13.7654 21.8478C14.2554 21.6448 14.6448 21.2554 14.8478 20.7654C14.9404 20.5417 14.9767 20.2815 14.9909 19.9021C15.0117 19.3443 15.2977 18.8281 15.7811 18.549C16.2644 18.27 16.8545 18.2804 17.3479 18.5412C17.6837 18.7186 17.9271 18.8173 18.1671 18.8489C18.693 18.9182 19.2249 18.7756 19.6457 18.4527C19.9613 18.2106 20.1943 17.807 20.6603 17C20.8677 16.6407 21.029 16.3614 21.1486 16.1272M20.3387 13.3608C19.8662 13.0639 19.5622 12.5581 19.5621 12.0001C19.5621 11.442 19.8662 10.9361 20.3387 10.6392C20.6603 10.4372 20.8674 10.2757 21.0148 10.0836C21.3377 9.66278 21.4802 9.13092 21.411 8.60502C21.3591 8.2106 21.1261 7.80708 20.6601 7.00005C20.1942 6.19301 19.9612 5.7895 19.6456 5.54732C19.2248 5.22441 18.6929 5.0819 18.167 5.15113C17.927 5.18274 17.6836 5.2814 17.3479 5.45883C16.8544 5.71964 16.2643 5.73004 15.781 5.45096C15.2977 5.1719 15.0117 4.6557 14.9909 4.09803C14.9767 3.71852 14.9404 3.45835 14.8478 3.23463C14.6448 2.74458 14.2554 2.35523 13.7654 2.15224C13.3978 2 12.9319 2 12 2C11.0681 2 10.6022 2 10.2346 2.15224C9.74458 2.35523 9.35523 2.74458 9.15224 3.23463C9.05958 3.45833 9.02332 3.71848 9.00912 4.09794C8.98826 4.65566 8.70225 5.17191 8.21891 5.45096C7.73557 5.73002 7.14548 5.71959 6.65205 5.4588C6.31633 5.28136 6.0729 5.18269 5.83285 5.15108C5.30695 5.08185 4.77509 5.22436 4.35427 5.54727C4.03866 5.78945 3.80569 6.19297 3.33974 7C3.13231 7.35929 2.97105 7.63859 2.85138 7.87273"
					stroke="#1C274C"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
			</svg>
		</a>
		<form
			action="/logout"
			method="POST"
			use:enhance
			class="p-1.5 text-gray-700 focus:outline-nones transition-colors flex items-center justify-center duration-200 rounded-lg dark:text-gray-200 dark:bg-gray-800 hover:bg-gray-100"
		>
			<button type="submit">
				<svg
					fill="none"
					stroke="currentColor"
					stroke-width="2"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					aria-hidden="true"
					class="w-5 h-5"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M5.636 5.636a9 9 0 1012.728 0M12 3v9"
					/>
				</svg>
			</button>
		</form>
	</div>
</aside>
<header
	class="z-20 text-slate-700 bg-white w-full fixed flex flex-col overflow-hidden px-4 py-2 lg:flex-row shadow-lg"
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
		class="peer-checked:pt-8 peer-checked:max-h-60 flex max-h-0 w-full flex-col items-center overflow-hidden lg:ml-24 lg:max-h-full lg:flex-row"
	>
		<ul
			class="flex w-full flex-col items-center space-y-2 lg:flex-row lg:justify-center lg:space-y-0"
		>
			<li class="lg:mr-12">
				<button type="button" class="relative flex items-center" on:click={openSearch}>
					<span class="absolute text-gray-400 left-3"
						><svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-5 h-5"
							><path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
							/></svg
						></span
					><input
						type="text"
						placeholder="Rechercher..."
						class="block py-4 pl-14 pr-16 text-blue-950 placeholder-gray-400/70 focus:outline-none"
					/>
					<div class="absolute inset-y-0 flex items-center right-3">
						<kbd
							class="inline-flex items-center px-1 py-1 font-sans text-xs text-gray-500 border rounded-md dark:text-gray-400 dark:border-gray-700"
						>
							Ctrl K
						</kbd>
					</div>
				</button>
			</li>
		</ul>
		<hr class="mt-4 w-full lg:hidden" />
		{#if avatarUrl}
			<div class="my-4 flex items-center lg:my-0 lg:ml-auto lg:space-y-0">
				<div class="flex md:justify-end md:items-center">
					<div class="flex md:items-center">
						<div class="block relative">
							<div class="flex items-center h-5 w-52">
								<UserAvatar src={avatarUrl} name={$currentUser?.name} email={$currentUser?.email} />
							</div>
						</div>
					</div>
				</div>
			</div>
		{/if}
	</nav>
</header>
