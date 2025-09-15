<script lang="ts">
	let { data } = $props();
	let posts = data.posts;
</script>

<section class="mx-auto max-w-4xl px-6 py-20 sm:py-28">
	<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
	<p class="mt-3 text-white/60">Thoughts and notes. Same dark glass style as the home page.</p>

	<div class="mt-10 overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur">
		{#if posts && posts.length}
			{#each posts as post}
				<a class="group block border-b border-white/10 p-6 last:border-0 sm:p-8 transition-colors hover:bg-white/5" href="/blog/{post.attributes.slug}">
					<div class="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-6">
						<div class="text-sm text-white/50 w-32 shrink-0">{post.attributes.shortenedDate}</div>
						<div class="flex-1">
							<h2 class="text-xl font-semibold group-hover:underline">{post.attributes.title}</h2>
							{#if post.attributes.description}
								<p class="mt-1 text-white/70">{post.attributes.description}</p>
							{/if}
						</div>
					</div>
				</a>
			{/each}
		{:else}
			<div class="p-8 text-white/70">No posts yet.</div>
		{/if}
	</div>
</section>


