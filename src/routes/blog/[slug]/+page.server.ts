import type { PageServerLoad } from './$types';
import { getBlogPostBySlug } from '$lib/keystone.js';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const post = await getBlogPostBySlug(params.slug);
		
		if (!post) {
			throw error(404, 'Post not found');
		}

		return { 
			post: {
				id: post.id,
				title: post.title,
				content: post.content,
				date: post.date,
				shortenedDate: post.shortenedDate,
				headerImage: post.headerImage,
				project: post.project,
				author: post.author,
				description: post.description
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
