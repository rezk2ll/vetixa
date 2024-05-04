<script lang="ts">
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
		? 'shadow-2xl'
		: ''} border-gray-200 xl:rounded-lg h-fit mb-2"
>
	<div class="flex flex-row space-x-5">
		<div
			class="flex justify-between px-5 py-4 border-b rounded-lg border-gray-100 {color === 'primary'
				? 'bg-blueGray-200'
				: color === 'secondary'
				? 'bg-gray-300'
				: 'bg-teal-300'} w-full"
		>
			<h2 class="font-semibold text-gray-800">{title}</h2>
			<div class="flex flex-row space-x-2">
				{#if editable}
					<button
						on:click={() => (edit = true)}
						type="button"
						title="Modifier le client"
						class="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke-width="1.5"
							stroke="currentColor"
							class="w-5 h-5"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
							/>
						</svg>
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
