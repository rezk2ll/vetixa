<script lang="ts">
	import { formatDateTime } from '$utils/date';
	import type { AgendaResponse } from '$types';

	export let item: AgendaResponse;
	export let open = false;
	export let update = false;
	export let remove = false;
</script>

<div class="flex flex-col overflow-hidden bg-white w-full whitespace-normal">
	<div class="grid grid-cols-1 sm:grid-cols-4">
		<div class="flex flex-col col-span-5 whitespace-normal">
			<div class="flex flex-col space-y-4 xl:p-6 text-gray-600 whitespace-normal text-wrap">
				<div class="flex flex-row text-sm">
					<span class="xl:mr-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							enable-background="new 0 0 24 24"
							height="20px"
							viewBox="0 0 24 24"
							width="20px"
							fill="#64748b"
						>
							<g>
								<rect fill="none" height="24" width="24" />
							</g>
							<g>
								<path
									d="M20,7h-5V4c0-1.1-0.9-2-2-2h-2C9.9,2,9,2.9,9,4v3H4C2.9,7,2,7.9,2,9v11c0,1.1,0.9,2,2,2h16c1.1,0,2-0.9,2-2V9 C22,7.9,21.1,7,20,7z M9,12c0.83,0,1.5,0.67,1.5,1.5S9.83,15,9,15s-1.5-0.67-1.5-1.5S8.17,12,9,12z M12,18H6v-0.75c0-1,2-1.5,3-1.5 s3,0.5,3,1.5V18z M13,9h-2V4h2V9z M18,16.5h-4V15h4V16.5z M18,13.5h-4V12h4V13.5z"
								/>
							</g>
						</svg>
					</span>
					<p class="flex items-center text-gray-500">
						<span class="font-semibold mr-2 text-xs uppercase">Titre:</span>
						<span class="font-bold">{item.title}</span>
					</p>
				</div>

				<div class="flex flex-row text-sm">
					<span class="mr-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							height="20px"
							viewBox="0 0 24 24"
							width="20px"
							fill="#64748b"
						>
							<path d="M0 0h24v24H0z" fill="none" />
							<path
								d="M17 12h-5v5h5v-5zM16 1v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2h-1V1h-2zm3 18H5V8h14v11z"
							/>
						</svg>
					</span>
					<p class="flex items-center text-gray-500">
						<span class="font-semibold mr-2 text-xs uppercase">Date:</span>
						<span>{formatDateTime(item.start)} - {formatDateTime(item.end)}</span>
					</p>
				</div>
				<div class="flex flex-row text-sm pl-1">
					<span class="mr-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-4 h-4"
							fill="currentColor"
							viewBox="0 0 576 512"
							><path
								d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
							/></svg
						>
					</span>
					<p class="flex items-center text-gray-500">
						<span class="font-semibold mr-2 text-xs uppercase">Emplacement:</span>
						<span>{item.location ?? '-'}</span>
					</p>
				</div>
				<div class="flex flex-row text-sm pl-1">
					<span class="mr-3">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							class="w-4 h-4"
							fill="currentColor"
							viewBox="0 0 512 512"
							><path
								d="M160 368c26.5 0 48 21.5 48 48v16l72.5-54.4c8.3-6.2 18.4-9.6 28.8-9.6H448c8.8 0 16-7.2 16-16V64c0-8.8-7.2-16-16-16H64c-8.8 0-16 7.2-16 16V352c0 8.8 7.2 16 16 16h96zm48 124l-.2 .2-5.1 3.8-17.1 12.8c-4.8 3.6-11.3 4.2-16.8 1.5s-8.8-8.2-8.8-14.3V474.7v-6.4V468v-4V416H112 64c-35.3 0-64-28.7-64-64V64C0 28.7 28.7 0 64 0H448c35.3 0 64 28.7 64 64V352c0 35.3-28.7 64-64 64H309.3L208 492z"
							/></svg
						>
					</span>
          <p class="w-full text-ellipsis text-left">
            {item.description ?? '-'}
          </p>
        </div>
			</div>
		</div>
	</div>
	<div class="flex flex-col w-full relative bottom-0">
		<div class="grid grid-cols-3 border-t divide-x text-slate-700 dark:bg-transparent py-3">
			<button
				type="button"
				on:click={() => {
					open = false;
					update = true;
				}}
				class=" cursor-pointer uppercase text-xs flex flex-row items-center text-orange-500 justify-center font-semibold"
			>
				<div class="mr-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="20px"
						viewBox="0 0 24 24"
						width="20px"
						fill="currentColor"
						><path d="M0 0h24v24H0z" fill="none" /><path
							d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
						/></svg
					>
				</div>
				Mise à jour
			</button>
			<button
				type="button"
				on:click={() => {
					remove = true;
				}}
				class="cursor-pointer uppercase text-xs flex flex-row items-center justify-center text-red-500 font-semibold"
			>
				<div class="mr-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="20px"
						viewBox="0 0 24 24"
						width="20px"
						fill="currentColor"
						><path d="M0 0h24v24H0V0z" fill="none" /><path
							d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
						/></svg
					>
				</div>
				Supprimer
			</button>
			<button
				type="button"
				on:click={() => (open = false)}
				class="cursor-pointer uppercase text-xs flex flex-row items-center justify-center font-semibold"
			>
				<div class="mr-2">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						height="20px"
						viewBox="0 0 24 24"
						width="20px"
						fill="currentColor"
						><path d="M0 0h24v24H0z" fill="none" /><path
							d="M19 19H5V5h7V3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2v-7h-2v7zM14 3v2h3.59l-9.83 9.83 1.41 1.41L19 6.41V10h2V3h-7z"
						/></svg
					>
				</div>
				Fermer
			</button>
		</div>
	</div>
</div>
