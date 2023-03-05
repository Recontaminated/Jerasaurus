<script>
	import { goto } from '$app/navigation';
	import Header from "$lib/components/Header.svelte";
	import '$lib/styles/style.scss';
	export let data;
	//parse data.json
	let posts = data.json;
	posts = posts.data;
</script>

<Header></Header>
<div class="my-4">
	<h1 class="text-center text-3xl font-bold">My wonderful blog</h1>
	<p>{JSON.stringify(posts)}</p>
</div>
<div class="container mx-auto mt-4">
	{#each posts as post}
		<a href="/blog/{post.attributes.slug}">
			<div class="bg-white shadow-md rounded-lg p-4 my-4 hover:bg-gray-200">
				<h2 class="text-2xl font-bold">{post.attributes.Title}</h2>
				<p>{post.attributes.description}</p>
			</div>
		</a>
		<!--        <div-->
		<!--                class="hover:bg-gray-200 cursor-pointer px-6 py-2 border-b border-gray-500"-->
		<!--                on:click={() => goto('/blog/' + post.id)}-->
		<!--        >-->
		<!--            <h4 class="font-bold">{post.attributes.Title}</h4>-->
		<!--            <p class="mt-2 text-gray-800">{post.attributes.description}</p>-->
		<!--        </div>-->
	{/each}
</div>
