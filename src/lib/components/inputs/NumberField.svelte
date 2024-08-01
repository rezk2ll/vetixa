<script lang="ts">
	export let label: string;
	export let placeholder: string;
	export let value: number | string;
	export let isInValid: boolean = false;
	export let name: string;
	export let isNumber: boolean = false;
	export let onChange: (e: Event) => void = () => {};
	export let disabled: boolean = false;
	export let size: 'small' | 'medium' | 'normal' = 'normal';

	$: props = { ...(isNumber ? {} : { step: 'any' }) };
</script>

<div class="relative {size === 'small' ? 'mt-0' : 'mt-6'} w-full">
	<input
		required
		id={name}
		{disabled}
		{name}
		min="0"
		bind:value
		{placeholder}
		{...props}
		on:change={onChange}
		on:input={onChange}
		type="number"
		class="{size === 'small'
			? 'h-7 text-sm ring-1 min-w-16'
			: size === 'medium'
			? 'h-[46.4px] text-[17px] font-medium ring-2'
			: 'h-14 text-[17px] font-medium ring-2'} rounded-[4px] focus:outline-none px-4 leading-6 tracking-tight text-left peer w-full placeholder:text-transparent {isInValid
			? 'ring-red-500 focus:ring-red-500'
			: 'ring-gray-300 focus:ring-blue-500'} {disabled ? 'bg-gray-200' : ''}"
	/>
	<label
		for={name}
		class="absolute left-0 px-1 duration-100 ease-linear ml-1 -translate-y-2.5 translate-x-2 text-xs {size ===
		'small'
			? ''
			: 'font-medium'}  leading-4 {isInValid ? 'text-red-500' : ''} {disabled
			? 'bg-gray-200 rounded-lg'
			: 'bg-white'}">{label}</label
	>
</div>
