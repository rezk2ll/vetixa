<script lang="ts">
	import Details from '$components/Details.svelte';
	import AnimalIcon from '$components/display/animal/AnimalIcon.svelte';
	import UserCard from '$components/icons/UserCard.svelte';
	import { currentVisit } from '$lib/store/visit';
	import { formatDateString, formatDateStringShort } from '$utils/date';
	import { type entityDetailsList } from '$types';

	$: ({ animal } = $currentVisit);

	$: animalDetails = [
		{ name: 'Nom', value: animal.name },
		{ name: 'Espèce', value: animal.type },
		{ name: 'Sexe', value: animal.sex },
		{ name: 'Date de naissance', value: formatDateStringShort(animal.birthday) },
		{ name: 'Age', value: animal.birthday, isAge: true },
		{ name: 'Poids', value: animal.weight, prefix: 'Kg' },
		{ name: 'Couleur', value: animal.color },
		{ name: 'Race', value: animal.breed },
		...(animal.deceased ? [{ name: 'Décédé le', value: formatDateString(animal.deathdate) }] : [])
	] satisfies entityDetailsList;

	$: clientDetails = [
		{ name: 'Prénom', value: animal.client.firstname },
		{ name: 'Nom', value: animal.client.lastname },
		{ name: 'Téléphone', value: animal.client.tel ?? '-' },
		{ name: 'Email', value: animal.client.email ?? '-' },
		{ name: 'Adresse', value: animal.client.address ?? '-' },
		{ name: 'Note', value: animal.client.note ?? '-' }
	];
</script>

<div class="flex flex-col lg:flex-row px-2 lg:px-0 lg:space-x-5 w-full">
	<div class="flex flex-col space-y-5 w-full">
		<div
			class="flex justify-between px-5 py-4 border-b rounded-lg border-gray-100 bg-blueGray-200 w-full"
		>
			Animal

			<a
				href="/animals/{animal.id}"
				class="{animal.sex === 'male'
					? 'bg-blue-500'
					: 'bg-pink-400'} text-white font-semibold flex items-center justify-center gap-5 px-3 py-1 rounded-full"
			>
				<span> Consulter </span>
				<AnimalIcon type={animal.type} />
			</a>
		</div>
		<div class="px-4">
			<Details details={animalDetails} />
		</div>
	</div>
	<div class="flex flex-col space-y-5 w-full">
		<div
			class="flex justify-between px-5 py-4 border-b rounded-lg border-gray-100 bg-blueGray-200 w-full"
		>
			Client

			<a
				href="/clients/{animal.client.id}"
				class="bg-emerald-600 text-white font-semibold flex items-center justify-center gap-5 px-3 py-1 rounded-full"
			>
				<span> Consulter </span>
				<UserCard />
			</a>
		</div>
		<div class="px-4">
			<Details details={clientDetails} />
		</div>
	</div>
</div>
