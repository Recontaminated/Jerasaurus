// Type definitions for Keystone Document Renderer
// Based on @keystone-6/document-renderer patterns

export interface DocumentNode {
  type: string;
  children?: DocumentNode[];
  text?: string;
  
  // Inline formatting
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  strikethrough?: boolean;
  code?: boolean;
  superscript?: boolean;
  subscript?: boolean;
  keyboard?: boolean;
  
  // Block properties
  level?: number; // for headings
  textAlign?: 'left' | 'center' | 'right' | 'justify';
  listType?: 'ordered' | 'unordered';
  language?: string; // for code blocks
  layout?: number[]; // for layouts e.g., [1,1] for 2-column
  
  // Link properties
  href?: string;
  
  // Relationship properties
  relationship?: string;
  data?: {
    id: string;
    label?: string;
    data?: any;
  } | null;
  
  // Component block properties
  component?: string;
  props?: any;
}

export interface InlineRenderers {
  bold?: (props: { children: string }) => string;
  italic?: (props: { children: string }) => string;
  underline?: (props: { children: string }) => string;
  strikethrough?: (props: { children: string }) => string;
  code?: (props: { children: string }) => string;
  superscript?: (props: { children: string }) => string;
  subscript?: (props: { children: string }) => string;
  keyboard?: (props: { children: string }) => string;
  link?: (props: { children: string; href: string }) => string;
  relationship?: (props: { 
    children: string; 
    relationship: string; 
    data: any 
  }) => string;
}

export interface BlockRenderers {
  paragraph?: (props: { children: string; textAlign?: string }) => string;
  heading?: (props: { children: string; level: number; textAlign?: string }) => string;
  blockquote?: (props: { children: string }) => string;
  code?: (props: { children: string; language?: string }) => string;
  list?: (props: { children: string; type: 'ordered' | 'unordered' }) => string;
  'list-item'?: (props: { children: string }) => string;
  'list-item-content'?: (props: { children: string }) => string;
  divider?: () => string;
  layout?: (props: { children: string; layout: number[] }) => string;
  'layout-area'?: (props: { children: string }) => string;
}

export interface ComponentBlockRenderers {
  [key: string]: (props: any) => string;
}

export interface DocumentRendererProps {
  document: DocumentNode[] | { children: DocumentNode[] } | any;
  renderers?: {
    inline?: InlineRenderers;
    block?: BlockRenderers;
    componentBlocks?: ComponentBlockRenderers;
  };
}
