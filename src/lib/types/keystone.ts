// Auto-generated types for Keystone CMS
// Generated on 2025-09-15T03:21:47.164Z
// Do not edit manually - run 'npm run generate:types' to regenerate

export interface ImageFieldOutput {
  id: string;
  filesize: number;
  width: number;
  height: number;
  extension: ImageExtension;
  url: string;
}

export interface BlogPost {
  id: string;
  title?: string;
  headerImage?: ImageFieldOutput;
  date?: string;
  content?: BlogPost_content_Document;
  project?: Project;
  author?: User;
}

export interface Project {
  id: string;
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  blogPosts?: BlogPost[];
  blogPostsCount?: number;
}

export interface User {
  id: string;
  name?: string;
  email?: string;
  password?: PasswordState;
  blogPosts?: BlogPost[];
  blogPostsCount?: number;
  createdAt?: string;
}

export enum ImageExtension {
  jpg = 'jpg',
  png = 'png',
  webp = 'webp',
  gif = 'gif'
}

export enum QueryMode {
  default = 'default',
  insensitive = 'insensitive'
}

export enum OrderDirection {
  asc = 'asc',
  desc = 'desc'
}

export interface ImageWhereUniqueInput {
  id?: string;
}

export interface ImageWhereInput {
  AND?: ImageWhereInput[];
  OR?: ImageWhereInput[];
  NOT?: ImageWhereInput[];
  id?: IDFilter;
  name?: StringFilter;
  altText?: StringFilter;
}

export interface IDFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  not?: IDFilter;
}

export interface StringFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  mode?: QueryMode;
  not?: NestedStringFilter;
}

export interface NestedStringFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  not?: NestedStringFilter;
}

export interface ImageOrderByInput {
  id?: OrderDirection;
  name?: OrderDirection;
  altText?: OrderDirection;
}

export interface ImageUpdateInput {
  name?: string;
  altText?: string;
  image?: ImageFieldInput;
}

export interface ImageFieldInput {
  upload: File;
}

export interface ImageCreateInput {
  name?: string;
  altText?: string;
  image?: ImageFieldInput;
}

export interface BlogPostWhereUniqueInput {
  id?: string;
}

export interface BlogPostWhereInput {
  AND?: BlogPostWhereInput[];
  OR?: BlogPostWhereInput[];
  NOT?: BlogPostWhereInput[];
  id?: IDFilter;
  title?: StringFilter;
  date?: DateTimeFilter;
  project?: ProjectWhereInput;
  author?: UserWhereInput;
}

export interface DateTimeFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  not?: DateTimeFilter;
}

export interface BlogPostOrderByInput {
  id?: OrderDirection;
  title?: OrderDirection;
  date?: OrderDirection;
}

export interface BlogPostUpdateInput {
  title?: string;
  headerImage?: ImageFieldInput;
  date?: string;
  content?: any;
  project?: ProjectRelateToOneForUpdateInput;
  author?: UserRelateToOneForUpdateInput;
}

export interface ProjectRelateToOneForUpdateInput {
  create?: ProjectCreateInput;
  connect?: ProjectWhereUniqueInput;
  disconnect?: boolean;
}

export interface UserRelateToOneForUpdateInput {
  create?: UserCreateInput;
  connect?: UserWhereUniqueInput;
  disconnect?: boolean;
}

export interface BlogPostCreateInput {
  title?: string;
  headerImage?: ImageFieldInput;
  date?: string;
  content?: any;
  project?: ProjectRelateToOneForCreateInput;
  author?: UserRelateToOneForCreateInput;
}

export interface ProjectRelateToOneForCreateInput {
  create?: ProjectCreateInput;
  connect?: ProjectWhereUniqueInput;
}

export interface UserRelateToOneForCreateInput {
  create?: UserCreateInput;
  connect?: UserWhereUniqueInput;
}

export interface ProjectWhereUniqueInput {
  id?: string;
}

export interface ProjectWhereInput {
  AND?: ProjectWhereInput[];
  OR?: ProjectWhereInput[];
  NOT?: ProjectWhereInput[];
  id?: IDFilter;
  name?: StringFilter;
  description?: StringFilter;
  startDate?: DateTimeNullableFilter;
  endDate?: DateTimeNullableFilter;
  status?: StringNullableFilter;
  blogPosts?: BlogPostManyRelationFilter;
}

export interface DateTimeNullableFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  not?: DateTimeNullableFilter;
}

export interface StringNullableFilter {
  equals?: string;
  in?: string[];
  notIn?: string[];
  lt?: string;
  lte?: string;
  gt?: string;
  gte?: string;
  contains?: string;
  startsWith?: string;
  endsWith?: string;
  mode?: QueryMode;
  not?: StringNullableFilter;
}

export interface BlogPostManyRelationFilter {
  every?: BlogPostWhereInput;
  some?: BlogPostWhereInput;
  none?: BlogPostWhereInput;
}

export interface ProjectOrderByInput {
  id?: OrderDirection;
  name?: OrderDirection;
  description?: OrderDirection;
  startDate?: OrderDirection;
  endDate?: OrderDirection;
  status?: OrderDirection;
}

export interface ProjectUpdateInput {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  blogPosts?: BlogPostRelateToManyForUpdateInput;
}

export interface BlogPostRelateToManyForUpdateInput {
  disconnect?: BlogPostWhereUniqueInput[];
  set?: BlogPostWhereUniqueInput[];
  create?: BlogPostCreateInput[];
  connect?: BlogPostWhereUniqueInput[];
}

export interface ProjectCreateInput {
  name?: string;
  description?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
  blogPosts?: BlogPostRelateToManyForCreateInput;
}

export interface BlogPostRelateToManyForCreateInput {
  create?: BlogPostCreateInput[];
  connect?: BlogPostWhereUniqueInput[];
}

export interface UserWhereUniqueInput {
  id?: string;
  email?: string;
}

export interface UserWhereInput {
  AND?: UserWhereInput[];
  OR?: UserWhereInput[];
  NOT?: UserWhereInput[];
  id?: IDFilter;
  name?: StringFilter;
  email?: StringFilter;
  blogPosts?: BlogPostManyRelationFilter;
  createdAt?: DateTimeNullableFilter;
}

export interface UserOrderByInput {
  id?: OrderDirection;
  name?: OrderDirection;
  email?: OrderDirection;
  createdAt?: OrderDirection;
}

export interface UserUpdateInput {
  name?: string;
  email?: string;
  password?: string;
  blogPosts?: BlogPostRelateToManyForUpdateInput;
  createdAt?: string;
}

export interface UserCreateInput {
  name?: string;
  email?: string;
  password?: string;
  blogPosts?: BlogPostRelateToManyForCreateInput;
  createdAt?: string;
}

export interface CreateInitialUserInput {
  name?: string;
  email?: string;
  password?: string;
}

// Utility types for UI
export interface FormattedBlogPost {
  id: string;
  title: string;
  slug: string;
  description?: string;
  date: Date;
  shortenedDate: string;
  headerImage?: ImageFieldOutput;
  content?: any;
  project?: Project;
  author?: User;
}

export interface FormattedProject {
  id: string;
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  blogPosts?: FormattedBlogPost[];
}

// Helper type for pagination
export interface PaginationOptions {
  take?: number;
  skip?: number;
}

// Helper type for query options
export interface QueryOptions<T = any, O = any> extends PaginationOptions {
  where?: T;
  orderBy?: O[];
}
