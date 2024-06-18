<script lang="ts">
	import ConfirmationDialog from '$components/ConfirmationDialog.svelte';
	import LoadingSpinner from '$components/display/LoadingSpinner.svelte';
	import {
		getFileNameFromUrl,
		getImageDimensions,
		getOriginalFileName,
		getReadableFileSize
	} from '$utils/file';
	import { addVisitFileFormStore, currentVisit, removeVisitFileFormStore } from '$store/visit';
	import { superForm, filesProxy } from 'sveltekit-superforms';
	import { fetchFileInfo } from '$lib/utils/mime';
	import LoadingDots from '$components/display/LoadingDots.svelte';
	import FileItemPreview from '$components/display/FileItemPreview.svelte';
	import PhotoSwipeLightbox from 'photoswipe/lightbox';
	import { afterUpdate, onMount } from 'svelte';
	import 'photoswipe/style.css';
	import EmptyTable from '$components/display/EmptyTable.svelte';

	let uploadFileFormRef: HTMLFormElement;
	let removeFileFormRef: HTMLFormElement;
	let showConfirmation = false;

	const {
		form: addFileForm,
		enhance,
		submitting
	} = superForm($addVisitFileFormStore, {
		id: 'add-file',
		dataType: 'json'
	});

	const { form: removeFileForm, enhance: removeEnhance } = superForm($removeVisitFileFormStore, {
		id: 'remove-file',
		dataType: 'json'
	});

	let files = filesProxy(addFileForm, 'files');

	const fileChangeHandler = () => {
		if (!$addFileForm.files) return;
		$addFileForm.id = $currentVisit.id;

		uploadFileFormRef.requestSubmit();
	};

	const promptItemRemoval = (name: string) => {
		$removeFileForm.file = name;
		showConfirmation = true;
	};

	const removeHandler = () => {
		$removeFileForm.id = $currentVisit.id;
		removeFileFormRef.requestSubmit();
		showConfirmation = false;
	};

	onMount(() => {
		const lightbox = new PhotoSwipeLightbox({
			gallery: '.files-gallery',
			children: 'a',
			showHideAnimationType: 'zoom',
			initialZoomLevel: 'fill',
			pswpModule: () => import('photoswipe')
		});

		lightbox.init();
	});

	afterUpdate(() => {
		const lightbox = new PhotoSwipeLightbox({
			gallery: '.files-gallery',
			children: 'a',
			showHideAnimationType: 'zoom',
			initialZoomLevel: 'fill',
			pswpModule: () => import('photoswipe')
		});

		lightbox.init();
	});
</script>

<form
	class="hidden"
	use:removeEnhance
	method="post"
	action="?/removeFile"
	bind:this={removeFileFormRef}
>
	<input type="hidden" name="file" bind:value={$removeFileForm.file} />
	<input type="hidden" name="id" bind:value={$removeFileForm.id} />
</form>

<ConfirmationDialog bind:show={showConfirmation} handler={removeHandler}>
	<div>
		<div class="mt-2 text-center">
			<p class="mt-2 text-sm text-gray-500 dark:text-gray-400 px-2">
				Êtes-vous sûr de vouloir enlever ce fichier ?
				<br />
				Cette action ne peut pas être annulée.
			</p>
		</div>
	</div>
</ConfirmationDialog>

