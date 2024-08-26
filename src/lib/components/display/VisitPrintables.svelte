<script lang="ts">
	import { toWords } from '$lib/utils/bill';
	import { formatDateSimple } from '$lib/utils/date';
	import type { BillInformation, expandedAnimal, PrintableTab } from '$types';
	import PrintPdf, { Page } from 'svelte-printpdf';
	import PrintBill from '$components/display/bill/PrintBill.svelte';
	import PrintPrescription from '$components/display/prescription/PrintPrescription.svelte';
	import currency from 'currency.js';
	import PrintReport from '$components/display/report/printReport.svelte';
	import { configuration } from '$store/configuration';
	import PrintableFooter from '$components/display/PrintableFooter.svelte';
	import PrintableHeader from '$components/display/PrintableHeader.svelte';
	import PrintableTabs from '$components/display/PrintableTabs.svelte';
	import PrintCertificate from '$components/display/certificates/PrintCertificate.svelte';

	export let bill: BillInformation | undefined;
	export let doctor: string | undefined;
	export let treatment: string | undefined;
	export let report: string | undefined;
	export let actions: string | undefined;
	export let animal: expandedAnimal;
	export let acts: string[] | undefined;
	export let tab: PrintableTab = 'documents';

	let print = false;
	let showBill = false;
	let showPrescription = false;
	let showReport = false;
	let showCertificate = false;

	const handlePrintBill = () => {
		showPrescription = false;
		showReport = false;
		showBill = true;

		setTimeout(() => {
			print = true;
		}, 250);
	};

	const handlePrintPrescription = () => {
		showBill = false;
		showReport = false;
		showPrescription = true;

		setTimeout(() => {
			print = true;
		}, 250);
	};

	const handlePrintReport = () => {
		showBill = false;
		showPrescription = false;
		showReport = true;

		setTimeout(() => {
			print = true;
		}, 250);
	};

	const handlePrintCertificate = () => {
		showBill = false;
		showPrescription = false;
		showReport = false;
		showCertificate = true;

		setTimeout(() => {
			print = true;
		}, 250);
	};

	$: total = bill
		? bill.items.reduce((acc, curr) => {
				const price = currency(curr.total).multiply(1 - curr.discount / 100);

				return currency(acc).add(price).value;
		  }, 0)
		: 0;
</script>

<div
	class="flex flex-col gap-2 w-full p-1 pt-10 lg:p-8 lg:pb-3 bg-white shadow border-gray-200 xl:rounded px-2"
