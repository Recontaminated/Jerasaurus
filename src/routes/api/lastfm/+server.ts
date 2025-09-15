import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

const LASTFM_API_KEY = env.LASTFM_API_KEY;
const LASTFM_USERNAME = env.LASTFM_USERNAME;
const GEMINI_API_KEY = env.GEMINI_API_KEY;

// Cache for storing the last fetched track
let cache: {
	data: any;
	timestamp: number;
} | null = null;

const CACHE_DURATION = 30 * 1000; // 30 seconds in milliseconds

// Default safe track to show
const SAFE_TRACK = {
	nowPlaying: false,
	name: "Don't Stop Believin'",
	artist: "Journey",
	album: "Escape",
	url: "https://www.last.fm/music/Journey/_/Don%27t+Stop+Believin%27",
	image: null,
	loved: false,
	date: null
};

async function isSongAppropriate(songName: string, artist: string): Promise<boolean> {
	if (!GEMINI_API_KEY) {
		// If no Gemini API key, assume song is appropriate
		return true;
	}

	try {
		const prompt = `Analyze if the song "${songName}" by "${artist}" is appropriate for a professional portfolio website. Consider explicit content, profanity, drug references, violence, or controversial themes. Return your assessment.`;

		const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				'X-goog-api-key': GEMINI_API_KEY
			},
			body: JSON.stringify({
				contents: [
					{
						parts: [
							{
								text: prompt
							}
						]
					}
				],
				generationConfig: {
					responseMimeType: 'application/json',
					responseSchema: {
						type: 'object',
						properties: {
							appropriate: {
								type: 'boolean',
								description: 'Whether the song is appropriate for a professional portfolio'
							},
							reason: {
								type: 'string',
								description: 'Brief explanation of the decision'
							}
						},
						required: ['appropriate'],
						propertyOrdering: ['appropriate', 'reason']
					}
				}
			})
		});

		if (!response.ok) {
			console.error('Gemini API error:', response.status);
			// If Gemini fails, be conservative and show safe track
			return false;
		}

		const result = await response.json();
		const assessment = JSON.parse(result.candidates?.[0]?.content?.parts?.[0]?.text || '{}');

		console.log(`Song assessment for "${songName}" by "${artist}":`, assessment);

		return assessment.appropriate === true;
	} catch (error) {
		console.error('Error checking song appropriateness:', error);
		// If error, be conservative and show safe track
		return false;
	}
}

export const GET: RequestHandler = async () => {
	try {
		// Check cache first
		if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
			return json(cache.data);
		}

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
			// Cache and return null
			cache = {
				data: { nowPlaying: null },
				timestamp: Date.now()
			};
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

		// Check if song is appropriate
		const isAppropriate = await isSongAppropriate(trackData.name, trackData.artist);

		const finalTrackData = isAppropriate ? trackData : SAFE_TRACK;

		// Cache the result
		cache = {
			data: finalTrackData,
			timestamp: Date.now()
		};

		return json(finalTrackData);
	} catch (error) {
		console.error('Failed to fetch Last.fm data:', error);
		// Cache and return safe track on error
		cache = {
			data: SAFE_TRACK,
			timestamp: Date.now()
		};
		return json(SAFE_TRACK);
	}
};