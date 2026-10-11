import { PUBLIC_SITE_URL } from '$app/env/public';

const paths = {
	home: '/',
	top: '#top',
	about: '/about',
	contact: '/contact',
	careers: '/careers',
	blog: '/blog',
	openSource: '/opensource',
	privacy: '/privacy',
	terms: '/terms'
} as const;

function siteHref(path: string) {
	if (path.startsWith('#') || !PUBLIC_SITE_URL) return path;
	return new URL(path, `${PUBLIC_SITE_URL}/`).toString();
}

export const routes = {
	home: siteHref(paths.home),
	top: paths.top,
	about: siteHref(paths.about),
	contact: siteHref(paths.contact),
	careers: siteHref(paths.careers),
	blog: siteHref(paths.blog),
	openSource: siteHref(paths.openSource),
	privacy: siteHref(paths.privacy),
	terms: siteHref(paths.terms)
} as const;

export const siteConfig = {
	key: 'multinity',
	name: 'Multinity',
	origin: PUBLIC_SITE_URL,
	locale: 'English (US)',
	anchors: {
		top: 'top',
		main: 'main-content',
		services: 'services'
	},
	metadata: {
		title: 'Multinity — Building the Ecosystem',
		description: 'Technology services for search, automation, data, security, and the open web.'
	},
	brand: {
		homeHref: paths.home,
		homeLabel: 'Multinity home'
	},
	navigation: {
		ariaLabel: 'Primary navigation',
		openLabel: 'Open menu',
		closeLabel: 'Close menu',
		items: []
	},
	theme: {
		light: { label: 'Light', switchLabel: 'Switch to dark theme' },
		dark: { label: 'Dark', switchLabel: 'Switch to light theme' }
	},
	hero: {
		title: 'Building the',
		emphasis: 'ecosystem.',
		visual: {
			label: 'The Multinity infinity ribbon, floating in three dimensions',
			pointerTilt: 16,
			durationSeconds: 9
		}
	},
	services: [
		{
			number: '01',
			name: 'Search & discovery',
			description:
				'Help people find the right information faster with focused search, useful filters, and clear results.'
		},
		{
			number: '02',
			name: 'Web platforms',
			description:
				'Design and build responsive digital experiences that make complex workflows feel simple.'
		},
		{
			number: '03',
			name: 'AI & automation',
			description:
				'Turn repetitive work into dependable systems with practical AI, thoughtful interfaces, and human control.'
		},
		{
			number: '04',
			name: 'Data & analytics',
			description:
				'Bring scattered signals together in dashboards and tools that make the next decision clearer.'
		},
		{
			number: '05',
			name: 'Cloud foundations',
			description:
				'Create secure, observable infrastructure that stays reliable as your products and audience grow.'
		},
		{
			number: '06',
			name: 'Privacy & security',
			description:
				'Protect accounts, data, and everyday interactions with privacy-minded architecture from the start.'
		}
	],
	footer: {
		title: 'Built with intent.',
		titleLineTwo: 'Made to last.',
		subscribeDescription: 'Occasional notes on privacy and the web we want to build.',
		subscribeLabel: 'Subscribe to updates',
		emailPlaceholder: 'Email address',
		submitLabel: 'Subscribe',
		successMessage: 'You’re on the list. Thank you.',
		columns: [],
		copyright: '© 2026 Multinity. All rights reserved.',
		backToTopLabel: 'Back to top ↑',
		backToTopHref: routes.top
	},
	error: {
		notFound: {
			errorMessage: 'Page not found',
			title: '404 — Page Not Found',
			description: 'This route does not resolve to a live page in the Multinity ecosystem.',
			heading: 'Page not found.',
			message: 'The page may have moved or no longer exists.',
			visual: {
				label: 'A network signal searching for a missing destination'
			}
		},
		generic: {
			title: 'Something Went Wrong',
			description: 'An unexpected error occurred while loading this page.',
			heading: 'Something went wrong.',
			message: 'The page could not be loaded right now. Please return home and try again.',
			visual: {
				label: 'A network signal interrupted before reaching its destination'
			}
		},
		labels: {
			returnHome: 'Return home'
		},
		homeHref: routes.home
	},
	accessibility: {
		skipToContent: 'Skip to content',
		skipHref: '#main-content'
	}
} as const;
