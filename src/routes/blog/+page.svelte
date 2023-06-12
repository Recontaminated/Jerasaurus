<script>
	import Header from "$lib/components/Header.svelte";
	export let data;
	//parse data.json
	let posts = data.json;


</script>

<Header></Header>
<div class="my-4">
	<h1 class="text-center text-3xl font-bold">Blog Posts</h1>
</div>
<div class="content-container mx-auto mt-4">
	<div class="split">
		<div class="articles">
			{#each posts as post}
				<a class="post" href="/blog/{post.attributes.slug}">
					<h3 class="post-title">{post.attributes.title}</h3>


					<p class="date"> {post.attributes.shortenedDate}</p>
				</a>


			{/each}
		</div>
		<div class="sidebar">
			<aside>
				<div class="card post-tags">
					<h3>Tags: <br><br>(none yet :))</h3>
				</div>
			</aside>
		</div>
	</div>

</div>
<style>
	a.post:hover .post-title {

		/*background: var(--organizationGray);*/

		text-decoration: underline;
	}
	.date{
		font-family: Menlo,monospace;
		font-weight: 500;
		font-size: 18px;
		color: #4edd8b;
		margin-top: auto;
		margin-bottom: auto;
		margin-left: auto;
		display: inline;
	}
	a.post {
		background: transparent;
		border-bottom: 1px solid var(--organizationGray);
		display: flex;
		gap: 1rem;
		padding: 0.6rem 0;
		text-decoration: none;
	}
	a.post h3 {
		font-size: 1.5rem;
		font-weight: 600;
		color: var(--gray1);
		margin-bottom: 0;

	}
	.card {
		background: #1f1f1f;
		border: 1px solid var(--organizationGray);
		border-radius: 6px;
		margin: 1rem 0;
		padding: 1.5rem;
	}

		.split	 {
			display: grid;
			gap: 6rem;
			grid-template-columns: auto 300px;
		}




</style>
