<script>
	import '../app.css';
	import { fly } from 'svelte/transition';
	import Nav from '$lib/components/Nav.svelte';
	export let data;
</script>

<div class="relative min-h-screen bg-neutral-950 text-neutral-100 antialiased">
	<!-- overscroll background - same gradient as main page -->
	<div style="
		height:100vh;
		margin-top:-100vh;
		position:fixed;
		width:100%;
		z-index:-1;
		overflow:hidden;
	">
		<div style="
			position:absolute;
			inset:0;
			background: radial-gradient(ellipse 80% 60% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
			radial-gradient(ellipse 70% 50% at 30% 10%, rgba(0, 255, 255, 0.28), transparent 60%),
			radial-gradient(ellipse 60% 50% at 50% -10%, rgba(138, 43, 226, 0.18), transparent 65%),
			radial-gradient(ellipse 75% 40% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
			radial-gradient(ellipse 100% 70% at 50% -30%, black, transparent 70%),
			transparent;
			filter: blur(80px);
			transform: translateZ(0);
		"></div>
	</div>
	<!-- ambient gradient background -->
	<div aria-hidden="true" class="pointer-events-none absolute inset-0 z-0 overflow-hidden">
		<div class="absolute inset-0" style="
			background: radial-gradient(ellipse 80% 60% at 70% 20%, rgba(255, 20, 147, 0.15), transparent 50%),
			radial-gradient(ellipse 70% 50% at 30% 10%, rgba(0, 255, 255, 0.28), transparent 60%),
			radial-gradient(ellipse 60% 50% at 50% -10%, rgba(138, 43, 226, 0.18), transparent 65%),
			radial-gradient(ellipse 75% 40% at 80% 30%, rgba(255, 215, 0, 0.08), transparent 40%),
			radial-gradient(ellipse 100% 70% at 50% -30%, black, transparent 70%),
			transparent;
			filter: blur(80px);
			transform: translateZ(0);
		"></div>
		<!-- bottom fade to black -->
		<div class="absolute inset-x-0 bottom-0 h-[45vh] bg-gradient-to-b from-transparent to-neutral-950 z-[1]"></div>
	</div>

	<main class="relative z-10">
		<Nav />

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