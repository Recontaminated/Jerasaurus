<script lang="ts">
	let { data } = $props();
	let projects = data.projects;
	
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return `${monthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
	}
</script>

<section class="mx-auto max-w-6xl px-6 py-20 sm:py-28">
	<div class="mb-12">
		<h1 class="text-4xl font-bold tracking-tight sm:text-5xl mb-4">Projects</h1>
		<p class="text-white/60 text-lg">A collection of things I've built and worked on.</p>
	</div>

	{#if projects && projects.length > 0}
		<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
			{#each projects as project}
				<a 
					href="/projects/{project.id}"
					class="group block overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur transition-all hover:bg-white/10 hover:border-white/20"
				>
					<!-- Hero Image -->
					{#if project.heroimage?.url}
						<div class="aspect-video w-full overflow-hidden bg-white/5">
							<img
								src={project.heroimage.url}
								alt={project.heroimage.alternativeText || project.name}
								class="h-full w-full object-cover transition-transform group-hover:scale-105"
								loading="lazy"
							/>
						</div>
					{/if}

					<div class="p-6">
						<!-- Header -->
						<div class="mb-4">
							<h2 class="text-xl font-semibold group-hover:text-blue-400 transition-colors mb-2">
								{project.name}
							</h2>

							<span class="text-sm text-white/50">
								{formatDate(project.createdAt)}
							</span>
						</div>

						<!-- Description -->
						{#if project.description}
							<p class="text-white/70 text-sm mb-4 line-clamp-3">
								{project.description}
							</p>
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
	.line-clamp-3 {
		display: -webkit-box;
		-webkit-line-clamp: 3;
		line-clamp: 3;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
