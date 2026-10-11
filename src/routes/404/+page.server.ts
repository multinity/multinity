import { error } from '@sveltejs/kit';
import { siteConfig } from '#lib/config/site.js';

export function load() {
	error(404, siteConfig.error.notFound.errorMessage);
}
