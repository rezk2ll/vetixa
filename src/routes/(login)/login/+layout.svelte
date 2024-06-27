<script>
	import '../../../app.css';
</script>

<svelte:head>
	<meta charset="UTF-8" />
	<meta name="description" content="Vetixa: Veterinary Clinic Management System" />
	<meta
		name="keywords"
		content="sveltekit, veterinary, management, hospitalisation, billing, clinic"
	/>
	<meta name="author" content="Khaled Ferjani <ferjani@pm.me>" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Vetixa</title>
</svelte:head>

<div class="min-h-screen w-full bg-white overflow-hidden gradiant flex flex-col">
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
