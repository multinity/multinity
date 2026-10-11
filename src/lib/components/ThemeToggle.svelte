<script lang="ts">
	import type { ThemeName } from '#lib/config/theme.js';
	import { siteConfig } from '#lib/config/site.js';
	import { motionConfig } from '#lib/config/motion.js';
	import Icon from './Icon.svelte';

	let { theme, onToggle }: { theme: ThemeName; onToggle: (origin: HTMLElement) => void } = $props();
	let rotation = $state(0);

	function toggleTheme(event: MouseEvent) {
		rotation += motionConfig.themeSwitch.rotation;
		onToggle(event.currentTarget as HTMLButtonElement);
	}
</script>

<button
	type="button"
	class="theme-toggle"
	onclick={toggleTheme}
	aria-label={siteConfig.theme[theme].switchLabel}
	title={siteConfig.theme[theme].switchLabel}
>
	<span
		class="theme-icon"
		aria-hidden="true"
		style={`--theme-rotation: ${rotation}deg; --theme-spin-duration: ${motionConfig.themeSwitch.duration}ms`}
	>
		<Icon name={theme === 'dark' ? 'sun' : 'moon'} />
	</span>
</button>

<style>
	.theme-icon {
		display: grid;
		place-items: center;
		transform: rotate(var(--theme-rotation));
		transition: transform var(--theme-spin-duration) var(--control-easing);
	}

	@media (prefers-reduced-motion: reduce) {
		.theme-icon {
			transform: none;
			transition: none;
		}
	}

	.theme-toggle {
		display: grid;
		place-items: center;
		width: 44px;
		height: 44px;
		flex: 0 0 44px;
		padding: 0;
		border: 1px solid var(--color-hairline);
		border-radius: var(--radius-pill);
		background: transparent;
		color: inherit;
		cursor: pointer;
	}
</style>
