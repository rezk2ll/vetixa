<script lang="ts">
	import FicheForm from '$lib/components/forms/FicheForm.svelte';
	import File from '$lib/components/icons/File.svelte';
</script>

<div class="flex xl:space-x-4 w-full px-0 md:px-10 pt-2 items-center justify-center">
	<div class="shrink hidden md:block">
		<img src="/banner.png" alt="banner" />
	</div>
	<div class="flex flex-col bg-white shadow-2xl rounded-2xl xl:p-10 w-full xl:w-2/6 p-5 pt-6">
		<div class="flex flex-col items-center justify-center w-full">
			<div class="flex space-x-10 items-center">
				<File />
				<h1 class="text-xl font-bold">Fiche Hospit - ASV</h1>
			</div>
			<FicheForm />
		</div>
	</div>
</div>
