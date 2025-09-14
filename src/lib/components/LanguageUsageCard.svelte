<script lang="ts">
	import { onMount } from 'svelte';

	interface LanguageData {
		name: string;
		value: number;
		color: string;
		time?: string;
		details?: string;
	}

	interface Props {
		languages?: any[];
		totalTime?: string;
		loading?: boolean;
	}

	let {
		languages: apiLanguages = [],
		totalTime = '',
		loading = true
	}: Props = $props();

	let canvas: HTMLCanvasElement;
	let hoveredSegment = $state<number | null>(null);
	let expandOther = $state(false);

	// Language colors mapping
	const languageColors: Record<string, string> = {
		'TypeScript': '#3178C6',
		'JavaScript': '#F7DF1E',
		'Svelte': '#FF3E00',
		'HTML': '#E34C26',
		'CSS': '#1572B6',
		'SCSS': '#CC6699',
		'JSON': '#808080',
		'Markdown': '#083FA1',
		'Python': '#3776AB',
		'Rust': '#CE422B',
		'Go': '#00ADD8',
		'Java': '#007396',
		'C++': '#00599C',
		'C#': '#239120',
		'PHP': '#777BB4',
		'Ruby': '#CC342D',
		'Swift': '#FA7343',
		'Kotlin': '#7F52FF',
		'Vue': '#4FC08D',
		'React': '#61DAFB',
		'Shell': '#89E051',
		'YAML': '#CB171E',
		'Docker': '#2496ED',
		'SQL': '#336791'
	};

	// Generate a deterministic color based on language name
	function getLanguageColor(name: string): string {
		if (languageColors[name]) {
			return languageColors[name];
		}

		// Generate deterministic color from string hash
		let hash = 0;
		for (let i = 0; i < name.length; i++) {
			hash = name.charCodeAt(i) + ((hash << 5) - hash);
		}

		// Convert to hex color with good saturation and lightness
		const hue = Math.abs(hash) % 360;
		const saturation = 65 + (Math.abs(hash >> 8) % 20); // 65-85%
		const lightness = 50 + (Math.abs(hash >> 16) % 15); // 50-65%

		// Convert HSL to hex
		const h = hue / 360;
		const s = saturation / 100;
		const l = lightness / 100;

		const hslToRgb = (h: number, s: number, l: number) => {
			let r, g, b;
			if (s === 0) {
				r = g = b = l;
			} else {
				const hue2rgb = (p: number, q: number, t: number) => {
					if (t < 0) t += 1;
					if (t > 1) t -= 1;
					if (t < 1/6) return p + (q - p) * 6 * t;
					if (t < 1/2) return q;
					if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
					return p;
				};
				const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
				const p = 2 * l - q;
				r = hue2rgb(p, q, h + 1/3);
				g = hue2rgb(p, q, h);
				b = hue2rgb(p, q, h - 1/3);
			}
			return '#' + [r, g, b].map(x => Math.round(x * 255).toString(16).padStart(2, '0')).join('');
		};

		return hslToRgb(h, s, l);
	}

	// Process API data into display format with "Other" category
	let languages = $derived(
		apiLanguages.length === 0 ? [] : (() => {
			const top5 = apiLanguages.slice(0, 5).map(lang => ({
				name: lang.name,
				value: lang.percent,
				color: getLanguageColor(lang.name),
				time: lang.text || lang.digital
			}));

			// If there are more than 5 languages, add an "Other" category
			if (apiLanguages.length > 5) {
				const otherPercent = apiLanguages.slice(5).reduce((sum, lang) => sum + lang.percent, 0);
				const otherLanguages = apiLanguages.slice(5).map(lang => lang.name);

				top5.push({
					name: 'Other',
					value: otherPercent,
					color: '#6B7280',
					time: `${otherLanguages.length} languages`,
					details: otherLanguages.join(', ')
				});
			}

			return top5;
		})()
	);

	function drawPieChart() {
		if (!canvas) return;

		const ctx = canvas.getContext('2d');
		if (!ctx) return;

		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const radius = Math.min(centerX, centerY) - 20;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		let currentAngle = -Math.PI / 2; // Start from top

		languages.forEach((lang, index) => {
			const sliceAngle = (lang.value / 100) * 2 * Math.PI;

			// Draw slice
			ctx.beginPath();
			ctx.moveTo(centerX, centerY);
			ctx.arc(centerX, centerY, radius, currentAngle, currentAngle + sliceAngle);
			ctx.closePath();

			// Add hover effect
			if (hoveredSegment === index) {
				ctx.save();
				ctx.shadowColor = lang.color;
				ctx.shadowBlur = 20;
				ctx.fillStyle = lang.color;
			} else {
				ctx.fillStyle = lang.color;
			}

			ctx.fill();

			if (hoveredSegment === index) {
				ctx.restore();
			}

			// Draw border
			ctx.strokeStyle = '#1a1b26';
			ctx.lineWidth = 2;
			ctx.stroke();

			currentAngle += sliceAngle;
		});

		// Draw center circle for donut effect
		ctx.beginPath();
		ctx.arc(centerX, centerY, radius * 0.4, 0, 2 * Math.PI);
		ctx.fillStyle = '#1a1b26';
		ctx.fill();
	}

	function handleMouseMove(e: MouseEvent) {
		if (!canvas) return;

		const rect = canvas.getBoundingClientRect();
		const x = e.clientX - rect.left;
		const y = e.clientY - rect.top;

		const centerX = canvas.width / 2;
		const centerY = canvas.height / 2;
		const dx = x - centerX;
		const dy = y - centerY;
		const distance = Math.sqrt(dx * dx + dy * dy);
		const radius = Math.min(centerX, centerY) - 20;

		if (distance < radius && distance > radius * 0.4) {
			let angle = Math.atan2(dy, dx) + Math.PI / 2;
			if (angle < 0) angle += 2 * Math.PI;

			let currentAngle = 0;
			let foundSegment = -1;

			for (let i = 0; i < languages.length; i++) {
				const sliceAngle = (languages[i].value / 100) * 2 * Math.PI;
				if (angle >= currentAngle && angle < currentAngle + sliceAngle) {
					foundSegment = i;
					break;
				}
				currentAngle += sliceAngle;
			}

			if (foundSegment !== hoveredSegment) {
				hoveredSegment = foundSegment;
				if (foundSegment !== -1 && languages[foundSegment].name === 'Other') {
					expandOther = true;
				} else {
					expandOther = false;
				}
				drawPieChart();
			}
		} else {
			if (hoveredSegment !== null) {
				hoveredSegment = null;
				expandOther = false;
				drawPieChart();
			}
		}
	}

	function handleMouseLeave() {
		hoveredSegment = null;
		expandOther = false;
		drawPieChart();
	}

	$effect(() => {
		if (languages.length > 0 && canvas) {
			drawPieChart();
		}
	});
