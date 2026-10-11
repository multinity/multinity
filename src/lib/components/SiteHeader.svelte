<script lang="ts">
	import BrandMark from './BrandMark.svelte';
	import ThemeToggle from './ThemeToggle.svelte';
	import type { ThemeName } from '#lib/config/theme.js';
	import { siteConfig } from '#lib/config/site.js';

	let { theme, onToggle }: { theme: ThemeName; onToggle: (origin: HTMLElement) => void } = $props();
</script>

<header class="site-header">
	<div class="header-inner site-container">
		<BrandMark />

		<div class="header-actions">
			<ThemeToggle {theme} {onToggle} />
		</div>
	</div>
</header>

<style>
	.site-header {
		position: fixed;
		z-index: 100;
		top: 0;
		left: 0;
		width: 100%;
		border-bottom: 1px solid var(--color-hairline);
		background: color-mix(in srgb, var(--color-canvas) 84%, transparent);
		color: var(--color-ink);
		backdrop-filter: blur(18px);
		transition:
			background-color 400ms ease,
			color 400ms ease;
	}

	.header-inner {
		display: grid;
		grid-template-columns: minmax(0, 1fr) auto;
		align-items: center;
		height: var(--header-height);
	}

	.header-actions {
		display: flex;
		align-items: center;
		justify-content: flex-end;
		gap: 1rem;
	}
</style>
