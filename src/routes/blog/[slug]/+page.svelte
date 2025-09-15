<script lang="ts">
	import { getOptimizedImageUrl, extractImageId } from '$lib/utils/image.js';
	import MarkdownRenderer from '$lib/components/MarkdownRenderer.svelte';
	
	let { data } = $props();
	let post = data.post;
</script>

<article class="mx-auto max-w-4xl px-6 py-20">
	<!-- Header -->
	<header class="mb-12">
		<div class="mb-6">
			<a href="/blog" class="text-sm text-white/60 hover:text-white transition-colors">
				← Back to Blog
			</a>
		</div>
		
		{#if post.headerImage}
			<div class="mb-8 overflow-hidden rounded-2xl">
				<img
					src={post.headerImage}
					alt={post.title}
					class="w-full h-64 sm:h-96 object-cover"
					loading="lazy"
				/>
			</div>
		{/if}
		
		<div class="space-y-4">
			<h1 class="text-4xl font-bold tracking-tight sm:text-5xl">
				{post.title}
			</h1>
			
			{#if post.description}
				<p class="text-xl text-white/70">
					{post.description}
				</p>
			{/if}
			
			<div class="flex items-center gap-4 text-sm text-white/60">
				<time datetime={new Date(post.date).toISOString()}>
					{post.shortenedDate}
				</time>
				
				{#if post.author}
					<span>•</span>
					<span>By {post.author.name}</span>
				{/if}
				
				{#if post.project}
					<span>•</span>
					<a 
						href="/projects/{post.project.id}" 
						class="hover:text-white transition-colors"
					>
						{post.project.name}
					</a>
				{/if}
			</div>
		</div>
	</header>
	
	<!-- Content -->
	{#if post.content}
		<MarkdownRenderer content={post.content} />
	{:else}
		<p class="text-white/70">No content available.</p>
	{/if}
	
	<!-- Footer -->
	<footer class="mt-16 pt-8 border-t border-white/10">
		<div class="flex items-center justify-between">
			<a 
				href="/blog" 
				class="text-sm text-white/60 hover:text-white transition-colors"
			>
				← Back to Blog
			</a>
			
			{#if post.project}
				<a 
					href="/projects/{post.project.id}"
					class="text-sm text-white/60 hover:text-white transition-colors"
				>
					View Project: {post.project.name} →
				</a>
			{/if}
		</div>
	</footer>
</article>

<style>
	:global(.prose h1) {
		@apply text-3xl font-bold mt-8 mb-4;
	}
	
	:global(.prose h2) {
		@apply text-2xl font-semibold mt-6 mb-3;
	}
	
	:global(.prose h3) {
		@apply text-xl font-medium mt-4 mb-2;
	}
	
	:global(.prose p) {
		@apply mb-4 text-white/80 leading-relaxed;
	}
	
	:global(.prose pre) {
		@apply bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto;
	}
	
	:global(.prose code) {
		@apply text-sm font-mono;
	}
	
	:global(.prose a) {
		@apply text-blue-400 hover:text-blue-300 transition-colors;
	}
</style>
