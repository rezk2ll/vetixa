<script lang="ts">
	import { enhance } from '$app/forms';
	import DateField from '$lib/components/inputs/DateField.svelte';
	import DateTimeField from '$lib/components/inputs/DateTimeField.svelte';
	import SelectField from '$lib/components/inputs/SelectField.svelte';
	import SubmitButton from '$lib/components/inputs/SubmitButton.svelte';
	import TextAreaField from '$lib/components/inputs/TextAreaField.svelte';
	import TextField from '$lib/components/inputs/TextField.svelte';
</script>

<form use:enhance action="" method="POST" class="flex flex-col space-y-6">
	<DateField
		name="date"
		value={Date.now().toString()}
		label="Date"
		placeholder={Date.now().toString()}
	/>
	<DateTimeField
		name="time"
		label="T°/ Heure"
		value={new Date().toLocaleTimeString()}
		placeholder={Date.now().toString()}
	/>
	<TextField
		placeholder="alimentation"
		name="alimentation"
		label="Alimentation"
		isInValid={false}
		value=""
	/>
	<TextField
		placeholder="Abreuvement"
		name="abreuvement"
		label="Abreuvement"
		isInValid={false}
		value=""
	/>
	<SelectField
		options={['normale', 'hemorragique', 'foncée', "pas d'urine"]}
		label="Urines"
		name="urines"
		value=""
	/>
	<SelectField
		options={[
			'normale',
			'diarrhée jaune',
			'diarrhée verte',
			'diarrhée noire',
			'diarrhée décolorée'
		]}
		label="Vaumissement"
		name="vaumissement"
		value=""
	/>
	<SelectField
		label="Bilan effectué"
		options={[
			'NFS',
			'24P',
			'10P',
			'Echographie',
			'Radio',
			'Hormono',
			'Rapid Parvo',
			'Rapid Thyphus'
		]}
		value=""
		name="bilan"
	/>
	<TextAreaField name="traitement" label="Traitement" placeholder="Traitement" value="" />
	<SelectField
		label="Anti Parasitaire"
		options={[
			'FRONTLINE',
			'BROADLINE',
			'NEXGARD',
			'FIBROSPRAY',
			'Déjà Traité',
			'Pas Besoin',
			'Non Fait'
		]}
		name="anti"
		value=""
	/>
	<SelectField
		options={[
			'Détériorisé',
			'Moyen',
			'Etat de choc',
			'Bon',
			'Amélioré',
			'Moyen +/-',
			'Mauvais',
			'Stable'
		]}
		name="state"
		label="Etat physiologique"
		value=""
	/>
	<SubmitButton>Ajouter</SubmitButton>
</form>
