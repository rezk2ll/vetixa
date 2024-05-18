<script lang="ts">
	import Editor from '@tinymce/tinymce-svelte';
	import { superForm } from 'sveltekit-superforms';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import { currentVisit, updateVisitActionsFormStore } from '$store/visit';
	import { formatDateString } from '$utils/date';
	import { defaultEditorOptions } from '$utils/editor';

	const { form, enhance, submitting } = superForm($updateVisitActionsFormStore, {
		id: 'update-actions',
		taintedMessage: null,
		dataType: 'json',
		resetForm: false
	});

	$: $form.id = $currentVisit.id;
	$: $form.actions = $currentVisit.actions;
</script>

<section class="container px-4 mx-auto">
	<div class="flex flex-col mt-6">
		<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
				<div class="overflow-hidden border border-gray-200 md:rounded-lg">
					<form method="post" action="?/updateActions" use:enhance>
						<input type="hidden" name="id" value={$form.id} />
						<textarea class="hidden" name="actions" value={$form.actions} />
						<Editor
							bind:value={$form.actions}
							scriptSrc="/tinymce/tinymce.min.js"
							apiKey="no-api-key"
							conf={defaultEditorOptions}
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
