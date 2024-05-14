<script lang="ts">
	import { searchOpen } from '$store/search';
	import { onMount } from 'svelte';

	const closeSearch = () => {
		searchOpen.set(false);
	};

	let inputRef: HTMLInputElement;
	let value: string = '';

	onMount(async () => {
		inputRef && inputRef.focus();
	});
</script>

<button type="button" class="relative flex items-center w-full">
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
		bind:this={inputRef}
		type="text"
		placeholder="Rechercher..."
		bind:value
		class="block py-4 pl-14 pr-16 text-blue-950 placeholder-gray-400/70 focus:outline-none"
	/>
	<button type="button" on:click={closeSearch} class="absolute inset-y-0 flex items-center right-3">
		<kbd
			class="inline-flex items-center px-1 py-1 font-sans text-xs text-gray-500 border rounded-md dark:text-gray-400 dark:border-gray-700"
		>
			Esc
		</kbd>
	</button>
</button>
