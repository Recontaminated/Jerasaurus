<script lang="ts">
	let { data } = $props();
	let projects = data.projects;

	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return `${monthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
	}

	function getImageUrl(imageUrl: string | undefined): string | undefined {
		if (!imageUrl) return undefined;
		// If it's already a full URL, return as is
		if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
			return imageUrl;
		}
		// Otherwise, proxy through our API
		return `/api/images${imageUrl.startsWith('/') ? imageUrl : '/' + imageUrl}`;
	}
</script>

<section class="mx-auto max-w-6xl px-6 py-20 sm:py-28">
	<div class="mb-12">
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Projects</h1>
		<p class="text-white/60 text-lg">A collection of things I've built and worked on.</p>
	</div>

	{#if projects && projects.length > 0}
		<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<a 
					href="/projects/{project.id}"
					class="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1"
				>
					<!-- Cover/Hero Image -->
					{#if getImageUrl(project.cover?.url || project.heroimage?.url)}
						<div class="aspect-video w-full overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20">
							<img
								src={getImageUrl(project.cover?.url || project.heroimage?.url)}
								alt={(project.cover?.alternativeText || project.heroimage?.alternativeText) || project.name}
								class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
								loading="lazy"
							/>
						</div>
					{:else}
						<div class="aspect-video w-full overflow-hidden bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center">
							<div class="text-white/20">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
								</svg>
							</div>
						</div>
					{/if}

					<div class="p-6">
						<!-- Header -->
						<div class="mb-4">
							<h2 class="text-xl font-bold bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300 mb-2">
								{project.name}
							</h2>

							<span class="text-sm text-white/50">
								{formatDate(project.createdAt)}
							</span>
						</div>

						<!-- Description -->
						{#if project.description}
							<p class="text-white/70 text-sm mb-4 line-clamp-2">
								{project.description}
							</p>
						{:else}
							<p class="text-white/50 text-sm mb-4 italic">
								No description available
							</p>
						{/if}

						<!-- Tags -->
						{#if project.tags && project.tags.length > 0}
							<div class="flex flex-wrap gap-2 mb-4">
								{#each project.tags as tag}
									<span class="px-2 py-1 text-xs font-medium bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
										{tag.name || tag}
									</span>
								{/each}
							</div>
						{/if}

						<!-- Blog Posts -->
						{#if project.blog_posts && project.blog_posts.length > 0}
							<div class="border-t border-white/10 pt-4">
								<div class="text-xs text-white/50 mb-2">
									Related Posts ({project.blog_posts.length})
								</div>
								<div class="space-y-1">
									{#each project.blog_posts.slice(0, 2) as post}
										<div class="text-sm text-white/60 truncate">
											• {post.title}
										</div>
									{/each}
									{#if project.blog_posts.length > 2}
										<div class="text-xs text-white/40">
											+{project.blog_posts.length - 2} more
										</div>
									{/if}
								</div>
							</div>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	{:else}
		<div class="text-center py-16">
			<div class="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur p-12">
				<h3 class="text-xl font-semibold mb-2">No Projects Yet</h3>
				<p class="text-white/60">Check back soon for updates!</p>
			</div>
		</div>
	{/if}
</section>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
