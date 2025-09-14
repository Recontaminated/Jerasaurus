<script lang="ts">
	// placeholder data; can be wired later
	type Card = { title: string; description: string; href?: string; icon?: string };
	interface Props {
		cards?: Card[];
	}

	let { cards = [
		{ title: 'Github Activity', description: 'Contributions and trends in the last year' },
		{ title: 'Tech Stack', description: 'TypeScript, SvelteKit, Tailwind, Node, and more' },
		{ title: 'Typing Speed', description: 'WPM and accuracy practice' },
		{ title: 'Latest Project', description: 'What I am building now' }
	] }: Props = $props();
</script>

<section class="mx-auto max-w-6xl px-6 pb-24">
	<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
		{#each cards as c}
			<a href="/blog" class="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur ring-1 ring-white/10 transition hover:border-white/20 hover:bg-white/7.5">
				<div class="absolute inset-0 bg-gradient-to-br from-white/6 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
				<div class="relative">
					<h3 class="text-lg font-semibold">{c.title}</h3>
					<p class="mt-2 text-sm text-white/70">{c.description}</p>
				</div>
			</a>
		{/each}
	</div>
</section>
