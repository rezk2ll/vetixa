<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import { addClientFormStore } from '$store/clients';
	import TextField from '$components/inputs/TextField.svelte';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import TextAreaField from '$components/inputs/TextAreaField.svelte';
	import User from '$components/icons/User.svelte';

	export let open = false;

	const { form, enhance, submitting, allErrors } = superForm($addClientFormStore, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				toast.success('Client ajouté avec succès', { important: true, position: 'bottom-center' });
				open = false;
			}
		},
		taintedMessage: null,
		dataType: 'json'
	});

	$: $allErrors.map((error) => {
		toast.error(error.messages.join('. '));
	});
</script>

<div>
	<div class="flex items-center justify-center">
		<User />
	</div>

	<div class="mt-2 text-center">
		<h3
			class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
			id="modal-title"
		>
			Nouveau client
		</h3>
		<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
			Veuillez remplir le formulaire ci-dessous avec des détails précis
		</p>
	</div>
</div>

<form use:enhance action="/clients/?/addClient" class="mt-4" method="POST">
	<TextField name="lastname" label="Nom" bind:value={$form.lastname} isInValid={false} />
	<TextField name="firstname" label="Prénom" bind:value={$form.firstname} isInValid={false} />
	<TextField name="tel" label="Numéro de téléphone" bind:value={$form.tel} isInValid={false} />
	<TextField
		name="email"
		label="Adresse Email"
		bind:value={$form.email}
		isInValid={false}
		required={false}
	/>
	<TextField
		name="address"
		label="Adresse"
		bind:value={$form.address}
		isInValid={false}
		required={false}
	/>
	<div class="mt-4">
		<TextAreaField name="note" label="Note" placeholder="" bind:value={$form.note} />
	</div>
	<div class="mt-4 sm:flex sm:items-center sm:-mx-2">
		<button
			type="button"
			on:click={() => (open = false)}
			class="w-full px-4 py-2 text-sm font-medium tracking-wide text-gray-700 capitalize transition-colors duration-300 transform border border-gray-200 rounded-md sm:w-1/2 sm:mx-2 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-40"
		>
			Annuler
		</button>
		<SubmitButton loading={$submitting} />
	</div>
</form>
