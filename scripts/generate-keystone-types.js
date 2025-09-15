#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const KEYSTONE_URL = process.env.KEYSTONE_URL || 'http://localhost:3000';
const GRAPHQL_ENDPOINT = `${KEYSTONE_URL}/api/graphql`;

// GraphQL introspection query
const INTROSPECTION_QUERY = `
  query IntrospectionQuery {
    __schema {
      types {
        name
        kind
        description
        fields {
          name
          type {
            name
            kind
            ofType {
              name
              kind
              ofType {
                name
                kind
              }
            }
          }
          description
        }
        enumValues {
          name
          description
        }
        inputFields {
          name
          type {
            name
            kind
            ofType {
              name
              kind
              ofType {
                name
                kind
              }
            }
          }
          description
        }
      }
    }
  }
`;

// Fetch schema from Keystone
async function fetchSchema() {
  try {
    console.log(`Fetching schema from ${GRAPHQL_ENDPOINT}...`);
    
    const response = await fetch(GRAPHQL_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: INTROSPECTION_QUERY
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.errors) {
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    return result.data.__schema;
  } catch (error) {
    console.error('Error fetching schema:', error);
    process.exit(1);
  }
}

// Generate TypeScript type from GraphQL type
function generateType(type) {
  if (!type) return 'any';
  
  switch (type.kind) {
    case 'SCALAR':
      switch (type.name) {
        case 'String': return 'string';
        case 'Int': return 'number';
        case 'Float': return 'number';
        case 'Boolean': return 'boolean';
        case 'ID': return 'string';
        case 'DateTime': return 'string';
        case 'JSON': return 'any';
        case 'Upload': return 'File';
        default: return 'any';
      }
    case 'ENUM':
      return type.name;
    case 'OBJECT':
    case 'INTERFACE':
    case 'INPUT_OBJECT':
      return type.name;
    case 'LIST':
      return `${generateType(type.ofType)}[]`;
    case 'NON_NULL':
      return generateType(type.ofType);
    default:
      return 'any';
  }
}

// Generate interface for object type
function generateInterface(type) {
  if (!type.fields) return '';
  
  const fields = type.fields.map(field => {
    const fieldType = generateType(field.type);
    const isOptional = field.type.kind !== 'NON_NULL';
    const fieldName = field.name;
    
    return `  ${fieldName}${isOptional ? '?' : ''}: ${fieldType};`;
  }).join('\n');

  return `export interface ${type.name} {\n${fields}\n}`;
}

// Generate enum
function generateEnum(type) {
  if (!type.enumValues) return '';
  
  const values = type.enumValues.map(value => 
    `  ${value.name} = '${value.name}'`
  ).join(',\n');

  return `export enum ${type.name} {\n${values}\n}`;
}

// Generate input type interface
function generateInputInterface(type) {
  if (!type.inputFields) return '';
  
  const fields = type.inputFields.map(field => {
    const fieldType = generateType(field.type);
    const isOptional = field.type.kind !== 'NON_NULL';
    const fieldName = field.name;
    
    return `  ${fieldName}${isOptional ? '?' : ''}: ${fieldType};`;
  }).join('\n');

  return `export interface ${type.name} {\n${fields}\n}`;
}

// Main types we care about
const MAIN_TYPES = ['BlogPost', 'Project', 'User', 'ImageFieldOutput'];
const ENUM_TYPES = ['ImageExtension', 'OrderDirection', 'QueryMode'];

// Generate TypeScript file
function generateTypeScriptFile(schema) {
  const types = schema.types;
  
  let output = `// Auto-generated types for Keystone CMS
// Generated on ${new Date().toISOString()}
// Do not edit manually - run 'npm run generate:types' to regenerate

`;

  // Generate main object types
  const mainTypes = types.filter(type => 
    type.kind === 'OBJECT' && 
    MAIN_TYPES.includes(type.name)
  );

  mainTypes.forEach(type => {
    output += generateInterface(type) + '\n\n';
  });

  // Generate enums
  const enums = types.filter(type => 
    type.kind === 'ENUM' && 
    ENUM_TYPES.includes(type.name)
  );

  enums.forEach(type => {
    output += generateEnum(type) + '\n\n';
  });

  // Generate input types (filters, etc.)
  const inputTypes = types.filter(type => 
    type.kind === 'INPUT_OBJECT' && 
    (type.name.includes('Where') || 
     type.name.includes('Filter') || 
     type.name.includes('OrderBy') ||
     type.name.includes('Input'))
  );

  inputTypes.forEach(type => {
    output += generateInputInterface(type) + '\n\n';
  });

  // Add utility types
  output += `// Utility types for UI
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
`;

  return output;
}

// Main function
async function main() {
  console.log('🚀 Generating Keystone TypeScript types...');
  
  const schema = await fetchSchema();
  const typeScriptContent = generateTypeScriptFile(schema);
  
  const outputPath = join(__dirname, '../src/lib/types/keystone.ts');
  writeFileSync(outputPath, typeScriptContent);
  
  console.log(`✅ Types generated successfully at: ${outputPath}`);
  console.log(`📊 Found ${schema.types.length} types in schema`);
}

// Run the script
main().catch(console.error);
