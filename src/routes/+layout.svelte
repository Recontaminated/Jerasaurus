<script>
	import '../app.css';
	import { fly } from 'svelte/transition';
	export let data;
</script>

<div class="relative min-h-screen bg-neutral-950 text-neutral-100 antialiased overflow-hidden">
	<!-- ambient gradient background -->
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
		<div class="absolute inset-0" style="
			background: radial-gradient(ellipse 120% 80% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
			radial-gradient(ellipse 100% 60% at 30% 10%, rgba(0, 255, 255, 0.28), transparent 60%),
			radial-gradient(ellipse 90% 70% at 50% 0%, rgba(138, 43, 226, 0.18), transparent 65%),
			radial-gradient(ellipse 110% 50% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
			transparent;
			filter: blur(120px);
			transform: translateZ(0);
		"></div>
		<!-- bottom fade to black -->
		<div class="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-b from-transparent to-neutral-950 z-[1]"></div>
	</div>

	<main class="relative z-10">
		<!-- global glass nav -->
		<div class="sticky top-4 z-20 flex justify-center px-4">
			<div class="flex w-full max-w-3xl items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-white/5">
				<a href="/" class="select-none text-sm font-semibold tracking-tight text-white">Jerasaurus</a>
				<nav class="flex items-center gap-1">
					<a href="/" class="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white">Home</a>
					<a href="/blog" class="rounded-xl px-3 py-2 text-sm text-white/80 transition hover:bg-white/5 hover:text-white">Blog</a>
				</nav>
			</div>
		</div>

		{#key data.url}
			<div in:fly={{ y: 12, duration: 220, delay: 120 }} out:fly={{ y: -12, duration: 180 }}>
				<slot />
			</div>
		{/key}
	</main>
</div>

<svelte:head>
	<title>Jerasaurus</title>
	<meta name="description" content="Personal site and blog" />
	<link rel="preconnect" href="https://fonts.googleapis.com">
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous">
	<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700;800&display=swap" rel="stylesheet">
</svelte:head>

<style>
	:global(body){
		font-family: Inter, ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, "Helvetica Neue", Arial, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
	}
</style>