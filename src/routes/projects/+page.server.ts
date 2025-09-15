import type { PageServerLoad } from './$types';
import { getProjects } from '$lib/keystone.js';

export const load: PageServerLoad = async () => {
	try {
		const projects = await getProjects({
			orderBy: [{ name: 'asc' }]
		});

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
