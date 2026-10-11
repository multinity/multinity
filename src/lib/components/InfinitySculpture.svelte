<script lang="ts">
	import { onMount } from 'svelte';
	import logoMask from '#lib/assets/multinity.black.svg';
	import { motionConfig } from '#lib/config/motion.js';
	import OfficialLogo from './OfficialLogo.svelte';
	import { siteConfig } from '#lib/config/site.js';
	import { gyroTilt } from '#lib/actions/gyroTilt.js';

	const visual = siteConfig.hero.visual;
	const reaction = motionConfig.sculpture;
	let host: HTMLDivElement;
	let animate = $state(false);
	let interacting = $state(false);

	onMount(() => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let visible = false;
		const sync = () => {
			animate = visible && !document.hidden && !motion.matches;
			if (!animate) resetTilt();
		};
		const observer = new IntersectionObserver(([entry]) => {
			visible = entry.isIntersecting;
			sync();
		});
		observer.observe(host);
		motion.addEventListener('change', sync);
		document.addEventListener('visibilitychange', sync);

		sync();
		return () => {
			observer.disconnect();
			motion.removeEventListener('change', sync);
			document.removeEventListener('visibilitychange', sync);
		};
	});

	function handleTilt(x: number, y: number) {
		if (!host) return;
		interacting = true;
		host.style.setProperty('--pointer-x', `${-y * visual.pointerTilt}deg`);
		host.style.setProperty('--pointer-y', `${x * visual.pointerTilt}deg`);
		host.style.setProperty('--travel-x', `${x * reaction.travel}px`);
		host.style.setProperty('--travel-y', `${y * reaction.travel - reaction.lift}px`);
		host.style.setProperty('--light-x', `${x * 35}%`);
		host.style.setProperty('--light-y', `${y * 35}%`);
		host.style.setProperty('--shadow-x', `${-x * reaction.travel}px`);
	}

	function resetTilt() {
		interacting = false;
		if (!host) return;
		host.style.setProperty('--pointer-x', '0deg');
		host.style.setProperty('--pointer-y', '0deg');
		for (const property of ['--travel-x', '--travel-y', '--light-x', '--light-y', '--shadow-x']) {
			host.style.removeProperty(property);
		}
	}
</script>

<div
	bind:this={host}
	class="sculpture-stage"
	class:animate
	class:interacting
	role="img"
	aria-label={visual.label}
	style={`--float-duration: ${visual.durationSeconds}s; --logo-mask: url('${logoMask}'); --reaction-duration: ${reaction.response}ms; --reaction-scale: ${reaction.scale}; --sheen-duration: ${reaction.sheenDuration}ms`}
	use:gyroTilt={{ onTilt: handleTilt, onReset: resetTilt, isActive: () => animate }}
	onpointercancel={resetTilt}
>
	<div class="ground-shadow" aria-hidden="true"></div>
	<div class="perspective" aria-hidden="true">
		<div class="pointer-rig">
			<div class="sculpture">
				<div class="logo-depth"><div class="depth-surface"></div></div>
				<div class="logo-face">
					<OfficialLogo />
					<div class="surface-finish">
						<div class="surface-light"></div>
						<div class="surface-sheen"></div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

<style>
	.sculpture-stage {
		--pointer-x: 0deg;
		--pointer-y: 0deg;
		--depth-color: color-mix(in srgb, var(--color-ink) 72%, var(--color-canvas));
		position: relative;
		width: 100%;
		min-width: 0;
		aspect-ratio: 1.2;
		/* Contain only decorative depth, never the page's content or controls. */
		overflow: clip;
	}

	.perspective {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		perspective: 1000px;
	}

	.pointer-rig {
		width: 86%;
		aspect-ratio: 2;
		transform-style: preserve-3d;
		transform: translate(var(--travel-x, 0px), var(--travel-y, 0px)) rotateX(var(--pointer-x))
			rotateY(var(--pointer-y));
		transition:
			transform var(--reaction-duration) cubic-bezier(0.22, 1, 0.36, 1),
			scale var(--reaction-duration) cubic-bezier(0.22, 1, 0.36, 1);
	}

	.interacting .pointer-rig {
		scale: var(--reaction-scale);
	}

	.sculpture {
		position: relative;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		animation: float var(--float-duration) ease-in-out infinite;
		animation-play-state: paused;
	}

	.logo-face {
		position: absolute;
		inset: 0;
		backface-visibility: hidden;
	}

	/* Overlapping, same-tone silhouette shadows form one continuous lower edge.
	   No separated Z planes, alternating colors, or hover-driven layer gaps. */
	.logo-depth {
		position: absolute;
		inset: 0;
		pointer-events: none;
		filter: drop-shadow(0 1px 0 var(--depth-color)) drop-shadow(0 2px 0 var(--depth-color))
			drop-shadow(0 3px 0 var(--depth-color));
	}

	.depth-surface {
		position: absolute;
		inset: 0;
		mask: var(--logo-mask) center / contain no-repeat;
		background: var(--depth-color);
	}

	/* A single masked lighting pass follows the original surface, never its silhouette. */
	.surface-finish {
		position: absolute;
		inset: 0;
		mask: var(--logo-mask) center / contain no-repeat;
		pointer-events: none;
		overflow: hidden;
	}

	.surface-light,
	.surface-sheen {
		position: absolute;
		inset: 0;
	}

	.surface-light {
		background: radial-gradient(ellipse at center, var(--color-canvas), transparent 60%);
		opacity: 0;
		transform: translate(var(--light-x, 0%), var(--light-y, 0%));
		transition:
			transform var(--reaction-duration) ease-out,
			opacity var(--reaction-duration) ease-out;
	}

	.interacting .surface-light {
		opacity: 0.22;
	}

	.surface-sheen {
		background: linear-gradient(110deg, transparent 30%, var(--color-canvas) 50%, transparent 70%);
		opacity: 0;
		animation: sheen var(--sheen-duration) ease-in-out infinite;
		animation-play-state: paused;
	}

	.ground-shadow {
		position: absolute;
		left: 15%;
		bottom: 16%;
		width: 70%;
		height: 9%;
		border-radius: 50%;
		background: radial-gradient(ellipse, var(--color-hairline), transparent 70%);
		filter: blur(10px);
		transform: rotate(-8deg);
		translate: var(--shadow-x, 0px) 0;
		transition:
			translate var(--reaction-duration) ease-out,
			scale var(--reaction-duration) ease-out;
		animation: breathe var(--float-duration) ease-in-out infinite;
		animation-play-state: paused;
	}

	.animate .sculpture,
	.animate .ground-shadow,
	.animate .surface-sheen {
		animation-play-state: running;
	}

	.interacting .ground-shadow {
		scale: 0.92;
	}

	@keyframes sheen {
		0%,
		55% {
			transform: translateX(-110%);
			opacity: 0;
		}
		68% {
			opacity: 0.14;
		}
		85%,
		100% {
			transform: translateX(110%);
			opacity: 0;
		}
	}

	@keyframes float {
		0%,
		100% {
			transform: translateY(0);
		}
		50% {
			transform: translateY(-14px);
		}
	}

	@keyframes breathe {
		50% {
			opacity: 0.55;
			transform: rotate(-8deg) scale(0.88);
		}
	}

	@media (max-width: 760px) {
		.sculpture-stage {
			aspect-ratio: 1.55;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.surface-finish {
			display: none;
		}
		.sculpture,
		.ground-shadow,
		.surface-sheen {
			animation: none;
		}
		.pointer-rig,
		.ground-shadow {
			transition: none;
		}
	}
</style>
