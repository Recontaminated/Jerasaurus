<script lang="ts">
	let { data } = $props();
	let projects = data.projects;
	
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
					<div class="p-6">
						<!-- Header -->
						<div class="mb-4">
							<h2 class="text-xl font-semibold group-hover:text-blue-400 transition-colors mb-2">
								{project.name}
							</h2>
							
							<div class="flex items-center gap-2 mb-3">
								{#if project.status}
									<span class="px-2 py-1 text-xs border rounded-full {getStatusColor(project.status)}">
										{project.status}
									</span>
								{/if}
								
								<span class="text-sm text-white/50">
									{formatDateRange(project.startDate, project.endDate)}
								</span>
							</div>
						</div>
						
						<!-- Description -->
						{#if project.description}
							<p class="text-white/70 text-sm mb-4 line-clamp-3">
								{project.description}
							</p>
						{/if}
						
						<!-- Blog Posts -->
						{#if project.blogPosts && project.blogPosts.length > 0}
							<div class="border-t border-white/10 pt-4">
								<div class="text-xs text-white/50 mb-2">
									Related Posts ({project.blogPosts.length})
								</div>
								<div class="space-y-1">
									{#each project.blogPosts.slice(0, 2) as post}
										<div class="text-sm text-white/60 truncate">
											• {post.title}
										</div>
									{/each}
									{#if project.blogPosts.length > 2}
										<div class="text-xs text-white/40">
											+{project.blogPosts.length - 2} more
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
