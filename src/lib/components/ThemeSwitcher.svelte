<script lang="ts">
	import { theme } from '$lib/store/theme';
	import SunIcon from '$components/icons/SunIcon.svelte';
	import MoonIcon from '$components/icons/MoonIcon.svelte';

	$: isDark = $theme === 'dark';
</script>

<button
	type="button"
	title={isDark ? 'Mode clair' : 'Mode sombre'}
	aria-label={isDark ? 'Passer au mode clair' : 'Passer au mode sombre'}
	class="p-2.5 text-gray-700 dark:text-gray-200 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
	on:click={() => theme.toggle()}
>
	{#if isDark}
		<SunIcon />
	{:else}
		<MoonIcon />
	{/if}
</button>
