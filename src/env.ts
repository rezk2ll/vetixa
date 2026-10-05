import { defineEnvVars } from '@sveltejs/kit/env';

// Optional because they are only provided at runtime (container env), not at build time.
const optional = (value: string | undefined) => value;

export const variables = defineEnvVars({
	PUBLIC_POCKETBASE_URL: { public: true, schema: optional },
	PUBLIC_POCKETBASE_ADMIN_URL: { public: true, schema: optional }
});
