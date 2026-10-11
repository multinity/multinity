import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
	PUBLIC_SITE_URL: {
		public: true,
		static: true,
		description: 'Optional public origin used to resolve configured site links.',
		schema: (value) => {
			if (!value) return '';

			try {
				return new URL(value).origin;
			} catch {
				throw new Error('PUBLIC_SITE_URL must be a valid absolute URL.');
			}
		}
	},
	DATABASE_URL: { description: 'The database connection string.' }
});
