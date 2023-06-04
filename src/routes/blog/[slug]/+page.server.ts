
import type { PageServerLoad } from './$types';
import {error} from "@sveltejs/kit";
import showdown from "showdown";
const converter = new showdown.Converter();

import { env } from '$env/dynamic/private';
export const load: PageServerLoad = async ({ params }) => {
// console.log(params)
// console.log(params.slug)
    // // Now, we'll fetch the blog post from Strapi
    const res = await fetch(`${env.STRAPI_HOST}/api/posts?filters[slug][$eq]=${params.slug}&populate=*`);

    let json = await res.json();

    if (json.data.length === 0) {
        throw  error(404, 'Not found')

    }
    const compiled = converter.makeHtml(json.data[0].attributes.content)

    json = json.data[0];
    let date;
    if (json.attributes?.updated) {
        date = new Date(json.attributes.updated);
    }
    else {
        date = new Date(json.attributes.updatedAt);
    }




    return {
        json: {
            updated: `${date.getUTCFullYear()}-${date.getUTCMonth()}-${date.getUTCDate()}`,
            blogArt: json.attributes?.blogArt,
            title: json.attributes.title,
            description: json.attributes.description,

        },
        content: compiled
    }
}