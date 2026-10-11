<script lang="ts">
	import './layout.css';
	import blackLogo from '#lib/assets/multinity.black.webp';
	import type { LayoutProps } from './$types';
	import { onMount, tick } from 'svelte';
	import { transitionTheme } from '#lib/actions/themeTransition.js';
	import SiteHeader from '#lib/components/SiteHeader.svelte';
	import {
		themeConfig,
		themeVariables,
		shapeConfig,
		scrollbarConfig,
		type ThemeName
	} from '#lib/config/theme.js';
	import { siteConfig } from '#lib/config/site.js';
	import { interactionVariables } from '#lib/config/motion.js';

	let { children }: LayoutProps = $props();
	let theme = $state<ThemeName>('light');
	let requestedTheme: ThemeName | undefined;
	let themeAnimation: AbortController | undefined;

	// The page scrollbar belongs to the document, outside the themed app shell.
	$effect(() => {
		const root = document.documentElement;
		const palette = themeConfig[theme];
		const properties: Record<string, string> = {
			'--scrollbar-thumb': palette.ink,
			'--scrollbar-track': palette.canvas,
			'--scrollbar-width': scrollbarConfig.width,
			'--scrollbar-minimum': scrollbarConfig.minimumThumb,
			'--scrollbar-radius': shapeConfig.pill,
			'color-scheme': theme
		};
		const previous = Object.keys(properties).map((key) => ({
			key,
			value: root.style.getPropertyValue(key),
			priority: root.style.getPropertyPriority(key)
		}));
		for (const [key, value] of Object.entries(properties)) root.style.setProperty(key, value);
		return () => {
			for (const { key, value, priority } of previous) {
				if (value) root.style.setProperty(key, value, priority);
				else root.style.removeProperty(key);
			}
		};
	});

	onMount(() => {
		const saved = localStorage.getItem('multinity-theme') as ThemeName | null;
		if (saved === 'light' || saved === 'dark') {
			theme = saved;
		} else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
			theme = 'dark';
		}
	});

	function toggleTheme(origin: HTMLElement) {
		// Track intent immediately, even if the browser has not captured the last frame.
		const nextTheme = (requestedTheme ?? theme) === 'light' ? 'dark' : 'light';
		requestedTheme = nextTheme;
		themeAnimation?.abort();
		const controller = new AbortController();
		themeAnimation = controller;
		return transitionTheme(
			origin,
			async () => {
				// A skipped snapshot may still invoke its callback; never restore stale state.
				if (controller.signal.aborted) return;
				theme = nextTheme;
				try {
					localStorage.setItem('multinity-theme', theme);
				} catch {
					// Switching still works when browser storage is unavailable.
				}
				await tick();
			},
			controller.signal
		);
	}
</script>

<svelte:head>
	<link rel="icon" href="/favicon.ico" sizes="any" />
	<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
	<link rel="preload" as="image" href={blackLogo} type="image/webp" fetchpriority="high" />
	<title>{siteConfig.metadata.title}</title>
	<meta name="description" content={siteConfig.metadata.description} />
	<!-- Two theme-color tags let the browser tab bar match instantly, before JS runs.
	     The user-chosen theme overrides via the content attribute swap below. -->
	<meta
		name="theme-color"
		media="(prefers-color-scheme: light)"
		content={theme === 'dark' ? themeConfig.dark.canvas : themeConfig.light.canvas}
	/>
	<meta
		name="theme-color"
		media="(prefers-color-scheme: dark)"
		content={theme === 'light' ? themeConfig.light.canvas : themeConfig.dark.canvas}
	/>
	<!-- Tells the browser which color-scheme is active for native UI elements. -->
	<meta name="color-scheme" content={theme === 'dark' ? 'dark light' : 'light dark'} />
</svelte:head>

<div
	class="app-shell"
	data-theme={theme}
	style={`${themeVariables(theme)}; ${interactionVariables}`}
>
	<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -->
	<a class="skip-link" href={siteConfig.accessibility.skipHref}>
		{siteConfig.accessibility.skipToContent}
	</a>
	<SiteHeader {theme} onToggle={toggleTheme} />
	{@render children()}
</div>
