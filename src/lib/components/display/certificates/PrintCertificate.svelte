<script lang="ts">
	import PrimaryButton from '$components/buttons/PrimaryButton.svelte';
	import HealthCertificate from '$lib/components/icons/HealthCertificate.svelte';

	interface Props {
		handler?: () => void;
	}

	let { handler = () => {} }: Props = $props();
</script>

<div class="flex flex-col gap-6">
	<PrimaryButton full {handler}>
		<div class="flex space-x-5 items-start justify-start">
			<HealthCertificate />
			<div class="text-base font-semibold grow">Certificat sanitaire international</div>
		</div>
	</PrimaryButton>
</div>
