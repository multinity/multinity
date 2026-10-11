<script lang="ts">
	import OfficialLogo from './OfficialLogo.svelte';
	import { siteConfig } from '#lib/config/site.js';

	let { compact = false, inverse = false }: { compact?: boolean; inverse?: boolean } = $props();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
<a
	class:compact
	class="brand"
	href={siteConfig.brand.homeHref}
	aria-label={siteConfig.brand.homeLabel}
>
	<OfficialLogo {inverse} class="brand-symbol" />
	<span class="brand-name">{siteConfig.name}</span>
</a>

<style>
	.brand {
		justify-self: start;
		width: fit-content;
		min-height: 44px;
		border-radius: var(--radius-pill);
		display: inline-flex;
		align-items: center;
		gap: 0.7rem;
		color: inherit;
		text-decoration: none;
		font-size: 1rem;
		font-weight: 650;
		letter-spacing: -0.035em;
	}

	.brand :global(.brand-symbol) {
		width: 34px;
		flex: 0 0 34px;
		transition: transform var(--control-duration) var(--control-easing);
	}

	@media (prefers-reduced-motion: no-preference) {
		.brand:focus-visible :global(.brand-symbol) {
			transform: rotate(-8deg) scale(1.08);
		}
		@media (hover: hover) and (pointer: fine) {
			.brand:hover :global(.brand-symbol) {
				transform: rotate(-8deg) scale(1.08);
			}
		}
		.brand:active :global(.brand-symbol) {
			transform: scale(0.98);
		}
	}

	.compact .brand-name {
		display: none;
	}
</style>
