<script lang="ts">
	import { onMount } from 'svelte';

	let scrollProgress = $state(0);
	let isVisible = $state(false);

	onMount(() => {
		const handleScroll = () => {
			const element = document.querySelector('.bridge-viz-container');
			if (!element) return;

			const rect = element.getBoundingClientRect();
			const windowHeight = window.innerHeight;

			// Check if element is in viewport
			if (rect.top < windowHeight && rect.bottom > 0) {
				isVisible = true;
				// Calculate scroll progress through the element
				const visibleHeight = Math.min(rect.bottom, windowHeight) - Math.max(rect.top, 0);
				const elementHeight = rect.height;
				const progress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + elementHeight)));
				scrollProgress = progress;
			} else {
				isVisible = false;
			}
		};

		window.addEventListener('scroll', handleScroll);
		handleScroll(); // Initial check

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<div class="absolute inset-x-0 -top-20 pointer-events-none overflow-visible bridge-viz-container">
	<div class="relative w-full h-64">
		<!-- Connection lines -->
		<svg class="absolute inset-0 w-full h-full" viewBox="0 0 1920 256" preserveAspectRatio="none"
			style="opacity: {isVisible ? 0.2 : 0}; transition: opacity 1s ease-out;">
			<!-- Gradient definitions -->
			<defs>
				<linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.8" />
					<stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
					<stop offset="100%" style="stop-color:#10b981;stop-opacity:0.8" />
				</linearGradient>
			</defs>

			<!-- Connecting paths with animated stroke-dasharray -->
			<path d="M 0 128 Q 960 20 1920 128"
				stroke="url(#bridgeGradient)"
				stroke-width="1"
				fill="none"
				stroke-dasharray="3000"
				stroke-dashoffset={3000 - (scrollProgress * 3000)}
				style="transition: stroke-dashoffset 0.5s ease-out;" />

			<path d="M 0 180 Q 960 60 1920 180"
				stroke="url(#bridgeGradient)"
				stroke-width="0.5"
				fill="none"
				stroke-dasharray="3000"
				stroke-dashoffset={3000 - (scrollProgress * 3200)}
				style="transition: stroke-dashoffset 0.5s ease-out;" />

			<path d="M 0 80 Q 960 200 1920 80"
				stroke="url(#bridgeGradient)"
				stroke-width="0.5"
				fill="none"
				stroke-dasharray="3000"
				stroke-dashoffset={3000 - (scrollProgress * 2800)}
				style="transition: stroke-dashoffset 0.5s ease-out;" />

			<path d="M 0 220 Q 960 100 1920 220"
				stroke="url(#bridgeGradient)"
				stroke-width="0.3"
				fill="none"
				stroke-dasharray="3000"
				stroke-dashoffset={3000 - (scrollProgress * 3400)}
				style="transition: stroke-dashoffset 0.5s ease-out;" />

			<path d="M 0 40 Q 960 160 1920 40"
				stroke="url(#bridgeGradient)"
				stroke-width="0.3"
				fill="none"
				stroke-dasharray="3000"
				stroke-dashoffset={3000 - (scrollProgress * 2600)}
				style="transition: stroke-dashoffset 0.5s ease-out;" />

			<!-- Node points with animated opacity and scale -->
			<g style="opacity: {Math.max(0, (scrollProgress - 0.2) * 1.5)}; transition: opacity 0.5s ease-out;">
				<circle cx="240" cy="128" r="3" fill="#3b82f6" opacity="0.6">
					<animate attributeName="r" values="0;3" dur="0.5s" begin="0s" fill="freeze" />
				</circle>
				<circle cx="480" cy="80" r="2" fill="#3b82f6" opacity="0.4">
					<animate attributeName="r" values="0;2" dur="0.5s" begin="0.1s" fill="freeze" />
				</circle>
				<circle cx="360" cy="180" r="2" fill="#3b82f6" opacity="0.4">
					<animate attributeName="r" values="0;2" dur="0.5s" begin="0.15s" fill="freeze" />
				</circle>
				<circle cx="120" cy="220" r="1.5" fill="#3b82f6" opacity="0.3">
					<animate attributeName="r" values="0;1.5" dur="0.5s" begin="0.2s" fill="freeze" />
				</circle>
				<circle cx="600" cy="40" r="1.5" fill="#3b82f6" opacity="0.3">
					<animate attributeName="r" values="0;1.5" dur="0.5s" begin="0.25s" fill="freeze" />
				</circle>
			</g>

			<g style="opacity: {Math.max(0, (scrollProgress - 0.5) * 2)}; transition: opacity 0.5s ease-out;">
				<circle cx="960" cy="128" r="4" fill="#8b5cf6" opacity="0.8">
					<animate attributeName="r" values="0;4" dur="0.5s" begin="0.3s" fill="freeze" />
				</circle>
			</g>

			<g style="opacity: {Math.max(0, (scrollProgress - 0.7) * 3)}; transition: opacity 0.5s ease-out;">
				<circle cx="1680" cy="128" r="3" fill="#10b981" opacity="0.6">
					<animate attributeName="r" values="0;3" dur="0.5s" begin="0.4s" fill="freeze" />
				</circle>
				<circle cx="1440" cy="80" r="2" fill="#10b981" opacity="0.4">
					<animate attributeName="r" values="0;2" dur="0.5s" begin="0.45s" fill="freeze" />
				</circle>
				<circle cx="1560" cy="180" r="2" fill="#10b981" opacity="0.4">
					<animate attributeName="r" values="0;2" dur="0.5s" begin="0.5s" fill="freeze" />
				</circle>
				<circle cx="1800" cy="220" r="1.5" fill="#10b981" opacity="0.3">
					<animate attributeName="r" values="0;1.5" dur="0.5s" begin="0.55s" fill="freeze" />
				</circle>
				<circle cx="1320" cy="40" r="1.5" fill="#10b981" opacity="0.3">
					<animate attributeName="r" values="0;1.5" dur="0.5s" begin="0.6s" fill="freeze" />
				</circle>
			</g>
		</svg>

		<!-- Glowing orbs with animated opacity and scale -->
		<div class="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px] transition-all duration-1000 ease-out"
			style="opacity: {scrollProgress * 0.8}; transform: translateY(-50%) scale({0.8 + scrollProgress * 0.2});">
		</div>
		<div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-[100px] transition-all duration-1000 ease-out"
			style="opacity: {scrollProgress * 0.8}; transform: translateY(-50%) scale({0.8 + scrollProgress * 0.2});">
		</div>
		<div class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-purple-500/15 rounded-full blur-[150px] transition-all duration-1000 ease-out"
			style="opacity: {scrollProgress * 0.6}; transform: translate(-50%, -50%) scale({0.7 + scrollProgress * 0.3});">
		</div>
	</div>
</div>