<script lang="ts">
	import { onMount } from 'svelte';

	let containerElement: HTMLElement;
	let scrollProgress = $state(0);

	onMount(() => {
		const handleScroll = () => {
			if (!containerElement) return;

			const rect = containerElement.getBoundingClientRect();
			const windowHeight = window.innerHeight;

			// Calculate progress when element is in view
			if (rect.top < windowHeight && rect.bottom > 0) {
				// Map vertical scroll position to horizontal movement (0-100%)
				const progress = Math.max(0, Math.min(100,
					((windowHeight - rect.top) / (windowHeight + rect.height)) * 100
				));
				scrollProgress = progress;
			}
		};

		window.addEventListener('scroll', handleScroll, { passive: true });
		handleScroll(); // Initial calculation

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div bind:this={containerElement} class="relative h-20 my-12 flex items-center">
	<!-- Subtle gradient line that fades on edges -->
	<div class="absolute inset-x-8 md:inset-x-16 lg:inset-x-24 h-[1px] bg-gradient-to-r from-transparent via-gray-700/20 to-transparent"></div>

	<!-- Color star that travels across -->
	<div class="absolute inset-y-0 flex items-center" style="left: calc(8% + {scrollProgress * 0.84}%); transition: left 0.1s ease-out;">
		<!-- Blurred glow effect -->
		<div class="relative">
			<!-- Outer glow -->
			<div class="absolute -inset-10 bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-500 rounded-full opacity-40"
				style="filter: blur(25px);">
			</div>
			<!-- Inner star/circle -->
			<div class="relative w-3 h-3 bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 rounded-full"
				style="filter: blur(1px); box-shadow: 0 0 15px rgba(168, 85, 247, 0.6);">
			</div>
		</div>
	</div>
</div>