import type { PageServerLoad } from './$types';
import { getProject } from '$lib/keystone.js';
import { error } from '@sveltejs/kit';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const project = await getProject(params.id);
		
		if (!project) {
			throw error(404, 'Project not found');
		}

		return { 
			project 
		};
	} catch (err) {
		console.error('Error loading project:', err);
		if (err?.status === 404) {
			throw err;
		}
		throw error(500, 'Failed to load project');
	}
};
