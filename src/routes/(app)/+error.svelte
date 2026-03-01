<script lang="ts">
	import { page } from '$app/state';
	import CustomError from '$components/display/CustomError.svelte';
</script>

<CustomError code={page.status} message={page.error?.message} />
