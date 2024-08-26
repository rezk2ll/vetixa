<script lang="ts">
	import { buildFileProxyUrl } from '$utils/file';
	import { type ConfigurationResponse } from '$types';

	export let config: ConfigurationResponse;

	$: src =
		config && config.logo
			? buildFileProxyUrl(config.collectionId, config.id, config.logo)
			: '/logo.svg';
</script>

<div>
	<img {src} alt="logo" height="52" width="52" />
	<h1 class="mt-1 text-lg md:text-xl font-semibold text-blue-600 uppercase">{config.name}</h1>
	<dd class="col-span-2 text-gray-500">{config.facility}</dd>
</div>
