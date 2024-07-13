<script lang="ts">
	import type { AgendaResponse } from '$types';
	import { Calendar } from '@fullcalendar/core';
	import dayGridPlugin from '@fullcalendar/daygrid';
	import interactionPlugin from '@fullcalendar/interaction';
	import timeGridPlugin from '@fullcalendar/timegrid';
	import listPlugin from '@fullcalendar/list';
	import { onMount } from 'svelte';
	import french from '@fullcalendar/core/locales/fr';
	import type { PageData } from './$types';
	import Modal from '$components/Modal.svelte';
	import AddEventForm from '$components/forms/agenda/AddEventForm.svelte';
	import UpdateEventForm from '$components/forms/agenda/UpdateEventForm.svelte';
	import DisplayEventForm from '$components/forms/agenda/DisplayEventForm.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { addEventFormStore, updateEventFormStore } from '$store/agenda';
	import ConfirmationDialog from '$components/ConfirmationDialog.svelte';
	import { toast } from 'svelte-sonner';

	export let data: PageData;
	$: ({ events } = data);
	$: addEventFormStore.set(data.addForm);
	$: updateEventFormStore.set(data.updateForm);

	let calendarRef: HTMLElement;
	let openAddModal = false;
	let openUpdateModal = false;
	let openDisplayModal = false;
	let deleteFormRef: HTMLFormElement;
	let openRemoveModal = false;

	let start: Date;
	let end: Date;
	let calendar: Calendar;
	let selectedEvent: AgendaResponse | null;

	$: getEvents = (
		_fetchInfo: unknown,
		successCallback: (arg0: AgendaResponse[]) => void,
		_failureCallback: unknown
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
			allDaySlot: false,
			navLinks: true,
			editable: true,
			eventSources: [getEvents],
			select: (info) => {
				openAddModal = true;

				start = info.start;
				end = info.end;
			},
			eventClick: (info) => {
				selectedEvent = getEventById(info.event.id);
				$deleteForm.id = info.event.id;
				openDisplayModal = true;
			}
		});

		calendar.render();
	});

	$: events && calendar && calendar.refetchEvents();
	$: getEventById = (id: string) => events.find((event) => event.id === id) ?? null;

	const handler = () => {
		deleteFormRef.requestSubmit();

		selectedEvent = null;
		openRemoveModal = false;
		openDisplayModal = false;
	};

	const {
		form: deleteForm,
		enhance,
		allErrors
	} = superForm(data.removeForm, {
		dataType: 'json',
		taintedMessage: null,
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Agenda supprimé avec succès', {
					important: true,
					position: 'bottom-center'
				});
			}
		}
	});

	$: $allErrors.length &&
		toast.error($allErrors.map((error) => error.messages.join('. ')).join('. '));
</script>

<Modal bind:open={openAddModal} size="medium">
	{#if start && end}
		<AddEventForm bind:open={openAddModal} {start} {end} />
	{/if}
</Modal>
<Modal bind:open={openUpdateModal} size="medium">
	{#if selectedEvent}
		<UpdateEventForm bind:open={openUpdateModal} item={selectedEvent} />
	{/if}
</Modal>

<Modal bind:open={openDisplayModal} size="medium">
	{#if selectedEvent}
		<DisplayEventForm
			bind:open={openDisplayModal}
			bind:update={openUpdateModal}
			bind:remove={openRemoveModal}
			item={selectedEvent}
		/>
	{/if}
</Modal>

<form use:enhance action="?/removeEvent" method="POST" class="hidden" bind:this={deleteFormRef}>
	{#if selectedEvent}
		<input type="hidden" name="id" bind:value={$deleteForm.id} />
	{/if}
</form>

<ConfirmationDialog bind:show={openRemoveModal} {handler}>
	<div class="z-50">
		<div class="mt-2 text-center">
			<h3 class="text-lg font-medium leading-6 text-gray-800 dark:text-white" id="modal-title">
				Supprimer {selectedEvent?.title}
			</h3>
			<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
				Êtes-vous sûr de vouloir supprimer cet événement? Toutes vos données seront définitivement
				supprimé. Cette action ne peut pas être annulée.
			</p>
		</div>
	</div>
</ConfirmationDialog>

<div
	class="w-full flex items-center xl:pt-10 h-auto justify-center overscroll-none overflow-hidden xl:pb-10"
	data-sveltekit-preload-data="hover"
>
	<div class="flex flex-col items-center justify-start w-full xl:w-11/12 xl:pl-10">
		<div
			class="w-full lg:pt-10 border-gray-200 xl:rounded-2xl relative flex min-w-0 xl:p-3 break-words bg-white border-0 shadow-xl rounded-2xl bg-clip-border"
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
