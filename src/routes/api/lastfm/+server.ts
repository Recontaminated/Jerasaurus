import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

const LASTFM_API_KEY = env.LASTFM_API_KEY;
const LASTFM_USERNAME = env.LASTFM_USERNAME;

export const GET: RequestHandler = async () => {
	try {
		if (!LASTFM_API_KEY || !LASTFM_USERNAME) {
			throw new Error('Last.fm credentials not configured');
		}

		const url = new URL('https://ws.audioscrobbler.com/2.0/');
		url.searchParams.append('method', 'user.getrecenttracks');
		url.searchParams.append('user', LASTFM_USERNAME);
		url.searchParams.append('api_key', LASTFM_API_KEY);
		url.searchParams.append('format', 'json');
		url.searchParams.append('limit', '1');
		url.searchParams.append('extended', '1');

		const response = await fetch(url.toString(), {
			headers: {
				'Accept': 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(`Last.fm API responded with status ${response.status}`);
		}

		const data = await response.json();

		if (data.error) {
			throw new Error(`Last.fm API error: ${data.message}`);
		}

		const recentTracks = data.recenttracks?.track;
		if (!recentTracks || recentTracks.length === 0) {
			return json({ nowPlaying: null });
		}

		const track = Array.isArray(recentTracks) ? recentTracks[0] : recentTracks;

		const nowPlaying = track['@attr']?.nowplaying === 'true';

		const trackData = {
			nowPlaying,
			name: track.name,
			artist: track.artist?.name || track.artist?.['#text'] || 'Unknown Artist',
			album: track.album?.['#text'] || null,
			url: track.url,
			image: track.image?.[track.image.length - 1]?.['#text'] || null,
			loved: track.loved === '1',
			date: track.date ? {
				uts: track.date.uts,
				text: track.date['#text']
			} : null
		};

		return json(trackData);
	} catch (error) {
		console.error('Failed to fetch Last.fm data:', error);
		return json({ error: 'Failed to fetch Last.fm data' }, { status: 500 });
	}
};