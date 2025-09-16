import type { PageServerLoad } from './$types';
import { getProjects } from '$lib/strapi.js';

export const load: PageServerLoad = async () => {
	try {
		const projects = await getProjects();

		// Filter for featured projects (those with "featured" tag - case insensitive)
		const featuredProjects = projects.filter(project =>
			project.tags?.some(tag =>
				tag.toLowerCase().includes('featured')
			)
		);

		return {
			projects: featuredProjects
		};
	} catch (error) {
		console.error('Error loading projects for landing page:', error);
		return {
			projects: []
		};
	}
};