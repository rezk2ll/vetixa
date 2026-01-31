<script lang="ts">
	import { formatDateSimple } from '$lib/utils/date';
	import type { expandedAnimal } from '$types';
	import { configuration } from '$store/configuration';

	export let doctor: string | undefined;
	export let animal: expandedAnimal;
</script>

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
			<div class="font-semibold border-2 border-black flex items-center justify-start w-full p-2">
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

		<!-- Animal details -->
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

		<!-- Breed -->
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

		<!-- ID -->
		<div class="flex gap-5">
			<div class="flex flex-col font-semibold w-1/2 text-xs">
				<span>N° d'identification électronique :</span>
				<span>رقاقة الإلكترونية عدد</span>
				<span class="font-normal">Microchip number</span>
			</div>
			<div class="font-semibold border-2 border-black flex items-center justify-start w-full p-2">
				{animal.identifier}
			</div>
		</div>

		<!-- Owner -->
		<div class="flex gap-5">
			<div class="flex flex-col font-semibold w-1/2 text-xs">
				<span>Appartenant à M :</span>
				<span>التابع الى السيد (ة)</span>
				<span class="font-normal">Belonging to M</span>
			</div>
			<div class="font-semibold border-2 border-black flex items-center justify-start w-full p-2">
				{animal.client.name}
			</div>
		</div>

		<!-- Location -->
		<div class="flex gap-5">
			<div class="flex flex-col font-semibold w-1/2 text-xs">
				<span>Demeurant à :</span>
				<span> المقيم ب </span>
				<span class="font-normal">Adress</span>
			</div>
			<div class="font-semibold border-2 border-black flex items-center justify-start w-full p-2">
				{animal.client.address}
			</div>
		</div>
	</div>

	<div class="flex flex-col text-xs">
		<span class="font-semibold"
			>A ètè examinè ce jour et reconnu indemne de tout signe clinique de maladie contagieuse ou de
			signe permettant de suspecter une maladie contagieuse (rage en particulier).</span
		>
		<span class="text-right">
			لقد تم فحصه اليوم و لم يقع العثور على علامات سريرية للأمراض المعدية (و بشكل خاص: داء الكلب)
		</span>
		<span
			>Am heutigen Tag von mir untersucht wurde und dass dabei keine klinischen Anzeichen einer
			ansteckenden Karankheitoder Anzeichen, die eineansteckende Krankheit (insbesondere tollwot)
			befûrchten lassen, festgestelt wurden.</span
		>
		<span>
			E stato esaminato e riconosciuto indenne da ogni segno clinico di malattia contagiosa e
			comunque da ogni segno che permetta di sospettare una malattia contagiosa (in particolare la
			rabbia).
		</span>
		<span>
			Ha sido examinado en este dia y reconocido libre cualquier clinico de enfermedad o contagiosa
			o de simptomas que permitan sospechar una enfermedad contagiosa (rabia en especial).
		</span>
		<span>
			Today has undergone medical examination and has been found free of any clinical symptom of
			contagious disease (in particular, rabies).
		</span>
		<span class="font-semibold"
			>En foi de quoi le présent certificat pour servir et valoir ce que de droit.</span
		>
		<span class="text-right">.وإثباتا لذلك يتم استخدام هذه الشهادة، حسب ما يقر عليه القانون </span>
		<span> Zu Urkund dessen soll diese Bestätigung rechtsgûltig diene. </span>
		<span>
			In fede di quanto sopra viene rilasciato il presente certificado valido a tutti gli effetti.
		</span>
		<span>
			En fe de lo cual se expide el presente certificado para que conse y surfa los efectos que
			proceda.
		</span>
		<span> Henceforward this certificate is established for any use provided for by the lax. </span>
	</div>

	<!-- Signature -->
	<div class="flex gap-5 pt-5">
		<div class="flex flex-col font-semibold text-base w-1/5">
			<span>Fait à :</span>
			<span>Done at</span>
			<span>حرر ب</span>
		</div>
		<div class="font-semibold border-2 border-black flex items-center justify-start w-1/5 p-2">
			TUNIS
		</div>
		<div class="font-semibold text-base flex items-center justify-center">le</div>
		<div class="font-semibold border-2 border-black flex items-center justify-start w-1/5 p-2">
			{formatDateSimple(new Date())}
		</div>
		<div class="flex flex-col font-semibold text-base w-2/5">
			<span>Cachet et signature du vétérinaire :</span>
			<span class="font-normal text-right"> ختم الطبيب البيطري </span>
		</div>
	</div>
</div>
