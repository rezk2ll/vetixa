<script>
	import Nav from '$lib/components/Nav.svelte';
	import '../app.css';
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="description" content="Hospit management" />
	<meta name="keywords" content="Sveltekit, Seif, bardo, jiji, luna" />
	<meta name="author" content="Dhaw" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Hospit management</title>
</svelte:head>

<Nav />
<div class="min-h-screen w-full bg-white overflow-hidden gradiant flex flex-col pt-10 xl:pt-20">
	<slot />
</div>

<style lang="postcss">
	.gradiant {
		@media screen(md) {
			background: linear-gradient(
					105.88deg,
					rgba(238, 5, 82, 0.3) 0%,
					rgba(235, 219, 2, 0.2) 43.6%,
					rgba(65, 4, 233, 0.2) 100%
				),
				linear-gradient(0deg, #ffffff, #ffffff);
		}
	}
</style>
