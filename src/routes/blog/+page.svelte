<script lang="ts">
	let { data } = $props();
	let posts = data.posts;

	function formatDate(dateString: string | undefined): string {
		if (!dateString) return '';
		try {
			const date = new Date(dateString);
			if (isNaN(date.getTime())) return '';
			const monthNames = ["January", "February", "March", "April", "May", "June",
							   "July", "August", "September", "October", "November", "December"];
			return `${monthNames[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
		} catch {
			return '';
		}
	}
</script>

<section class="relative mx-auto max-w-6xl px-6 py-20 sm:py-28">
	<!-- Background decorations -->
	<div class="absolute inset-0 -z-10 overflow-visible">
		<div class="absolute -left-40 top-0 h-96 w-96 bg-purple-500/10 blur-3xl"></div>
		<div class="absolute -right-40 top-40 h-96 w-96 bg-blue-500/10 blur-3xl"></div>
		<div class="absolute -left-40 bottom-0 h-96 w-96 bg-blue-500/10 blur-3xl"></div>
	</div>

	<!-- Header Section -->
	<div class="mb-16">
		<div class="mb-8">
			<span class="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur">
				<span class="text-sm text-white/60">Writing & Thoughts</span>
			</span>
		</div>

		<h1 class="text-3xl sm:text-4xl font-bold text-white/90 mb-4">
			Welcome to my Blog!
		</h1>
		<p class="text-lg text-white/60 max-w-3xl">
			Articles about development, technology, and some stuff I've learned along the way.
		</p>
	</div>

	<!-- Posts Grid -->
	<div class="grid gap-8 md:grid-cols-2">
		{#if posts && posts.length}
			{#each posts as post}
				{@const formattedDate = formatDate(post.attributes.date || post.attributes.createdAt)}
				<a
					href="/blog/{post.attributes.slug}"
					class="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10"
				>
					<!-- Gradient overlay on hover -->
					<div class="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-600/0 opacity-0 transition-opacity group-hover:opacity-10"></div>

					<div class="relative">
						<!-- Featured Image with Gradient Blend -->
						<div class="aspect-video overflow-hidden bg-gradient-to-br from-purple-600/20 to-blue-600/20 relative">
							{#if post.headerImage}
								<img
									src={post.headerImage}
									alt={post.attributes.title}
									class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
									loading="lazy"
								/>
								<!-- Gradient overlay that blends image into content -->
								<div class="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/50 to-transparent"></div>
							{:else}
								<div class="absolute inset-0 flex items-center justify-center">
									<div class="text-white/20">
										<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
										</svg>
									</div>
								</div>
							{/if}
						</div>

						<!-- Content -->
						<div class="p-6 space-y-4">
							<div class="flex items-center gap-3 flex-wrap">
								{#if formattedDate}
									<time class="text-xs text-white/40 uppercase tracking-wider" datetime={post.attributes.date || post.attributes.createdAt}>
										{formattedDate}
									</time>
								{/if}
								{#if post.attributes.tags && post.attributes.tags.length > 0}
									{#if formattedDate}<span class="text-white/20">•</span>{/if}
									<div class="flex gap-2 flex-wrap">
										{#each post.attributes.tags.slice(0, 2) as tag}
											<span class="text-xs text-purple-400/60 px-2 py-0.5 rounded-full border border-purple-400/20 bg-purple-400/10">
												{tag}
											</span>
										{/each}
									</div>
								{/if}
							</div>

							<h2 class="text-xl font-semibold text-white/90 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all">
								{post.attributes.title}
							</h2>

							{#if post.attributes.description}
								<p class="text-white/60 text-sm line-clamp-3 leading-relaxed">
									{post.attributes.description}
								</p>
							{/if}

							<div class="pt-3">
								<span class="inline-flex items-center gap-2 text-sm text-white/60 group-hover:text-white/80 transition-colors">
									Read article
									<svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
									</svg>
								</span>
							</div>
						</div>
					</div>
				</a>
			{/each}
		{:else}
			<div class="col-span-full">
				<div class="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-12 text-center">
					<div class="mx-auto mb-4 h-16 w-16 rounded-full bg-white/5 flex items-center justify-center">
						<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
						</svg>
					</div>
					<h3 class="text-xl font-semibold text-white/90 mb-2">No posts yet</h3>
					<p class="text-white/60">Check back soon for new articles and updates.</p>
				</div>
			</div>
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


