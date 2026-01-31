<script lang="ts">
	export let label: string;
	export let placeholder: string;
	export let value: string | undefined;
	export let isInValid: boolean = false;
	export let name: string;
	export let required: boolean = false;
</script>

<div class="relative w-full">
	<textarea
		{required}
		id={name}
		{name}
		bind:value
		{placeholder}
		class="rounded-[4px] pt-4 ring-2 focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 {isInValid
			? 'ring-red-500 focus:ring-red-500'
			: 'ring-gray-300 dark:ring-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400'}"
		cols="30"
		rows="3"
	/>
	<label
		for={name}
		class="absolute left-0 bg-white dark:bg-gray-800 px-1 duration-100 ease-linear ml-1 -translate-y-2.5 translate-x-2 text-xs font-medium leading-4 text-gray-700 dark:text-gray-300 {isInValid
			? 'text-red-500'
			: ''}">{label}</label
	>
</div>
