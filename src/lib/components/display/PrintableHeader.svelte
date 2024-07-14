<script lang="ts">
	import { type ConfigurationResponse } from '$types';

	export let config: Partial<ConfigurationResponse>;
</script>

<div>
	<img src={config.logo} alt="logo" height="52" width="52" />
	<h1 class="mt-2 text-lg md:text-xl font-semibold text-blue-600 uppercase">{config.name}</h1>
	<dd class="col-span-2 text-gray-500">{config.facility}</dd>
</div>
