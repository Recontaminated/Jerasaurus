import type { PageServerLoad } from './$types';
import { getBlogPost } from '$lib/strapi.js';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const post = await getBlogPost(params.slug);

		if (!post) {
			throw error(404, 'Post not found');
		}

		return {
			post: {
				id: post.id,
				title: post.title,
				content: post.content,
				date: post.date || post.updatedAt,
				shortenedDate: new Date(post.date || post.updatedAt).toLocaleDateString(),
				headerImage: post.cover?.url ? `/api/images${post.cover.url}` : null,
				project: null,
				author: null,
				description: ''
			}
		};
	} catch (err) {
		console.error('Error loading blog post:', err);
		if (err?.status === 404) {
			throw err;
		}
		throw error(500, 'Failed to load post');
	}
};
