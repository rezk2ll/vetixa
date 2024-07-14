<script lang="ts">
	import EmailIcon from '$components/icons/EmailIcon.svelte';
	import FacebookIcon from '$components/icons/FacebookIcon.svelte';
	import InstagramIcon from '$components/icons/InstagramIcon.svelte';
	import LocationIcon from '$components/icons/LocationIcon.svelte';
	import PhoneIcon from '$components/icons/PhoneIcon.svelte';
	import { type ConfigurationResponse } from '$types';

	export let config: Partial<ConfigurationResponse>;
</script>

<div
	class="w-full flex flex-col justify-center items-center fixed bottom-0 space-y-1 text-blue-800"
>
	{#if config.phone}
		<div class="  flex flex-row gap-1">
			<PhoneIcon />
			<div>{config.phone}</div>
		</div>
	{/if}
	<div class="flex flex-row space-x-5">
		{#if config.adress}
			<div class="  flex flex-row gap-1">
				<LocationIcon />
				<div>{config.adress}</div>
			</div>
		{/if}
		{#if config.email}
			<div class="  flex flex-row gap-1">
				<EmailIcon />
				<div>{config.email}</div>
			</div>
		{/if}
	</div>
	<div class="flex flex-row space-x-5 items-center justify-center">
		{#if config.facebook}
			<div class="flex flex-row space-x-2">
				<FacebookIcon />
				<div>{config.facebook}</div>
			</div>
		{/if}
		{#if config.instagram}
			<div class="flex flex-row space-x-2">
				<InstagramIcon />
				<div>{config.instagram}</div>
			</div>
		{/if}
	</div>
</div>
