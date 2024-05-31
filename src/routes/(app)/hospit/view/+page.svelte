<script lang="ts">
	import { cagesList } from '$store/hospit';
	import type { PageData } from './$types';

	export let data: PageData;

	$: ({ cages } = data);
  $: cagesList.set(cages);
</script>
