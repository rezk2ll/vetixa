<script lang="ts">
	import ArrowDown from '$lib/components/ArrowDown.svelte';
	import AgendaCard from '$lib/components/landing/AgendaCard.svelte';
	import AnimalsClientsCard from '$lib/components/landing/AnimalsClientsCard.svelte';
	import CaisseCard from '$lib/components/landing/CaisseCard.svelte';
	import Contact from '$lib/components/landing/Contact.svelte';
	import Footer from '$lib/components/landing/Footer.svelte';
	import HospitCard from '$lib/components/landing/HospitCard.svelte';
	import StockCard from '$lib/components/landing/StockCard.svelte';
	import Testimonials from '$lib/components/landing/Testimonials.svelte';
	import VisitsCard from '$lib/components/landing/VisitsCard.svelte';
	import { onMount } from 'svelte';
	import Header from '$lib/components/Header.svelte';
	import Hero from '$lib/components/Hero.svelte';

	onMount(() => {
		if (document.getElementById('nav-mobile-btn')) {
			document.getElementById('nav-mobile-btn')?.addEventListener('click', function () {
				if (this.classList.contains('close')) {
					document.getElementById('nav')?.classList.add('hidden');
					this.classList.remove('close');
				} else {
					document.getElementById('nav')?.classList.remove('hidden');
					this.classList.add('close');
				}
			});
		}
	});
</script>

<div class="overflow-x-hidden !scroll-smooth antialiased">
	<Header />
	<Hero />
	<div id="features" class="relative w-full px-1 py-10 md:py-16 lg:px-8 lg:py-24 xl:px-0 xl:py-20">
		<div class="flex h-full flex-col items-center justify-between lg:mx-auto">
			<h3
				class="mb-8 mt-2 text-center text-3xl font-black leading-tight text-gray-900 sm:text-6xl lg:px-5"
			>
				Conçu pour répondre à vos besoins
			</h3>
			<div class="flex flex-col gap-40 lg:gap-80">
				<VisitsCard />
				<HospitCard />
				<StockCard />
				<CaisseCard />
				<AgendaCard />
				<AnimalsClientsCard />
			</div>
		</div>
	</div>

	<Contact />
	<Testimonials />
	<Footer />
</div>
