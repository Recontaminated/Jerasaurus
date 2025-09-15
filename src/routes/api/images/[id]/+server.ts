import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params, url, setHeaders, fetch }) => {
	try {
		const encodedUrl = params.id;

		if (!encodedUrl) {
			throw error(400, 'Image URL is required');
		}

		// Decode the S3 URL
		const s3Url = decodeURIComponent(encodedUrl);
		console.log('Image proxy - decoded parameter:', s3Url);

		// Check if it's a full URL or just an ID
		let imageUrl: string;
		if (s3Url.startsWith('http://') || s3Url.startsWith('https://')) {
			imageUrl = s3Url;
			console.log('Using full S3 URL:', imageUrl);
		} else {
			// If just an ID/filename was passed, this shouldn't happen with current setup
			console.error('Received non-URL parameter:', s3Url);
			throw error(400, 'Invalid image URL format');
		}

		// Fetch image from S3 using event.fetch for proper handling
		const response = await fetch(imageUrl);
		console.log('S3 response status:', response.status, response.statusText);
		
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
