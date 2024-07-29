<script lang="ts">
	import { page } from '$app/stores';
	import CustomError from '$components/display/CustomError.svelte';
	import '../app.css';
</script>

<div class="min-h-screen w-full bg-white overflow-hidden gradiant flex flex-col pt-10 xl:pt-16">
	<CustomError code={$page.status} message={$page.error?.message} />
</div>
