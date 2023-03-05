import type { PageServerLoad } from './$types';
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
	const posts = await fetch('http://localhost:1337/api/posts');
	const json = await posts.json();
	return { json };
};
