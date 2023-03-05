
import type { PageServerLoad } from './$types';
import {error} from "@sveltejs/kit";
import showdown from "showdown";
const converter = new showdown.Converter();
export const load: PageServerLoad = async ({ params }) => {
// console.log(params)
// console.log(params.slug)
    // // Now, we'll fetch the blog post from Strapi
    const res = await fetch(`http://localhost:1337/api/posts?filters[slug][$eq]=${params.slug}`);

    const json = await res.json();

    console.log(json.data.length)
    if (json.data.length === 0) {
        throw  error(404, 'Not found')

    }
    console.log(json.data[0].attributes.content)
    const compiled = converter.makeHtml(json.data[0].attributes.content)
    console.log(compiled)
    return {
        status: 200,
        json,
        content: compiled
    }
}