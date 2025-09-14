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
	let hoveredSegment: number | null = null;
	let tooltip = { show: false, x: 0, y: 0, data: null as LanguageData | null };

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

	// Process API data into display format with "Other" category
	let languages = $derived(
		apiLanguages.length === 0 ? [] : (() => {
			const top5 = apiLanguages.slice(0, 5).map(lang => ({
				name: lang.name,
				value: lang.percent,
				color: languageColors[lang.name] || '#' + Math.floor(Math.random()*16777215).toString(16),
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
		const radius = Math.min(centerX, centerY) - 30;

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
				ctx.fillStyle = lang.color + 'DD';
			} else {
				ctx.fillStyle = lang.color + 'CC';
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
		const radius = Math.min(centerX, centerY) - 30;

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
				if (foundSegment !== -1) {
					tooltip = {
						show: true,
						x: e.clientX,
						y: e.clientY,
						data: languages[foundSegment]
					};
				}
				drawPieChart();
			}
		} else {
			if (hoveredSegment !== null) {
				hoveredSegment = null;
				tooltip.show = false;
				drawPieChart();
			}
		}
	}

	function handleMouseLeave() {
		hoveredSegment = null;
		tooltip.show = false;
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
				width="250"
				height="250"
				class="w-[250px] h-[250px] cursor-pointer"
				on:mousemove={handleMouseMove}
				on:mouseleave={handleMouseLeave}
			/>

			{#if tooltip.show && tooltip.data}
				<div
					class="fixed z-50 bg-gray-900 border border-gray-600 rounded-lg p-3 pointer-events-none transform -translate-x-1/2"
					style="left: {tooltip.x}px; top: {tooltip.y - 60}px;"
				>
					<div class="flex items-center gap-2">
						<div class="w-3 h-3 rounded-full" style="background-color: {tooltip.data.color}"></div>
						<span class="text-white font-medium">{tooltip.data.name}</span>
					</div>
					<div class="text-sm text-gray-400 mt-1">
						{tooltip.data.time || `${tooltip.data.value.toFixed(1)}%`}
					</div>
					{#if tooltip.data.details}
						<div class="text-xs text-gray-500 mt-1 max-w-[200px]">
							{tooltip.data.details}
						</div>
					{/if}
				</div>
			{/if}
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
					{#each languages as lang}
					<div class="flex items-center justify-between group">
						<div class="flex items-center gap-3">
							<div
								class="w-4 h-4 rounded transition-transform group-hover:scale-110"
								style="background-color: {lang.color}"
							></div>
							<span class="text-sm text-gray-300 group-hover:text-white transition-colors">
								{lang.name}
							</span>
						</div>
						<div class="flex items-center gap-3">
							<span class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors">
								{lang.time}
							</span>
							<span class="text-sm text-gray-500 w-12 text-right">
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