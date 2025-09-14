<script lang="ts">
	import { page } from '$app/stores';
	import Reveal from './Reveal.svelte';

	type Link = { href: string; label: string };
	export let links: Link[] = [
		{ href: '/', label: 'Home' },
		{ href: '#projects', label: 'Projects' },
		{ href: '#skills', label: 'Skills' },
		{ href: '#contact', label: 'Contact' },
		{ href: '/blog', label: 'Blog' }
	];

	$: pathname = $page.url.pathname;

	function isActive(href: string): boolean {
		if (href.startsWith('#')) return false;
		return pathname === href || (href !== '/' && pathname.startsWith(href));
	}
</script>

<Reveal duration={1000}>
	<div class="sticky top-4 z-20 flex justify-center px-4">
		<div class="flex w-full max-w-3xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/5">
			<a href="/" class="select-none text-sm font-semibold tracking-tight text-white">Jerasaurus</a>
			<nav class="flex items-center gap-1">
				{#each links as l}
					<a href={l.href} class={`rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white ${isActive(l.href) ? 'bg-white/5 text-white' : ''}`}>{l.label}</a>
				{/each}
			</nav>
		</div>
	</div>
</Reveal>


