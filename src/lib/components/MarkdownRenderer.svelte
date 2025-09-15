<script lang="ts">
	import { marked } from 'marked';
	import { onMount } from 'svelte';

	export let content: string = '';

	let renderedContent = '';

	onMount(async () => {
		if (typeof window !== 'undefined') {
			const prismjs = await import('prismjs');
			await import('prismjs/components/prism-javascript');
			await import('prismjs/components/prism-typescript');
			await import('prismjs/components/prism-css');
			await import('prismjs/components/prism-bash');
			await import('prismjs/components/prism-json');

			marked.setOptions({
				highlight: function(code, lang) {
					if (prismjs.default.languages[lang]) {
						return prismjs.default.highlight(code, prismjs.default.languages[lang], lang);
					}
					return code;
				}
			});
		}

		renderedContent = marked(content || '');
	});

	$: if (content) {
		renderedContent = marked(content || '');
	}
</script>

<div class="prose prose-invert prose-lg max-w-none">
	{@html renderedContent}
</div>

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
		@apply bg-white/5 border border-white/10 rounded-lg p-4 overflow-x-auto my-4;
	}

	:global(.prose code) {
		@apply text-sm font-mono bg-white/10 px-1 rounded;
	}

	:global(.prose pre code) {
		@apply bg-transparent px-0;
	}

	:global(.prose a) {
		@apply text-blue-400 hover:text-blue-300 transition-colors underline;
	}

	:global(.prose blockquote) {
		@apply border-l-4 border-white/20 pl-4 italic text-white/80 my-4;
	}

	:global(.prose hr) {
		@apply border-white/20 my-8;
	}

	:global(.prose ul) {
		@apply list-disc list-inside mb-4 text-white/80;
	}

	:global(.prose ol) {
		@apply list-decimal list-inside mb-4 text-white/80;
	}

	:global(.prose li) {
		@apply mb-2;
	}

	:global(.prose img) {
		@apply w-full h-auto rounded-lg shadow-lg my-8;
	}

	:global(.prose table) {
		@apply w-full border-collapse my-4;
	}

	:global(.prose th) {
		@apply border border-white/20 px-4 py-2 bg-white/5 text-left;
	}

	:global(.prose td) {
		@apply border border-white/20 px-4 py-2;
	}
</style>