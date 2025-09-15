import { strapi as createStrapi } from '@strapi/client';
import { env } from '$env/dynamic/private';

const strapi = createStrapi({
	baseURL: env.STRAPI_URL || 'https://jerasaurus-strapi-production.up.railway.app/api',
	auth: env.STRAPI_API_TOKEN
});

export interface BlogPost {
	id: number | string;
	title: string;
	slug: string;
	content?: string;
	date: string;
	cover?: {
		url: string;
		alternativeText?: string;
	};
	tags?: any[];
	createdAt: string;
	updatedAt: string;
}

export interface Project {
	id: number;
	name: string;
	slug: string;
	description: string;
	content?: string;
	technologies?: string[];
	githubUrl?: string;
	liveUrl?: string;
	createdAt: string;
	updatedAt: string;
	image?: {
		url: string;
		alternativeText?: string;
	};
}

export async function getBlogPosts(): Promise<BlogPost[]> {
	try {
		const articles = strapi.collection('articles');
		const response = await articles.find({
			populate: '*',
			sort: 'date:desc'
		});

		return response.data.map((item: any) => ({
			id: item.documentId || item.id,
			...item,
			cover: item.cover
		}));
	} catch (error) {
		console.error('Error fetching blog posts:', error);
		return [];
	}
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
	try {
		const articles = strapi.collection('articles');
		const response = await articles.find({
			filters: {
				slug: {
					$eq: slug
				}
			},
			populate: '*'
		});

		if (!response.data || response.data.length === 0) {
			return null;
		}

		const item = response.data[0];
		return {
			id: item.documentId || item.id,
			...item,
			cover: item.cover
		};
	} catch (error) {
		console.error('Error fetching blog post:', error);
		return null;
	}
}

export async function getProjects(): Promise<Project[]> {
	try {
		const projects = strapi.collection('projects');
		const response = await projects.find({
			populate: '*',
			sort: 'createdAt:desc'
		});

		return response.data.map((item: any) => ({
			id: item.documentId || item.id,
			...item,
			image: item.image
		}));
	} catch (error) {
		console.error('Error fetching projects:', error);
		return [];
	}
}

export async function getProject(slug: string): Promise<Project | null> {
	try {
		const projects = strapi.collection('projects');
		const response = await projects.find({
			filters: {
				slug: {
					$eq: slug
				}
			},
			populate: '*'
		});

		if (!response.data || response.data.length === 0) {
			return null;
		}

		const item = response.data[0];
		return {
			id: item.documentId || item.id,
			...item,
			image: item.image
		};
	} catch (error) {
		console.error('Error fetching project:', error);
		return null;
	}
}