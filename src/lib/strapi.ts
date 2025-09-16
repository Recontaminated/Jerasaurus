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
	id: number | string;
	name: string;
	description: string;
	cover?: {
		url: string;
		alternativeText?: string;
	};
	heroimage?: {
		url: string;
		alternativeText?: string;
	};
	tags?: any[];
	blog_posts?: BlogPost[];
	createdAt: string;
	updatedAt: string;
	documentId?: string;
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
			name: item.name || item.title,
			description: item.description,
			cover: item.cover,
			heroimage: item.heroimage,
			tags: (item.tags || []).map((tag: any) => {
				if (typeof tag === 'string') return tag;
				return tag.name || tag.title || tag.tag || JSON.stringify(tag);
			}),
			blog_posts: item.blog_posts?.data || item.blog_posts || [],
			createdAt: item.createdAt,
			updatedAt: item.updatedAt,
			documentId: item.documentId
		}));
	} catch (error) {
		console.error('Error fetching projects:', error);
		return [];
	}
}

export async function getProject(id: string): Promise<Project | null> {
	try {
		const projects = strapi.collection('projects');
		const response = await projects.findOne(id, {
			populate: '*'
		});

		if (!response || !response.data) {
			return null;
		}

		const item = response.data;
		return {
			id: item.documentId || item.id,
			name: item.name || item.title,
			description: item.description,
			cover: item.cover,
			heroimage: item.heroimage,
			tags: (item.tags || []).map((tag: any) => {
				if (typeof tag === 'string') return tag;
				return tag.name || tag.title || tag.tag || JSON.stringify(tag);
			}),
			blog_posts: item.blog_posts?.data || item.blog_posts || [],
			createdAt: item.createdAt,
			updatedAt: item.updatedAt,
			documentId: item.documentId
		};
	} catch (error) {
		console.error('Error fetching project:', error);
		return null;
	}
}