>
	<PrintableTabs bind:tab />
	{#if tab === 'documents'}
		<PrintBill {bill} handler={handlePrintBill} />
		<PrintPrescription {treatment} handler={handlePrintPrescription} />
		<PrintReport {report} handler={handlePrintReport} />
	{:else}
		<PrintCertificate handler={handlePrintCertificate} />
	{/if}
</div>

<div class="screen:hidden px-0 w-full">
	<PrintPdf bind:print>
		<Page>
			{#if showBill}
				<div class="w-full">
					<div class="flex flex-col p-2 bg-white rounded-xl h-full">
						<div class="flex justify-between">
							{#if $configuration}
								<PrintableHeader config={$configuration} />
							{/if}

							<div class="text-end">
								{#if doctor && doctor.length}
									<span class="text-2xl md:text-3xl block text-gray-500">Dr {doctor}</span>
								{/if}
								<h2 class="text-2xl md:text-3xl font-semibold text-gray-800 underline">
									Note d'honoraires
								</h2>
								<span class="text-2xl md:text-3xl block text-gray-500"># {bill?.id}</span>
							</div>
						</div>
						<!-- End Grid -->

						<!-- Grid -->
						<div class="mt-8 grid sm:grid-cols-2 gap-3">
							<div>
								<div class="flex flex-row space-x-1">
									<h3 class="text-md font-semibold text-gray-800">propriétaire :</h3>
									<h3 class="text-md text-gray-500">{bill?.client}</h3>
								</div>
								<div class="flex flex-row space-x-1">
									<h3 class="text-md font-semibold text-gray-800">Animal :</h3>
									<h3 class="text-md text-gray-500">{bill?.animal}</h3>
								</div>
							</div>
							<!-- Col -->

							<div class="sm:text-end space-y-2">
								<!-- Grid -->
								<div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
									<dl class="grid sm:grid-cols-5 gap-x-3">
										<dt class="col-span-3 font-semibold text-gray-800">Date:</dt>
										<dd class="col-span-2 text-gray-500">{formatDateSimple(new Date())}</dd>
									</dl>
								</div>
							</div>
						</div>
						<div class="mt-6">
							<div class="border border-gray-200 p-4 px-1 rounded-lg space-y-4">
								<div class="hidden sm:grid sm:grid-cols-6">
									<div class="sm:col-span-2 text-xs font-medium text-gray-500 uppercase">
										Article
									</div>
									<div class="text-center text-xs font-medium text-gray-500 uppercase">PU</div>
									<div class="text-center text-xs font-medium text-gray-500 uppercase">Qte</div>
									<div class="text-center text-xs font-medium text-gray-500 uppercase">Rem</div>
									<div class="text-end text-xs font-medium text-gray-500 uppercase">
										Montant TTC
									</div>
								</div>
								{#if bill}
									<div class="hidden sm:block border-b border-gray-200" />
									{#each bill.items as item}
										<div class="grid grid-cols-4 sm:grid-cols-6 gap-2">
											<div class="col-span-full sm:col-span-2">
												<p class="font-medium text-gray-800">{item.name}</p>
											</div>
											<div>
												<p class="text-gray-800 text-center">{item.price} DT</p>
											</div>
											<div>
												<p class="text-gray-800 text-center">{item.quantity}</p>
											</div>
											<div>
												<p class="text-gray-800 text-center">
													{item.discount > 0 ? `${item.discount}%` : ''}
												</p>
											</div>
											<div>
												<p class="sm:text-end text-gray-800">
													{currency(item.total).multiply(1 - item.discount / 100).value} DT
												</p>
											</div>
										</div>

										<div class="sm:hidden border-b border-gray-200" />
									{/each}
								{/if}
							</div>
						</div>
						<!-- End Table -->

						<!-- Flex -->
						<div class="mt-8 flex sm:justify-end">
							<div class="w-full max-w-2xl sm:text-end space-y-2">
								<!-- Grid -->
								<div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
									<dl class="grid sm:grid-cols-5 gap-x-3">
										<dt
											class="col-span-3 font-semibold text-base text-gray-800 underline uppercase"
										>
											Montant note d'honoraires :
										</dt>
										<dd class="col-span-2 text-gray-800">{total} DT</dd>
									</dl>
								</div>
							</div>
						</div>
						<div class="py-5">
							<span class="font-semibold text-base text-gray-800">
								Arrêtée la présente note à la somme de: {toWords
									.convert(total, {
										currency: true
									})
									.toLocaleLowerCase()}
							</span>
						</div>
						<!-- End Flex -->
					</div>
					{#if $configuration}
						<PrintableFooter config={$configuration} />
					{/if}
				</div>
			{:else if showPrescription}
				<div class="sm:w-11/12 lg:w-full">
					<div class="flex flex-col p-4 bg-white rounded-xl h-full">
						<div class="flex justify-between">
							{#if $configuration}
								<PrintableHeader config={$configuration} />
							{/if}
							<h2 class="text-2xl md:text-3xl font-semibold text-gray-800 underline">Ordonnance</h2>
							<div class="text-lg text-gray-500">
								{#if doctor && doctor.length}
									Dr {doctor}
								{/if}
							</div>
						</div>

						<div class="mt-8 grid sm:grid-cols-2 gap-3">
							<div>
								<div class="flex flex-row space-x-1">
									<h3 class="text-md font-semibold text-gray-800 text-lg">
										Pour: {animal.type}
										{animal.sex}
										{animal.name}
									</h3>
								</div>
							</div>
							<!-- Col -->

							<div class="sm:text-end space-y-2">
								<!-- Grid -->
								<div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
									<dl class="grid sm:grid-cols-5 gap-x-3">
										<dt class="col-span-3 font-semibold text-gray-800 text-lg">Date:</dt>
										<dd class="col-span-2 text-gray-500 text-lg">{formatDateSimple(new Date())}</dd>
									</dl>
								</div>
							</div>
						</div>
						<div class="mt-6 text-xl">
							{@html treatment}
						</div>
					</div>
					{#if $configuration}
						<PrintableFooter config={$configuration} />
					{/if}
				</div>
			{:else if showReport}
				<div class="sm:w-11/12 lg:w-full">
					<div class="flex flex-col p-2 bg-white rounded-xl h-full">
						<div class="flex justify-between">
							{#if $configuration}
								<PrintableHeader config={$configuration} />
							{/if}

							<h2
								class="text-2xl md:text-3xl font-semibold text-gray-800 underline first-letter:capitalize text-center"
							>
								compte rendu
							</h2>
							<div class="text-lg text-gray-500">
								{#if doctor && doctor.length}
									Dr {doctor}
								{/if}
							</div>
						</div>

						<div class="mt-1 grid sm:grid-cols-2 gap-2">
							<div>
								<div class="flex flex-row space-x-1">
									<h3 class="text-md font-semibold text-gray-800 text-lg">
										{animal.type}
										{animal.sex}
										{animal.name}
									</h3>
								</div>
							</div>
							<!-- Col -->

							<div class="sm:text-end space-y-2">
								<!-- Grid -->
								<div class="grid grid-cols-2 sm:grid-cols-1 gap-3 sm:gap-2">
									<dl class="grid sm:grid-cols-5 gap-x-3">
										<dt class="col-span-3 font-semibold text-gray-800 text-lg">Date:</dt>
										<dd class="col-span-2 text-gray-500 text-lg">{formatDateSimple(new Date())}</dd>
									</dl>
								</div>
							</div>
						</div>
						<div class="mt-2">
							<hr />
							{@html report}
							{#if actions}
								<hr />
								<div class="pt-2">
									<div class="text-center font-semibold text-lg pt-1">Conduites à tenir</div>
									{@html actions}
								</div>
							{/if}
							{#if acts && acts.length}
								<div class="pt-2">
									<hr />
									<div class="py-2 text-center font-semibold text-lg">Actes</div>
									<div class="flex felx-row gap-1">
										{#each acts as act, index}
											<div>{act} {index === acts.length - 1 ? '' : '-'}</div>
										{/each}
									</div>
								</div>
							{/if}
						</div>
					</div>
					{#if $configuration}
						<PrintableFooter config={$configuration} />
					{/if}
				</div>
			{:else if showCertificate}
				<div class="w-full font-timesnewroman flex flex-col gap-1 p-2 border border-black">
					<div class="flex flex-col items-center jusitfy-center text-center font-bold">
						<h1 class="font-bold text-[14px]">
							CERTIFICAT SANITAIRE INTERNATIONAL POUR LE TRANSIT DES ANIMAUX DE COMPAGNIE
						</h1>
						<h1 class="text-base">شهادة صحية دولية لعبور الحيوانات الأليفة</h1>
						<div class="flex flex-col text-xs">
							<span>GESUNDHEITSZEUGNIS FÜR DENTRANSIT VON MITFAHERNDEN TIEREN</span>
							<span>CERTIFICADO SANITARIO PER IL TRANSITO DI ANIMALI DA COMPAGNIA</span>
							<span>CERTIFICADO SANITARIO PARA EL TRANSITO DE LOS ANIMALES DE COMPANIA</span>
							<span>HEALTH CERTIFICATE TO ALLOW DOMESTIC ANIMAL TO TRAVEL</span>
						</div>
					</div>

					<div class="flex flex-col gap-1 pt-10">
						<div class="flex gap-2">
							<div class="flex flex-col font-semibold w-1/2 text-xs">
								<span>Le soussigné Dr. Vétéinaire :</span>
								<span>الطبيب البيطري الموقع أدناه الدكتور</span>
								<span class="font-normal">The under signed Dr</span>
							</div>
							<div
								class="font-semibold border-2 border-black flex items-center justify-start w-full p-2 uppercase"
							>
								DR {doctor}
							</div>
						</div>
						<div class="flex gap-2">
							<div class="flex flex-col font-semibold w-1/2 text-xs">
								<span>Cabinet vétérinaire :</span>
								<span>العيادة البيطرية</span>
								<span class="font-normal">Veterinary surgeon practising at</span>
							</div>
							<div
								class="font-semibold border-2 border-black flex items-center justify-start w-full p-2"
							>
								{$configuration ? $configuration.adress ?? '' : ''}
							</div>
						</div>
						<div class="flex gap-5">
							<div class="flex flex-col font-semibold w-1/3 text-xs">
								<span>Certifie que le :</span>
								<span>يشهد التقرير التالي أن </span>
							</div>
							<div
								class="font-semibold border-2 border-black flex items-center justify-start w-1/3 p-2 uppercase"
							>
								{animal.type}
							</div>
							<div class="flex flex-col font-semibold w-1/3 text-xs">
								<span>dont le signalement suit :</span>
								<span>كما هو موضح أدناه </span>
							</div>
						</div>
						<!-- animal -->
						<div class="flex gap-5">
							<div class="flex flex-col font-semibold w-1/6 text-xs">
								<span>Nom :</span>
								<span>الاسم</span>
								<span>Name</span>
							</div>
							<div
								class="font-semibold text-lg border-2 border-black flex items-center justify-start w-1/6 px-5"
							>
								{animal.name}
							</div>
							<div class="flex flex-col font-semibold w-1/6 text-xs">
								<span>Sexe :</span>
								<span>الجنس</span>
								<span>Sex</span>
							</div>
							<div
								class="font-semibold text-lg border-2 border-black flex items-center justify-start w-1/6 px-5 capitalize"
							>
								{animal.sex}
							</div>
							<div class="flex flex-col font-semibold w-1/6 text-xs">
								<span>Date de naissance :</span>
								<span>تاريخ الميلاد</span>
							</div>
							<div
								class="font-semibold text-lg border-2 border-black flex items-center justify-start w-1/6 px-5"
							>
								{formatDateSimple(new Date(animal.birthday))}
							</div>
						</div>
						<!--race -->
						<div class="flex gap-5">
							<div class="flex flex-col font-semibold min-w-24 text-xs">
								<span>Race :</span>
								<span>السلالة</span>
								<span>Breed</span>
							</div>
							<div
								class="font-semibold border-2 text-sm border-black flex items-center justify-start w-1/4 px-5"
							>
								{animal.breed}
							</div>
							<div class="flex flex-col font-semibold w-1/4 text-xs">
								<span>Robe et signes particuliers :</span>
								<span>اللون و العلامات المميزة</span>
							</div>
							<div
								class="font-semibold border-2 text-sm border-black flex items-center justify-start w-1/4 p-2"
							>
								{animal.color}
							</div>
						</div>
						<!-- id -->
						<div class="flex gap-5">
							<div class="flex flex-col font-semibold w-1/2 text-xs">
								<span>N° d'identification électronique :</span>
								<span>رقاقة الإلكترونية عدد</span>
								<span class="font-normal">Microchip number</span>
							</div>
							<div
								class="font-semibold border-2 border-black flex items-center justify-start w-full p-2"
							>
								{animal.identifier}
							</div>
						</div>
						<!-- owner -->
						<div class="flex gap-5">
							<div class="flex flex-col font-semibold w-1/2 text-xs">
								<span>Appartenant à M :</span>
								<span>التابع الى السيد (ة)</span>
								<span class="font-normal">Belonging to M</span>
							</div>
							<div
								class="font-semibold border-2 border-black flex items-center justify-start w-full p-2"
							>
								{animal.client.name}
							</div>
						</div>
						<!-- location -->
						<div class="flex gap-5">
							<div class="flex flex-col font-semibold w-1/2 text-xs">
								<span>Demeurant à :</span>
								<span> المقيم ب </span>
								<span class="font-normal">Adress</span>
							</div>
							<div
								class="font-semibold border-2 border-black flex items-center justify-start w-full p-2"
							>
								{animal.client.address}
							</div>
						</div>
					</div>
					<div class="flex flex-col text-xs">
						<span class="font-semibold"
							>A ètè examinè ce jour et reconnu indemne de tout signe clinique de maladie
							contagieuse ou de signe permettant de suspecter une maladie contagieuse (rage en
							particulier).</span
						>
						<span class="text-right">
							لقد تم فحصه اليوم و لم يقع العثور على علامات سريرية للأمراض المعدية (و بشكل خاص: داء
							الكلب)
						</span>
						<span
							>Am heutigen Tag von mir untersucht wurde und dass dabei keine klinischen Anzeichen
							einer ansteckenden Karankheitoder Anzeichen, die eineansteckende Krankheit
							(insbesondere tollwot) befûrchten lassen, festgestelt wurden.</span
						>
						<span>
							E stato esaminato e riconosciuto indenne da ogni segno clinico di malattia contagiosa
							e comunque da ogni segno che permetta di sospettare una malattia contagiosa (in
							particolare la rabbia).
						</span>
						<span>
							Ha sido examinado en este dia y reconocido libre cualquier clinico de enfermedad o
							contagiosa o de simptomas que permitan sospechar una enfermedad contagiosa (rabia en
							especial).
						</span>
						<span>
							Today has undergone medical examination and has been found free of any clinical
							symptom of contagious disease (in particular, rabies).
						</span>
						<span class="font-semibold"
							>En foi de quoi le présent certificat pour servir et valoir ce que de droit.</span
						>
						<span class="text-right"
							>.وإثباتا لذلك يتم استخدام هذه الشهادة، حسب ما يقر عليه القانون
						</span>
						<span> Zu Urkund dessen soll diese Bestätigung rechtsgûltig diene. </span>
						<span>
							In fede di quanto sopra viene rilasciato il presente certificado valido a tutti gli
							effetti.
						</span>
						<span>
							En fe de lo cual se expide el presente certificado para que conse y surfa los efectos
							que proceda.
						</span>
						<span>
							Henceforward this certificate is established for any use provided for by the lax.
						</span>
					</div>
					<!-- signature -->
					<div class="flex gap-5 pt-5">
						<div class="flex flex-col font-semibold text-base w-1/5">
							<span>Fait à :</span>
							<span>Done at</span>
							<span>حرر ب</span>
						</div>
						<div
							class="font-semibold border-2 border-black flex items-center justify-start w-1/5 p-2"
						>
							TUNIS
						</div>
						<div class="font-semibold text-base flex items-center justify-center">le</div>
						<div
							class="font-semibold border-2 border-black flex items-center justify-start w-1/5 p-2"
						>
							{formatDateSimple(new Date())}
						</div>
						<div class="flex flex-col font-semibold text-base w-2/5">
							<span>Cachet et signature du vétérinaire :</span>
							<span class="font-normal text-right"> ختم الطبيب البيطري </span>
						</div>
					</div>
				</div>
			{/if}
		</Page>
	</PrintPdf>
</div>
