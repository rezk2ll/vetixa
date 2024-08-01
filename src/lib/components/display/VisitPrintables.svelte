<script lang="ts">
	import { toWords } from '$lib/utils/bill';
	import { formatDateSimple } from '$lib/utils/date';
	import type { BillInformation, expandedAnimal, PrintableTab } from '$types';
	import PrintPdf, { Page } from 'svelte-printpdf';
	import PrintBill from './bill/PrintBill.svelte';
	import PrintPrescription from './prescription/PrintPrescription.svelte';
	import currency from 'currency.js';
	import PrintReport from './report/printReport.svelte';
	import { configuration } from '$store/configuration';
	import PrintableFooter from '$lib/components/display/PrintableFooter.svelte';
	import PrintableHeader from '$lib/components/display/PrintableHeader.svelte';
	import PrintableTabs from '$lib/components/display/PrintableTabs.svelte';
	import PrintCertificate from '$lib/components/display/certificates/PrintCertificate.svelte';

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
							<PrintableHeader config={$configuration} />

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
					<PrintableFooter config={$configuration} />
				</div>
			{:else if showPrescription}
				<div class="sm:w-11/12 lg:w-full">
					<div class="flex flex-col p-4 bg-white rounded-xl h-full">
						<div class="flex justify-between">
							<PrintableHeader config={$configuration} />
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
					<PrintableFooter config={$configuration} />
				</div>
			{:else if showReport}
				<div class="sm:w-11/12 lg:w-full">
					<div class="flex flex-col p-2 bg-white rounded-xl h-full">
						<div class="flex justify-between">
							<PrintableHeader config={$configuration} />

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
					<PrintableFooter config={$configuration} />
				</div>
			{:else if showCertificate}
				<div class="bg-white shadow-md rounded-lg p-6">
					<div class="text-center mb-8">
						<h1 class="text-2xl font-bold mb-2">
							CERTIFICAT SANITAIRE INTERNATIONAL POUR LE TRANSIT DES ANIMAUX DE COMPAGNIE
						</h1>
						<h2 class="text-xl mb-2">شهادة صحية دولية لعبور الحيوانات الأليفة</h2>
						<h2 class="text-xl mb-2">GESUNDHEITSZEUGNIS FÜR DEN TRANSIT VON MITFAHERNDEN TIEREN</h2>
						<h2 class="text-xl mb-2">
							CERTIFICADO SANITARIO PER IL TRANSITO DI ANIMALI DA COMPAGNIA
						</h2>
						<h2 class="text-xl mb-2">
							CERTIFICADO SANITARIO PARA EL TRANSITO DE LOS ANIMALES DE COMPANIA
						</h2>
						<h2 class="text-xl mb-2">HEALTH CERTIFICATE TO ALLOW DOMESTIC ANIMAL TO TRAVEL</h2>
					</div>
					<div class="mb-8">
						<p class="text-lg"><span class="font-bold">N°:</span> 1471 / 97689401N</p>
					</div>
					<div class="mb-8">
						<p class="text-lg">
							<span class="font-bold">Le soussigné Dr. Vétérinaire :</span> DR ISSAOUI SEIFEDDINE
						</p>
						<p class="text-lg">
							<span class="font-bold">الطبيب البيطري الموقع أدناه الدكتور:</span> DR ISSAOUI SEIFEDDINE
						</p>
						<p class="text-lg">
							<span class="font-bold">The undersigned Dr :</span> DR ISSAOUI SEIFEDDINE
						</p>
					</div>
					<div class="mb-8">
						<p class="text-lg">
							<span class="font-bold">Cabinet vétérinaire :</span> 17, Rue Sadok Thabet - Le Bardo
						</p>
						<p class="text-lg">
							<span class="font-bold">العيادة البيطرية :</span> 17, Rue Sadok Thabet - Le Bardo
						</p>
						<p class="text-lg">
							<span class="font-bold">Veterinary surgeon practising at :</span> 17, Rue Sadok Thabet
							- Le Bardo
						</p>
					</div>
					<div class="mb-8">
						<p class="text-lg"><span class="font-bold">Certifie que le :</span></p>
						<p class="text-lg"><span class="font-bold">التقرير التالي أن :</span></p>
						<p class="text-lg"><span class="font-bold">Certifies that the :</span></p>
					</div>
					<div class="mb-8">
						<p class="text-lg"><span class="font-bold">Nom :</span> Zizou</p>
						<p class="text-lg"><span class="font-bold">الاسم :</span> Zizou</p>
						<p class="text-lg"><span class="font-bold">Name :</span> Zizou</p>
					</div>
					<div class="mb-8">
						<p class="text-lg"><span class="font-bold">Sexe :</span> Mâle</p>
						<p class="text-lg"><span class="font-bold">الجنس :</span> Mâle</p>
						<p class="text-lg"><span class="font-bold">Sex :</span> Mâle</p>
					</div>
					<div class="mb-8">
						<p class="text-lg"><span class="font-bold">Date de naissance :</span> 28/04/2024</p>
						<p class="text-lg"><span class="font-bold">تاريخ الميلاد :</span> 28/04/2024</p>
						<p class="text-lg"><span class="font-bold">Date of Birth :</span> 28/04/2024</p>
					</div>
					<div class="mb-8">
						<p class="text-lg"><span class="font-bold">Race :</span> Pitbull</p>
						<p class="text-lg"><span class="font-bold">السلالة :</span> Pitbull</p>
						<p class="text-lg"><span class="font-bold">Breed :</span> Pitbull</p>
					</div>
					<div class="mb-8">
						<p class="text-lg"><span class="font-bold">Robe et signes particuliers :</span></p>
						<p class="text-lg"><span class="font-bold">اللون و العلامات المميزة :</span></p>
						<p class="text-lg">
							<span class="font-bold">Color and distinctive markings :</span>
						</p>
					</div>
					<div class="mb-8">
						<p class="text-lg">
							<span class="font-bold">N° d'identification électronique :</span>
						</p>
						<p class="text-lg"><span class="font-bold">رقاقة الإلكترونية عدد :</span></p>
						<p class="text-lg"><span class="font-bold">Microchip number :</span></p>
					</div>
					<div class="mb-8">
						<p class="text-lg"><span class="font-bold">Appartenant à M :</span> NAILA SASSI</p>
						<p class="text-lg">
							<span class="font-bold">التابع إلى السيد (ة) :</span> NAILA SASSI
						</p>
						<p class="text-lg"><span class="font-bold">Belonging to M :</span> NAILA SASSI</p>
					</div>
					<div class="mb-8">
						<p class="text-lg"><span class="font-bold">Demeurant à :</span></p>
						<p class="text-lg"><span class="font-bold">المقيم ب :</span></p>
						<p class="text-lg"><span class="font-bold">Address :</span></p>
					</div>
					<div class="mb-8">
						<p class="text-lg">
							A été examiné ce jour et reconnu indemne de tout signe clinique de maladie contagieuse
							ou de signe permettant de suspecter une maladie contagieuse (rage en particulier).
						</p>
						<p class="text-lg">
							لقد تم فحصه اليوم و لم يقع العثور على علامات سريرية للأمراض المعدية (وبشكل خاص : داء
							الكلب).
						</p>
						<p class="text-lg">
							Today has undergone medical examination and has been found free of any clinical
							symptom of contagious disease (in particular, rabies).
						</p>
					</div>
					<div class="mb-8">
						<p class="text-lg">Fait à TUNIS Le 30/07/2024</p>
						<p class="text-lg">حرر ب TUNIS Le 30/07/2024</p>
						<p class="text-lg">Done at TUNIS Le 30/07/2024</p>
					</div>
					<div class="text-center">
						<p class="text-lg">
							<span class="font-bold">Cachet et signature du vétérinaire :</span>
						</p>
						<p class="text-lg"><span class="font-bold">ختم وتوقيع :</span></p>
						<p class="text-lg">
							<span class="font-bold">Veterinary Stamp and Signature :</span>
						</p>
					</div>
				</div>
			{/if}
		</Page>
	</PrintPdf>
</div>
