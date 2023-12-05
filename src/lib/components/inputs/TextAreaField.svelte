<script lang="ts">
	export let label: string;
	export let placeholder: string;
	export let value: string;
	export let isInValid: boolean = false;
	export let name: string;
</script>

<div class="relative w-full">
	<textarea
		required
		id={name}
		{name}
		bind:value
		{placeholder}
		class="rounded-[4px] pt-4 ring-2 focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent {isInValid
			? 'ring-red-500 focus:ring-red-500'
			: 'ring-gray-300 focus:ring-blue-500'}"
		cols="30"
		rows="3"
	/>
	<label
		for="field"
		class="absolute left-0 bg-white px-1 duration-100 ease-linear ml-1 -translate-y-2.5 translate-x-2 text-xs font-medium leading-4 {isInValid
			? 'text-red-500'
			: ''}">{label}</label
	>
</div>
