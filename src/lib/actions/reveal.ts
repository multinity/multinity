import { motionConfig } from '#lib/config/motion.js';

type RevealOptions = { delay?: number; duration?: number; distance?: number; scale?: number };

/** One-time entrances; content stays visible for keyboard navigation and reduced motion. */
export function reveal(node: HTMLElement, options: RevealOptions = {}) {
	const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
	let observer: IntersectionObserver | undefined;

	function configure(next: RevealOptions) {
		const settings = { ...motionConfig.reveal, ...next };
		node.style.setProperty('--reveal-delay', `${settings.delay}ms`);
		node.style.setProperty('--reveal-duration', `${settings.duration}ms`);
		node.style.setProperty('--reveal-distance', `${settings.distance}px`);
		node.style.setProperty('--reveal-scale', String(settings.scale));
		node.style.setProperty('--reveal-easing', settings.easing);
	}

	function show(immediately = false) {
		if (immediately) node.classList.add('reveal-instant');
		node.classList.add('is-revealed');
		observer?.disconnect();
	}

	function syncPreference() {
		if (preference.matches) show(true);
	}

	const onFocus = () => show(true);
	configure(options);
	node.classList.add('reveal-ready');
	if (preference.matches || !('IntersectionObserver' in window)) {
		show(true);
	} else {
		observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) show();
			},
			{ threshold: 0, rootMargin: `0px 0px -${motionConfig.reveal.viewportInset}px 0px` }
		);
		observer.observe(node);
	}
	preference.addEventListener('change', syncPreference);
	node.addEventListener('focusin', onFocus);

	return {
		update: configure,
		destroy() {
			observer?.disconnect();
			preference.removeEventListener('change', syncPreference);
			node.removeEventListener('focusin', onFocus);
			node.classList.remove('reveal-ready', 'is-revealed', 'reveal-instant');
			for (const key of ['delay', 'duration', 'distance', 'scale', 'easing']) {
				node.style.removeProperty(`--reveal-${key}`);
			}
		}
	};
}
