<script lang="ts">
	export let src: string;
  export let name: string;
  export let email: string;
</script>

<div class="flex items-center gap-x-2">
	<img class="object-cover w-10 h-10 rounded-full" {src} alt={name} />

	<div>
		<h1 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">{ name }</h1>

		<p class="text-sm text-gray-500 dark:text-gray-400">{ email }</p>
	</div>
</div>
