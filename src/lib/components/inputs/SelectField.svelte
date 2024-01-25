<script lang="ts">
	export let label: string;
	export let value: string;
	export let isInValid: boolean = false;
	export let name: string;
	export let options: string[];
	export let multiple: boolean = false;
</script>

<div class="relative mt-6 w-full">
	<select
		{name}
		id={name}
    {value}
		{multiple}
		required
		class="h-14 { multiple ? 'p-5' : ''} rounded-[4px] bg-white ring-2 focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent {isInValid
			? 'ring-red-500 focus:ring-red-500'
			: 'ring-gray-300 focus:ring-blue-500'}"
	>
		{#each options as option}
			<option value={option}>{option}</option>
		{/each}
	</select>
	<label
		for={name}
		class="absolute left-0 bg-white px-1 duration-100 ease-linear ml-1 -translate-y-2.5 translate-x-2 text-xs font-medium leading-4 {isInValid
			? 'text-red-500'
			: ''}">{label}</label
	>
</div>
