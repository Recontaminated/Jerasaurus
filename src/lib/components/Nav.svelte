<script lang="ts">
	import { run } from 'svelte/legacy';

	import { page } from '$app/stores';
	import { onMount, tick } from 'svelte';

	type Link = { href: string; label: string };
	interface Props {
		links?: Link[];
	}

	let { links = [
		{ href: '/', label: 'Home' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#skills', label: 'Skills' },
		{ href: '#contact', label: 'Contact' },
		{ href: '/blog', label: 'Blog' }
	] }: Props = $props();

	let pathname = $derived($page.url.pathname);

	let activeSection = $state('home');
	let isScrolled = $state(false);
	let scrollY = 0;

	// Force reactivity
	run(() => {
		activeSection;
	});

	function isActive(href: string): boolean {
		if (pathname !== '/') {
			return pathname === href || (href !== '/' && pathname.startsWith(href));
		}

		if (href === '/') {
			return activeSection === 'home';
		}
		if (href.startsWith('#')) {
			return activeSection === href.slice(1);
		}
		return false;
	}

	function handleNavClick(e: MouseEvent, href: string) {
		if (href.startsWith('#')) {
			e.preventDefault();
			const targetId = href.slice(1);
			const element = document.getElementById(targetId);
			if (element) {
				element.scrollIntoView({ behavior: 'smooth', block: 'start' });
			}
		} else if (href === '/' && pathname === '/') {
			e.preventDefault();
			window.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	onMount(() => {
		const handleScroll = () => {
			scrollY = window.scrollY;

			// Nav appearance changes after scrolling
			isScrolled = scrollY > window.innerHeight / 2;

			// Determine active section based on scroll position
			const sections = [
				{ id: 'home', offset: 0 },
				{ id: 'projects', offset: 0 },
				{ id: 'skills', offset: 0 },
				{ id: 'contact', offset: 0 }
			];

			// Calculate offsets for each section
			for (let i = 1; i < sections.length; i++) {
				const element = document.getElementById(sections[i].id);
				if (element) {
					// Switch when section is about to enter viewport (adjust this value to control when switching happens)
					sections[i].offset = element.offsetTop - window.innerHeight * 0.4; // Switch when section is 40% from bottom of viewport
				} else {
					console.warn(`Element with id '${sections[i].id}' not found`);
				}
			}

			// Find the current section
			let current = 'home';

			for (let i = sections.length - 1; i >= 0; i--) {
				if (scrollY >= sections[i].offset) {
					current = sections[i].id;
					break;
				}
			}

			if (activeSection !== current) {
				activeSection = current; // Trigger Svelte reactivity
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll(); // Check initial scroll position

		return () => {
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
					<a
						href={l.href}
						onclick={(e) => handleNavClick(e, l.href)}
						class={`rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white ${isActive(l.href) ? 'bg-white/10 text-white font-medium' : ''}`}
					>
						{l.label}
					</a>
				{/each}
			</nav>
		</div>
	</div>
</header>


