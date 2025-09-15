import { GraphQLClient } from 'graphql-request';
import { env } from '$env/dynamic/private';
import { toProxyUrl } from './utils/image.js';
import type { 
  BlogPost, 
  Project, 
  BlogPostWhereInput, 
  BlogPostOrderByInput,
  ProjectWhereInput,
  ProjectOrderByInput,
  FormattedBlogPost,
  FormattedProject
} from './types/keystone.js';

// Initialize GraphQL client
const client = new GraphQLClient(`${env.KEYSTONE_URL || 'http://localhost:3000'}/api/graphql`);

// GraphQL queries
const GET_BLOG_POSTS = `
  query GetBlogPosts($where: BlogPostWhereInput, $orderBy: [BlogPostOrderByInput!], $take: Int, $skip: Int) {
    blogPosts(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      title
      date
      headerImage {
        id
        url
        width
        height
        extension
      }
      content {
        document(hydrateRelationships: true)
      }
      project {
        id
        name
        description
      }
      author {
        id
        name
      }
    }
  }
`;

const GET_BLOG_POST = `
  query GetBlogPost($where: BlogPostWhereUniqueInput!) {
    blogPost(where: $where) {
      id
      title
      date
      headerImage {
        id
        url
        width
        height
        extension
      }
      content {
        document(hydrateRelationships: true)
      }
      project {
        id
        name
        description
        status
        startDate
        endDate
      }
      author {
        id
        name
        email
      }
    }
  }
`;

const GET_PROJECTS = `
  query GetProjects($where: ProjectWhereInput, $orderBy: [ProjectOrderByInput!], $take: Int, $skip: Int) {
    projects(where: $where, orderBy: $orderBy, take: $take, skip: $skip) {
      id
      name
      description
      startDate
      endDate
      status
      blogPostsCount
      blogPosts(take: 5, orderBy: [{ date: desc }]) {
        id
        title
        date
        headerImage {
          id
          url
          width
          height
          extension
        }
      }
    }
  }
`;

const GET_PROJECT = `
  query GetProject($where: ProjectWhereUniqueInput!) {
    project(where: $where) {
      id
      name
      description
      startDate
      endDate
      status
      blogPosts(orderBy: [{ date: desc }]) {
        id
        title
        date
        headerImage {
          id
          url
          width
          height
          extension
        }
        content {
          document
        }
        author {
          id
          name
        }
      }
    }
  }
`;

// Helper function to create slug from title
function createSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Use the utility function for image URL conversion
const getProxyImageUrl = toProxyUrl;

// Helper function to format date
function formatDate(dateString: string): { date: Date; shortenedDate: string } {
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const date = new Date(dateString);
  const shortenedDate = `${monthNames[date.getUTCMonth()]} ${date.getUTCDate()}, ${date.getUTCFullYear()}`;
  return { date, shortenedDate };
}

