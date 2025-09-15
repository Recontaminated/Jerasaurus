<script lang="ts">
	let { data } = $props();
	let project = data.project;
	
	function formatDateRange(startDate?: Date, endDate?: Date): string {
		const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
		
		if (!startDate) return 'Date TBD';
		
		const start = `${monthNames[startDate.getUTCMonth()]} ${startDate.getUTCFullYear()}`;
		
		if (!endDate) {
			return `${start} - Present`;
		}
		
		const end = `${monthNames[endDate.getUTCMonth()]} ${endDate.getUTCFullYear()}`;
		return `${start} - ${end}`;
	}
	
	function getStatusColor(status?: string): string {
		switch (status?.toLowerCase()) {
			case 'completed': return 'bg-green-500/20 text-green-400 border-green-500/30';
			case 'in progress': case 'active': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
			case 'planning': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
			case 'on hold': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
			default: return 'bg-white/10 text-white/70 border-white/20';
		}
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
				{#if project.status}
					<span class="px-3 py-1 text-sm border rounded-full {getStatusColor(project.status)}">
						{project.status}
					</span>
				{/if}
				
				<span class="text-white/60">
					{formatDateRange(project.startDate, project.endDate)}
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
	
	<!-- Blog Posts Section -->
	{#if project.blogPosts && project.blogPosts.length > 0}
		<section class="mb-12">
			<h2 class="text-2xl font-semibold mb-6">Related Blog Posts</h2>
			
			<div class="space-y-4">
				{#each project.blogPosts as post}
					<a 
						href="/blog/{post.slug}"
						class="group block overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur p-6 transition-all hover:bg-white/10 hover:border-white/20"
					>
						<div class="flex gap-6">
							{#if post.headerImage}
								<div class="shrink-0">
									<img 
										src={post.headerImage.url} 
										alt={post.title}
										class="w-20 h-20 rounded-lg object-cover"
										width={post.headerImage.width}
										height={post.headerImage.height}
									/>
								</div>
							{/if}
							
							<div class="flex-1 space-y-2">
								<div class="flex items-center gap-4">
									<time class="text-sm text-white/50" datetime={post.date.toISOString()}>
										{post.shortenedDate}
									</time>
									{#if post.author}
										<span class="text-sm text-white/50">
											By {post.author.name}
										</span>
									{/if}
								</div>
								
								<h3 class="text-lg font-medium group-hover:text-blue-400 transition-colors">
									{post.title}
								</h3>
								
								{#if post.description}
									<p class="text-white/70 text-sm line-clamp-2">
										{post.description}
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
