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



	const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

	json = json.data.map((post) => {

		let date;
		let shortenedDate;

		if (post.attributes?.updated) {
			date = new Date(post.attributes.updated);
			shortenedDate = `${monthNames[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
		}
		else {
			date = new Date(post.attributes.updatedAt);
			shortenedDate = `${monthNames[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
		}

		return {
			attributes: {
				slug: post.attributes.slug,
				title: post.attributes.title,
				description: post.attributes.description,
				updatedAt : date,
				shortenedDate: shortenedDate,
			}
		}
	}).sort(function(a,b){
		return a.date - b.date
	});
	return { json };
};
