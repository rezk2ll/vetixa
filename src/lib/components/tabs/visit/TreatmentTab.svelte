<script lang="ts">
	import Editor from '@tinymce/tinymce-svelte';
	import { superForm } from 'sveltekit-superforms';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import { currentVisit, updateVisitTreatmentFormStore } from '$store/visit';
	import { formatDateString } from '$utils/date';
	import { defaultEditorOptions } from '$utils/editor';

	const { form, enhance, submitting } = superForm($updateVisitTreatmentFormStore, {
		id: 'update-treatment',
		taintedMessage: null,
		dataType: 'json',
		resetForm: false
	});

	$: $form.id = $currentVisit.id;
	$: $form.treatment = $currentVisit.treatment;
</script>

<section class="container px-4">
	<div class="flex flex-col mt-6">
		<div class="-mx-4 -my-2 overflow-x-auto lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div class="overflow-hidden border border-gray-200 md:rounded-lg">
					<form method="post" action="?/updateTreatment" use:enhance class="w-full">
						<input type="hidden" name="id" value={$form.id} />
						<textarea class="hidden" name="treatment" value={$form.treatment} />
						<Editor
							bind:value={$form.treatment}
							scriptSrc="/tinymce/tinymce.min.js"
							apiKey="no-api-key"
							conf={defaultEditorOptions}
							cssClass="border-none"
						/>
						<div class="flex items-center justify-between px-3 py-2 border-t bg-gray-200">
							<SubmitButton small loading={$submitting} />
							<div
								class="flex flex-col gap-1 lg:flex-row px-4 py-4 text-sm text-gray-500 whitespace-nowrap"
							>
								<div>Dernière mise à jour:</div>
								<div>
									{formatDateString($currentVisit.updated)}
								</div>
							</div>
						</div>
					</form>
				</div>
			</div>
		</div>
	</div>
</section>
