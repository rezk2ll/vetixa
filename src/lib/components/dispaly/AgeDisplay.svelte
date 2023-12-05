<script lang="ts">
	export let date: string;
	import moment from 'moment';

	const calculateAge = (date: string) => {
		const now = moment();
		const birthday = moment(date);

		const years = now.diff(birthday, 'years');
		const months = now.diff(birthday.add(years, 'years'), 'months');
		const days = now.diff(birthday.add(months, 'months'), 'days');

		return { years, months, days };
	};

	$: ({ years, months, days } = calculateAge(date));
</script>

<div
	class="flex overflow-hidden max-w-xs w-fit bg-white border divide-x rounded-lg rtl:flex-row-reverse dark:bg-gray-900 dark:border-gray-700 dark:divide-gray-700"
>
	{#if years > 0}
		<span
			class="flex px-1 items-center py-1 text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 gap-x-1 hover:bg-gray-100"
		>
			{years}

			<span>an{years > 1 ? 's' : ''}</span>
		</span>
	{/if}

	{#if months > 0}
		<button
			class="flex items-center px-1 py-1 text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 gap-x-1 hover:bg-gray-100"
		>
			{months}

			<span>moi{months > 1 ? 's' : ''}</span>
		</button>
	{/if}

	{#if days > 0}
		<button
			class="flex items-center px-1 py-1 text-gray-600 transition-colors duration-200 sm:text-base sm:px-6 dark:hover:bg-gray-800 dark:text-gray-300 gap-x-1 hover:bg-gray-100"
		>
			{days}

			<span>jour{days > 1 ? 's' : ''}</span>
		</button>
	{/if}
</div>
