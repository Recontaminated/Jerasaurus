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
	let json = await posts.json();

	json = json.data.map((post) => {
		return {
			attributes: {
				slug: post.attributes.slug,
				title: post.attributes.title,
				description: post.attributes.description,
			}
		}
	});
	console.log(json);
	return { json };
};
