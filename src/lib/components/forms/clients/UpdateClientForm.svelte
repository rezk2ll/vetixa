<script lang="ts">
  import { superForm } from 'sveltekit-superforms/client';
	import { toast } from 'svelte-sonner';
	import type { IClient } from '$types';
	import { updateClientFormStore } from '$store/clients';
  import TextField from '$components/inputs/TextField.svelte';
	import SubmitButton from '$components/buttons/SubmitButton.svelte';
	import TextAreaField from '$components/inputs/TextAreaField.svelte';

	export let open = false;
	export let item: IClient;

	const { form, enhance, submitting, allErrors } = superForm($updateClientFormStore, {
		onResult: ({ result }) => {
			if (result.type === 'success') {
				open = false;
			}
		},
		dataType: 'json',
		taintedMessage: null
	});

	$: {
		const { id, firstname, lastname, address, email, tel, note } = item;

		form.set({
			id,
			firstname,
			lastname,
			address,
			tel,
			email,
      note
		});
	}

	$: $allErrors.length &&
		toast.error($allErrors.map((error) => error.messages.join('. ')).join('. '));
</script>

<div>
	<div class="flex items-center justify-center">
		<svg
			fill="none"
			class="w-8 h-8 text-gray-700 dark:text-gray-300"
			stroke="currentColor"
			stroke-width="1.5"
			viewBox="0 0 24 24"
			xmlns="http://www.w3.org/2000/svg"
			aria-hidden="true"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
			/>
		</svg>
	</div>

	<div class="mt-2 text-center">
		<h3
			class="text-lg font-medium leading-6 text-gray-800 capitalize dark:text-white"
			id="modal-title"
		>
			mettre à jour {item.name}
		</h3>
		<p class="mt-2 text-sm text-gray-500 dark:text-gray-400">
			Veuillez remplir le formulaire ci-dessous avec des détails précis
		</p>
	</div>
</div>

<form use:enhance action="/clients/?/updateClient" class="mt-4" method="POST">
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
