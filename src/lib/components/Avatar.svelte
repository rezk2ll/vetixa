<script lang="ts">
	export let name: string;

	$: initials = name
		.match(/(^\S\S?|\b\S)?/g)
		?.join('')
		?.match(/(^\S|\S$)?/g)
		?.join('')
		.toUpperCase();
</script>

<span
	class="inline-flex items-center justify-center h-10 w-10 rounded-full bg-blueGray-600 text-lg font-semibold text-white leading-none"
>
	{initials}
</span>
