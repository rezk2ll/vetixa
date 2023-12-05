<script lang="ts">
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import listPlugin from '@fullcalendar/list';
	import { onMount } from 'svelte';
	import french from '@fullcalendar/core/locales/fr';

	let calendarRef: HTMLElement;

	const events = [
		{
			title: 'Operation',
			start: '2023-11-15'
		},
		{
			groupId: '999',
			title: 'Reunion equipe',
			start: '2023-11-14T16:00:00'
		},
		{
			groupId: '999',
			title: 'Reunion rania',
			start: '2023-11-14T16:30:00'
		},
		{
			title: 'Operation chien',
			start: '2023-11-14',
			end: '2023-11-14'
		},
		{
			title: 'Operation chien',
			start: '2023-11-16T09:00:00',
			end: '2023-11-16T10:00:00'
		},
		{
			title: 'Operation chat Jack',
			start: '2023-11-16T16:00:00',
			end: '2023-11-16T17:00:00'
		},
		{
			title: 'RDV Jihen Hammemi',
			start: '2023-11-14T10:30:00',
			end: '2023-11-14T12:30:00'
		},
		{
			title: 'RDV Khaled',
			start: '2023-11-14T12:00:00'
		},
		{
			title: 'RDV Dhouha',
			start: '2023-11-14T14:30:00',
			end: '2023-11-14T15:30:00'
		}
	];

	onMount(() => {
		let calendar = new Calendar(calendarRef, {
			plugins: [interactionPlugin, dayGridPlugin, timeGridPlugin, listPlugin],
			locale: french,
			headerToolbar: {
				left: 'today prev,next',
				center: 'title',
				right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
			},
			height: 'auto',
			navLinks: true,
			editable: true,
			events
		});

		calendar.render();
	});
</script>

<div
	class="w-full flex items-center xl:pt-10 h-auto justify-center overscroll-none overflow-hidden xl:pb-10"
	data-sveltekit-preload-data="hover"
>
	<div class="flex flex-col items-center justify-start w-full xl:w-11/12 xl:pl-14">
		<div
			class="w-full xl:px-1 pt-10 lg:pt-10 border-gray-200 xl:rounded-2xl relative z-0 flex min-w-0 xl:p-3 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border"
		>
			<div bind:this={calendarRef} class="xl:p-5 pt-10 xl:pt-0 h-auto w-full" />
		</div>
	</div>
</div>

<style lang="postcss">
	:global(.fc-toolbar-title) {
    @apply text-sm
	}
</style>
