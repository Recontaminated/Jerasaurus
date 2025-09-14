<script lang="ts">
	import { onMount } from 'svelte';

	interface TrackData {
		nowPlaying: boolean;
		name: string;
		artist: string;
		album?: string | null;
		url: string;
		image?: string | null;
		loved: boolean;
		date?: {
			uts: string;
			text: string;
		} | null;
	}

	let trackData = $state<TrackData | null>(null);
	let loading = $state(true);
	let error = $state(false);

	async function fetchNowPlaying() {
		try {
			const response = await fetch('/api/lastfm');
			if (!response.ok) {
				throw new Error('Failed to fetch Last.fm data');
			}
			const data = await response.json();

			if (data.error) {
				error = true;
				trackData = null;
			} else {
				trackData = data;
				error = false;
			}
		} catch (err) {
			console.error('Error fetching Last.fm data:', err);
			error = true;
			trackData = null;
		} finally {
			loading = false;
		}
	}

	onMount(() => {
		fetchNowPlaying();
		// Refresh every 30 seconds
		const interval = setInterval(fetchNowPlaying, 30000);
		return () => clearInterval(interval);
	});

	function formatTimeAgo(timestamp: string): string {
		const now = Date.now();
		const then = parseInt(timestamp) * 1000;
		const diff = now - then;

		const minutes = Math.floor(diff / 60000);
		const hours = Math.floor(minutes / 60);
		const days = Math.floor(hours / 24);

		if (minutes < 1) return 'just now';
		if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;
		if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
		return `${days} day${days === 1 ? '' : 's'} ago`;
	}
</script>

<div class="p-6 bg-gray-800/50 backdrop-blur border border-gray-700 rounded-2xl hover:border-purple-500/50 transition-all duration-300">
	<div class="flex items-center gap-2 mb-4">
		<div class="flex items-center gap-2">
			{#if trackData?.nowPlaying}
				<div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
				<h3 class="text-xl font-semibold text-white">Now Playing</h3>
			{:else}
				<h3 class="text-xl font-semibold text-white">While Working I Was Listening To...</h3>
			{/if}
		</div>
		<svg class="w-5 h-5 text-red-500" viewBox="0 0 24 24" fill="currentColor">
			<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
		</svg>
		<span class="text-sm text-gray-400">Last.fm</span>
	</div>

	{#if loading}
		<div class="flex gap-4">
			<div class="w-20 h-20 bg-gray-700/30 rounded-lg animate-pulse"></div>
			<div class="flex-1 space-y-3">
				<div class="h-5 bg-gray-700/30 rounded animate-pulse w-3/4"></div>
				<div class="h-4 bg-gray-700/30 rounded animate-pulse w-1/2"></div>
				<div class="h-4 bg-gray-700/30 rounded animate-pulse w-2/3"></div>
			</div>
		</div>
	{:else if error || !trackData}
		<div class="text-gray-400 text-sm">Unable to fetch music data</div>
	{:else}
		<div class="flex gap-4">
			{#if trackData.image}
				<div class="flex-shrink-0">
					<img
						src={trackData.image}
						alt="{trackData.name} by {trackData.artist}"
						class="w-20 h-20 rounded-lg object-cover shadow-lg"
					/>
				</div>
			{:else}
				<div class="flex-shrink-0 w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
					<svg class="w-8 h-8 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
						<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z"/>
					</svg>
				</div>
			{/if}

			<div class="flex-1 min-w-0">
				<a
					href={trackData.url}
					target="_blank"
					rel="noopener noreferrer"
					class="group"
				>
					<h4 class="text-lg font-medium text-white group-hover:text-purple-400 transition-colors truncate">
						{trackData.name}
					</h4>
				</a>
				<p class="text-gray-300 truncate flex items-center gap-2">
					{trackData.artist}
					{#if trackData.loved}
						<svg class="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 24 24">
							<path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
						</svg>
					{/if}
				</p>
				{#if trackData.album}
					<p class="text-sm text-gray-400 truncate">{trackData.album}</p>
				{/if}
				<div class="mt-2 flex items-center gap-2">
					{#if trackData.nowPlaying}
						<span class="inline-flex items-center gap-1 px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
							<div class="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
							Currently playing
						</span>
					{:else if trackData.date}
						<span class="text-xs text-gray-500">
							Played {formatTimeAgo(trackData.date.uts)}
						</span>
					{/if}
				</div>
			</div>
		</div>
	{/if}
</div>