</script>

<div class="p-6 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl hover:border-purple-500/50 transition-all duration-300">
	<div class="flex justify-between items-center mb-6">
		<h3 class="text-xl font-semibold text-white">Languages This Week</h3>
		<span class="text-sm text-gray-400">Top {languages.length} of {apiLanguages.length}</span>
	</div>

	<div class="flex flex-col lg:flex-row gap-6 items-center lg:items-start">
		<!-- Pie Chart - Left Side -->
		<div class="relative flex-shrink-0">
			<canvas
				bind:this={canvas}
				width="200"
				height="200"
				class="w-[200px] h-[200px] cursor-pointer"
				onmousemove={handleMouseMove}
				onmouseleave={handleMouseLeave}
			></canvas>
		</div>

		<!-- Languages Table - Right Side -->
		<div class="flex-1 w-full">
			{#if loading}
				<div class="space-y-3">
					{#each Array(5) as _}
						<div class="h-8 bg-gray-700/30 rounded animate-pulse"></div>
					{/each}
				</div>
			{:else if languages.length > 0}
				<div class="space-y-3">
					{#each languages as lang, index}
					<div class="relative flex items-center justify-between group transition-all duration-200">
						{#if hoveredSegment === index}
							<div class="absolute inset-0 bg-gray-700/30 rounded-lg pointer-events-none"></div>
						{/if}
						<div class="relative flex items-center gap-3 flex-1 px-2 py-1">
							<div
								class="w-4 h-4 rounded transition-all duration-200 flex-shrink-0
								{hoveredSegment === index ? 'scale-125 shadow-lg' : 'group-hover:scale-110'}"
								style="background-color: {lang.color}"
							></div>
							<span class="text-sm transition-colors duration-200 flex-shrink-0
								{hoveredSegment === index ? 'text-white font-medium' : 'text-gray-300 group-hover:text-white'}">
								{lang.name}
							</span>
							{#if lang.name === 'Other' && expandOther && lang.details}
								<div class="flex flex-wrap gap-1 ml-2">
									{#each lang.details.split(', ').slice(0, 10) as otherLang}
										<span class="px-1.5 py-0.5 bg-gray-700/50 rounded text-xs text-gray-400">
											{otherLang}
										</span>
									{/each}
									{#if lang.details.split(', ').length > 10}
										<span class="px-1.5 py-0.5 text-xs text-gray-500">
											+{lang.details.split(', ').length - 10}
										</span>
									{/if}
								</div>
							{/if}
						</div>
						<div class="relative flex items-center gap-3 flex-shrink-0 px-2 py-1">
							<span class="text-sm transition-colors duration-200
								{hoveredSegment === index ? 'text-gray-200' : 'text-gray-400 group-hover:text-gray-300'}">
								{lang.time}
							</span>
							<span class="text-sm w-12 text-right transition-colors duration-200
								{hoveredSegment === index ? 'text-purple-400 font-medium' : 'text-gray-500'}">
								{lang.value.toFixed(1)}%
							</span>
						</div>
					</div>
					{/each}
				</div>
			{:else}
				<div class="text-gray-400 text-sm">No language data available</div>
			{/if}

			<div class="mt-4 pt-4 border-t border-gray-700">
				<div class="flex justify-between items-center">
					<span class="text-sm text-gray-400">Total coding time</span>
					<span class="text-lg font-semibold text-purple-400">{totalTime || 'N/A'}</span>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	canvas {
		image-rendering: crisp-edges;
	}
</style>