import type { PageServerLoad } from './$types';
import { getProjects } from '$lib/strapi.js';

export const load: PageServerLoad = async () => {
	try {
		const projects = await getProjects();

		return {
			projects
		};
	} catch (error) {
		console.error('Error loading projects:', error);
		return {
			projects: []
		};
	}
};
