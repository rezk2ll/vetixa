<script lang="ts">
	import { calculateDiff, formatDateString } from '$lib/utils/date';
	import { queue, updateQueueFormStore } from '$lib/store/queue';
	import type { QueueStatusFilter as StatusFilter } from '$types';
	import { superForm } from 'sveltekit-superforms/client';
	import AnimalIcon from '$components/display/animal/AnimalIcon.svelte';
	import SearchIcon from '$components/icons/SearchIcon.svelte';
	import BackArrow from '$components/icons/BackArrow.svelte';
	import ForwardArrow from '$components/icons/ForwardArrow.svelte';
	import EditIcon from '$components/icons/EditIcon.svelte';
	import { toast } from 'svelte-sonner';

	let statusFilter: StatusFilter = 'pending';
	let search: string;
	let page = 0;
	let currentTime = new Date().getTime();
	let formRef: HTMLFormElement | undefined;
	const { enhance, form, allErrors } = superForm($updateQueueFormStore, {
		dataType: 'json'
	});

	$: totalPages = Math.max(Math.ceil($queue.length / 10), 1);

	$: items = $queue.filter((item) => {
		if (search && search.length) {
			if (
				!item.visit.motif.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
				!item.visit.animal.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) &&
				!item.visit.animal.client.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
			) {
				return false;
			}
		}

		if (statusFilter === 'completed') {
			return item.served;
		}

		return !item.served;
	});

	$: pageItems = items.slice(page * 10, page * 10 + 10);
	$: setInterval(() => (currentTime = new Date().getTime()), 1000);
	$: waitingCount = $queue.filter(({ served }) => !served).length;
	$: servedCount = $queue.length - waitingCount;

	$: waitingTime = (date: string, time: string | null = null) => {
		const finalTime = time ? new Date(time).getTime() : currentTime;

		return calculateDiff(date, finalTime);
	};

	$: open = (id: string) => {
		$form.id = id;

		formRef?.requestSubmit();
	};

	$: $allErrors.map((error) => {
		toast.error(error.messages.join('. '));
	});
</script>

<form class="hidden" method="post" use:enhance bind:this={formRef}>
	<input type="hidden" name="id" bind:value={$form.id} />
</form>

