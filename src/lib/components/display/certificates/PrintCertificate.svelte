<script lang="ts">
	import PrimaryButton from '$components/buttons/PrimaryButton.svelte';
	import HealthCertificate from '$lib/components/icons/HealthCertificate.svelte';

	export let handler: () => void = () => {};
</script>

<div class="flex flex-col gap-6">
	<PrimaryButton full {handler}>
		<div class="flex space-x-5 items-start justify-start">
			<HealthCertificate />
			<div class="text-base font-semibold grow">Certificat sanitaire international</div>
		</div>
	</PrimaryButton>
</div>
