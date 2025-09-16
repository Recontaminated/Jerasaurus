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
		{ href: '#about', label: 'About' },
		{ href: '#skills', label: 'Skills' },
		{ href: '#projects', label: 'Projects' },
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

			// If we're not on the home page, navigate to home page with the hash
			if (pathname !== '/') {
				window.location.href = '/' + href;
			} else {
				// We're on the home page, just scroll to the section
				const element = document.getElementById(targetId);
				if (element) {
					element.scrollIntoView({ behavior: 'smooth', block: 'start' });
				}
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

			// Get all sections with their positions
			const sections = ['about', 'skills', 'projects', 'contact'];
			const sectionData = [];

			// Add home section (top of page)
			sectionData.push({
				id: 'home',
				top: 0,
				bottom: document.getElementById('about')?.offsetTop || window.innerHeight
			});

			// Add other sections
			for (let i = 0; i < sections.length; i++) {
				const element = document.getElementById(sections[i]);
				if (element) {
					const nextElement = i < sections.length - 1 ? document.getElementById(sections[i + 1]) : null;
					sectionData.push({
						id: sections[i],
						top: element.offsetTop,
						bottom: nextElement ? nextElement.offsetTop : document.documentElement.scrollHeight
					});
				}
			}

			// Find which section the viewport center is in
			const viewportCenter = scrollY + window.innerHeight / 2;

			let current = 'home';
			for (const section of sectionData) {
				if (viewportCenter >= section.top && viewportCenter < section.bottom) {
					current = section.id;
					break;
				}
			}

			if (activeSection !== current) {
				activeSection = current;
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
		<div class="flex items-center justify-center rounded-2xl border px-4 py-2 transition-all duration-300 {isScrolled ? 'border-white/20 backdrop-blur-xl bg-white/10 shadow-lg' : 'border-white/10 bg-white/5 backdrop-blur-sm'}">
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


