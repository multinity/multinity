<script lang="ts">
	import { onMount } from 'svelte';
	import { gyroTilt } from '#lib/actions/gyroTilt.js';

	let { label }: { label: string } = $props();

	let host: HTMLDivElement;
	let animate = $state(false);

	onMount(() => {
		const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
		let visible = false;

		const sync = () => {
			animate = visible && !motion.matches && !document.hidden;
		};

		const obs = new IntersectionObserver(([e]) => {
			visible = e.isIntersecting;
			sync();
		});

		obs.observe(host);
		motion.addEventListener('change', sync);
		document.addEventListener('visibilitychange', sync);
		sync();

		return () => {
			obs.disconnect();
			motion.removeEventListener('change', sync);
			document.removeEventListener('visibilitychange', sync);
		};
	});

	function handleTilt(x: number, y: number) {
		if (!host) return;
		host.style.setProperty('--shift-x', `${x * 18}px`);
		host.style.setProperty('--shift-y', `${y * 14}px`);
		host.style.setProperty('--rot-x', `${-y * 16}deg`);
		host.style.setProperty('--rot-y', `${x * 18}deg`);
	}

	function handleReset() {
		if (!host) return;
		host.style.removeProperty('--shift-x');
		host.style.removeProperty('--shift-y');
		host.style.removeProperty('--rot-x');
		host.style.removeProperty('--rot-y');
	}
</script>

<div
	bind:this={host}
	class="route-signal"
	class:animate
	role="img"
	aria-label={label}
	use:gyroTilt={{ onTilt: handleTilt, onReset: handleReset, isActive: () => animate }}
>
	<!-- Ambient Telemetry & Signal Field -->
	<svg class="ambient-field" viewBox="0 0 560 340" aria-hidden="true">
		<!-- Corner Precision Registration Marks -->
		<g class="crosshairs" stroke="currentColor" stroke-width="1" opacity="0.25">
			<!-- Top-Left -->
			<path d="M 42 48 H 54 M 48 42 V 54" />
			<!-- Top-Right -->
			<path d="M 506 48 H 518 M 512 42 V 54" />
			<!-- Bottom-Left -->
			<path d="M 42 292 H 54 M 48 286 V 298" />
			<!-- Bottom-Right -->
			<path d="M 506 292 H 518 M 512 286 V 298" />
		</g>

		<!-- Concentric Radar Range Circles centered at (280, 170) -->
		<g class="range-rings" stroke="currentColor" fill="none">
			<circle cx="280" cy="170" r="150" stroke-width="0.6" opacity="0.06" stroke-dasharray="3 6" />
			<circle cx="280" cy="170" r="114" stroke-width="0.7" opacity="0.10" stroke-dasharray="6 8" />
			<circle cx="280" cy="170" r="82" stroke-width="0.8" opacity="0.14" />
		</g>

		<!-- Disconnected Signal Pathway Beams -->
		<g class="signal-pathways" stroke="currentColor" fill="none">
			<path d="M 35 55 L 135 105 L 195 135" stroke-width="1.2" opacity="0.22" stroke-dasharray="4 4" />
			<path d="M 525 285 L 425 235 L 365 205" stroke-width="1.2" opacity="0.22" stroke-dasharray="4 4" />
			<circle class="signal-dot dot-1" r="3" fill="currentColor" />
			<circle class="signal-dot dot-2" r="3" fill="currentColor" />
		</g>
	</svg>

	<!-- 3D Floating 404 Sculpture Stage -->
	<div class="sculpture-perspective">
		<div class="pointer-rig">
			<svg class="sculpture-svg" viewBox="0 0 560 340" aria-hidden="true">
				<!-- Ground shadow under the 404 sculpture -->
				<ellipse cx="280" cy="285" rx="205" ry="16" class="shadow-ellipse" />

				<!-- LEFT NUMERAL '4' -->
				<g class="num-group num-left">
					<text x="145" y="176" class="num-extrusion" text-anchor="middle" dominant-baseline="central">4</text>
					<text x="145" y="170" class="num-face" text-anchor="middle" dominant-baseline="central">4</text>
				</g>

				<!-- CENTER '0' RETICLE / RADAR SENSOR CHAMBER -->
				<g class="reticle-core" transform="translate(280 170)">
					<!-- Expanding Sonar Ping Waves -->
					<circle class="sonar-ring s1" r="54" />
					<circle class="sonar-ring s2" r="54" />

					<!-- Outer Dial with Degree Hash Marks -->
					<circle class="dial-outer" r="56" />
					<circle class="dial-orbit" r="48" />

					<!-- Rotating Radar Sweep Cone -->
					<g class="sweep-arm">
						<path d="M 0 0 L 48 -16 A 50 50 0 0 1 50 0 Z" class="sweep-wedge" />
						<line x1="0" y1="0" x2="50" y2="0" class="sweep-line" />
					</g>

					<!-- Crosshairs -->
					<line x1="-40" y1="0" x2="-14" y2="0" class="crosshair" />
					<line x1="14" y1="0" x2="40" y2="0" class="crosshair" />
					<line x1="0" y1="-40" x2="0" y2="-14" class="crosshair" />
					<line x1="0" y1="14" x2="0" y2="40" class="crosshair" />

					<!-- Center Disconnected Node -->
					<circle r="7.5" class="core-dot" />
					<circle r="2.5" class="core-inner-dot" />

					<!-- Monospace telemetry status tag underneath 0 -->
					<text y="82" class="reticle-tag" text-anchor="middle">ROUTE_LOST</text>
				</g>

				<!-- RIGHT NUMERAL '4' -->
				<g class="num-group num-right">
					<text x="415" y="176" class="num-extrusion" text-anchor="middle" dominant-baseline="central">4</text>
					<text x="415" y="170" class="num-face" text-anchor="middle" dominant-baseline="central">4</text>
				</g>
			</svg>
		</div>
	</div>
