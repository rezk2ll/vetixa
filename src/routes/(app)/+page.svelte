<script lang="ts">
	import QuickAccess from '$components/display/QuickAccess.svelte';
	import Calendar from '$lib/components/icons/Calendar.svelte';
	import Store from '$lib/components/icons/Store.svelte';
	import User from '$lib/components/icons/User.svelte';
</script>

<div class="flex xl:space-x-4 w-full px-0 md:px-10 pt-2 xl:pt-16 items-center justify-center">
	<div class="shrink hidden md:block">
		<img src="/banner.png" alt="banner" />
	</div>
	<div class="flex flex-col items-center justify-center h-auto pt-14 xl:pt-1">
		<QuickAccess
			title="Nouveau client"
			description="Ajoutez de nouveaux clients en collectant rapidement les informations nécessaires"
			color="pink"
			href="/clients?shortcut=yes"
			action="Ajouter"
		>
			<User />
		</QuickAccess>
		<QuickAccess
			title="Gestion de stock"
			description="Contrôlez totalement votre stock de clinique vétérinaire"
			color="blue"
			href="/store"
			action="Gérer"
		>
			<Store />
		</QuickAccess>
		<QuickAccess
			title="Agenda"
			description="Organisez votre emploi du temps avec l'agenda intégré, 
			simplifiant la planification des rendez-vous"
			color="gray"
			href="/agenda"
			action="Consulter"
		>
			<Calendar />
		</QuickAccess>
	</div>
</div>
