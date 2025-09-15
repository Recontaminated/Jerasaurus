#!/usr/bin/env node

import { writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const KEYSTONE_URL = process.env.KEYSTONE_URL || 'http://localhost:3000';
const GRAPHQL_ENDPOINT = `${KEYSTONE_URL}/api/graphql`;

// Simple query to get the schema SDL
const GET_SDL_QUERY = `
  query {
    __schema {
      queryType { name }
      mutationType { name }
      types {
        name
        kind
        description
      }
    }
  }
`;

// Introspection query to get full schema
const INTROSPECTION_QUERY = `
  query IntrospectionQuery {
    __schema {
      queryType { name }
      mutationType { name }
      types {
        ...FullType
      }
    }
  }

  fragment FullType on __Type {
    kind
    name
    description
    fields(includeDeprecated: true) {
      name
      description
      args {
        ...InputValue
      }
      type {
        ...TypeRef
      }
      isDeprecated
      deprecationReason
    }
    inputFields {
      ...InputValue
    }
    interfaces {
      ...TypeRef
    }
    enumValues(includeDeprecated: true) {
      name
      description
      isDeprecated
      deprecationReason
    }
    possibleTypes {
      ...TypeRef
    }
  }

  fragment InputValue on __InputValue {
    name
    description
    type { ...TypeRef }
    defaultValue
  }

  fragment TypeRef on __Type {
    kind
    name
    ofType {
      kind
      name
      ofType {
        kind
        name
        ofType {
          kind
          name
        }
      }
    }
  }
`;

async function fetchSchema() {
  try {
    console.log(`🔍 Fetching schema from ${GRAPHQL_ENDPOINT}...`);
    
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
      console.error('GraphQL errors:', result.errors);
      throw new Error(`GraphQL errors: ${JSON.stringify(result.errors)}`);
    }

    return result.data;
  } catch (error) {
    console.error('❌ Error fetching schema:', error.message);
    
    if (error.message.includes('ECONNREFUSED')) {
      console.log('\n💡 Make sure your Keystone server is running at:', KEYSTONE_URL);
      console.log('   You can update the URL by setting the KEYSTONE_URL environment variable\n');
    }
    
    process.exit(1);
  }
}

async function main() {
  console.log('🚀 Fetching Keystone GraphQL schema...\n');
  
  const schema = await fetchSchema();
  
  // Save the full introspection result
  const outputPath = join(__dirname, '../src/lib/types/keystone-schema.json');
  writeFileSync(outputPath, JSON.stringify(schema, null, 2));
  
  console.log(`✅ Schema saved to: ${outputPath}`);
  console.log(`📊 Found ${schema.__schema.types.length} types in schema`);
  
  // Print some useful info
  const userTypes = schema.__schema.types.filter(type => 
    !type.name.startsWith('__') && 
    type.kind === 'OBJECT' && 
    ['BlogPost', 'Project', 'User'].includes(type.name)
  );
  
  console.log('\n📋 Main content types found:');
  userTypes.forEach(type => {
    console.log(`   • ${type.name}`);
  });
  
  console.log('\n🎯 Next steps:');
  console.log('   • Run: npm run generate:types');
  console.log('   • Or run: npm run keystone:codegen (if you have @graphql-codegen installed)');
}

main().catch(console.error);
