# Keystone Schema Generation Scripts

This directory contains scripts to automatically generate TypeScript types from your Keystone CMS GraphQL schema.

## Available Scripts

### 1. `npm run keystone:fetch`
Fetches the GraphQL schema from your Keystone instance and saves it as JSON.
- **File**: `scripts/fetch-schema.js`
- **Output**: `src/lib/types/keystone-schema.json`
- **Use case**: Quick schema inspection and backup

### 2. `npm run keystone:sync` 
Generates TypeScript types from your Keystone schema with custom formatting.
- **File**: `scripts/generate-keystone-types.js`
- **Output**: `src/lib/types/keystone.ts`
- **Use case**: Custom TypeScript interfaces with utility types

### 3. `npm run keystone:codegen` (Requires GraphQL Codegen)
Uses GraphQL Code Generator for comprehensive type generation.
- **Config**: `codegen.yml`
- **Output**: `src/lib/types/keystone-generated.ts`
- **Use case**: Full-featured type generation with query/mutation types

## Configuration

Set your Keystone URL via environment variable:
```bash
export KEYSTONE_URL=http://localhost:3000
# or
KEYSTONE_URL=https://your-keystone-instance.com npm run keystone:sync
```

Default URL: `http://localhost:3000`

## Workflow

1. **Development**: Use `npm run keystone:sync` for quick type updates
2. **Production**: Use `npm run keystone:codegen` for comprehensive types
3. **Debugging**: Use `npm run keystone:fetch` to inspect the schema

## Generated Files

- `src/lib/types/keystone.ts` - Hand-crafted interfaces with utility types
- `src/lib/types/keystone-generated.ts` - Auto-generated comprehensive types
- `src/lib/types/keystone-schema.json` - Raw GraphQL schema introspection

## Tips

- Run type generation after any schema changes in Keystone
- Add these scripts to your CI/CD pipeline
- Consider adding a pre-commit hook to ensure types are up-to-date
- The custom script (`keystone:sync`) includes utility types for your UI components

## Troubleshooting

**Connection refused error**: Make sure your Keystone server is running
**GraphQL errors**: Check that your Keystone instance has the GraphQL API enabled
**Type conflicts**: Delete old type files before regenerating if you encounter import errors
