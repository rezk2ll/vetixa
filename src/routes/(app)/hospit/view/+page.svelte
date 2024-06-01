<script lang="ts">
	import { cagesInfo } from '$store/hospit';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ cageList } = data);
	$: cagesInfo.set(cageList);
</script>
