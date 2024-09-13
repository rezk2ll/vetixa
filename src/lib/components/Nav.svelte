<script lang="ts">
	import UserAvatar from './UserAvatar.svelte';
	import { enhance } from '$app/forms';
	import { currentUser } from '$lib/store/user';
	import { onMount } from 'svelte';
	import { searchOpen } from '$lib/store/search';
	import Modal from '$components/Modal.svelte';
	import SearchForm from '$components/forms/search/searchForm.svelte';
	import { env } from '$env/dynamic/public';
	import SearchIcon from '$components/icons/SearchIcon.svelte';
	import SliderIcon from '$components/icons/SliderIcon.svelte';
	import { configuration } from '$lib/store/configuration';
	import { buildFileProxyUrl } from '$lib/utils/file';

	let open = false;

	$: avatarUrl =
		$currentUser &&
		buildFileProxyUrl($currentUser.collectionId, $currentUser.id, $currentUser.avatar);

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

	$: logoSrc =
		$configuration && $configuration.logo
			? buildFileProxyUrl($configuration.collectionId, $configuration.id, $configuration.logo)
			: '/logo.svg';
</script>

<Modal open={$searchOpen} size="bigmedium">
	<SearchForm />
</Modal>
<aside
	class="flex flex-col fixed items-center z-10 w-16 bg-transparent py-8 overflow-y-auto {open
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
			<SliderIcon />
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
			title="Hospit"
			href="/hospit/view"
			class="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100"
		>
			<svg stroke="none" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M7 6H5.2C4.0799 6 3.51984 6 3.09202 6.21799C2.71569 6.40973 2.40973 6.71569 2.21799 7.09202C2 7.51984 2 8.0799 2 9.2V17.8C2 18.9201 2 19.4802 2.21799 19.908C2.40973 20.2843 2.71569 20.5903 3.09202 20.782C3.51984 21 4.0799 21 5.2 21H18.8C19.9201 21 20.4802 21 20.908 20.782C21.2843 20.5903 21.5903 20.2843 21.782 19.908C22 19.4802 22 18.9201 22 17.8V9.2C22 8.07989 22 7.51984 21.782 7.09202C21.5903 6.71569 21.2843 6.40973 20.908 6.21799C20.4802 6 19.9201 6 18.8 6H17M2 10H4M20 10H22M2 14H4M20 14H22M12 6V10M10 8H14M17 21V6.2C17 5.0799 17 4.51984 16.782 4.09202C16.5903 3.71569 16.2843 3.40973 15.908 3.21799C15.4802 3 14.9201 3 13.8 3H10.2C9.07989 3 8.51984 3 8.09202 3.21799C7.71569 3.40973 7.40973 3.71569 7.21799 4.09202C7 4.51984 7 5.0799 7 6.2V21H17ZM14 21V17C14 15.8954 13.1046 15 12 15C10.8954 15 10 15.8954 10 17V21H14Z"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
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
			<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M3.15452 1.01195C5.11987 1.32041 7.17569 2.2474 8.72607 3.49603C9.75381 3.17407 10.8558 2.99995 12 2.99995C13.1519 2.99995 14.261 3.17641 15.2946 3.5025C16.882 2.27488 18.8427 1.31337 20.8354 1.01339C21.2596 0.95092 21.7008 1.16534 21.8945 1.55273C22.6719 3.38958 22.6983 5.57987 22.2202 7.49248L22.2128 7.52213C22.0847 8.03536 21.9191 8.69868 21.3876 8.92182C21.7827 9.89315 22 10.9466 22 12.0526C22 14.825 20.8618 17.6774 19.8412 20.2348L19.8412 20.2348L19.7379 20.4936C19.1182 22.0486 17.7316 23.1196 16.125 23.418L13.8549 23.8397C13.1549 23.9697 12.4562 23.7172 12 23.2082C11.5438 23.7172 10.8452 23.9697 10.1452 23.8397L7.87506 23.418C6.26852 23.1196 4.88189 22.0486 4.26214 20.4936L4.15891 20.2348C3.13833 17.6774 2.00004 14.825 2.00004 12.0526C2.00004 10.9466 2.21737 9.89315 2.6125 8.92182C2.08046 8.69845 1.91916 8.05124 1.7909 7.53658L1.7799 7.49248C1.32311 5.66527 1.23531 3.2968 2.10561 1.55273C2.29827 1.16741 2.72906 0.945855 3.15452 1.01195ZM6.58478 4.44052C5.45516 5.10067 4.47474 5.9652 3.71373 6.98132C3.41572 5.76461 3.41236 4.41153 3.67496 3.18754C4.68842 3.48029 5.68018 3.89536 6.58478 4.44052ZM20.2863 6.98133C19.5303 5.97184 18.5577 5.11195 17.4374 4.45347C18.3364 3.9005 19.3043 3.45749 20.3223 3.17455C20.5884 4.40199 20.5853 5.76068 20.2863 6.98133ZM8.85364 5.56694C9.81678 5.20285 10.8797 4.99995 12 4.99995C13.1204 4.99995 14.1833 5.20285 15.1464 5.56694C18.0554 6.66661 20 9.1982 20 12.0526C20 14.4676 18.9891 16.9876 18.0863 19.238L18.0862 19.2382C18.0167 19.4115 17.9478 19.5832 17.8801 19.7531C17.5291 20.6338 16.731 21.2712 15.7597 21.4516L13.4896 21.8733L12.912 20.5896C12.7505 20.2307 12.3935 19.9999 12 19.9999C11.6065 19.9999 11.2496 20.2307 11.0881 20.5896L10.5104 21.8733L8.24033 21.4516C7.26908 21.2712 6.471 20.6338 6.12001 19.7531C6.05237 19.5834 5.98357 19.4119 5.91414 19.2388L5.91395 19.2384L5.91381 19.238C5.01102 16.9876 4.00004 14.4676 4.00004 12.0526C4.00004 9.1982 5.94472 6.66661 8.85364 5.56694ZM10.5 15.9999C10.1212 15.9999 9.77497 16.2139 9.60557 16.5527C9.43618 16.8915 9.47274 17.2969 9.7 17.5999L11.2 19.5999C11.3889 19.8517 11.6852 19.9999 12 19.9999C12.3148 19.9999 12.6111 19.8517 12.8 19.5999L14.3 17.5999C14.5273 17.2969 14.5638 16.8915 14.3944 16.5527C14.225 16.2139 13.8788 15.9999 13.5 15.9999H10.5ZM9.62134 11.1212C9.62134 11.9497 8.94977 12.6212 8.12134 12.6212C7.29291 12.6212 6.62134 11.9497 6.62134 11.1212C6.62134 10.2928 7.29291 9.62125 8.12134 9.62125C8.94977 9.62125 9.62134 10.2928 9.62134 11.1212ZM16 12.4999C16.8284 12.4999 17.5 11.8284 17.5 10.9999C17.5 10.1715 16.8284 9.49994 16 9.49994C15.1716 9.49994 14.5 10.1715 14.5 10.9999C14.5 11.8284 15.1716 12.4999 16 12.4999Z"
					fill="currentColor"
				/>
			</svg>
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
				fill="currentColor"
				version="1"
				class="w-6"
				id="Capa_1"
				xmlns="http://www.w3.org/2000/svg"
				xmlns:xlink="http://www.w3.org/1999/xlink"
				viewBox="0 0 297 297"
				xml:space="preserve"
			>
				<g>
					<path
						d="M251.01,277.015h-17.683l-0.002-31.558c0-31.639-17.358-60.726-48.876-81.901c-3.988-2.682-6.466-8.45-6.466-15.055
		s2.478-12.373,6.464-15.053c31.52-21.178,48.878-50.264,48.88-81.904V19.985h17.683c5.518,0,9.992-4.475,9.992-9.993
		c0-5.518-4.475-9.992-9.992-9.992H45.99c-5.518,0-9.992,4.475-9.992,9.992c0,5.519,4.475,9.993,9.992,9.993h17.683v31.558
		c0,31.642,17.357,60.728,48.875,81.903c3.989,2.681,6.467,8.448,6.467,15.054s-2.478,12.373-6.466,15.053
		c-31.519,21.177-48.876,50.263-48.876,81.903v31.558H45.99c-5.518,0-9.992,4.475-9.992,9.993c0,5.519,4.475,9.992,9.992,9.992
		h205.02c5.518,0,9.992-4.474,9.992-9.992C261.002,281.489,256.527,277.015,251.01,277.015z M83.657,245.456
		c0-33.425,25.085-55.269,40.038-65.314c9.583-6.441,15.304-18.269,15.304-31.642s-5.721-25.2-15.305-31.642
		c-14.952-10.046-40.037-31.89-40.037-65.315V19.985h129.686l-0.002,31.558c0,33.424-25.086,55.269-40.041,65.317
		c-9.581,6.441-15.301,18.269-15.301,31.64s5.72,25.198,15.303,31.642c14.953,10.047,40.039,31.892,40.041,65.314v31.558h-3.312
		c-8.215-30.879-50.138-64.441-55.377-68.537c-3.616-2.828-8.694-2.826-12.309,0c-5.239,4.095-47.163,37.658-55.378,68.537h-3.311
		V245.456z M189.033,277.015h-81.067c6.584-15.391,25.383-34.873,40.534-47.76C163.652,242.142,182.45,261.624,189.033,277.015z"
					/>
					<path
						d="M148.497,191.014c2.628,0,5.206-1.069,7.064-2.928c1.868-1.858,2.928-4.437,2.928-7.064s-1.06-5.206-2.928-7.065
		c-1.858-1.857-4.436-2.927-7.064-2.927c-2.628,0-5.206,1.069-7.064,2.927c-1.859,1.859-2.928,4.438-2.928,7.065
		s1.068,5.206,2.928,7.064C143.291,189.944,145.869,191.014,148.497,191.014z"
					/>
					<path
						d="M148.5,138.019c5.519,0,9.992-4.474,9.992-9.992v-17.664c0-5.518-4.474-9.993-9.992-9.993s-9.992,4.475-9.992,9.993v17.664
		C138.508,133.545,142.981,138.019,148.5,138.019z"
					/>
				</g>
			</svg>
		</a>
		<a
			title="statistiques"
			href="/stats"
			class="p-1.5 text-gray-700 focus:outline-nones transition-colors duration-200 rounded-lg hover:bg-gray-100"
		>
			<svg class="w-7 h-7" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path
					d="M4 16.937L10 9.43701L15 13.437L20.5 6.93701"
					stroke="currentColor"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<circle cx="10" cy="8.93701" r="2" fill="currentColor" />
				<path
					d="M16.8125 14C16.8125 15.1046 15.9171 16 14.8125 16C13.7079 16 12.8125 15.1046 12.8125 14C12.8125 12.8954 13.7079 12 14.8125 12C15.9171 12 16.8125 12.8954 16.8125 14Z"
					fill="currentColor"
				/>
				<circle cx="4" cy="16.937" r="2" fill="currentColor" />
				<path
					d="M22.5 7.00002C22.5 8.10459 21.6046 9.00002 20.5 9.00002C19.3954 9.00002 18.5 8.10459 18.5 7.00002C18.5 5.89545 19.3954 5.00002 20.5 5.00002C21.6046 5.00002 22.5 5.89545 22.5 7.00002Z"
					fill="currentColor"
				/>
			</svg>
		</a>
	</nav>

	<div class="flex flex-col space-y-6">
		<a
			target="_blank"
			href={`${env.PUBLIC_POCKETBASE_ADMIN_URL}`}
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
			<button type="submit" title="Se déconnecter">
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
		<img src={logoSrc} alt="logo" class="h-10 xl:h-12" />
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
					<span class="absolute text-gray-400 left-3">
						<SearchIcon />
					</span>
					<input
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
			<div class="my-4 flex items-center lg:my-0 lg:ml-auto lg:space-y-0 lg:min-w-72">
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
