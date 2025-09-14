<script lang="ts">
	import ScrollReveal from '$lib/components/ScrollReveal.svelte';
</script>

<section class="relative mx-auto max-w-4xl px-6 py-32">
	<ScrollReveal delay={100}>
		<!-- Subtle gradient orb in background -->
		<div class="absolute inset-0 -z-10">
			<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-full blur-3xl"></div>
		</div>

		<div class="text-center space-y-6">
			<!-- Small label -->
			<div class="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur">
				<span class="text-sm text-white/60">Philosophy</span>
			</div>

			<!-- Main text -->
			<h2 class="text-3xl sm:text-4xl font-bold text-white/90">
				Creating a connected world
			</h2>

			<div class="max-w-3xl mx-auto space-y-4 text-lg leading-relaxed text-white/70">
				<p>
					I believe that data, devices, and ideas should be connected and accessible to everyone.
					Whether it's integrating frontend experiences with backend systems, bridging hardware and software, or designing embedded solutions that bring intelligence to the physical world, I focus on creating cohesive products that just work.
				</p>
				<p>
					My approach is simple: listen carefully, iterate quickly, and always keep the end user in mind. I'm constantly learning from the amazing open source community and trying to give back whenever I can.
				</p>
			</div>

			<!-- Visual separator with animation -->
			<div class="pt-12 flex justify-center">
				<div class="flex gap-2">
					<span class="w-2 h-2 rounded-full bg-white/20 animate-pulse"></span>
					<span class="w-2 h-2 rounded-full bg-white/20 animate-pulse" style="animation-delay: 0.2s"></span>
					<span class="w-2 h-2 rounded-full bg-white/20 animate-pulse" style="animation-delay: 0.4s"></span>
				</div>
			</div>
		</div>
	</ScrollReveal>
</section>