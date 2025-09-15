import type { PageServerLoad } from './$types';
import { getBlogPosts } from '$lib/strapi.js';

export const load: PageServerLoad = async () => {
	try {
		const posts = await getBlogPosts();

		return {
			posts: posts.map(post => ({
				attributes: {
					slug: post.slug,
					title: post.title,
					description: '',
					updatedAt: post.date || post.updatedAt,
					shortenedDate: new Date(post.date || post.updatedAt).toLocaleDateString()
				},
				headerImage: post.cover?.url ? `/api/images${post.cover.url}` : null
			}))
		};
	} catch (error) {
		console.error('Error loading blog posts:', error);
		return {
			posts: []
		};
	}
};