</div>

<style>
	/* ─── Host Stage (Completely Unboxed) ───────────────────── */
	.route-signal {
		--shift-x: 0px;
		--shift-y: 0px;
		--rot-x: 0deg;
		--rot-y: 0deg;
		--float-dur: 8.5s;
		--depth-color: color-mix(in srgb, var(--color-ink) 26%, var(--color-canvas));

		position: relative;
		width: 100%;
		aspect-ratio: 1.25;
		min-width: 0;
		color: var(--color-ink);
		user-select: none;
		overflow: visible;
		display: grid;
		place-items: center;
	}

	/* ─── Ambient Telemetry Field ───────────────────────────── */
	.ambient-field {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		pointer-events: none;
		transform: translate(calc(var(--shift-x) * 0.3), calc(var(--shift-y) * 0.3));
		transition: transform 400ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	/* ─── 3D Perspective Rig ────────────────────────────────── */
	.sculpture-perspective {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		perspective: 1000px;
		pointer-events: none;
	}

	.pointer-rig {
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transform: translate(var(--shift-x), var(--shift-y)) rotateX(var(--rot-x)) rotateY(var(--rot-y));
		transition: transform 380ms cubic-bezier(0.22, 1, 0.36, 1);
	}

	.animate .pointer-rig {
		animation: float-3d var(--float-dur) ease-in-out infinite;
	}

	.sculpture-svg {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		overflow: visible;
	}

	/* Ground shadow */
	.shadow-ellipse {
		fill: var(--color-ink);
		opacity: 0.08;
		filter: blur(12px);
	}

	.animate .shadow-ellipse {
		animation: shadow-breathe var(--float-dur) ease-in-out infinite;
	}

	/* ─── Numerals ──────────────────────────────────────────── */
	.num-group {
		font-family:
			Inter,
			ui-sans-serif,
			-apple-system,
			BlinkMacSystemFont,
			sans-serif;
	}

	.num-extrusion {
		font-size: 154px;
		font-weight: 850;
		letter-spacing: -0.06em;
		fill: var(--depth-color);
		opacity: 0.55;
	}

	.num-face {
		font-size: 154px;
		font-weight: 850;
		letter-spacing: -0.06em;
		fill: var(--color-ink);
		filter:
			drop-shadow(0 1px 0 var(--depth-color))
			drop-shadow(0 2px 0 var(--depth-color))
			drop-shadow(0 3px 0 var(--depth-color))
			drop-shadow(0 4px 0 var(--depth-color))
			drop-shadow(0 16px 28px color-mix(in srgb, var(--color-ink) 14%, transparent));
	}

	/* ─── Center Reticle / Radar Sensor Chamber ──────────────── */
	.reticle-core {
		color: var(--color-ink);
	}

	.dial-outer {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.5;
		opacity: 0.35;
		stroke-dasharray: 4 6;
	}

	.dial-orbit {
		fill: none;
		stroke: currentColor;
		stroke-width: 1.2;
		opacity: 0.55;
		stroke-dasharray: 18 10 4 10;
		transform-origin: 0 0;
	}

	.animate .dial-orbit {
		animation: orbit-turn 18s linear infinite;
	}

	/* Radar Sweep Arm */
	.sweep-arm {
		transform-origin: 0 0;
	}

	.animate .sweep-arm {
		animation: sweep-turn 3.8s linear infinite;
	}

	.sweep-wedge {
		fill: currentColor;
		opacity: 0.12;
	}

	.sweep-line {
		stroke: currentColor;
		stroke-width: 1.4;
		opacity: 0.7;
	}

	/* Sonar Rings */
	.sonar-ring {
		fill: none;
		stroke: currentColor;
		opacity: 0;
		transform-origin: 0 0;
	}

	.animate .s1 {
		animation: sonar-ping 4s ease-out infinite 0s;
	}

	.animate .s2 {
		animation: sonar-ping 4s ease-out infinite 2s;
	}

	/* Crosshairs & Center Node */
	.crosshair {
		stroke: currentColor;
		stroke-width: 1.2;
		opacity: 0.5;
	}

	.core-dot {
		fill: var(--color-ink);
		opacity: 0.9;
	}

	.core-inner-dot {
		fill: var(--color-canvas);
	}

	.reticle-tag {
		font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
		font-size: 8.5px;
		letter-spacing: 0.18em;
		fill: var(--color-muted);
		font-weight: 600;
	}

	/* ─── Signal Dots ───────────────────────────────────────── */
	.signal-dot {
		opacity: 0;
	}

	.animate .dot-1 {
		animation: dot-pulse-1 3.2s ease-in-out infinite;
	}

	.animate .dot-2 {
		animation: dot-pulse-2 3.2s ease-in-out infinite 1.6s;
	}

	/* ─── Keyframe Animations ───────────────────────────────── */
	@keyframes float-3d {
		0%,
		100% {
			transform: translate(var(--shift-x), var(--shift-y)) rotateX(var(--rot-x))
				rotateY(var(--rot-y)) translateY(0px);
		}
		50% {
			transform: translate(var(--shift-x), var(--shift-y)) rotateX(var(--rot-x))
				rotateY(var(--rot-y)) translateY(-14px);
		}
	}

	@keyframes shadow-breathe {
		0%,
		100% {
			transform: scale(1);
			opacity: 0.08;
		}
		50% {
			transform: scale(0.88);
			opacity: 0.04;
		}
	}

	@keyframes orbit-turn {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes sweep-turn {
		to {
			transform: rotate(360deg);
		}
	}

	@keyframes sonar-ping {
		0% {
			r: 14px;
			opacity: 0.65;
			stroke-width: 1.4;
		}
		75% {
			r: 56px;
			opacity: 0;
			stroke-width: 0.5;
		}
		100% {
			r: 56px;
			opacity: 0;
		}
	}

	@keyframes dot-pulse-1 {
		0% {
			cx: 35px;
			cy: 55px;
			opacity: 0.6;
		}
		80% {
			cx: 195px;
			cy: 135px;
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}

	@keyframes dot-pulse-2 {
		0% {
			cx: 525px;
			cy: 285px;
			opacity: 0.6;
		}
		80% {
			cx: 365px;
			cy: 205px;
			opacity: 0;
		}
		100% {
			opacity: 0;
		}
	}

	/* ─── Responsive ────────────────────────────────────────── */
	@media (max-width: 760px) {
		.route-signal {
			aspect-ratio: 1.3;
			width: 100%;
			max-width: 440px;
			margin-inline: auto;
		}
	}

	/* ─── Reduced Motion ────────────────────────────────────── */
	@media (prefers-reduced-motion: reduce) {
		.ambient-field,
		.pointer-rig {
			transform: none !important;
			animation: none !important;
			transition: none !important;
		}

		.dial-orbit,
		.sweep-arm,
		.sonar-ring,
		.shadow-ellipse,
		.signal-dot {
			animation: none !important;
		}
	}
</style>
