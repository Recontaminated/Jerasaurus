<script lang="ts">
	// Svelte implementation of Keystone's DocumentRenderer
	// Based on @keystone-6/document-renderer patterns
	
	import type { 
		DocumentNode, 
		DocumentRendererProps,
		InlineRenderers,
		BlockRenderers
	} from '$lib/types/document-renderer.js';
	
	export let document: DocumentRendererProps['document'];
	export let renderers: DocumentRendererProps['renderers'] = {};
	
	// Default renderers following Keystone patterns
	const defaultRenderers = {
		inline: {
			bold: ({ children }: any) => `<strong>${children}</strong>`,
			italic: ({ children }: any) => `<em>${children}</em>`,
			underline: ({ children }: any) => `<u>${children}</u>`,
			strikethrough: ({ children }: any) => `<s>${children}</s>`,
			code: ({ children }: any) => `<code>${children}</code>`,
			superscript: ({ children }: any) => `<sup>${children}</sup>`,
			subscript: ({ children }: any) => `<sub>${children}</sub>`,
			keyboard: ({ children }: any) => `<kbd>${children}</kbd>`,
			link: ({ children, href }: any) => `<a href="${href}" target="_blank" rel="noopener noreferrer">${children}</a>`,
			relationship: ({ relationship, data }: any) => {
				if (data === null || data?.data === undefined) {
					return `<span>[${relationship}]</span>`;
				}
				return `<span>${data.label || data.id}</span>`;
			}
		},
		block: {
			paragraph: ({ children, textAlign }: any) => {
				const style = textAlign ? ` style="text-align: ${textAlign}"` : '';
				return `<p${style}>${children}</p>`;
			},
			heading: ({ children, level, textAlign }: any) => {
				const style = textAlign ? ` style="text-align: ${textAlign}"` : '';
				return `<h${level}${style}>${children}</h${level}>`;
			},
			blockquote: ({ children }: any) => `<blockquote>${children}</blockquote>`,
			code: ({ children, language }: any) => {
				const langClass = language ? ` class="language-${language}"` : '';
				return `<pre><code${langClass}>${children}</code></pre>`;
			},
			list: ({ children, type }: any) => {
				const tag = type === 'ordered' ? 'ol' : 'ul';
				return `<${tag}>${children}</${tag}>`;
			},
			'list-item': ({ children }: any) => `<li>${children}</li>`,
			'list-item-content': ({ children }: any) => children,
			divider: () => '<hr>',
			layout: ({ children, layout }: any) => {
				// Handle Keystone layouts (e.g., [1,1] for 2-column)
				const columns = layout.length;
				const gridCols = columns === 2 ? 'grid-cols-2' : columns === 3 ? 'grid-cols-3' : 'grid-cols-1';
				return `<div class="grid ${gridCols} gap-4">${children}</div>`;
			},
			'layout-area': ({ children }: any) => `<div>${children}</div>`
		}
	};
	
	// Merge custom renderers with defaults
	const mergedRenderers = {
		inline: { ...defaultRenderers.inline, ...renderers.inline },
		block: { ...defaultRenderers.block, ...renderers.block }
	};
	
	function renderNode(node: DocumentNode): string {
		if (typeof node === 'string') {
			return node;
		}
		
		if (node.text !== undefined) {
			// Text node
			return node.text;
		}
		
		if (!node.type) {
			return '';
		}
		
		// Render children first
		const children = node.children 
			? node.children.map(child => renderNode(child)).join('')
			: '';
		
		// Handle inline formatting
		if (node.bold || node.italic || node.underline || node.strikethrough || 
			node.code || node.superscript || node.subscript || node.keyboard) {
			let result = children;
			if (node.bold && mergedRenderers.inline.bold) {
				result = mergedRenderers.inline.bold({ children: result });
			}
			if (node.italic && mergedRenderers.inline.italic) {
				result = mergedRenderers.inline.italic({ children: result });
			}
			if (node.underline && mergedRenderers.inline.underline) {
				result = mergedRenderers.inline.underline({ children: result });
			}
			if (node.strikethrough && mergedRenderers.inline.strikethrough) {
				result = mergedRenderers.inline.strikethrough({ children: result });
			}
			if (node.code && mergedRenderers.inline.code) {
				result = mergedRenderers.inline.code({ children: result });
			}
			if (node.superscript && mergedRenderers.inline.superscript) {
				result = mergedRenderers.inline.superscript({ children: result });
			}
			if (node.subscript && mergedRenderers.inline.subscript) {
				result = mergedRenderers.inline.subscript({ children: result });
			}
			if (node.keyboard && mergedRenderers.inline.keyboard) {
				result = mergedRenderers.inline.keyboard({ children: result });
			}
			return result;
		}
		
		// Handle specific node types
		switch (node.type) {
			case 'paragraph':
				return mergedRenderers.block.paragraph({ 
					children, 
					textAlign: node.textAlign 
				});
				
			case 'heading':
				return mergedRenderers.block.heading({ 
					children, 
					level: Math.min(Math.max(node.level || 1, 1), 6),
					textAlign: node.textAlign 
				});
				
			case 'blockquote':
				return mergedRenderers.block.blockquote({ children });
				
			case 'code':
				return mergedRenderers.block.code({ 
					children, 
					language: node.language 
				});
				
			case 'list':
				return mergedRenderers.block.list({ 
					children, 
					type: node.listType 
				});
				
			case 'list-item':
				return mergedRenderers.block['list-item']({ children });
				
			case 'list-item-content':
				return mergedRenderers.block['list-item-content']({ children });
				
			case 'divider':
				return mergedRenderers.block.divider();
				
			case 'link':
				return mergedRenderers.inline.link({ 
					children, 
					href: node.href 
				});
				
			case 'relationship':
				return mergedRenderers.inline.relationship({ 
					children, 
					relationship: node.relationship,
					data: node.data 
				});
				
			case 'layout':
				return mergedRenderers.block.layout({ 
					children, 
					layout: node.layout 
				});
				
			case 'layout-area':
				return mergedRenderers.block['layout-area']({ children });
				
			// Component blocks
			case 'component-block':
				if (renderers.componentBlocks && renderers.componentBlocks[node.component]) {
					return renderers.componentBlocks[node.component](node.props);
				}
				return `<div class="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded">Unknown component: ${node.component}</div>`;
				
			default:
				// Unknown node type, just return children
				return children;
		}
	}
	
	function renderDocument(doc: any): string {
		if (!doc) return '';
		
		// Handle different document formats
		let nodes = [];
		if (Array.isArray(doc)) {
			nodes = doc;
		} else if (doc.children) {
			nodes = doc.children;
		} else if (doc.content) {
			nodes = doc.content;
		} else {
			return '';
		}
		
		return nodes.map(node => renderNode(node)).join('');
	}
	
	$: renderedContent = renderDocument(document);
</script>

<!-- Render the document content -->
{@html renderedContent}
