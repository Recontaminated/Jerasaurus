import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { env } from '$env/dynamic/private';

const KEYSTONE_URL = env.KEYSTONE_URL || 'http://localhost:3000';

export const GET: RequestHandler = async ({ params, url, setHeaders }) => {
	try {
		const imageId = params.id;
		
		if (!imageId) {
			throw error(400, 'Image ID is required');
		}

		// Extract query parameters for image transformations
		const width = url.searchParams.get('w');
		const height = url.searchParams.get('h');
		const quality = url.searchParams.get('q');
		const format = url.searchParams.get('f');

		// Build Keystone image URL
		let keystoneImageUrl = `${KEYSTONE_URL}/images/${imageId}`;
		
		// Add query parameters if provided
		const searchParams = new URLSearchParams();
		if (width) searchParams.set('width', width);
		if (height) searchParams.set('height', height);
		if (quality) searchParams.set('quality', quality);
		if (format) searchParams.set('format', format);
		
		if (searchParams.toString()) {
			keystoneImageUrl += `?${searchParams.toString()}`;
		}

		// Fetch image from Keystone
		const response = await fetch(keystoneImageUrl);
		
		if (!response.ok) {
			if (response.status === 404) {
				throw error(404, 'Image not found');
			}
			throw error(response.status, `Failed to fetch image: ${response.statusText}`);
		}

		// Get the image data
		const imageBuffer = await response.arrayBuffer();
		const contentType = response.headers.get('content-type') || 'image/jpeg';
		const contentLength = response.headers.get('content-length');
		const lastModified = response.headers.get('last-modified');
		const etag = response.headers.get('etag');

		// Set caching headers
		setHeaders({
			'Content-Type': contentType,
			'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
			'X-Content-Type-Options': 'nosniff'
		});

		// Set optional headers if they exist
		if (contentLength) {
			setHeaders({ 'Content-Length': contentLength });
		}
		if (lastModified) {
			setHeaders({ 'Last-Modified': lastModified });
		}
		if (etag) {
			setHeaders({ 'ETag': etag });
		}

		return new Response(imageBuffer, {
			headers: {
				'Content-Type': contentType,
				'Cache-Control': 'public, max-age=31536000, immutable',
				'X-Content-Type-Options': 'nosniff',
				...(contentLength && { 'Content-Length': contentLength }),
				...(lastModified && { 'Last-Modified': lastModified }),
				...(etag && { 'ETag': etag })
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
