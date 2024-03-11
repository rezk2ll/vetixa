<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;

	$: ({ visit, clinicalExams, medicalActs, surgicalActs, form, bill } = data);
</script>
