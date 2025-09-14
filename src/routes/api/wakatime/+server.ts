import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

// Store the API token server-side only
const WAKATIME_API_TOKEN = env.WAKATIME_API_TOKEN;

export const GET: RequestHandler = async () => {
	try {
		if (!WAKATIME_API_TOKEN) {
			throw new Error('WakaTime token not configured');
		}
		// Encode the API key as Base64 for Basic auth
		const base64Token = Buffer.from(WAKATIME_API_TOKEN).toString('base64');

		const response = await fetch('https://wakaapi.jhsieh.dev/api/compat/wakatime/v1/users/current/stats/week', {
			headers: {
				'Accept': 'application/json',
				'Authorization': `Basic ${base64Token}`
			}
		});

		if (!response.ok) {
			throw new Error(`WakaTime API responded with status ${response.status}`);
		}

		const data = await response.json();

		return json(data);
	} catch (error) {
		console.error('Failed to fetch WakaTime data:', error);
		return json({ error: 'Failed to fetch WakaTime data' }, { status: 500 });
	}
};