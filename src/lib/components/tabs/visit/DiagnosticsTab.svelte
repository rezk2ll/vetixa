<script lang="ts">
	import Editor from '@tinymce/tinymce-svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import { currentVisit, updateVisitDiagnosticFormStore } from '$store/visit';
	import { formatDateString } from '$utils/date';

	const { form, enhance, submitting } = superForm($updateVisitDiagnosticFormStore, {
		id: 'update-diagnostic',
		taintedMessage: 'êtes-vous sûr de vouloir annuler vos modifications ?',
		dataType: 'json',
		resetForm: false
	});

	$: $form.id = $currentVisit.id;
	$: $form.observations = $currentVisit.observations;
</script>

<section class="container px-4 mx-auto">
	<div class="flex flex-col mt-6">
		<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div class="overflow-hidden border border-gray-200 md:rounded-lg">
					<form method="post" action="?/updateDiagnostic" use:enhance>
						<input type="hidden" name="id" value={$form.id} />
						<textarea class="hidden" name="observations" value={$form.observations} />
						<Editor
							bind:value={$form.observations}
							scriptSrc="/tinymce/tinymce.min.js"
							apiKey="no-api-key"
							conf={{ promotion: false, menubar: false, branding: false }}
							cssClass="border-none"
						/>
						<div class="flex items-center justify-between px-3 py-2 border-t bg-gray-200">
							<SubmitButton small loading={$submitting} />

							<div class="px-4 py-4 text-sm text-gray-500 dark:text-gray-300 whitespace-nowrap">
								Dernière mise à jour: {formatDateString($currentVisit.updated)}
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>
