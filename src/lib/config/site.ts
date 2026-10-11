import { PUBLIC_SITE_URL } from '$app/env/public';

const paths = {
	home: '/',
	top: '#top',
	portfolio: '#portfolio',
	copydrop: '/copydrop',
	wallet: '/wallet',
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
	portfolio: paths.portfolio,
	copydrop: siteHref(paths.copydrop),
	wallet: siteHref(paths.wallet),
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
		portfolio: 'portfolio'
	},
	metadata: {
		title: 'Multinity — Building the Ecosystem',
		description: 'Precision-engineered applications built to simplify and secure your digital life.'
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
	portfolio: {
		section: { number: '02', label: 'Portfolio' },
		title: 'Tools built for',
		titleLineTwo: 'the modern web.',
		description: 'Focused software, engineered to disappear into the task.',
		products: [
			{
				key: 'copydrop',
				number: '01',
				name: 'CopyDrop',
				description:
					'Instant P2P text sharing. Transfer snippets across devices securely via encrypted WebSockets.',
				href: routes.copydrop,
				type: 'copydrop' as const,
				statusLabel: 'Production ready',
				actionLabel: 'Open app'
			}
		]
	},
	productVisuals: {
		copydrop: {
			channelLabel: 'copydrop / secure channel',
			devices: [
				{ number: '01', name: 'MacBook', status: 'Connected' },
				{ number: '02', name: 'Phone', status: 'Connected' }
			],
			transferLabel: 'Encrypted',
			message: 'Text copied to your device',
			confirmation: '✓'
		},
		wallet: {
			period: 'This month',
			menuLabel: 'Overview',
			balanceLabel: 'Available balance',
			balance: '₹24,680',
			change: '+12.4% this month',
			chart: [42, 58, 36, 68, 52, 76, 64],
			dateLabel: 'Today',
			transactionLabel: 'Multinity Wallet',
			amount: '₹1,240'
		}
	},
	footer: {
		title: 'Built with intent.',
		titleLineTwo: 'Made to last.',
		subscribeDescription: 'Occasional notes on products, privacy, and the web we want to build.',
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
