<script lang="ts">
	import { enhance } from '$app/forms';
	import TextAreaField from '$lib/components/inputs/TextAreaField.svelte';
	import SubmitButton from '$lib/components/inputs/SubmitButton.svelte';
	import DateField from '$lib/components/inputs/DateField.svelte';
	import SelectField from '$lib/components/inputs/SelectField.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
	import PhoneField from '$lib/components/inputs/PhoneField.svelte';
	import NumberField from '$lib/components/inputs/NumberField.svelte';
</script>

<form use:enhance action="/" method="POST" class="flex flex-col space-y-6">
	<div class="flex space-x-5 flex-row">
		<TextField label="Nom propriétaire" placeholder="nom" value="" name="name" isInValid={false} />
		<PhoneField
			label="Numéro mobile"
			placeholder="+216xxxxxxxx"
			value=""
			name="phone"
			isInValid={false}
		/>
	</div>
	<TextField
		label="Nom d'animale"
		placeholder="Nom d'animale"
		value=""
		name="animal_name"
		isInValid={false}
	/>
	<div class="flex space-x-5 flex-row w-full">
		<SelectField
			options={['chat', 'chien']}
			label="Animal"
			name="animal_type"
			value=""
			isInValid={false}
		/>
		<SelectField name="sex" options={['male', 'female']} label="sexe" value="" isInValid={false} />
	</div>
	<div class="flex space-x-5 flex-row w-full">
		<NumberField label="age" placeholder="age" value="" name="age" isInValid={false} />
		<NumberField label="Poids" placeholder="Poids" value="" name="weight" isInValid={false} />
	</div>
	<TextAreaField
		label="Motif de l'hospitalisation "
		placeholder="Motif de l'hospitalisation "
		value=""
		name="motif"
		isInValid={false}
	/>
	<div class="flex space-x-5 flex-row w-full">
		<DateField
			label="Date d'admission"
			name="emission"
			placeholder="Date d'admission"
			value=""
			isInValid={false}
		/>
		<DateField
			label="Date de sortie prévue"
			placeholder="Date de sortie"
			name="sortie"
			value=""
			isInValid={false}
		/>
	</div>
	<SelectField
		label="Pronostic"
		options={['Bon', 'réservé', 'sombre']}
		value=""
		name="pronostic"
		isInValid={false}
	/>

	<SubmitButton>Créer</SubmitButton>
</form>
