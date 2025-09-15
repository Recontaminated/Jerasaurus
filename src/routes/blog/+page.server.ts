import type { PageServerLoad } from './$types';
import { getBlogPosts } from '$lib/keystone.js';

export const load: PageServerLoad = async () => {
	try {
		const posts = await getBlogPosts({
			orderBy: [{ date: 'desc' as const }]
		});

		return { 
			posts: posts.map(post => ({
				attributes: {
					slug: post.slug,
					title: post.title,
					description: post.description,
					updatedAt: post.date,
					shortenedDate: post.shortenedDate
				}
			}))
		};
	} catch (error) {
		console.error('Error loading blog posts:', error);
		return { 
			posts: [] 
		};
	}
};
