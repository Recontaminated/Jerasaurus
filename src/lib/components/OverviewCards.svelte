<script lang="ts">
	import { onMount } from 'svelte';
	import ScrollReveal from '$lib/components/ScrollReveal.svelte';
	import LanguageUsageCard from '$lib/components/LanguageUsageCard.svelte';
	import NowPlayingCard from '$lib/components/NowPlayingCard.svelte';

	type Card = {
		id: string;
		title: string;
		description: string;
		value?: string;
		subvalue?: string;
		href?: string;
		icon?: string;
		gradient: string;
		accentColor: string;
		data?: any;
		loading?: boolean;
		size?: 'small' | 'medium' | 'large' | 'wide' | 'tall';
	};

	interface Props {
		cards?: Card[];
	}

	let { cards = [
		{
			id: 'github',
			title: 'Github Activity',
			description: 'Contributions this year',
			value: 'Loading...',
			subvalue: '',
			gradient: 'from-purple-600 to-pink-600',
			accentColor: 'rgb(168, 85, 247)',
			icon: 'github',
			loading: true,
			size: 'wide' as const
		},
		{
			id: 'coding',
			title: 'Coding Time',
			description: 'This week',
			value: 'Loading...',
			subvalue: '',
			gradient: 'from-blue-600 to-cyan-600',
			accentColor: 'rgb(59, 130, 246)',
			loading: true,
			icon: 'code',
			size: 'wide' as const
		},
		{
			id: 'languages',
			title: 'Top Language',
			description: 'Most used this week',
			value: 'Loading...',
			subvalue: '',
			gradient: 'from-green-600 to-emerald-600',
			accentColor: 'rgb(34, 197, 94)',
			loading: true,
			icon: 'terminal',
			size: 'medium' as const
		},
		{
			id: 'streak',
			title: 'Code Streak',
			description: 'Current streak',
			value: 'Loading...',
			subvalue: '',
			gradient: 'from-pink-600 to-rose-600',
			accentColor: 'rgb(236, 72, 153)',
			icon: 'fire',
			loading: true,
			size: 'medium' as const
		}
	] }: Props = $props();

	// Make cards reactive
	let reactiveCards = $state(cards);
	let lastUpdated = $state<string>('');
	let dataRange = $state<string>('');
	let languageData = $state<any[]>([]);
	let totalCodingTime = $state<string>('');
	let languagesLoading = $state(true);

	onMount(async () => {
		// Fetch all data in parallel
		const [wakaTimeResponse, githubResponse] = await Promise.allSettled([
			fetch('/api/wakatime'),
			fetch('/api/github')
		]);

		// Process GitHub data
		try {
			if (githubResponse.status === 'fulfilled' && githubResponse.value.ok) {
				const githubData = await githubResponse.value.json();

				// Update GitHub activity card with total contributions
				const githubCardIndex = reactiveCards.findIndex(c => c.id === 'github');
				if (githubCardIndex !== -1) {
					reactiveCards[githubCardIndex].loading = false;
					if (githubData.totalContributions !== undefined) {
						reactiveCards[githubCardIndex].value = githubData.totalContributions.toLocaleString();
						reactiveCards[githubCardIndex].subvalue = `contributions in ${githubData.year}`;
					} else {
						reactiveCards[githubCardIndex].value = 'N/A';
						reactiveCards[githubCardIndex].subvalue = 'Unable to load';
					}
				}
			} else {
				// Handle error case
				const githubCardIndex = reactiveCards.findIndex(c => c.id === 'github');
				if (githubCardIndex !== -1) {
					reactiveCards[githubCardIndex].loading = false;
					reactiveCards[githubCardIndex].value = 'N/A';
					reactiveCards[githubCardIndex].subvalue = 'Unable to load';
				}
			}
		} catch (error) {
			console.error('Failed to process GitHub data:', error);
			const githubCardIndex = reactiveCards.findIndex(c => c.id === 'github');
			if (githubCardIndex !== -1) {
				reactiveCards[githubCardIndex].loading = false;
				reactiveCards[githubCardIndex].value = 'N/A';
				reactiveCards[githubCardIndex].subvalue = 'Unable to load';
			}
		}

		// Process WakaTime stats
		try {
			if (wakaTimeResponse.status === 'fulfilled' && wakaTimeResponse.value.ok) {
				const wakaTimeData = await wakaTimeResponse.value.json();

				if (wakaTimeData?.data) {
					const apiData = wakaTimeData.data;

					// Set last updated and data range
					if (apiData.end) {
						const endDate = new Date(apiData.end);
						const now = new Date();
						const diffMs = now - endDate;
						const diffMins = Math.floor(diffMs / 60000);
						const diffHours = Math.floor(diffMs / 3600000);
						const diffDays = Math.floor(diffMs / 86400000);

						if (diffMins < 60) {
							lastUpdated = `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`;
						} else if (diffHours < 24) {
							lastUpdated = `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
						} else {
							lastUpdated = `${diffDays} day${diffDays !== 1 ? 's' : ''} ago`;
						}
					}

					if (apiData.human_readable_range) {
						dataRange = apiData.human_readable_range;
					}

					// Update coding time card
					const codingCardIndex = reactiveCards.findIndex(c => c.id === 'coding');
					if (codingCardIndex !== -1) {
						reactiveCards[codingCardIndex].loading = false;
						if (apiData.human_readable_total) {
							const parts = apiData.human_readable_total.split(' ');
							reactiveCards[codingCardIndex].value = parts.slice(0, -1).join(' ');
							reactiveCards[codingCardIndex].subvalue = 'this week';
							// Store total time for language card
							totalCodingTime = apiData.human_readable_total;
						}
					}

					// Store language data for LanguageUsageCard
					if (apiData.languages && apiData.languages.length > 0) {
						languageData = apiData.languages;
						languagesLoading = false;
					}

					// Update top language card
					const langCardIndex = reactiveCards.findIndex(c => c.id === 'languages');
					if (langCardIndex !== -1 && apiData.languages && apiData.languages.length > 0) {
						reactiveCards[langCardIndex].loading = false;
						const topLang = apiData.languages[0];
						reactiveCards[langCardIndex].value = topLang.name;
						reactiveCards[langCardIndex].subvalue = `${topLang.percent.toFixed(1)}% of time`;
					}

					// Update streak card with calculated streak
					const streakCardIndex = reactiveCards.findIndex(c => c.id === 'streak');
					if (streakCardIndex !== -1) {
						reactiveCards[streakCardIndex].loading = false;

						// Debug: log the data structure
						console.log('WakaTime days data:', apiData.days);
						console.log('Days minus holidays:', apiData.days_minus_holidays);

						// Try different data fields
						if (apiData.days && Array.isArray(apiData.days) && apiData.days.length > 0) {
							// Count consecutive days with activity from most recent
							let streak = 0;
							for (let i = apiData.days.length - 1; i >= 0; i--) {
								const dayTotal = apiData.days[i].grand_total?.total_seconds || apiData.days[i].total || 0;
								console.log(`Day ${i}: ${apiData.days[i].date}, total: ${dayTotal}`);
								if (dayTotal > 0) {
									streak++;
								} else {
									break;
								}
							}
							reactiveCards[streakCardIndex].value = streak.toString();
							reactiveCards[streakCardIndex].subvalue = `day${streak !== 1 ? 's' : ''} streak`;
						} else if (apiData.days_including_holidays && apiData.days_including_holidays > 0) {
							// Use days including holidays as fallback
							reactiveCards[streakCardIndex].value = apiData.days_including_holidays.toString();
							reactiveCards[streakCardIndex].subvalue = `day${apiData.days_including_holidays !== 1 ? 's' : ''} active`;
						} else {
							// Last fallback - just show if we coded today
							reactiveCards[streakCardIndex].value = apiData.is_coding_activity_visible ? '1' : '0';
							reactiveCards[streakCardIndex].subvalue = 'days';
						}

						if (apiData.human_readable_daily_average) {
							reactiveCards[streakCardIndex].description = `${apiData.human_readable_daily_average} avg/day`;
						}
					}
				}
			} else {
				languagesLoading = false;
			}
		} catch (error) {
			console.error('Failed to process WakaTime data:', error);
			languagesLoading = false;
			reactiveCards.forEach((card, index) => {
				if (card.loading) {
					reactiveCards[index].loading = false;
					reactiveCards[index].value = 'N/A';
					reactiveCards[index].subvalue = 'Unable to load';
				}
			});
		}
	});

	function getIcon(type: string) {
		switch(type) {
			case 'github':
				return `<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`;
			case 'code':
				return `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/></svg>`;
			case 'terminal':
				return `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>`;
			case 'keyboard':
				return `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>`;
			case 'rocket':
				return `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg>`;
			case 'fire':
				return `<svg class="w-full h-full" fill="currentColor" viewBox="0 0 24 24"><path d="M12 23c-4.71 0-8.5-3.79-8.5-8.5 0-2.49 1.07-4.73 2.78-6.3l.05-.05c.4-.36.77-.68 1.12-.97C9.24 5.7 10.29 5 10.29 5s.35 1.54-.11 3.16c.75-.48 1.45-1.04 2.09-1.67C13.41 5.31 14.34 4 14.34 4s.88 3.05-.14 5.89c1.42-1.12 2.55-2.61 3.3-4.39 0 0 4 4.25 4 8.5 0 4.71-3.79 8.5-8.5 8.5z"/></svg>`;
			case 'stack':
				return `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"/></svg>`;
			default:
				return `<svg class="w-full h-full" fill="none" stroke="currentColor" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/></svg>`;
		}
	}

	function getCardClass(size: string) {
		switch(size) {
			case 'small':
				return 'col-span-1 row-span-1';
			case 'medium':
				return 'col-span-1 row-span-1 sm:col-span-1 lg:col-span-1';
			case 'large':
				return 'col-span-1 row-span-1 sm:col-span-2 sm:row-span-2 lg:col-span-2 lg:row-span-2';
			case 'wide':
				return 'col-span-1 row-span-1 sm:col-span-2 lg:col-span-2';
			case 'tall':
				return 'col-span-1 row-span-1 sm:row-span-2 lg:row-span-2';
			default:
				return 'col-span-1 row-span-1';
		}
	}

	function getIconSize(size: string) {
		switch(size) {
			case 'small':
				return 'w-6 h-6';
			case 'large':
				return 'w-12 h-12 sm:w-16 sm:h-16';
			case 'wide':
				return 'w-10 h-10';
			case 'tall':
				return 'w-10 h-10';
			default:
				return 'w-8 h-8';
		}
	}

	function getValueSize(size: string) {
		switch(size) {
			case 'small':
				return 'text-2xl';
			case 'large':
				return 'text-4xl sm:text-5xl lg:text-6xl';
			case 'wide':
				return 'text-3xl sm:text-4xl';
			case 'tall':
				return 'text-3xl sm:text-4xl';
			default:
				return 'text-3xl';
		}
	}
</script>

<section class="mx-auto max-w-7xl px-6 pb-24">
	<ScrollReveal delay={50}>
		<!-- Section header -->
		<div class="mb-12 text-center">
			<h2 class="text-3xl font-bold text-white/90 mb-3">Some live stats</h2>
			<p class="text-white/60 text-lg">
				A real-time glimpse into my coding journey and tech stack
			</p>
			{#if lastUpdated}
				<p class="text-white/40 text-sm mt-2">
					Last updated {lastUpdated} 
				</p>
			{/if}
		</div>

		<!-- Cards grid with Now Playing card -->
		<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 auto-rows-[minmax(120px,auto)]">
		{#each reactiveCards as card}
			<div class="group relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/10 bg-gradient-to-br {card.gradient} p-[1px] transition-all duration-300 hover:scale-105 hover:shadow-2xl {getCardClass(card.size || 'medium')}">
				<!-- Background glow effect -->
				<div class="absolute inset-0 bg-gradient-to-br {card.gradient} opacity-20 blur-xl"></div>

				<!-- Card content -->
				<div class="relative h-full rounded-2xl sm:rounded-3xl bg-black/80 backdrop-blur-xl p-4 sm:p-6 transition-all duration-300 group-hover:bg-black/70 flex flex-col">
					<!-- Animated background pattern -->
					<div class="absolute inset-0 opacity-10">
						<div class="absolute inset-0" style="background-image: radial-gradient(circle at 20% 50%, {card.accentColor} 0%, transparent 50%), radial-gradient(circle at 80% 80%, {card.accentColor} 0%, transparent 50%), radial-gradient(circle at 40% 20%, {card.accentColor} 0%, transparent 50%);"></div>
					</div>

					<!-- Icon with glow -->
					<div class="relative mb-3 sm:mb-4 inline-flex">
						<div class="absolute inset-0 bg-gradient-to-br {card.gradient} opacity-50 blur-xl"></div>
						<div class="relative text-white/90 {getIconSize(card.size || 'medium')}">
							{@html getIcon(card.icon || '')}
						</div>
					</div>

					<!-- Text content -->
					<div class="relative flex-1 flex flex-col justify-between">
						<div>
							<h3 class="text-xs sm:text-sm font-medium text-white/60 uppercase tracking-wider">{card.title}</h3>

							<div class="mt-2 flex items-baseline gap-2 flex-wrap">
								{#if card.loading}
									<div class="h-8 w-24 animate-pulse rounded bg-white/10"></div>
								{:else}
									<span class="{getValueSize(card.size || 'medium')} font-bold text-white">{card.value}</span>
									{#if card.subvalue}
										<span class="text-xs sm:text-sm text-white/60">{card.subvalue}</span>
									{/if}
								{/if}
							</div>
						</div>

						<p class="mt-2 text-xs text-white/50">{card.description}</p>
					</div>

					<!-- Floating particles animation for large cards -->
					{#if card.size === 'large'}
						<div class="absolute inset-0 overflow-hidden pointer-events-none">
							<div class="particle particle-1"></div>
							<div class="particle particle-2"></div>
							<div class="particle particle-3"></div>
						</div>
					{/if}

					<!-- Hover effect overlay -->
					<div class="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

					<!-- Animated border gradient -->
					<div class="absolute inset-0 rounded-2xl sm:rounded-3xl bg-gradient-to-br {card.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-10"></div>
				</div>
			</div>
		{/each}

		<!-- Now Playing Card directly in the grid -->
		<div class="col-span-2 sm:col-span-2 lg:col-span-2">
			<NowPlayingCard />
		</div>
		</div>

		<!-- Language Usage Card -->
		<div class="mt-6">
			<LanguageUsageCard
				languages={languageData}
				totalTime={totalCodingTime}
				loading={languagesLoading}
			/>
		</div>
	</ScrollReveal>
</section>

<style>
	/* Add shimmer effect for loading state */
	@keyframes shimmer {
		0% {
			background-position: -1000px 0;
		}
		100% {
			background-position: 1000px 0;
		}
	}

	.animate-pulse {
		background: linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.1) 50%, transparent 100%);
		background-size: 1000px 100%;
		animation: shimmer 2s infinite;
	}

	/* Floating particles for large cards */
	.particle {
		position: absolute;
		width: 4px;
		height: 4px;
		background: radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%);
		border-radius: 50%;
		animation: float 6s infinite ease-in-out;
	}

	.particle-1 {
		top: 20%;
		left: 20%;
		animation-delay: 0s;
	}

	.particle-2 {
		top: 60%;
		right: 30%;
		animation-delay: 2s;
	}

	.particle-3 {
		bottom: 30%;
		left: 40%;
		animation-delay: 4s;
	}

	@keyframes float {
		0%, 100% {
			transform: translateY(0) translateX(0);
			opacity: 0;
		}
		10% {
			opacity: 1;
		}
		90% {
			opacity: 1;
		}
		100% {
			transform: translateY(-100px) translateX(50px);
			opacity: 0;
		}
	}

	/* Responsive grid adjustments */
	@media (min-width: 640px) {
		.auto-rows-\[minmax\(120px\,auto\)\] {
			grid-auto-rows: minmax(150px, auto);
		}
	}

	@media (min-width: 1024px) {
		.auto-rows-\[minmax\(120px\,auto\)\] {
			grid-auto-rows: minmax(180px, auto);
		}
	}
</style>