<section class="container px-4 mx-auto">
	<div class="flex items-center justify-between">
		<div class="w-full text-lg font-medium text-gray-800 dark:text-white">
			{$currentVisit.files.length} fichier{$currentVisit.files.length !== 1 ? 's' : ''}
		</div>
		<div class="flex items-center justify-end mt-4 gap-x-4 w-full">
			<form
				method="POST"
				enctype="multipart/form-data"
				action="?/addFile"
				bind:this={uploadFileFormRef}
				use:enhance
			>
				<label
					class="flex items-center justify-center w-full lg:w-auto px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
				>
					<svg class="w-6 h-6" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<g clip-path="url(#clip0_3098_154395)">
							<path
								d="M13.3333 13.3332L9.99997 9.9999M9.99997 9.9999L6.66663 13.3332M9.99997 9.9999V17.4999M16.9916 15.3249C17.8044 14.8818 18.4465 14.1806 18.8165 13.3321C19.1866 12.4835 19.2635 11.5359 19.0351 10.6388C18.8068 9.7417 18.2862 8.94616 17.5555 8.37778C16.8248 7.80939 15.9257 7.50052 15 7.4999H13.95C13.6977 6.52427 13.2276 5.61852 12.5749 4.85073C11.9222 4.08295 11.104 3.47311 10.1817 3.06708C9.25943 2.66104 8.25709 2.46937 7.25006 2.50647C6.24304 2.54358 5.25752 2.80849 4.36761 3.28129C3.47771 3.7541 2.70656 4.42249 2.11215 5.23622C1.51774 6.04996 1.11554 6.98785 0.935783 7.9794C0.756025 8.97095 0.803388 9.99035 1.07431 10.961C1.34523 11.9316 1.83267 12.8281 2.49997 13.5832"
								stroke="currentColor"
								stroke-width="1.67"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</g>
						<defs>
							<clipPath id="clip0_3098_154395">
								<rect width="20" height="20" fill="white" />
							</clipPath>
						</defs>
					</svg>
					<input
						type="file"
						class="hidden"
						name="files"
						multiple={true}
						bind:files={$files}
						on:change={fileChangeHandler}
					/>
					<span>Télécharger</span>
				</label>
				<input type="hidden" class="hidden" name="id" bind:value={$addFileForm.id} />
			</form>
		</div>
	</div>

	<div class="flex flex-col mt-6">
		<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div class="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
					<table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
						<thead class="bg-gray-50 dark:bg-gray-800">
							<tr>
								<th
									scope="col"
									class="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
								>
									<div class="flex items-center gap-x-3">
										<span>Nom</span>
									</div>
								</th>

								<th
									scope="col"
									class="px-3 py-3.5 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
								>
									Taille du fichier
								</th>

								<th scope="col" class="relative py-3.5 px-4">
									<span class="sr-only">Edit</span>
								</th>
							</tr>
						</thead>
						<tbody class="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
							{#if $submitting}
								<LoadingSpinner />
							{:else if $currentVisit.files.length}
								{#each $currentVisit.files as item}
									<tr>
										<td class="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
											<div class="inline-flex items-center gap-x-3">
												<div class="flex items-center gap-x-2">
													<FileItemPreview url={item} />
													<div class="files-gallery">
														{#await getImageDimensions(item)}
															<h2 class="ont-normal text-gray-800 dark:text-white">
																{getOriginalFileName(item)}
															</h2>
														{:then value}
															<a
																href={item}
																class="font-normal text-gray-800 dark:text-white hover:underline cursor-pointer"
																target="_blank"
																rel="noreferrer"
																data-pswp-width={value.width}
																data-pswp-height={value.height}
															>
																{getOriginalFileName(item)}
															</a>
														{:catch}
															<h2 class="ont-normal text-gray-800 dark:text-white">
																{getOriginalFileName(item)}
															</h2>
														{/await}
													</div>
												</div>
											</div>
										</td>
										<td class="px-4 py-4 text-sm whitespace-nowrap space-x-3">
											{#await fetchFileInfo(item)}
												<LoadingDots />
											{:then value}
												<p class="text-xs font-normal text-gray-500 dark:text-gray-400">
													{getReadableFileSize(value.size)}
												</p>
											{/await}
										</td>
										<td class="px-4 py-4 text-sm whitespace-nowrap flex flex-row space-x-3">
											<a
												href={item}
												target="_blank"
												rel="noreferrer"
												class="px-1 py-1 text-gray-500 transition-colors duration-200 rounded-lg hover:text-emerald-500 dark:text-gray-300 hover:bg-gray-100"
											>
												<svg
													data-slot="icon"
													fill="none"
													stroke-width="1.5"
													stroke="currentColor"
													viewBox="0 0 24 24"
													xmlns="http://www.w3.org/2000/svg"
													aria-hidden="true"
													class="w-5 h-5"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
													/>
												</svg>
											</a>
											<button
												type="button"
												on:click={() => promptItemRemoval(getFileNameFromUrl(item))}
												class="text-gray-500 transition-colors duration-200 hover:text-red-500 focus:outline-none"
											>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													stroke-width="1.5"
													stroke="currentColor"
													class="w-5 h-5"
												>
													<path
														stroke-linecap="round"
														stroke-linejoin="round"
														d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
													/>
												</svg>
											</button>
										</td>
									</tr>
								{/each}
							{:else}
								<EmptyTable />
							{/if}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
</section>
