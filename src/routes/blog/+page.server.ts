import type { PageServerLoad } from './$types';
import { env } from '$env/dynamic/private';
//    export async function load({ params }){
//   const post = await getPostFromDatabase(params.slug);
//
//   if (post) {
//     return post;
//   }
//
// }
//write the commented function but correctly typed with pageServerLoad
type StrapiPost = {
	attributes: {
		slug: string;
		title: string;
		description?: string;
		updated?: string;
		updatedAt: string;
	};
};

type PostSummary = {
	attributes: {
		slug: string;
		title: string;
		description?: string;
		updatedAt: Date;
		shortenedDate: string;
	};
};

export const load: PageServerLoad = async () => {
	const res = await fetch(`${env.STRAPI_HOST}/api/posts`);
	const raw = (await res.json()) as { data: StrapiPost[] };

	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	const json: PostSummary[] = raw.data
		.map((post: StrapiPost) => {
			const updatedStr = post.attributes.updated ?? post.attributes.updatedAt;
			const date = new Date(updatedStr);
			const shortenedDate = `${monthNames[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
			return {
				attributes: {
					slug: post.attributes.slug,
					title: post.attributes.title,
					description: post.attributes.description,
					updatedAt: date,
					shortenedDate
				}
			} as PostSummary;
		})
		.sort((a: PostSummary, b: PostSummary) => b.attributes.updatedAt.getTime() - a.attributes.updatedAt.getTime());

	return { json };
};
