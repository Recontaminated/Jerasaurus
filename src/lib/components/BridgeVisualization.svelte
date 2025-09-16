<script lang="ts">
	// This component creates an abstract visualization representing
	// the bridge between software and hardware domains
</script>

<div class="absolute inset-x-0 -top-20 pointer-events-none overflow-visible">
	<div class="relative w-full h-64">
		<!-- Connection lines -->
		<svg class="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 1920 256" preserveAspectRatio="none">
			<!-- Gradient definitions -->
			<defs>
				<linearGradient id="bridgeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
					<stop offset="0%" style="stop-color:#3b82f6;stop-opacity:0.8" />
					<stop offset="50%" style="stop-color:#8b5cf6;stop-opacity:1" />
					<stop offset="100%" style="stop-color:#10b981;stop-opacity:0.8" />
				</linearGradient>
			</defs>

			<!-- Connecting paths -->
			<path d="M 0 128 Q 960 20 1920 128" stroke="url(#bridgeGradient)" stroke-width="1" fill="none" />
			<path d="M 0 180 Q 960 60 1920 180" stroke="url(#bridgeGradient)" stroke-width="0.5" fill="none" />
			<path d="M 0 80 Q 960 200 1920 80" stroke="url(#bridgeGradient)" stroke-width="0.5" fill="none" />
			<path d="M 0 220 Q 960 100 1920 220" stroke="url(#bridgeGradient)" stroke-width="0.3" fill="none" />
			<path d="M 0 40 Q 960 160 1920 40" stroke="url(#bridgeGradient)" stroke-width="0.3" fill="none" />

			<!-- Node points -->
			<circle cx="240" cy="128" r="3" fill="#3b82f6" opacity="0.6" />
			<circle cx="480" cy="80" r="2" fill="#3b82f6" opacity="0.4" />
			<circle cx="360" cy="180" r="2" fill="#3b82f6" opacity="0.4" />
			<circle cx="120" cy="220" r="1.5" fill="#3b82f6" opacity="0.3" />
			<circle cx="600" cy="40" r="1.5" fill="#3b82f6" opacity="0.3" />

			<circle cx="960" cy="128" r="4" fill="#8b5cf6" opacity="0.8" />

			<circle cx="1680" cy="128" r="3" fill="#10b981" opacity="0.6" />
			<circle cx="1440" cy="80" r="2" fill="#10b981" opacity="0.4" />
			<circle cx="1560" cy="180" r="2" fill="#10b981" opacity="0.4" />
			<circle cx="1800" cy="220" r="1.5" fill="#10b981" opacity="0.3" />
			<circle cx="1320" cy="40" r="1.5" fill="#10b981" opacity="0.3" />
		</svg>

		<!-- Glowing orbs -->
		<div class="absolute left-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/20 rounded-full blur-[100px]"></div>
		<div class="absolute right-0 top-1/2 -translate-y-1/2 w-64 h-64 bg-green-500/20 rounded-full blur-[100px]"></div>
		<div class="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[28rem] h-[28rem] bg-purple-500/15 rounded-full blur-[150px]"></div>
	</div>
</div>