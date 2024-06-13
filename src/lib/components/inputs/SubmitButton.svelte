<script lang="ts">
	export let disabled: boolean = false;
</script>

<button
	type="submit"
	{disabled}
	class="flex items-center rounded-full justify-center w-full h-12 bg-blue-500  text-base font-medium leading-5 tracking-wide text-center text-white"
>
	<slot />
</button>