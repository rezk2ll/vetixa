<script lang="ts">
	import FileIcon from '$components/icons/FileIcon.svelte';
	import PdfIcon from '$components/icons/PdfIcon.svelte';
	import VideoIcon from '$components/icons/VideoIcon.svelte';
	import { fetchFileInfo } from '$utils/mime';

	export let url: string;
</script>

<div
	class="flex items-center justify-center w-10 h-10 text-blue-500 bg-blue-100 rounded-full dark:bg-gray-800"
>
	{#await fetchFileInfo(url)}
		<FileIcon />
	{:then { mime }}
		{#if mime.includes('image')}
			<img src="{url}?thumb=0x500" alt="preview" class="w-full h-full object-cover rounded-full" />
		{:else if mime.includes('pdf')}
			<PdfIcon />
		{:else if mime.includes('video')}
			<VideoIcon />
		{:else}
			<FileIcon />
		{/if}
	{/await}
</div>
