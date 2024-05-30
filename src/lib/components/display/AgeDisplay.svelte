<script lang="ts">
	import moment from 'moment';

	export let date: string;
	export let death: string | undefined;
	export let dead: boolean = false;

	const calculateAge = (date: string, deathDate?: string) => {
		const now = deathDate && dead ? moment(deathDate) : moment();
		const birthday = moment(date);

		const years = now.diff(birthday, 'years');
		const months = now.diff(birthday.add(years, 'years'), 'months');
		const days = now.diff(birthday.add(months, 'months'), 'days');

		return { years, months, days };
	};

	$: ({ years, months, days } = calculateAge(date, death));
</script>

<div
	class="flex overflow-hidden max-w-xs w-fit bg-white border divide-x rounded rtl:flex-row-reverse"
>
	{#if years > 0}
		<span
			class="flex px-1 items-center py-1 text-gray-600 transition-colors duration-200 sm:text-base sm:px-2 gap-x-1"
		>
			{years}

			<span>an{years > 1 ? 's' : ''}</span>
		</span>
	{/if}

	{#if months > 0}
		<span
			class="flex items-center px-1 py-1 text-gray-600 transition-colors duration-200 sm:text-base sm:px-2 gap-x-1"
		>
			{months}

			<span>moi{months > 1 ? 's' : ''}</span>
		</span>
	{/if}

	{#if days > 0}
		<span
			class="flex items-center px-1 py-1 text-gray-600 transition-colors duration-200 sm:text-base sm:px-2 gap-x-1"
		>
			{days}

			<span>jour{days > 1 ? 's' : ''}</span>
		</span>
	{/if}
</div>
