<script lang="ts">
	export let total: number;
	export let unavailable: number;
	export let totalSales: number;
	export let monthlyRevenu: number;
	export let monthlySales: number;
	export let dailyRevenu: number;
	export let dailySales: number;
</script>

<div class="flex flex-col pt-20 lg:flex-row items-center justify-center xl:pl-14 w-full xl:pt-8">
	<div class="w-full xl:w-3/12">
		<div
			class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 md:shadow-lg"
		>
			<div class="flex lg:p-4 px-4 w-full">
				<div class="flex w-full">
					<div class="pr-4">
						<h5 class="text-blueGray-600 uppercase font-bold text-xs">Articles</h5>
						<span class="font-semibold text-xl text-blueGray-700">{total}</span>
					</div>
					<div class="w-1/2 pl-4">
						<div
							class="text-white p-3 text-center flex items-center justify-center w-12 h-12 md:shadow-lg rounded-full bg-blueGray-600"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="16"
								width="18"
								viewBox="0 0 576 512"
								fill="currentColor"
								><path
									d="M290.8 48.6l78.4 29.7L288 109.5 206.8 78.3l78.4-29.7c1.8-.7 3.8-.7 5.7 0zM136 92.5V204.7c-1.3 .4-2.6 .8-3.9 1.3l-96 36.4C14.4 250.6 0 271.5 0 294.7V413.9c0 22.2 13.1 42.3 33.5 51.3l96 42.2c14.4 6.3 30.7 6.3 45.1 0L288 457.5l113.5 49.9c14.4 6.3 30.7 6.3 45.1 0l96-42.2c20.3-8.9 33.5-29.1 33.5-51.3V294.7c0-23.3-14.4-44.1-36.1-52.4l-96-36.4c-1.3-.5-2.6-.9-3.9-1.3V92.5c0-23.3-14.4-44.1-36.1-52.4l-96-36.4c-12.8-4.8-26.9-4.8-39.7 0l-96 36.4C150.4 48.4 136 69.3 136 92.5zM392 210.6l-82.4 31.2V152.6L392 121v89.6zM154.8 250.9l78.4 29.7L152 311.7 70.8 280.6l78.4-29.7c1.8-.7 3.8-.7 5.7 0zm18.8 204.4V354.8L256 323.2v95.9l-82.4 36.2zM421.2 250.9c1.8-.7 3.8-.7 5.7 0l78.4 29.7L424 311.7l-81.2-31.1 78.4-29.7zM523.2 421.2l-77.6 34.1V354.8L528 323.2v90.7c0 3.2-1.9 6-4.8 7.3z"
								/></svg
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="w-full xl:w-3/12 lg:px-4">
		<div
			class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 md:shadow-lg"
		>
			<div class="flex-auto p-4">
				<div class="flex flex-wrap">
					<div class="relative w-full pr-4 max-w-full flex-grow flex-1">
						<h5 class="text-blueGray-600 uppercase font-bold text-xs">En repture</h5>
						<span class="font-semibold text-xl text-blueGray-700"
							>{unavailable} article{unavailable > 1 ? 's' : ''}</span
						>
					</div>
					<div class="relative w-auto pl-4 flex-initial">
						<div
							class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 md:shadow-lg rounded-full bg-red-500"
						>
							<svg
								fill="none"
								stroke="currentColor"
								stroke-width="1.5"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="w-full xl:w-3/12 lg:px-4">
		<div
			class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 md:shadow-lg"
		>
			<div class="flex-auto p-4">
				<div class="flex flex-wrap">
					<div class="relative w-full pr-4 max-w-full flex-grow flex-1">
						<h5 class="text-blueGray-600 uppercase font-bold text-xs">Ventes du jour</h5>
						<span class="font-semibold text-xl text-blueGray-700"
							>{dailySales} article{dailySales > 1 ? 's' : ''}</span
						>
					</div>
					<div class="relative w-auto pl-4 flex-initial">
						<div
							class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 md:shadow-lg rounded-full bg-emerald-500"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="16"
								width="18"
								viewBox="0 0 576 512"
								fill="currentColor"
								><path
									d="M0 24C0 10.7 10.7 0 24 0H69.5c22 0 41.5 12.8 50.6 32h411c26.3 0 45.5 25 38.6 50.4l-41 152.3c-8.5 31.4-37 53.3-69.5 53.3H170.7l5.4 28.5c2.2 11.3 12.1 19.5 23.6 19.5H488c13.3 0 24 10.7 24 24s-10.7 24-24 24H199.7c-34.6 0-64.3-24.6-70.7-58.5L77.4 54.5c-.7-3.8-4-6.5-7.9-6.5H24C10.7 48 0 37.3 0 24zM128 464a48 48 0 1 1 96 0 48 48 0 1 1 -96 0zm336-48a48 48 0 1 1 0 96 48 48 0 1 1 0-96z"
								/></svg
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="w-full xl:w-3/12 lg:pl-4">
		<div
			class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 md:shadow-lg"
		>
			<div class="flex-auto p-4">
				<div class="flex flex-wrap">
					<div class="relative w-full pr-4 max-w-full flex-grow flex-1">
						<h5 class="text-blueGray-600 uppercase font-bold text-xs">revenu de jour</h5>
						<span class="font-semibold text-xl text-blueGray-700">{dailyRevenu} Dt</span>
					</div>
					<div class="relative w-auto pl-4 flex-initial">
						<div
							class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 md:shadow-lg rounded-full bg-emerald-500"
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								height="16"
								width="16"
								viewBox="0 0 512 512"
								fill="currentColor"
								><path
									d="M320 96H192L144.6 24.9C137.5 14.2 145.1 0 157.9 0H354.1c12.8 0 20.4 14.2 13.3 24.9L320 96zM192 128H320c3.8 2.5 8.1 5.3 13 8.4C389.7 172.7 512 250.9 512 416c0 53-43 96-96 96H96c-53 0-96-43-96-96C0 250.9 122.3 172.7 179 136.4l0 0 0 0c4.8-3.1 9.2-5.9 13-8.4zm84 88c0-11-9-20-20-20s-20 9-20 20v14c-7.6 1.7-15.2 4.4-22.2 8.5c-13.9 8.3-25.9 22.8-25.8 43.9c.1 20.3 12 33.1 24.7 40.7c11 6.6 24.7 10.8 35.6 14l1.7 .5c12.6 3.8 21.8 6.8 28 10.7c5.1 3.2 5.8 5.4 5.9 8.2c.1 5-1.8 8-5.9 10.5c-5 3.1-12.9 5-21.4 4.7c-11.1-.4-21.5-3.9-35.1-8.5c-2.3-.8-4.7-1.6-7.2-2.4c-10.5-3.5-21.8 2.2-25.3 12.6s2.2 21.8 12.6 25.3c1.9 .6 4 1.3 6.1 2.1l0 0 0 0c8.3 2.9 17.9 6.2 28.2 8.4V424c0 11 9 20 20 20s20-9 20-20V410.2c8-1.7 16-4.5 23.2-9c14.3-8.9 25.1-24.1 24.8-45c-.3-20.3-11.7-33.4-24.6-41.6c-11.5-7.2-25.9-11.6-37.1-15l0 0-.7-.2c-12.8-3.9-21.9-6.7-28.3-10.5c-5.2-3.1-5.3-4.9-5.3-6.7c0-3.7 1.4-6.5 6.2-9.3c5.4-3.2 13.6-5.1 21.5-5c9.6 .1 20.2 2.2 31.2 5.2c10.7 2.8 21.6-3.5 24.5-14.2s-3.5-21.6-14.2-24.5c-6.5-1.7-13.7-3.4-21.1-4.7V216z"
								/></svg
							>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<div class="flex flex-col lg:flex-row items-center justify-center xl:pl-10 w-full xl:pt-2">
	<div class="w-full xl:w-4/12 lg:pl-4">
		<div
			class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 md:shadow-lg"
		>
			<div class="flex-auto p-4">
				<div class="flex flex-wrap">
					<div class="relative w-full pr-4 max-w-full flex-grow flex-1">
						<h5 class="text-blueGray-600 uppercase font-bold text-xs">ventes mensuelles</h5>
						<span class="font-semibold text-xl text-blueGray-700"
							>{monthlySales} article{monthlySales > 1 ? 's' : ''}</span
						>
					</div>
					<div class="relative w-auto pl-4 flex-initial">
						<div
							class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 md:shadow-lg rounded-full bg-violet-500"
						>
							<svg
								data-slot="icon"
								fill="none"
								stroke-width="1.5"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="w-full xl:w-4/12 lg:pl-4">
		<div
			class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 md:shadow-lg"
		>
			<div class="flex-auto p-4">
				<div class="flex flex-wrap">
					<div class="relative w-full pr-4 max-w-full flex-grow flex-1">
						<h5 class="text-blueGray-600 uppercase font-bold text-xs">Revenu mensuel</h5>
						<span class="font-semibold text-xl text-blueGray-700">{monthlyRevenu} Dt</span>
					</div>
					<div class="relative w-auto pl-4 flex-initial">
						<div
							class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 md:shadow-lg rounded-full bg-violet-500"
						>
							<svg
								data-slot="icon"
								fill="none"
								stroke-width="1.5"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>

	<div class="w-full xl:w-4/12 lg:pl-4">
		<div
			class="relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 md:shadow-lg"
		>
			<div class="flex-auto p-4">
				<div class="flex flex-wrap">
					<div class="relative w-full pr-4 max-w-full flex-grow flex-1">
						<h5 class="text-blueGray-600 uppercase font-bold text-xs">ventes totales</h5>
						<span class="font-semibold text-xl text-blueGray-700"
							>{totalSales} article{totalSales > 1 ? 's' : ''}</span
						>
					</div>
					<div class="relative w-auto pl-4 flex-initial">
						<div
							class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 md:shadow-lg rounded-full bg-blue-500"
						>
							<svg
								data-slot="icon"
								fill="none"
								stroke-width="1.5"
								stroke="currentColor"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								aria-hidden="true"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M13.5 21v-7.5a.75.75 0 0 1 .75-.75h3a.75.75 0 0 1 .75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349M3.75 21V9.349m0 0a3.001 3.001 0 0 0 3.75-.615A2.993 2.993 0 0 0 9.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 0 0 2.25 1.016c.896 0 1.7-.393 2.25-1.015a3.001 3.001 0 0 0 3.75.614m-16.5 0a3.004 3.004 0 0 1-.621-4.72l1.189-1.19A1.5 1.5 0 0 1 5.378 3h13.243a1.5 1.5 0 0 1 1.06.44l1.19 1.189a3 3 0 0 1-.621 4.72M6.75 18h3.75a.75.75 0 0 0 .75-.75V13.5a.75.75 0 0 0-.75-.75H6.75a.75.75 0 0 0-.75.75v3.75c0 .414.336.75.75.75Z"
								/>
							</svg>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
