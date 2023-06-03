
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

    const json = await res.json();

    if (json.data.length === 0) {
        throw  error(404, 'Not found')

    }
    const compiled = converter.makeHtml(json.data[0].attributes.content)
    return {
        json,
        content: compiled
    }
}