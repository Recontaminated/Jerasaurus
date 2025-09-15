<script lang="ts">
	import { getOptimizedImageUrl, extractImageId } from '$lib/utils/image.js';
	
	let { data } = $props();
	let post = data.post;
	
	// Helper function to render Keystone document content
	function renderContent(document: any): string {
		if (!document) return '<p>No content available</p>';
		
		try {
			// Handle direct array (as in your case) or nested document structure
			let children = Array.isArray(document) ? document : document.children || document.content || [];
			
			if (!Array.isArray(children)) {
				return '<p>Content format not supported</p>';
			}
			
			const html = children.map((child: any) => {
				if (child.type === 'paragraph') {
					const text = child.children?.map((c: any) => {
						// Handle formatted text (bold, italic, etc.)
						let content = c.text || '';
						if (c.bold) content = `<strong>${content}</strong>`;
						if (c.italic) content = `<em>${content}</em>`;
						if (c.code) content = `<code>${content}</code>`;
						if (c.underline) content = `<u>${content}</u>`;
						if (c.strikethrough) content = `<s>${content}</s>`;
						return content;
					}).join('') || '';
					return text ? `<p>${text}</p>` : '';
				}
				
				if (child.type === 'heading') {
					const level = Math.min(Math.max(child.level || 1, 1), 6); // Ensure level is 1-6
					const text = child.children?.map((c: any) => {
						let content = c.text || '';
						if (c.bold) content = `<strong>${content}</strong>`;
						if (c.italic) content = `<em>${content}</em>`;
						return content;
					}).join('') || '';
					return text ? `<h${level}>${text}</h${level}>` : '';
				}
				
				if (child.type === 'code') {
					const text = child.children?.map((c: any) => c.text || '').join('') || '';
					const language = child.language ? ` class="language-${child.language}"` : '';
					return text ? `<pre><code${language}>${text}</code></pre>` : '';
				}
				
				if (child.type === 'blockquote') {
					const content = renderContent(child.children || []);
					return content ? `<blockquote>${content}</blockquote>` : '';
				}
				
				if (child.type === 'list') {
					const listItems = child.children?.map((item: any) => {
						const itemContent = renderContent(item.children || []);
						return `<li>${itemContent}</li>`;
					}).join('') || '';
					const listType = child.listType === 'ordered' ? 'ol' : 'ul';
					return listItems ? `<${listType}>${listItems}</${listType}>` : '';
				}
				
				if (child.type === 'divider') {
					return '<hr>';
				}
				
				// Handle direct text nodes
				if (child.text) {
					return child.text;
				}
				
				return '';
			}).filter(Boolean).join('');
			
			return html || '<p>No content to display</p>';
			
		} catch (error) {
			console.error('Error rendering content:', error);
			return `<p>Error rendering content: ${error.message}</p>`;
		}
	}
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
					src={getOptimizedImageUrl(extractImageId(post.headerImage.url) || '', { 
						width: 800, 
						quality: 85, 
						format: 'webp' 
					})} 
					alt={post.title}
					class="w-full h-64 sm:h-96 object-cover"
					width={post.headerImage.width}
					height={post.headerImage.height}
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
				<time datetime={post.date.toISOString()}>
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
	<div class="prose prose-invert prose-lg max-w-none">
		{#if post.content}
			{@html renderContent(post.content)}
		{:else}
			<p class="text-white/70">No content available.</p>
		{/if}
	</div>
	
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
