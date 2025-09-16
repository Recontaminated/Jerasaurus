<script lang="ts">
	let { data } = $props();
	let project = data.project;
	
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return `${monthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
	}
</script>

<article class="relative mx-auto max-w-6xl px-6 py-20">
	<!-- Background decorations -->
	<div class="absolute inset-0 -z-10 overflow-visible">
		<div class="absolute -left-40 top-20 h-72 w-72 bg-purple-500/10 blur-3xl"></div>
		<div class="absolute -right-40 top-60 h-72 w-72 bg-blue-500/10 blur-3xl"></div>
	</div>

	<!-- Header -->
	<header class="mb-16">
		<div class="mb-8">
			<a href="/projects" class="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group">
				<svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
				</svg>
				Back to Projects
			</a>
		</div>

		<div class="space-y-8">
			<!-- Project label tag -->
			<div class="flex items-center gap-4">
				<span class="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur">
					<span class="text-sm text-white/60">Project Details</span>
				</span>
				<span class="text-sm text-white/40">
					{formatDate(project.createdAt)}
				</span>
			</div>

			<h1 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/90 tracking-tight">
				{project.name}
			</h1>

			{#if project.description}
				<div class="max-w-4xl">
					<p class="text-lg sm:text-xl text-white/70 leading-relaxed">
						{project.description}
					</p>
				</div>
			{/if}

			<!-- Project tags if available -->
			{#if project.tags && project.tags.length > 0}
				<div class="flex flex-wrap gap-2 pt-2">
					{#each project.tags as tag}
						<span class="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
							{tag}
						</span>
					{/each}
				</div>
			{/if}
		</div>
	</header>
	
	<!-- Hero Image -->
	{#if project.heroimage?.url}
		<div class="mb-16 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent p-1">
			<div class="overflow-hidden rounded-xl">
				<img
					src={project.heroimage.url}
					alt={project.heroimage.alternativeText || project.name}
					class="w-full h-auto transition-transform duration-500 hover:scale-105"
				/>
			</div>
		</div>
	{/if}

	<!-- Blog Posts Section -->
	{#if project.blog_posts && project.blog_posts.length > 0}
		<section class="mb-16">
			<div class="mb-8">
				<span class="rounded-full border border-white/10 bg-white/5 px-4 py-1.5 backdrop-blur">
					<span class="text-sm text-white/60">Related Articles</span>
				</span>
				<h2 class="text-3xl sm:text-4xl font-bold text-white/90 mt-6">Related Posts</h2>
			</div>

			<div class="grid gap-6 sm:grid-cols-2">
				{#each project.blog_posts as post}
					<a
						href="/blog/{post.slug}"
						class="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/5 to-transparent backdrop-blur transition-all hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10"
					>
						<!-- Gradient overlay on hover -->
						<div class="absolute inset-0 bg-gradient-to-r from-purple-600/0 to-blue-600/0 opacity-0 transition-opacity group-hover:opacity-10"></div>

						<div class="relative">
							{#if post.cover?.url}
								<div class="aspect-video overflow-hidden bg-white/5">
									<img
										src={post.cover.url}
										alt={post.title}
										class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
									/>
								</div>
							{/if}

							<div class="p-6 space-y-3">
								{#if post.date}
									<time class="text-xs text-white/40 uppercase tracking-wider" datetime={post.date}>
										{formatDate(post.date)}
									</time>
								{/if}

								<h3 class="text-xl font-semibold text-white/90 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-blue-400 group-hover:bg-clip-text transition-all">
									{post.title}
								</h3>

								{#if post.content}
									<p class="text-white/60 text-sm line-clamp-3 leading-relaxed">
										{post.content.substring(0, 200)}...
									</p>
								{/if}

								<div class="pt-3">
									<span class="inline-flex items-center gap-2 text-sm text-white/60 group-hover:text-white/80 transition-colors">
										Read more
										<svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
										</svg>
									</span>
								</div>
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>
	{/if}
	
	<!-- Additional Project Info -->
	{#if project.technologies || project.github || project.live_url}
		<section class="mb-16 rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur">
			<h3 class="text-xl font-semibold text-white/90 mb-6">Project Information</h3>
			<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#if project.technologies}
					<div>
						<h4 class="text-sm text-white/40 uppercase tracking-wider mb-2">Technologies</h4>
						<p class="text-white/70">{project.technologies}</p>
					</div>
				{/if}
				{#if project.github}
					<div>
						<h4 class="text-sm text-white/40 uppercase tracking-wider mb-2">Source Code</h4>
						<a href={project.github} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
							<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
								<path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
							</svg>
							View on GitHub
						</a>
					</div>
				{/if}
				{#if project.live_url}
					<div>
						<h4 class="text-sm text-white/40 uppercase tracking-wider mb-2">Live Demo</h4>
						<a href={project.live_url} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 text-white/70 hover:text-white transition-colors">
							<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
							</svg>
							View Live
						</a>
					</div>
				{/if}
			</div>
		</section>
	{/if}

	<!-- Footer -->
	<footer class="pt-8 border-t border-white/10">
		<div class="flex items-center justify-between">
			<a
				href="/projects"
				class="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
			>
				<svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
				</svg>
				Back to Projects
			</a>

			{#if project.blog_posts && project.blog_posts.length > 0}
				<a
					href="/blog"
					class="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors group"
				>
					View All Posts
					<svg class="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
						<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
					</svg>
				</a>
			{/if}
		</div>
	</footer>
</article>

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
