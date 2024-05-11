<script lang="ts">
	import Cat from '$components/icons/Cat.svelte';
	import Dog from '$components/icons/Dog.svelte';
	import Bird from '$components/icons/Bird.svelte';
	import Rabbit from '$components/icons/Rabbit.svelte';
	import Hamster from '$components/icons/Hamster.svelte';
	import Snake from '$components/icons/Snake.svelte';
	import Fish from '$components/icons/Fish.svelte';
	import Frog from '$components/icons/Frog.svelte';
	import Mouse from '$components/icons/Mouse.svelte';
	import Cow from '$components/icons/Cow.svelte';
	import Crab from '$components/icons/Crab.svelte';
	import Horse from '$components/icons/Horse.svelte';
	import Sheep from '$components/icons/Sheep.svelte';
	import Fox from '$components/icons/Fox.svelte'; 
	import Insect from '$components/icons/Insect.svelte';
	import Dinosaur from '$components/icons/Dinosaur.svelte';
	import Goat from '$components/icons/Goat.svelte';
	import Monkey from '$components/icons/Monkey.svelte';
	import Pig from '$components/icons/Pig.svelte';

	export let type: string;
</script>

<div aria-label={type} title={type}>
	{#if type === 'chien'}
		<Dog />
	{:else if type === 'chat'}
		<Cat />
	{:else if type === 'oiseau'}
		<Bird />
	{:else if type === 'lapin'}
		<Rabbit />
	{:else if type === 'vache'}
		<Cow />
	{:else if type === 'cheval'}
		<Horse />
	{:else if type === 'mouton'}
		<Sheep />
	{:else if type === 'chèvre'}
		<Goat />
	{:else if type === 'singe'}
		<Monkey />
	{:else if type === 'rongeur'}
		<Hamster />
	{:else if type === 'reptile'}
		<Snake />
	{:else if type === 'poisson'}
		<Fish />
	{:else if type === 'amphibien'}
		<Frog />
	{:else if type === 'petit mammifère'}
		<Mouse />
	{:else if type === 'animal de ferme'}
		<Pig />
	{:else if type === 'animal de compagnie exotique'}
		<Crab />
	{:else if type === 'animal sauvage'}
		<Fox />
	{:else if type === 'insecte'}
		<Insect />
	{:else}
		<Dinosaur />
	{/if}
</div>
