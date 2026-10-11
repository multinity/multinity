<script lang="ts">
	import ArrowLink from './ArrowLink.svelte';
	import ProductVisual from './ProductVisual.svelte';
	import { reveal } from '#lib/actions/reveal.js';
	import { motionConfig } from '#lib/config/motion.js';

	let {
		number,
		name,
		description,
		href,
		type,
		statusLabel,
		actionLabel,
		entranceDelay = 0
	}: {
		number: string;
		name: string;
		description: string;
		href: string;
		type: 'copydrop' | 'wallet';
		statusLabel: string;
		actionLabel: string;
		entranceDelay?: number;
	} = $props();
</script>

<article use:reveal={{ ...motionConfig.card, delay: entranceDelay }}>
	<div class="product-top">
		<span>{number}</span>
		<span>{statusLabel}</span>
	</div>
	<div class="visual-wrap"><ProductVisual {type} /></div>
	<div class="product-copy">
		<h3>{name}</h3>
		<div>
			<p>{description}</p>
			<ArrowLink {href} label={actionLabel} />
		</div>
	</div>
</article>

<style>
	article {
		--control-focus-color: var(--color-on-inverse);
		--action-background: var(--color-on-inverse);
		--action-foreground: var(--color-inverse);
		min-width: 0;
		border-top: 1px solid color-mix(in srgb, var(--color-on-inverse) 28%, transparent);
		padding-top: 1rem;
	}

	.product-top {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
		font-size: 0.62rem;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	.product-top span:last-child {
		display: flex;
		align-items: center;
		gap: 0.5rem;
	}

	.product-top span:last-child::before {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: currentColor;
		content: '';
		animation: pulse 1.8s ease-in-out infinite;
	}

	.visual-wrap {
		border-radius: var(--radius-panel);
		overflow: hidden;
	}

	.visual-wrap:hover :global(.product-visual) {
		transform: scale(1.015);
	}

	.product-copy {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 1rem;
		padding-top: 1.5rem;
	}

	h3 {
		margin: 0;
		font-size: clamp(2.2rem, 4vw, 4.6rem);
		font-weight: 550;
		line-height: 0.9;
		letter-spacing: -0.065em;
	}

	p {
		max-width: 38ch;
		margin: 0 0 1.2rem;
		color: color-mix(in srgb, var(--color-on-inverse) 68%, transparent);
		font-size: 0.95rem;
		line-height: 1.55;
	}

	@keyframes pulse {
		50% {
			opacity: 0.28;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.product-top span:last-child::before {
			animation: none;
		}
	}
</style>
