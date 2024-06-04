<script lang="ts">
	import type { CageItem } from '$types';
	import AnimalIcon from '$components/display/animal/AnimalIcon.svelte';
	import { formatDateShort, formatDateStringShort } from '$lib/utils/date';
	import PrimaryButton from '$components/buttons/PrimaryButton.svelte';
	import { goto } from '$app/navigation';

	export let cage: CageItem;
</script>

<div class="flex flex-col rounded bg-white shadow-xl relative min-h-52">
	<span class="absolute top-0 left-0 bg-black text-slate-200 text-md font-semibold py-1 px-2">
		{cage.code}
	</span>
	<div class="flex flex-col justify-center pt-8 pb-2 px-5 h-full">
		{#if cage.hospit}
			<div
				class="absolute top-0 left-10 bg-white text-md font-semibold py-1 px-2 {cage.hospit?.visit
					.animal.sex === 'male'
					? 'text-blue-400'
					: 'text-pink-500'}"
			>
				{cage.hospit?.visit.animal.name}
			</div>
			<div
				class="absolute top-1 right-1 {cage.hospit?.visit.animal.sex === 'male'
					? 'text-blue-500 '
					: 'text-pink-500 '}"
			>
				<AnimalIcon type={cage.hospit?.visit.animal.type} />
			</div>
			<div class="flex flex-col grow">
				<div class="flex flex-row w-full text-sm gap-2 pt-2">
					<svg
						fill="currentColor"
						class="w-4 h-4"
						viewBox="0 0 24 24"
						id="Layer_1"
						data-name="Layer 1"
						xmlns="http://www.w3.org/2000/svg"
						><path
							d="M24,12a1,1,0,0,1-2,0A10.011,10.011,0,0,0,12,2a1,1,0,0,1,0-2A12.013,12.013,0,0,1,24,12Zm-8,1a1,1,0,0,0,0-2H13.723A2,2,0,0,0,13,10.277V7a1,1,0,0,0-2,0v3.277A1.994,1.994,0,1,0,13.723,13ZM1.827,6.784a1,1,0,1,0,1,1A1,1,0,0,0,1.827,6.784ZM2,12a1,1,0,1,0-1,1A1,1,0,0,0,2,12ZM12,22a1,1,0,1,0,1,1A1,1,0,0,0,12,22ZM4.221,3.207a1,1,0,1,0,1,1A1,1,0,0,0,4.221,3.207ZM7.779.841a1,1,0,1,0,1,1A1,1,0,0,0,7.779.841ZM1.827,15.216a1,1,0,1,0,1,1A1,1,0,0,0,1.827,15.216Zm2.394,3.577a1,1,0,1,0,1,1A1,1,0,0,0,4.221,18.793Zm3.558,2.366a1,1,0,1,0,1,1A1,1,0,0,0,7.779,21.159Zm14.394-5.943a1,1,0,1,0,1,1A1,1,0,0,0,22.173,15.216Zm-2.394,3.577a1,1,0,1,0,1,1A1,1,0,0,0,19.779,18.793Zm-3.558,2.366a1,1,0,1,0,1,1A1,1,0,0,0,16.221,21.159Z"
						/></svg
					>
					<div>{formatDateStringShort(cage.hospit?.start)}</div>
					<div class="text-slate-500 flex items-center justify-center">
						<svg
							data-slot="icon"
							fill="none"
							stroke-width="1.5"
							stroke="currentColor"
							viewBox="0 0 24 24"
							class="w-5 h-5"
							xmlns="http://www.w3.org/2000/svg"
							aria-hidden="true"
						>
							<path
								stroke-linecap="round"
								stroke-linejoin="round"
								d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
							/>
						</svg>
					</div>
					<div>{formatDateStringShort(cage.hospit?.end)}</div>
				</div>
				<div class="flex flex-row w-full text-sm gap-2 pt-2">
					<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z"
							stroke="currentColor"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<div class="font-semibold">Propriétaire</div>
					<div class="text-slate-500 flex items-center justify-center">
						{'-'}
					</div>
					<div>{cage.hospit.visit.client.name}</div>
				</div>
				<div class="flex flex-row w-full text-sm gap-2 pt-2">
					<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path
							d="M20 14V7C20 5.34315 18.6569 4 17 4H7C5.34315 4 4 5.34315 4 7V17C4 18.6569 5.34315 20 7 20H13.5M20 14L13.5 20M20 14H15.5C14.3954 14 13.5 14.8954 13.5 16V20"
							stroke="#000000"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M8 8H16"
							stroke="#000000"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M8 12H12"
							stroke="#000000"
							stroke-width="2"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
					<div class="font-semibold">Motif</div>
					<div class="text-slate-500 flex items-center justify-center">
						{'-'}
					</div>
					<div class="w-full truncate">{cage.hospit.visit.motif}</div>
				</div>
				{#if cage.hospit.note}
					<div class="flex flex-row w-full text-sm gap-2 pt-2">
						<svg
							class="w-5 h-5"
							viewBox="0 0 24 24"
							fill="currentColor"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fill-rule="evenodd"
								clip-rule="evenodd"
								d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM12 17.75C12.4142 17.75 12.75 17.4142 12.75 17V11C12.75 10.5858 12.4142 10.25 12 10.25C11.5858 10.25 11.25 10.5858 11.25 11V17C11.25 17.4142 11.5858 17.75 12 17.75ZM12 7C12.5523 7 13 7.44772 13 8C13 8.55228 12.5523 9 12 9C11.4477 9 11 8.55228 11 8C11 7.44772 11.4477 7 12 7Z"
								fill="currentColor"
							/>
						</svg>
						<div class="font-semibold">Note</div>
						<div class="text-slate-500 flex items-center justify-center">
							{'-'}
						</div>
						<div class="w-full truncate">{cage.hospit.note}</div>
					</div>
				{/if}
			</div>

			<div class="mt-auto">
				<PrimaryButton full handler={() => goto(`/visit/${cage.hospit?.visit.id}?tab=hospit`)}>
					<div class="flex flex-row items-center justify-center gap-5">
						<div>Modifier</div>
						<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
								d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
							<path
								d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</div>
				</PrimaryButton>
			</div>
		{:else}
			<div class="flex flex-col justify-center items-center gap-2 h-full">
				<svg
					class="w-10 h-10 grow"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M4 15.8294V15.75V8C4 7.69114 4.16659 7.40629 4.43579 7.25487L4.45131 7.24614L11.6182 3.21475L11.6727 3.18411C11.8759 3.06979 12.1241 3.06979 12.3273 3.18411L19.6105 7.28092C19.8511 7.41625 20 7.67083 20 7.94687V8V15.75V15.8294C20 16.1119 19.8506 16.3733 19.6073 16.5167L12.379 20.7766C12.1451 20.9144 11.8549 20.9144 11.621 20.7766L4.39267 16.5167C4.14935 16.3733 4 16.1119 4 15.8294Z"
						stroke="#323232"
						stroke-width="2"
					/>
					<path d="M12 21V12" stroke="#323232" stroke-width="2" />
					<path d="M12 12L4 7.5" stroke="#323232" stroke-width="2" />
					<path d="M20 7.5L12 12" stroke="#323232" stroke-width="2" />
				</svg>
				<div
					class="flex flex-row items-center justify-center capitalize bg-gray-600 text-slate-200 text-base font-semibold py-1 px-5 top-0 w-full mt-auto rounded"
				>
					cage vide !
				</div>
			</div>
		{/if}
	</div>
</div>
