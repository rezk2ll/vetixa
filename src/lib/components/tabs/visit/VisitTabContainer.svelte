<script lang="ts">
	import type { VisitTabsType } from '$root/types';
	import { activeVisitTab } from '$store/visit';

	$: isActive = (tab: VisitTabsType): boolean => tab === $activeVisitTab;
</script>

<div class="flex flex-col items-center justify-start xl:pl-14 w-full xl:py-10">
	<div class="w-full p-1 pt-10 lg:p-5 bg-white shadow-2xl border-gray-200 xl:rounded">
		<div class="flex items-center gap-x-3 w-full">
			<div class="flex overflow-x-auto whitespace-nowrap w-full">
				<button
					type="button"
					on:click={() => activeVisitTab.set('exams')}
					class=" {isActive('exams')
						? 'border border-b-transparent rounded-t-md focus:outline-none text-sinc-700'
						: 'bg-transparent border-b border-l-transparent border-r-transparent cursor-base focus:outline-none hover:border-gray-400  text-gray-600'}  inline-flex items-center h-12 px-2 py-2 text-center border-gray-300 sm:px-4 whitespace-nowrap"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 512 512"
						class="w-4 h-4 mx-1 sm:w-6 sm:h-6"
						fill="currentColor"
						><path
							d="M160 32c0-17.7 14.3-32 32-32h32c17.7 0 32 14.3 32 32c17.7 0 32 14.3 32 32V288c0 17.7-14.3 32-32 32c0 17.7-14.3 32-32 32H192c-17.7 0-32-14.3-32-32c-17.7 0-32-14.3-32-32V64c0-17.7 14.3-32 32-32zM32 448H320c70.7 0 128-57.3 128-128s-57.3-128-128-128V128c106 0 192 86 192 192c0 49.2-18.5 94-48.9 128H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H320 32c-17.7 0-32-14.3-32-32s14.3-32 32-32zm80-64H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H112c-8.8 0-16-7.2-16-16s7.2-16 16-16z"
						/></svg
					>

					<span class="mx-1 text-sm sm:text-base"> Examens </span>
				</button>

				<button
					type="button"
					on:click={() => activeVisitTab.set('diagnostics')}
					class=" {isActive('diagnostics')
						? 'border border-b-transparent rounded-t-md focus:outline-none text-sinc-700'
						: 'bg-transparent border-b border-l-transparent border-r-transparent cursor-base  focus:outline-none hover:border-gray-400  text-gray-600'}  inline-flex items-center h-12 px-2 py-2 text-center border-gray-300 sm:px-4 whitespace-nowrap"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 384 512"
						class="w-4 h-4 mx-1 sm:w-6 sm:h-6"
						fill="currentColor"
						><path
							d="M64 0C28.7 0 0 28.7 0 64V448c0 35.3 28.7 64 64 64H320c35.3 0 64-28.7 64-64V160H256c-17.7 0-32-14.3-32-32V0H64zM256 0V128H384L256 0zM160 240c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H224v48c0 8.8-7.2 16-16 16H176c-8.8 0-16-7.2-16-16V352H112c-8.8 0-16-7.2-16-16V304c0-8.8 7.2-16 16-16h48V240z"
						/></svg
					>

					<span class="mx-1 text-sm sm:text-base"> Diagnostiques </span>
				</button>

				<button
					type="button"
					on:click={() => activeVisitTab.set('files')}
					class=" {isActive('files')
						? 'border border-b-transparent rounded-t-md focus:outline-none text-sinc-700'
						: 'bg-transparent border-b border-l-transparent border-r-transparent cursor-base focus:outline-none hover:border-gray-400  text-gray-600'}  inline-flex items-center h-12 px-2 py-2 text-center border-gray-300 sm:px-4 whitespace-nowrap"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 576 512"
						class="w-4 h-4 mx-1 sm:w-6 sm:h-6"
						fill="currentColor"
						><path
							d="M384 480h48c11.4 0 21.9-6 27.6-15.9l112-192c5.8-9.9 5.8-22.1 .1-32.1S555.5 224 544 224H144c-11.4 0-21.9 6-27.6 15.9L48 357.1V96c0-8.8 7.2-16 16-16H181.5c4.2 0 8.3 1.7 11.3 4.7l26.5 26.5c21 21 49.5 32.8 79.2 32.8H416c8.8 0 16 7.2 16 16v32h48V160c0-35.3-28.7-64-64-64H298.5c-17 0-33.3-6.7-45.3-18.7L226.7 50.7c-12-12-28.3-18.7-45.3-18.7H64C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H87.7 384z"
						/></svg
					>

					<span class="mx-1 text-sm sm:text-base"> Fichiers </span>
				</button>
				<button
					type="button"
					on:click={() => activeVisitTab.set('hospit')}
					class=" {isActive('hospit')
						? 'border border-b-transparent rounded-t-md focus:outline-none text-sinc-700'
						: 'bg-transparent border-b cursor-base border-l-transparent border-r-transparent focus:outline-none hover:border-gray-400  text-gray-600 '}  inline-flex items-center h-12 px-2 py-2 text-center border-gray-300 sm:px-4 whitespace-nowrap"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 576 512"
						class="w-4 h-4 mx-1 sm:w-6 sm:h-6"
						fill="currentColor"
						><path
							d="M543.8 287.6c17 0 32-14 32-32.1c1-9-3-17-11-24L309.5 7c-6-5-14-7-21-7s-15 1-22 8L10 231.5c-7 7-10 15-10 24c0 18 14 32.1 32 32.1h32V448c0 35.3 28.7 64 64 64H448.5c35.5 0 64.2-28.8 64-64.3l-.7-160.2h32zM256 208c0-8.8 7.2-16 16-16h32c8.8 0 16 7.2 16 16v48h48c8.8 0 16 7.2 16 16v32c0 8.8-7.2 16-16 16H320v48c0 8.8-7.2 16-16 16H272c-8.8 0-16-7.2-16-16V320H208c-8.8 0-16-7.2-16-16V272c0-8.8 7.2-16 16-16h48V208z"
						/></svg
					>

					<span class="mx-1 text-sm sm:text-base"> Hospitalisation </span>
				</button>
				<button
					type="button"
					on:click={() => activeVisitTab.set('shop')}
					class=" {isActive('shop')
						? 'border border-b-transparent rounded-t-md focus:outline-none text-zinc-700'
						: 'bg-transparent border-b cursor-base border-l-transparent border-r-transparent focus:outline-none hover:border-gray-400  text-gray-600'}  inline-flex items-center h-12 px-2 py-2 text-center border-gray-300 sm:px-4 whitespace-nowrap"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						viewBox="0 0 576 512"
						class="w-4 h-4 mx-1 sm:w-6 sm:h-6"
						fill="currentColor"
					>
						<path
							d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96zM252 160c0 11 9 20 20 20h44v44c0 11 9 20 20 20s20-9 20-20V180h44c11 0 20-9 20-20s-9-20-20-20H356V96c0-11-9-20-20-20s-20 9-20 20v44H272c-11 0-20 9-20 20z"
						/></svg
					>

					<span class="mx-1 text-sm sm:text-base"> Magasin </span>
				</button>
			</div>
		</div>
	</div>
</div>
