<script lang="ts">
	let { data } = $props();
	let project = data.project;
	
	function formatDate(dateString: string): string {
		const date = new Date(dateString);
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		return `${monthNames[date.getUTCMonth()]} ${date.getUTCFullYear()}`;
	}
</script>

<article class="mx-auto max-w-4xl px-6 py-20">
	<!-- Header -->
	<header class="mb-12">
		<div class="mb-6">
			<a href="/projects" class="text-sm text-white/60 hover:text-white transition-colors">
				← Back to Projects
			</a>
		</div>
		
		<div class="space-y-6">
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
				{project.name}
			</h1>

			<div class="flex flex-wrap items-center gap-4">
				<span class="text-white/60">
					{formatDate(project.createdAt)}
				</span>
			</div>

			{#if project.description}
				<div class="prose prose-invert prose-lg max-w-none">
					<p class="text-xl text-white/80 leading-relaxed">
						{project.description}
					</p>
				</div>
			{/if}
		</div>
	</header>
	
	<!-- Hero Image -->
	{#if project.heroimage?.url}
		<div class="mb-12 overflow-hidden rounded-2xl border border-white/10">
			<img
				src={project.heroimage.url}
				alt={project.heroimage.alternativeText || project.name}
				class="w-full h-auto"
			/>
		</div>
	{/if}

	<!-- Blog Posts Section -->
	{#if project.blog_posts && project.blog_posts.length > 0}
		<section class="mb-12">
			<h2 class="text-2xl font-semibold mb-6">Related Blog Posts</h2>
			
			<div class="space-y-4">
				{#each project.blog_posts as post}
					<a 
						href="/blog/{post.slug}"
						class="group block overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6 transition-all hover:bg-white/10 hover:border-white/20"
					>
						<div class="flex gap-6">
							{#if post.cover?.url}
								<div class="shrink-0">
									<img
										src={post.cover.url}
										alt={post.title}
										class="w-20 h-20 rounded-lg object-cover"
									/>
								</div>
							{/if}

							<div class="flex-1 space-y-2">
								<div class="flex items-center gap-4">
									{#if post.date}
										<time class="text-sm text-white/50" datetime={post.date}>
											{formatDate(post.date)}
										</time>
									{/if}
								</div>

								<h3 class="text-lg font-medium group-hover:text-blue-400 transition-colors">
									{post.title}
								</h3>

								{#if post.content}
									<p class="text-white/70 text-sm line-clamp-2">
										{post.content.substring(0, 150)}...
									</p>
								{/if}
							</div>
						</div>
					</a>
				{/each}
			</div>
		</section>
	{/if}
	
	<!-- Footer -->
	<footer class="pt-8 border-t border-white/10">
		<div class="flex items-center justify-between">
			<a 
				href="/projects" 
				class="text-sm text-white/60 hover:text-white transition-colors"
			>
				← Back to Projects
			</a>
			
			<a 
				href="/blog"
				class="text-sm text-white/60 hover:text-white transition-colors"
			>
				View All Posts →
			</a>
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
</style>
