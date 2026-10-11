import { motionConfig } from '#lib/config/motion.js';

let activeWave = 0;

/** Reveal the new palette from the control without moving the page or scroll position. */
export async function transitionTheme(
	origin: HTMLElement,
	update: () => Promise<void>,
	signal?: AbortSignal
) {
	const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
	if (reducedMotion.matches || signal?.aborted) {
		await update();
		return;
	}

	if (!document.startViewTransition) {
		await update();
		if (signal?.aborted || reducedMotion.matches) return;
		const fade = document.querySelector('.app-shell')?.animate([{ opacity: 0.8 }, { opacity: 1 }], {
			duration: motionConfig.themeSwitch.duration,
			easing: motionConfig.themeSwitch.easing
		});
		const cancel = () => fade?.cancel();
		signal?.addEventListener('abort', cancel, { once: true });
		reducedMotion.addEventListener('change', cancel);
		try {
			await fade?.finished.catch(() => {});
		} finally {
			signal?.removeEventListener('abort', cancel);
			reducedMotion.removeEventListener('change', cancel);
		}
		return;
	}

	const wave = ++activeWave;
	const root = document.documentElement;
	const bounds = origin.getBoundingClientRect();
	const x = bounds.left + bounds.width / 2;
	const y = bounds.top + bounds.height / 2;
	const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
	const properties = {
		'--theme-origin': `${x}px ${y}px`,
		'--theme-radius': `${Math.ceil(radius)}px`,
		'--theme-page-duration': `${motionConfig.themeSwitch.pageDuration}ms`,
		'--theme-icon-duration': `${motionConfig.themeSwitch.duration}ms`,
		'--theme-icon-rotation': `${motionConfig.themeSwitch.rotation}deg`,
		'--theme-easing': motionConfig.themeSwitch.easing
	};
	for (const [key, value] of Object.entries(properties)) root.style.setProperty(key, value);
	root.classList.add('theme-changing');
	let applied: Promise<void> | undefined;
	const apply = () => (applied ??= update());
	try {
		const transition = document.startViewTransition(apply);
		// Skipping a snapshot rejects ready, but the theme update must still complete.
		void transition.ready.catch(() => {});
		const cancel = () => transition.skipTransition();
		const stopMotion = () => {
			if (reducedMotion.matches) cancel();
		};
		signal?.addEventListener('abort', cancel, { once: true });
		reducedMotion.addEventListener('change', stopMotion);
		if (signal?.aborted) cancel();
		try {
			await transition.finished;
		} finally {
			signal?.removeEventListener('abort', cancel);
			reducedMotion.removeEventListener('change', stopMotion);
		}
	} catch {
		// A failed visual transition must not swallow or repeat the user's toggle.
		await apply();
	} finally {
		// An interrupted wave must not remove the newer wave's animation styles.
		if (wave === activeWave) {
			root.classList.remove('theme-changing');
			for (const key of Object.keys(properties)) root.style.removeProperty(key);
		}
	}
}
