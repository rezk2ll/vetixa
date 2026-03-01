<script lang="ts">
	interface Props {
		label: string;
		placeholder?: string;
		value: string | undefined;
		isInValid: boolean;
		name: string;
		required?: boolean;
		disabled?: boolean;
		errorMessage?: string;
	}

	let {
		label,
		placeholder = '',
		value = $bindable(),
		isInValid,
		name,
		required = true,
		disabled = false,
		errorMessage = 'Valeur invalide'
	}: Props = $props();

	let errorId = $derived(`${name}-error`);
</script>

<div class="relative mt-6 w-full">
	<input
		{required}
		id={name}
		{name}
		bind:value
		{placeholder}
		{disabled}
		type="text"
		aria-invalid={isInValid}
		aria-describedby={isInValid ? errorId : undefined}
		class="h-14 rounded-[4px] ring-2 focus:outline-none px-4 text-[17px] font-medium leading-6 tracking-tight text-left peer w-full placeholder:text-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 {isInValid
			? 'ring-red-500 focus:ring-red-500'
			: 'ring-gray-200 dark:ring-gray-600 focus:ring-blue-500 dark:focus:ring-blue-400'}"
	/>
	<label
		for={name}
		class="absolute left-0 bg-white dark:bg-gray-800 px-1 duration-100 ease-linear ml-1 -translate-y-2.5 translate-x-2 text-xs font-medium leading-4 text-gray-700 dark:text-gray-300 {isInValid
			? 'text-red-500'
			: ''}">{label}</label
	>
	{#if isInValid}
		<p id={errorId} role="alert" class="mt-1 text-xs text-red-500">
			{errorMessage}
		</p>
	{/if}
</div>