// API functions
export async function getBlogPosts(options?: {
  where?: BlogPostWhereInput;
  orderBy?: BlogPostOrderByInput[];
  take?: number;
  skip?: number;
}): Promise<FormattedBlogPost[]> {
  try {
    const variables = {
      where: options?.where || {},
      orderBy: options?.orderBy || [{ date: 'desc' }],
      take: options?.take,
      skip: options?.skip || 0
    };

    const response = await client.request<{ blogPosts: BlogPost[] }>(GET_BLOG_POSTS, variables);
    console.log('Raw GraphQL response for blog posts:', JSON.stringify(response, null, 2));

    return response.blogPosts.map(post => {
      const { date, shortenedDate } = formatDate(post.date || new Date().toISOString());
      return {
        id: post.id,
        title: post.title || 'Untitled',
        slug: createSlug(post.title || 'untitled'),
        description: extractDescription(post.content?.document),
        date,
        shortenedDate,
        headerImage: post.headerImage ? {
          ...post.headerImage,
          url: getProxyImageUrl(post.headerImage.url)
        } : undefined,
        content: post.content?.document,
        project: post.project,
        author: post.author
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

export async function getBlogPost(id: string): Promise<FormattedBlogPost | null> {
  try {
    const response = await client.request<{ blogPost: BlogPost }>(GET_BLOG_POST, {
      where: { id }
    });

    if (!response.blogPost) return null;

    const post = response.blogPost;
    const { date, shortenedDate } = formatDate(post.date || new Date().toISOString());
    
    return {
      id: post.id,
      title: post.title || 'Untitled',
      slug: createSlug(post.title || 'untitled'),
      description: extractDescription(post.content?.document),
      date,
      shortenedDate,
      headerImage: post.headerImage ? {
        ...post.headerImage,
        url: (() => {
          console.log('S3 URL from Keystone:', post.headerImage.url);
          const proxyUrl = toProxyUrl(post.headerImage.url);
          console.log('Converted to proxy URL:', proxyUrl);
          return proxyUrl;
        })()
      } : undefined,
      content: post.content?.document,
      project: post.project,
      author: post.author
    };
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
}

export async function getBlogPostBySlug(slug: string): Promise<FormattedBlogPost | null> {
  try {
    // Since Keystone doesn't have a slug field by default, we'll need to fetch all posts
    // and find the one with matching slug. For better performance, consider adding
    // a slug field to your Keystone schema.
    const posts = await getBlogPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    return null;
  }
}

export async function getProjects(options?: {
  where?: ProjectWhereInput;
  orderBy?: ProjectOrderByInput[];
  take?: number;
  skip?: number;
}): Promise<FormattedProject[]> {
  try {
    const variables = {
      where: options?.where || {},
      orderBy: options?.orderBy || [{ name: 'asc' }],
      take: options?.take,
      skip: options?.skip || 0
    };

    const response = await client.request<{ projects: Project[] }>(GET_PROJECTS, variables);
    
    return response.projects.map(project => ({
      id: project.id,
      name: project.name || 'Untitled Project',
      description: project.description,
      startDate: project.startDate ? new Date(project.startDate) : undefined,
      endDate: project.endDate ? new Date(project.endDate) : undefined,
      status: project.status,
      blogPosts: project.blogPosts?.map(post => {
        const { date, shortenedDate } = formatDate(post.date || new Date().toISOString());
        return {
          id: post.id,
          title: post.title || 'Untitled',
          slug: createSlug(post.title || 'untitled'),
          date,
          shortenedDate,
          headerImage: post.headerImage ? {
            ...post.headerImage,
            url: (() => {
          console.log('S3 URL from Keystone:', post.headerImage.url);
          const proxyUrl = toProxyUrl(post.headerImage.url);
          console.log('Converted to proxy URL:', proxyUrl);
          return proxyUrl;
        })()
          } : undefined
        };
      })
    }));
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function getProject(id: string): Promise<FormattedProject | null> {
  try {
    const response = await client.request<{ project: Project }>(GET_PROJECT, {
      where: { id }
    });

    if (!response.project) return null;

    const project = response.project;
    
    return {
      id: project.id,
      name: project.name || 'Untitled Project',
      description: project.description,
      startDate: project.startDate ? new Date(project.startDate) : undefined,
      endDate: project.endDate ? new Date(project.endDate) : undefined,
      status: project.status,
      blogPosts: project.blogPosts?.map(post => {
        const { date, shortenedDate } = formatDate(post.date || new Date().toISOString());
        return {
          id: post.id,
          title: post.title || 'Untitled',
          slug: createSlug(post.title || 'untitled'),
          date,
          shortenedDate,
          headerImage: post.headerImage ? {
            ...post.headerImage,
            url: (() => {
          console.log('S3 URL from Keystone:', post.headerImage.url);
          const proxyUrl = toProxyUrl(post.headerImage.url);
          console.log('Converted to proxy URL:', proxyUrl);
          return proxyUrl;
        })()
          } : undefined,
          content: post.content?.document,
          author: post.author
        };
      })
    };
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

// Helper function to extract description from Keystone document
function extractDescription(document: any): string | undefined {
  if (!document) return undefined;
  
  try {
    // This is a basic implementation - you might need to adjust based on your content structure
    const firstParagraph = document.children?.find((child: any) => 
      child.type === 'paragraph' && child.children?.length > 0
    );
    
    if (firstParagraph) {
      return firstParagraph.children
        .map((child: any) => child.text || '')
        .join('')
        .substring(0, 200) + '...';
    }
  } catch (error) {
    console.error('Error extracting description:', error);
  }
  
  return undefined;
}
