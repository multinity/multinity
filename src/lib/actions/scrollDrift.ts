import { motionConfig } from '#lib/config/motion.js';

/** Small scroll-linked translation, eased only while the containing section is visible. */
export function scrollDrift(node: HTMLElement) {
	const section = node.closest('section') ?? node;
	const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
	const mobile = window.matchMedia('(max-width: 760px)');
	let visible = false;
	let frame = 0;
	let previousTime = 0;
	let current = 0;
	let target = 0;

	function tick(time: number) {
		const elapsed = previousTime ? Math.min(time - previousTime, 64) : 16;
		previousTime = time;
		current += (target - current) * (1 - Math.exp(-elapsed / motionConfig.hero.settleTime));
		if (Math.abs(target - current) < 0.1) current = target;
		node.style.setProperty('--scroll-drift', `${current.toFixed(2)}px`);
		frame = current !== target ? requestAnimationFrame(tick) : 0;
	}

	function update() {
		if (!visible || document.hidden || reduced.matches) {
			cancelAnimationFrame(frame);
			frame = 0;
			previousTime = 0;
			if (reduced.matches) {
				current = target = 0;
				node.style.setProperty('--scroll-drift', '0px');
			}
			return;
		}
		const rect = section.getBoundingClientRect();
		const progress = Math.min(1, Math.max(0, -rect.top / rect.height));
		target = progress * (mobile.matches ? motionConfig.hero.mobileDrift : motionConfig.hero.drift);
		if (!frame && current !== target) {
			previousTime = 0;
			frame = requestAnimationFrame(tick);
		}
	}

	const observer = new IntersectionObserver(([entry]) => {
		visible = entry.isIntersecting;
		update();
	});
	observer.observe(section);
	window.addEventListener('scroll', update, { passive: true });
	window.addEventListener('resize', update, { passive: true });
	document.addEventListener('visibilitychange', update);
	reduced.addEventListener('change', update);
	mobile.addEventListener('change', update);
	return {
		destroy() {
			cancelAnimationFrame(frame);
			observer.disconnect();
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
			document.removeEventListener('visibilitychange', update);
			reduced.removeEventListener('change', update);
			mobile.removeEventListener('change', update);
			node.style.removeProperty('--scroll-drift');
		}
	};
}
