<script lang="ts">
	import { searchOpen } from '$store/search';
	import { onMount } from 'svelte';

	const closeSearch = () => {
		searchOpen.set(false);
	};

	let inputRef: HTMLInputElement;
	let value: string = '';
	let searchOptions: 'animal' | 'client' = 'client';
	let clientPlaceholder = 'Rechercher par nom, email, téléphone, addresse...';
	let animalPlaceholder = 'Rechercher par nom, identifiant unique, race, espèce...';

	onMount(async () => {
		inputRef && inputRef.focus();
	});
</script>

<div class="flex flex-col gap-6">
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
			placeholder={searchOptions === 'client' ? clientPlaceholder : animalPlaceholder}
			bind:value
			class="block py-4 grow pl-14 pr-16 text-blue-950 placeholder-gray-400/70 focus:outline-none"
		/>
		<button
			type="button"
			on:click={closeSearch}
			class="absolute inset-y-0 flex items-center right-3"
		>
			<kbd
				class="inline-flex items-center px-1 py-1 font-sans text-xs text-gray-500 border rounded-md dark:text-gray-400 dark:border-gray-700"
			>
				Esc
			</kbd>
		</button>
	</button>
	<div class="w-full px-3">
		<div class="flex w-full gap-2 rounded-3xl bg-gray-200">
			<div class="w-full">
				<input
					type="radio"
					name="option"
					id="1"
					value="1"
					class="peer hidden"
					checked
					on:change={() => (searchOptions = 'client')}
				/>
				<label
					for="1"
					class="block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white transition-colors duration-200 ease-in-out"
					>client</label
				>
			</div>

			<div class="w-full">
				<input
					type="radio"
					name="option"
					id="2"
					value="2"
					class="peer hidden"
					on:change={() => (searchOptions = 'animal')}
				/>
				<label
					for="2"
					class="block cursor-pointer select-none rounded-3xl p-2 text-center peer-checked:bg-blue-500 peer-checked:font-bold peer-checked:text-white transition-colors duration-200 ease-in-out"
					>animal</label
				>
			</div>
		</div>
	</div>
</div>
