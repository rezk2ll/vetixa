<script lang="ts">
	import EditIcon from '$components/icons/EditIcon.svelte';

	export let title: string;
	export let color: 'primary' | 'secondary' | 'info' = 'secondary';
	export let size: 'small' | 'big' | 'full' = 'big';
	export let show: boolean = true;
	export let shadow: boolean = true;
	export let editable: boolean = false;
	export let edit: boolean = false;
</script>

<div
	class="w-full {size === 'small'
		? 'xl:w-1/2'
		: size === 'big'
		? 'xl:w-10/12'
		: ''} p-5 xl:py-5 bg-white {color === 'info'
		? 'border border-teal-400'
		: shadow
		? 'lg:shadow-2xl shadow'
		: ''} border-gray-200 xl:rounded-lg h-fit mb-2"
>
	<div class="flex flex-row space-x-5">
		<div
			class="flex justify-between px-5 py-4 border-b rounded-lg border-gray-100 dark:border-gray-600 {color ===
			'primary'
				? 'bg-blueGray-200 dark:bg-gray-700'
				: color === 'secondary'
				? 'bg-gray-300 dark:bg-gray-600'
				: 'bg-teal-300 dark:bg-teal-700'} w-full"
		>
			<h2 class="font-semibold text-gray-800 dark:text-gray-200">{title}</h2>
			<div class="flex flex-row space-x-2">
				{#if editable}
					<button
						on:click={() => (edit = true)}
						type="button"
						title="Modifier le client"
						class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
					>
						<EditIcon />
					</button>
				{/if}
				<button
					type="button"
					class="transition {show ? '' : 'rotate-180	'}"
					on:click={() => (show = !show)}
				>
					<svg
						fill="none"
						shape-rendering="geometricPrecision"
						stroke="currentColor"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="1.5"
						viewBox="0 0 24 24"
						class="w-6"
						><path d="M6 9l6 6 6-6" />
					</svg>
				</button>
			</div>
		</div>
	</div>

	<div class="py-3 xl:px-5 {show ? '' : 'hidden'}">
		<slot />
	</div>
</div>
