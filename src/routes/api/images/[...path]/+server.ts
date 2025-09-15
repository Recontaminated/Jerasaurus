import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const STRAPI_BASE = 'https://jerasaurus-strapi-production.up.railway.app';

export const GET: RequestHandler = async ({ params, fetch, setHeaders }) => {
	try {
		const imagePath = params.path;

		if (!imagePath) {
			throw error(400, 'Image path is required');
		}

		// Construct the full Strapi URL
		const imageUrl = `${STRAPI_BASE}/${imagePath}`;

		// Fetch image from Strapi
		const response = await fetch(imageUrl);

		if (!response.ok) {
			if (response.status === 404) {
				throw error(404, 'Image not found');
			}
			throw error(response.status, `Failed to fetch image: ${response.statusText}`);
		}

		// Get the image data
		const imageBuffer = await response.arrayBuffer();
		const contentType = response.headers.get('content-type') || 'image/jpeg';

		// Set caching headers
		setHeaders({
			'Content-Type': contentType,
			'Cache-Control': 'public, max-age=31536000, immutable',
			'X-Content-Type-Options': 'nosniff'
		});

		return new Response(imageBuffer, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=31536000, immutable'
			}
		});

	} catch (err) {
		console.error('Error proxying image:', err);

		if (err?.status) {
			throw err;
		}

		throw error(500, 'Failed to load image');
	}
};