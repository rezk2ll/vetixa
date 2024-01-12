<script lang="ts">
	import type { AgendaResponse } from '$root/pocketbase-types';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import listPlugin from '@fullcalendar/list';
	import { onMount } from 'svelte';
	import french from '@fullcalendar/core/locales/fr';
	import type { PageData } from './$types';
	import Modal from '$root/lib/components/Modal.svelte';
	import AddEventForm from '$root/lib/components/forms/agenda/AddEventForm.svelte';

	export let data: PageData;
	$: ({ events } = data);

	let calendarRef: HTMLElement;
	let openAddModal = false;
	let start: Date;
	let end: Date;
	let calendar: Calendar;

	$: getEvents = (
		_fetchInfo: any,
		successCallback: (arg0: AgendaResponse[]) => void,
		_failureCallback: any
	) => {
		successCallback(events);
	};

	onMount(() => {
		calendar = new Calendar(calendarRef, {
			initialView: 'timeGridWeek',
			scrollTime: '08:00:00',
			selectable: true,
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
			eventSources: [getEvents],
			select: (info) => {
				openAddModal = true;

				start = info.start;
				end = info.end;
			}
		});

		calendar.render();
	});

	$: events && calendar && calendar.refetchEvents();
</script>

<Modal bind:open={openAddModal} size="medium">
	{#if start && end}
		<AddEventForm bind:open={openAddModal} {start} {end} />
	{/if}
</Modal>

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
		@apply text-sm;
	}
</style>
