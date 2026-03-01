<script lang="ts">
	interface Props {
		disabled?: boolean;
		children?: import('svelte').Snippet;
	}

	let { disabled = false, children }: Props = $props();
</script>

<button
	type="submit"
	{disabled}
	class="flex items-center rounded-full justify-center w-full h-12 bg-blue-500 text-base font-medium leading-5 tracking-wide text-center text-white"
>
	{@render children?.()}
</button>
