<script lang="ts">
	export let open = false;
	export let size: 'small' | 'medium' | 'bigmedium' | 'big' = 'small';
</script>

<div class="relative flex justify-center">
	<div
		class="fixed inset-0 z-40 overflow-y-auto {open ? '' : 'hidden'}"
		aria-labelledby="modal-title"
		role="dialog"
		aria-modal="true"
	>
		<div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
		<div
			class="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0 w-full"
		>
			<span class="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true"
				>&#8203;</span
			>

			<div
				class="relative w-full inline-block px-4 xl:px-10 pt-5 pb-4 overflow-hidden text-middle align-bottom transition-all transform bg-white rounded-lg shadow-xl dark:bg-gray-900 sm:my-8 sm:w-full sm:max-w-sm {size ===
				'big'
					? 'xl:max-w-screen-xl'
					: size === 'medium'
					? 'xl:max-w-xl'
					: size === 'bigmedium'
					? 'xl:max-w-3xl'
					: ''} sm:p-6 sm:align-middle"
			>
				<slot />
			</div>
		</div>
	</div>
</div>
