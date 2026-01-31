# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Vetixa is a Veterinary Clinic Management System built with SvelteKit, Pocketbase (BaaS), and TailwindCSS. The application is entirely in French.

## Development Commands

```bash
npm run dev              # Start development server
npm run build            # Build for production
npm run preview          # Preview production build
npm run check            # Run svelte-check for type errors
npm run lint             # Run ESLint and Prettier checks
npm run format           # Format code with Prettier
npm run test             # Run all tests (integration + unit)
npm run test:unit        # Run Vitest unit tests only
npm run test:integration # Run Playwright integration tests
```

For production with Node adapter: `ADAPTER=node npm run build`

## Environment Setup

Required environment variables in `.env`:
- `PUBLIC_POCKETBASE_URL` - Pocketbase server URL (default: http://localhost:8090)
- `PUBLIC_POCKETBASE_ADMIN_URL` - Pocketbase admin panel URL

## Architecture

### Path Aliases
- `$lib` → `src/lib`
- `$components` → `src/lib/components`
- `$store` → `src/lib/store`
- `$utils` → `src/lib/utils`
- `$types` → `src/types.ts` and `src/pocketbase-types.ts`

### Type System
- `src/pocketbase-types.ts` - Auto-generated Pocketbase collection types (via pocketbase-typegen)
- `src/types.ts` - Application-specific types that extend Pocketbase types

### Data Layer Pattern
Each domain feature follows this structure:
- `src/lib/schemas/{domain}.ts` - Zod validation schemas for forms
- `src/lib/store/{domain}.ts` - Svelte stores for client-side state
- `src/lib/services/{domain}.ts` - Service classes for complex Pocketbase operations
- `src/lib/utils/{domain}.ts` - Domain-specific utility functions

### Form Handling
Forms use SuperForms with Zod adapters:
```typescript
import { superValidate, setError } from 'sveltekit-superforms/server';
import { zod } from 'sveltekit-superforms/adapters';
import { mySchema } from '$lib/schemas';

// In load function
const form = await superValidate(zod(mySchema), { id: 'form-id' });

// In action
const form = await superValidate(request, zod(mySchema), { id: 'form-id' });
```

### Authentication
- Handled via `hooks.server.ts` using Pocketbase auth
- `locals.pb` - Pocketbase client instance per request
- `locals.user` - Current authenticated user
- Protected routes in `(app)` group redirect to `/login` if unauthenticated

### Route Groups
- `(app)` - Protected application routes (clients, animals, visits, funds, etc.)
- `(login)` - Public authentication routes

### Key Collections (Pocketbase)
Main entities: clients, animals, visits, bills, hospitalisation, fund_transactions, inventory_item, agenda, queue, doctors, cages

## Code Style

- ESLint with TypeScript and Svelte plugins
- Unused variables must be prefixed with `_` (argsIgnorePattern, varsIgnorePattern)
- `svelte/no-at-html-tags` is disabled
- Prettier for formatting (plugin-search-dir based)

## Core Workflow: Research → Plan → Implement → Validate

**Start every feature with:** "Let me research the codebase and create a plan before implementing."

1. **Research** - Understand existing patterns and architecture
2. **Plan** - Propose approach and verify with user
3. **Implement** - Build with tests and error handling
4. **Validate** - ALWAYS run formatters, linters, and tests after implementation

## Code Organization Principles

**Keep functions small and focused:**
- If you need comments to explain sections, split into functions
- Group related functionality into clear modules
- Prefer many small files over few large ones

**Use path aliases consistently:**
- Always use `$lib`, `$components`, `$store`, `$utils`, `$types` aliases
- Never use relative imports for cross-domain imports
- Keep imports organized and grouped by type

**Follow the service pattern:**
- Services are classes with clear responsibilities
- Services should be testable with dependency injection
- Mock Pocketbase client in tests

**Follow the store pattern:**
- Stores manage client-side reactive state
- Keep stores focused on a single domain
- Use SuperForms stores for form state management

## Architecture Principles

**This is always a feature branch:**
- Delete old code completely - no deprecation needed
- No versioned names (processV2, handleNew, ClientOld)
- No migration code unless explicitly requested
- No "removed code" comments - just delete it

**Prefer explicit over implicit:**
- Clear function names over clever abstractions
- Obvious data flow over hidden magic
- Direct dependencies over service locators

**Security first:**
- Validate all inputs at system boundaries using Zod schemas
- Use Pocketbase's built-in auth and permissions
- Never trust client-side data

## Maximize Efficiency

**Parallel operations:** Run multiple searches, reads, and greps in single messages
**Multiple agents:** Split complex tasks - one for tests, one for implementation
**Batch similar work:** Group related file edits together

## Problem Solving

**When stuck:** Stop. The simple solution is usually correct.

**When uncertain:** "Let me ultrathink about this architecture."

**When choosing:** "I see approach A (simple) vs B (flexible). Which do you prefer?"

Your redirects prevent over-engineering. When uncertain about implementation, stop and ask for guidance.

## Testing Strategy

**Match testing approach to code complexity:**
- Complex business logic: Write tests first (TDD)
- Simple CRUD operations: Write code first, then tests
- Unit tests in `src/**/*.test.ts` (Vitest)
- Integration tests in `tests/` (Playwright)

**Performance rule:** Measure before optimizing. No guessing.

## Progress Tracking

- **TodoWrite** for task management
- **Clear naming** in all code
- **Descriptive commit messages** following repository style

Focus on maintainable solutions over clever abstractions.

## Design Patterns

**Service Pattern:**
- Service classes encapsulate Pocketbase operations
- Clear separation of concerns
- Dependency injection via constructor (TypedPocketBase)
- Example: `src/lib/services/client.ts`

**Store Pattern:**
- Reactive state management with Svelte writable stores
- Centralized state for cross-component communication
- SuperForms stores for form validation state
- Example: `src/lib/store/clients.ts`

**Schema Pattern:**
- Zod schemas define validation rules
- Schemas are reused across forms and API validation
- Base schemas extended for create/update variants
- Example: `src/lib/schemas/client.ts`

**Data Layer Pattern:**
- Each domain has: schema → store → service → utils
- Consistent file organization across features
- Types imported from `$types` (Pocketbase-generated + extensions)
