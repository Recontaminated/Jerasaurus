<script lang="ts">
	import { getOptimizedImageUrl, extractImageId } from '$lib/utils/image.js';
	import DocumentRenderer from '$lib/components/DocumentRenderer.svelte';
	
	let { data } = $props();
	let post = data.post;
	
	// Custom renderers for specific styling
	const customRenderers = {
		inline: {
			link: ({ children, href }: any) => 
				`<a href="${href}" class="text-blue-400 hover:text-blue-300 transition-colors underline" target="_blank" rel="noopener noreferrer">${children}</a>`,
			relationship: ({ relationship, data }: any) => {
				if (relationship === 'mention' && data?.data) {
					return `<a href="/author/${data.data.id}" class="text-blue-400 hover:text-blue-300 transition-colors">@${data.data.name}</a>`;
				}
				return `<span class="bg-white/10 px-1 rounded text-sm">[${relationship}]</span>`;
			}
		},
		block: {
			blockquote: ({ children }: any) => 
				`<blockquote class="border-l-4 border-white/20 pl-4 italic text-white/80 my-4">${children}</blockquote>`,
			code: ({ children, language }: any) => {
				const langClass = language ? ` class="language-${language}"` : '';
				return `<pre class="bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto my-4"><code${langClass} class="text-sm font-mono">${children}</code></pre>`;
			},
			divider: () => '<hr class="border-white/20 my-8">',
			layout: ({ children, layout }: any) => {
				const columns = layout.length;
				const gridCols = columns === 2 ? 'md:grid-cols-2' : columns === 3 ? 'md:grid-cols-3' : 'grid-cols-1';
				return `<div class="grid ${gridCols} gap-6 my-6">${children}</div>`;
			}
		},
		componentBlocks: {
			image: (props: any) => {
				// Extract image data from Keystone relationship structure
				let imageData = null;
				
				if (props?.imageRel?.data?.image?.url) {
					imageData = props.imageRel.data.image;
				} else if (props?.imageRel?.image?.url) {
					imageData = props.imageRel.image;
				} else if (props?.image?.url) {
					imageData = props.image;
				}
				
				if (!imageData?.url) {
					return `<div class="text-white/50 italic my-4">Image not available</div>`;
				}
				
				// Extract metadata
				const alt = props?.imageAlt || props?.alt || props?.caption || 
					       props?.imageRel?.data?.altText || imageData?.altText || '';
				const caption = props?.caption || props?.description || '';
				const width = props?.width || imageData?.width;
				const height = props?.height || imageData?.height;
				
				// Create optimized image URL
				const imageId = extractImageId(imageData.url);
				const imageUrl = imageId ? 
					getOptimizedImageUrl(imageId, { width: width || 800, quality: 85, format: 'webp' }) :
					imageData.url;
				
				const imgTag = `<img src="${imageUrl}" alt="${alt}" class="w-full h-auto rounded-lg shadow-lg" loading="lazy"${width ? ` width="${width}"` : ''}${height ? ` height="${height}"` : ''}>`;
				
				if (caption) {
					return `<figure class="my-8">
						${imgTag}
						<figcaption class="text-sm text-white/60 mt-3 text-center italic">${caption}</figcaption>
					</figure>`;
				}
				
				return `<div class="my-8">${imgTag}</div>`;
			}
		}
	};
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
			<DocumentRenderer document={post.content} renderers={customRenderers} />
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
