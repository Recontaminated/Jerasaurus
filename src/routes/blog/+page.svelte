<script lang="ts">
	let { data } = $props();
	let posts = data.posts;
</script>

<section class="mx-auto max-w-4xl px-6 py-20 sm:py-28">
	<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
	<p class="mt-3 text-white/60">Thoughts and notes. Same dark glass style as the home page.</p>

	<div class="mt-10 space-y-6">
		{#if posts && posts.length}
			{#each posts as post}
				<a class="group block relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-all duration-300 hover:bg-white/10 hover:border-white/20" href="/blog/{post.attributes.slug}">
					<div class="relative flex min-h-[120px]">
						<!-- Content Area with Gradient Blend -->
						<div class="relative z-10 flex-1 p-6 sm:p-8">
							<!-- Gradient overlay that blends content into image -->
							<div class="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-900/95 via-60% to-transparent pointer-events-none"></div>
							
							<div class="relative z-10 flex flex-col justify-center h-full max-w-2xl">
								<div class="text-sm text-white/50 mb-2">{post.attributes.shortenedDate}</div>
								<h2 class="text-xl font-semibold group-hover:text-blue-400 transition-colors mb-2">{post.attributes.title}</h2>
								{#if post.attributes.description}
									<p class="text-white/70 text-sm line-clamp-2">{post.attributes.description}</p>
								{/if}
							</div>
						</div>
						
						<!-- Header Image on Right -->
						{#if post.headerImage?.url}
							<div class="absolute inset-0 w-full">
								<img 
									src={post.headerImage.url}
									alt={post.attributes.title}
									class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
									loading="lazy"
								/>
							</div>
						{/if}
					</div>
				</a>
			{/each}
		{:else}
			<div class="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-8 text-white/70">No posts yet.</div>
		{/if}
	</div>
	
	<style>
		.line-clamp-2 {
			display: -webkit-box;
			-webkit-line-clamp: 2;
			line-clamp: 2;
			-webkit-box-orient: vertical;
			overflow: hidden;
		}
	</style>
</section>


