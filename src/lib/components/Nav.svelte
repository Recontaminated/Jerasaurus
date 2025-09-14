<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	type Link = { href: string; label: string };
	export let links: Link[] = [
		{ href: '/', label: 'Home' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#skills', label: 'Skills' },
		{ href: '#contact', label: 'Contact' },
		{ href: '/blog', label: 'Blog' }
	];

	$: pathname = $page.url.pathname;

	let activeSection = '';
	let isScrolled = false;
	let scrollY = 0;

	function isActive(href: string): boolean {
		if (href.startsWith('#')) {
			return activeSection === href.slice(1);
		}
		return pathname === href || (href !== '/' && pathname.startsWith(href));
	}

	onMount(() => {
		const sections = ['projects', 'skills', 'contact'];

		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (entry.isIntersecting) {
						activeSection = entry.target.id;
					}
				});
			},
			{
				rootMargin: '-30% 0px -60% 0px'
			}
		);

		sections.forEach((id) => {
			const element = document.getElementById(id);
			if (element) observer.observe(element);
		});

		const handleScroll = () => {
			scrollY = window.scrollY;

			if (scrollY < 100) {
				activeSection = '';
			}

			// Nav appearance changes after scrolling
			isScrolled = scrollY > window.innerHeight / 2;
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll(); // Check initial scroll position

		return () => {
			sections.forEach((id) => {
				const element = document.getElementById(id);
				if (element) observer.unobserve(element);
			});
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header class="sticky -webkit-sticky top-0 z-50 w-full">
	<div class="flex justify-center px-4 py-4 transition-all duration-300">
		<div class="flex w-full max-w-3xl items-center justify-between rounded-2xl border px-4 py-2 transition-all duration-300 {isScrolled ? 'border-white/20 backdrop-blur-xl bg-white/10 shadow-lg' : 'border-white/10 bg-white/5 backdrop-blur-sm'}">
			<a href="/" class="select-none text-sm font-semibold tracking-tight text-white">Jerasaurus</a>
			<nav class="flex items-center gap-1">
				{#each links as l}
					<a href={l.href} class={`rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white ${isActive(l.href) ? 'bg-white/10 text-white font-medium' : ''}`}>{l.label}</a>
				{/each}
			</nav>
		</div>
	</div>
</header>


