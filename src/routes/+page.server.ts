import type { PageServerLoad } from './$types';
import { getProjects } from '$lib/strapi.js';

export const load: PageServerLoad = async () => {
	try {
		const projects = await getProjects();

		return {
			projects: projects.slice(0, 4)
		};
	} catch (error) {
		console.error('Error loading projects for landing page:', error);
		return {
			projects: []
		};
	}
};