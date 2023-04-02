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
export const load: PageServerLoad = async ({ params }) => {
	const posts = await fetch(`${env.STRAPI_HOST}/api/posts`);
	const json = await posts.json();
	return { json };
};