<div class="flex flex-col items-center justify-start xl:pl-14 w-full xl:py-10">
	<div class="w-full p-1 pt-10 lg:p-5 bg-white lg:shadow-2xl border-gray-200 xl:rounded">
		<div class="flex flex-col space-y-4 pt-10 lg:pt-0">
			<div
				class="flex pl-2 lg:pl-0 flex-col lg:flex-row items-start lg:items-center justify-between w-full"
			>
				<div class="w-full flex flex-col justify-center items-center lg:items-start">
					<div class="flex items-center gap-x-3">
						<h2 class="text-lg font-medium text-gray-800 dark:text-white">File d'attente</h2>
						<span
							class="px-3 py-1 text-xs text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400"
							>{$queue.length} client{$queue.length > 1 ? 's' : ''}</span
						>
					</div>

					<p class="mt-1 text-sm text-gray-500 dark:text-gray-300">
						La liste des clients en attente
					</p>
				</div>
			</div>
			<div
				class="flex px-1 lg:px-0 flex-col lg:flex-row items-start lg:items-center space-y-10 lg:space-y-0 justify-between w-full lg:w-auto"
			>
				<div
					class="flex flex-row overflow-hidden bg-white border divide-x rounded-lg w-full lg:w-96"
				>
					<button
						on:click={() => {
							statusFilter = 'pending';
							page = 0;
						}}
						class="px-5 w-full py-2 text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'pending'
							? 'bg-gray-100'
							: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300"
					>
						En attente
						<span
							class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{waitingCount}
						</span>
					</button>
					<button
						on:click={() => {
							statusFilter = 'completed';
							page = 0;
						}}
						class="px-5 py-2 w-full text-xs font-medium text-gray-600 transition-colors duration-200 {statusFilter ===
						'completed'
							? 'bg-gray-100'
							: ''} sm:text-sm dark:bg-gray-800 dark:text-gray-300 hover:bg-gray-100"
					>
						Servis
						<span
							class="inline-flex items-center justify-center w-5 h-5 ms-2 text-xs font-semibold text-slate-800 bg-slate-200 rounded-full"
						>
							{servedCount}
						</span>
					</button>
				</div>
				<div class="flex items-center mt-0 h-6 w-full lg:w-auto">
					<span class="absolute">
						<SearchIcon />
					</span>

					<input
						bind:value={search}
						type="text"
						placeholder="Rechercher"
						class="block w-full py-1.5 pr-5 text-gray-700 bg-white border border-gray-200 rounded-lg md:w-60 placeholder-gray-400/70 pl-11 rtl:pr-11 rtl:pl-5 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
					/>
				</div>
			</div>
			<div class="flex flex-col mt-6 px-2 lg:px-0">
				<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
						<div class="border border-gray-200 dark:border-gray-700 md:rounded-lg">
							<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
								<thead class="bg-gray-50 dark:bg-gray-800 table-fixed">
									<tr>
										<th
											scope="col"
											class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											<span>Date</span>
										</th>
										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Motif
										</th>

										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Client
										</th>

										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Animale
										</th>

										<th
											scope="col"
											class="px-4 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
										>
											Temps d'attente
										</th>

										<th scope="col" class="relative py-3.5 px-4">
											<span class="sr-only">Actions</span>
										</th>
									</tr>
								</thead>
								<tbody
									class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900"
								>
									{#each pageItems as item}
										<tr>
											<td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
												<button type="button" on:click={() => open(item.id)}>
													<h2
														class="font-medium hover:underline hover:pointer text-gray-800 dark:text-white capitalize"
													>
														{formatDateString(item.created)}
													</h2>
												</button>
											</td>
											<td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
												<p
													class="text-sm font-normal text-gray-600 dark:text-gray-400 first-letter:capitalize"
												>
													{item.visit.motif}
												</p>
											</td>
											<td class="px-4 py-4 text-sm whitespace-nowrap">
												<p
													class="text-sm font-normal text-gray-600 dark:text-gray-400 first-letter:capitalize"
												>
													{item.visit.animal.client.name}
												</p>
											</td>
											<td class="px-4 py-4 text-sm whitespace-nowrap flex flex-row">
												<p
													class="text-sm font-normal text-gray-600 dark:text-gray-400 first-letter:capitalize"
												>
													{item.visit.animal.name}
												</p>
												<span
													class="px-4 text-sm {item.visit.animal.sex === 'male'
														? 'text-blue-500 '
														: 'text-pink-500 '} dark:text-gray-300 whitespace-nowrap"
												>
													<AnimalIcon type={item.visit.animal.type} />
												</span>
											</td>
											<td class="px-4 py-4 text-sm font-medium whitespace-nowrap">
												<p
													class="text-sm font-normal text-gray-600 dark:text-gray-400 first-letter:capitalize"
												>
													{waitingTime(item.created, item.served ? item.updated : null)}
												</p>
											</td>
											<td class="px-4 py-4 text-sm whitespace-nowrap">
												<button
													type="button"
													on:click={() => open(item.id)}
													class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg dark:text-gray-300 hover:bg-gray-100"
												>
													<EditIcon />
												</button>
											</td>
										</tr>
									{/each}
								</tbody>
							</table>
						</div>
					</div>
				</div>
			</div>

			<div class="mt-6 pb-5 lg:pb-0 sm:flex sm:items-center sm:justify-between px-4 lg:px-0">
				<div class="text-sm text-gray-500 dark:text-gray-400">
					Page <span class="font-medium text-gray-700 dark:text-gray-100"
						>{page + 1} sur {totalPages}</span
					>
				</div>

				<div class="flex items-center mt-4 gap-x-4 sm:mt-0">
					<button
						on:click={() => (page -= 1)}
						disabled={page <= 0}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {page <=
						0
							? 'bg-slate-200'
							: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {page <= 0
							? 'hover:bg-slate-200'
							: 'hover:bg-gray-100'}  dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
					>
						<BackArrow />

						<span> précédent </span>
					</button>

					<button
						disabled={page >= totalPages - 1}
						on:click={() => (page += 1)}
						class="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 {page >=
						totalPages - 1
							? 'bg-slate-200'
							: 'bg-white'} border rounded-md sm:w-auto gap-x-2 {page >= totalPages - 1
							? 'hover:bg-slate-200'
							: 'hover:bg-gray-100'} dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
					>
						<span> Suivant </span>

						<ForwardArrow />
					</button>
				</div>
			</div>
		</div>
	</div>
</div>
